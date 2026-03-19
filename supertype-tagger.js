/**
 * Supertype Tagger — global AppPlugin
 *
 * Makes supertypes available in ANY collection:
 * - Styles #task, #person, #project, #meeting, #note, #idea, #resource
 *   as colored badge pills wherever they appear as hashtags in Thymer
 * - Adds "Apply Supertype..." to the command palette (Cmd+P)
 * - Adds a status bar button for quick access
 * - Writes the chosen supertag into the active record's hashtag field
 *  version 1.0.0
 */

const BUILTIN_SUPERTYPES = {
	task:     { label: '#task',     fg: '#2563eb', bg: '#dbeafe', border: '#93c5fd', desc: 'Action item or to-do' },
	person:   { label: '#person',   fg: '#16a34a', bg: '#dcfce7', border: '#86efac', desc: 'Contact or person' },
	project:  { label: '#project',  fg: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd', desc: 'Project or initiative' },
	meeting:  { label: '#meeting',  fg: '#c2410c', bg: '#ffedd5', border: '#fdba74', desc: 'Meeting or event' },
	note:     { label: '#note',     fg: '#0e7490', bg: '#cffafe', border: '#67e8f9', desc: 'Reference note' },
	idea:     { label: '#idea',     fg: '#db2777', bg: '#fce7f3', border: '#f9a8d4', desc: 'Idea or insight' },
	resource: { label: '#resource', fg: '#0d9488', bg: '#ccfbf1', border: '#5eead4', desc: 'Link, article, or tool' },
};

const SUPERTYPES_CONFIG_KEY = 'thymer_supertypes_config';

function loadSupertypes() {
	// Start with built‑in supertypes
	const cfg = { ...BUILTIN_SUPERTYPES };
	try {
		const raw = localStorage.getItem(SUPERTYPES_CONFIG_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			const custom = Array.isArray(parsed.custom_types) ? parsed.custom_types : [];
			for (const ct of custom) {
				if (!ct || !ct.id || !ct.label) continue;
				cfg[ct.id] = {
					label:  ct.label,
					fg:     ct.fg     || '#475569',
					bg:     ct.bg     || '#f1f5f9',
					border: ct.border || '#cbd5e1',
					desc:   ct.desc   || `${ct.label} supertype`,
				};
			}
		}
	} catch (_) {}
	return cfg;
}

const SUPERTYPES = loadSupertypes();
const SUPER_TYPE_IDS = Object.keys(SUPERTYPES);
const TAG_RE = new RegExp(`^#(${SUPER_TYPE_IDS.join('|')})$`, 'i');

const BADGE_CSS = Object.entries(SUPERTYPES).map(([id, cfg]) => `
[data-supertype="${id}"] {
	display: inline-flex !important;
	align-items: center !important;
	padding: 1px 7px !important;
	border-radius: 10px !important;
	background: ${cfg.bg} !important;
	color: ${cfg.fg} !important;
	font-size: 11px !important;
	font-weight: 700 !important;
	letter-spacing: 0.03em !important;
	border: 1px solid ${cfg.border} !important;
	white-space: nowrap !important;
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
	line-height: 1.6 !important;
	text-decoration: none !important;
	cursor: default !important;
}
`).join('\n');

class Plugin extends AppPlugin {

	onLoad() {
		this.ui.injectCSS(BADGE_CSS);
		this._initObserver();

		this.ui.addCommandPaletteCommand({
			label: 'Apply Supertype...',
			icon: 'ti-tag',
			onSelected: () => this._showPicker(),
		});

		this.ui.addStatusBarItem({
			icon: 'ti-tag',
			tooltip: 'Apply Supertype to current record',
			onClick: () => this._showPicker(),
		});
	}

	onUnload() {
		this._observer?.disconnect();
	}

	_initObserver() {
		const scan = () => {
			document.querySelectorAll('a, span.tag, span.hashtag, span[class*="tag"], a[class*="tag"]').forEach(el => {
				const text = el.textContent?.trim();
				if (!text) return;
				const m = text.match(TAG_RE);
				if (!m) return;
				const id = m[1].toLowerCase();
				if (el.dataset.supertype !== id) el.dataset.supertype = id;
			});
		};

		scan();
		this._observer = new MutationObserver(scan);
		this._observer.observe(document.body, { childList: true, subtree: true });
	}

	_showPicker() {
		const record = this.ui.getActivePanel()?.getActiveRecord();
		const noRecord = !record;

		const rows = Object.entries(SUPERTYPES).map(([id, cfg]) => {
			const badge = `<span style="display:inline-flex;padding:2px 8px;border-radius:10px;background:${cfg.bg};color:${cfg.fg};font-size:11px;font-weight:700;font-family:ui-monospace,SFMono-Regular,monospace;border:1px solid ${cfg.border};letter-spacing:0.03em">${cfg.label}</span>`;
			return `<div data-pick="${id}" style="cursor:pointer;display:flex;align-items:center;gap:10px;padding:5px 6px;border-radius:6px" onmouseenter="this.style.background='var(--hover-bg,rgba(0,0,0,0.05))'" onmouseleave="this.style.background=''">${badge}<span style="font-size:12px;color:var(--text-secondary,#6b7280)">${cfg.desc}</span></div>`;
		}).join('');

		const hint = noRecord
			? `<div style="font-size:11px;color:var(--text-secondary,#9ca3af);padding:0 4px 8px">Open a record first, or the type will be copied to clipboard.</div>`
			: '';

		const html = `<div style="min-width:270px;padding:2px 0"><div style="font-size:13px;font-weight:700;padding:2px 4px 8px">Apply Supertype</div>${hint}<div id="_st_picks">${rows}</div></div>`;

		const toaster = this.ui.addToaster({
			title: '',
			messageHTML: html,
			dismissible: true,
			autoDestroyTime: 20000,
		});

		setTimeout(() => {
			document.querySelectorAll('#_st_picks [data-pick]').forEach(el => {
				el.addEventListener('click', () => {
					const id = el.dataset.pick;
					toaster.destroy?.();
					this._applyTag(id, record);
				});
			});
		}, 30);
	}

    async _applyTag(id, record) {
    const cfg   = SUPERTYPES[id];
    const label = cfg.label;

    if (!record) {
        navigator.clipboard?.writeText(label).catch(() => {});
        this.ui.addToaster({ title: '', message: `${label} copied to clipboard`, dismissible: false, autoDestroyTime: 2500 });
        return;
    }

    // 1) Try Type property
    for (const key of ['Type', 'type']) {
        try {
            const typeProp = record.prop?.(key);
            if (!typeProp) continue;
            if (typeof typeProp.setChoice === 'function') {
                typeProp.setChoice(id);
                this.ui.addToaster({ title: '', message: `Applied ${label} to "${record.getName()}" (Type updated)`, dismissible: false, autoDestroyTime: 2500 });
                return;
            }
            if (typeof typeProp.set === 'function') {
                typeProp.set(id);
                this.ui.addToaster({ title: '', message: `Applied ${label} to "${record.getName()}" (Type updated)`, dismissible: false, autoDestroyTime: 2500 });
                return;
            }
        } catch (e) {
            console.warn(`[Supertypes] prop("${key}") failed:`, e);
        }
    }

// 2) Try Tag property
    for (const key of ['Tag', 'tag', 'Tags', 'tags']) {
        try {
            const tagProp = record.prop?.(key);
            if (!tagProp) continue;
            console.log(`[Supertypes] found prop "${key}":`, tagProp);
            // Try set() first — tag fields are usually text/hashtag not choice
            if (typeof tagProp.set === 'function') {
                const result = tagProp.set(label.replace(/^#/, ''));
                console.log(`[Supertypes] set("${label}") result:`, result);
                this.ui.addToaster({ title: '', message: `Applied ${label} to "${record.getName()}" (${key} updated)`, dismissible: false, autoDestroyTime: 2500 });
                return;
            }
            if (typeof tagProp.setChoice === 'function') {
                const result = tagProp.setChoice(label.replace(/^#/, ''));
                console.log(`[Supertypes] setChoice("${label}") result:`, result);
                this.ui.addToaster({ title: '', message: `Applied ${label} to "${record.getName()}" (${key} updated)`, dismissible: false, autoDestroyTime: 2500 });
                return;
            }
        } catch (e) {
            console.warn(`[Supertypes] prop("${key}") failed:`, e);
        }
    }

    // 3) Neither found
    this.ui.addToaster({ title: 'Not available', message: 'No Type or Tag field found — supertype cannot be applied to this record.', dismissible: true, autoDestroyTime: 4000 });
}
}
