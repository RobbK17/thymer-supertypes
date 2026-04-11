/**
 * Supertypes — collection plugin for Thymer
 *
 * v1.0.1
 */

// ─── Built-in type config ─────────────────────────────────────────────────────
const BUILTIN_SUPERTYPE_CONFIG = {
	task:     { label: '#task',     fg: '#2563eb', bg: '#dbeafe', border: '#93c5fd' },
	person:   { label: '#person',   fg: '#16a34a', bg: '#dcfce7', border: '#86efac' },
	project:  { label: '#project',  fg: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' },
	meeting:  { label: '#meeting',  fg: '#c2410c', bg: '#ffedd5', border: '#fdba74' },
	note:     { label: '#note',     fg: '#0e7490', bg: '#cffafe', border: '#67e8f9' },
	idea:     { label: '#idea',     fg: '#db2777', bg: '#fce7f3', border: '#f9a8d4' },
	resource: { label: '#resource', fg: '#0d9488', bg: '#ccfbf1', border: '#5eead4' },
};
const BUILTIN_TYPE_IDS = ['task', 'person', 'project', 'meeting', 'note', 'idea', 'resource'];

// Mutable runtime copies — rebuilt whenever customTypes changes
let SUPERTYPE_CONFIG = { ...BUILTIN_SUPERTYPE_CONFIG };
let ALL_TYPES = [...BUILTIN_TYPE_IDS];

// ─── Color palettes ───────────────────────────────────────────────────────────
const COLOR_PALETTES = [
	{ name: 'Blue',   fg: '#2563eb', bg: '#dbeafe', border: '#93c5fd' },
	{ name: 'Green',  fg: '#16a34a', bg: '#dcfce7', border: '#86efac' },
	{ name: 'Purple', fg: '#7c3aed', bg: '#ede9fe', border: '#c4b5fd' },
	{ name: 'Orange', fg: '#c2410c', bg: '#ffedd5', border: '#fdba74' },
	{ name: 'Cyan',   fg: '#0e7490', bg: '#cffafe', border: '#67e8f9' },
	{ name: 'Pink',   fg: '#db2777', bg: '#fce7f3', border: '#f9a8d4' },
	{ name: 'Teal',   fg: '#0d9488', bg: '#ccfbf1', border: '#5eead4' },
	{ name: 'Red',    fg: '#dc2626', bg: '#fee2e2', border: '#fca5a5' },
	{ name: 'Yellow', fg: '#d97706', bg: '#fef3c7', border: '#fcd34d' },
	{ name: 'Indigo', fg: '#4338ca', bg: '#e0e7ff', border: '#a5b4fc' },
	{ name: 'Rose',   fg: '#e11d48', bg: '#fff1f2', border: '#fda4af' },
	{ name: 'Slate',  fg: '#475569', bg: '#f1f5f9', border: '#cbd5e1' },
];

// ─── Icon picker options ──────────────────────────────────────────────────────
const TYPE_ICON_OPTIONS = [
	{ id: 'ti-user',            label: 'Person'    },
	{ id: 'ti-users',           label: 'Team'      },
	{ id: 'ti-building',        label: 'Company'   },
	{ id: 'ti-briefcase',       label: 'Work'      },
	{ id: 'ti-id-badge',        label: 'Badge'     },
	{ id: 'ti-circle-check',    label: 'Check'     },
	{ id: 'ti-clock',           label: 'Clock'     },
	{ id: 'ti-calendar',        label: 'Calendar'  },
	{ id: 'ti-flag',            label: 'Flag'      },
	{ id: 'ti-target',          label: 'Target'    },
	{ id: 'ti-file-text',       label: 'Document'  },
	{ id: 'ti-note',            label: 'Note'      },
	{ id: 'ti-book',            label: 'Book'      },
	{ id: 'ti-bulb',            label: 'Idea'      },
	{ id: 'ti-star',            label: 'Star'      },
	{ id: 'ti-mail',            label: 'Email'     },
	{ id: 'ti-phone',           label: 'Phone'     },
	{ id: 'ti-message',         label: 'Message'   },
	{ id: 'ti-send',            label: 'Send'      },
	{ id: 'ti-bell',            label: 'Alert'     },
	{ id: 'ti-link',            label: 'Link'      },
	{ id: 'ti-bookmark',        label: 'Bookmark'  },
	{ id: 'ti-photo',           label: 'Photo'     },
	{ id: 'ti-map-pin',         label: 'Location'  },
	{ id: 'ti-paperclip',       label: 'Attach'    },
	{ id: 'ti-chart-bar',       label: 'Chart'     },
	{ id: 'ti-trending-up',     label: 'Trending'  },
	{ id: 'ti-currency-dollar', label: 'Money'     },
	{ id: 'ti-shopping-cart',   label: 'Shopping'  },
	{ id: 'ti-database',        label: 'Database'  },
	{ id: 'ti-code',            label: 'Code'      },
	{ id: 'ti-bug',             label: 'Bug'       },
	{ id: 'ti-cpu',             label: 'CPU'       },
	{ id: 'ti-tool',            label: 'Tool'      },
	{ id: 'ti-settings',        label: 'Settings'  },
	{ id: 'ti-tag',             label: 'Tag'       },
	{ id: 'ti-rocket',          label: 'Rocket'    },
	{ id: 'ti-heart',           label: 'Heart'     },
	{ id: 'ti-crown',           label: 'Crown'     },
	{ id: 'ti-diamond',         label: 'Diamond'   },
	{ id: 'ti-shield',          label: 'Shield'    },
	{ id: 'ti-lock',            label: 'Lock'      },
	{ id: 'ti-key',             label: 'Key'       },
	{ id: 'ti-layers',          label: 'Layers'    },
	{ id: 'ti-puzzle',          label: 'Puzzle'    },
	{ id: 'ti-fire',            label: 'Fire'      },
	{ id: 'ti-lightning-bolt',  label: 'Lightning' },
	{ id: 'ti-search',          label: 'Search'    },
	{ id: 'ti-filter',          label: 'Filter'    },
];

// ─── System / field constants ─────────────────────────────────────────────────
const SYSTEM_FIELD_IDS          = new Set(['title', 'type', 'updated_at', 'created_at', 'banner']);
const SETTINGS_HIDDEN_FIELD_IDS = new Set(['summary', 'icon']);

const DEFAULT_FIELD_TYPES = {
	status:       ['task', 'person', 'project', 'meeting', 'note', 'idea', 'resource'],
	priority:     ['task', 'project'],
	due_date:     ['task', 'project'],
	meeting_date: ['meeting'],
	role:         ['person'],
	email:        ['person'],
	company:      ['person'],
	phone:        ['person'],
	url:          ['resource'],
	source:       ['note', 'idea', 'resource'],
	attendees:    ['meeting'],
};

const TYPE_STATUS_DEFAULTS   = { task: 'todo', person: 'active', project: 'planning', meeting: 'todo', note: 'active', idea: 'raw', resource: 'active' };
const TYPE_PRIORITY_DEFAULTS = { task: 'medium', project: 'medium' };
const STATUS_OPTIONS   = ['todo', 'active', 'planning', 'raw', 'done', 'archived', 'cancelled'];
const PRIORITY_OPTIONS = ['', 'low', 'medium', 'high', 'urgent'];

const FIELD_LABEL_TO_ID = {
	'Status': 'status', 'Priority': 'priority', 'Due Date': 'due_date', 'Meeting Date': 'meeting_date',
	'Role': 'role', 'Email': 'email', 'Company': 'company', 'URL': 'url', 'Source': 'source',
	'Attendees': 'attendees', 'Phone': 'phone',
};

const FIELD_ICONS = {
	title: 'ti-text', type: 'ti-tag', updated_at: 'ti-clock', created_at: 'ti-calendar-plus', banner: 'ti-photo',
	status: 'ti-circle-check', priority: 'ti-flag-3', due_date: 'ti-calendar-due', meeting_date: 'ti-calendar-event',
	role: 'ti-briefcase', email: 'ti-mail', company: 'ti-building', phone: 'ti-phone',
	url: 'ti-link', source: 'ti-bookmark', attendees: 'ti-users',
};
const FIELD_TYPE_ICONS = { text: 'ti-text', number: 'ti-123', datetime: 'ti-calendar', choice: 'ti-list-check' };

// ─── Config storage ───────────────────────────────────────────────────────────
const CONFIG_KEY = 'thymer_supertypes_config';
let currentFieldTypes  = {};
let currentFieldLabels = {};
let customTypes  = []; // { id, label, fg, bg, border, icon, defaultStatus, defaultPriority, fieldIds }
let _lastConfigRaw = null;
let _configLoaded = false;

function _rebuildRuntimeTypes() {
	SUPERTYPE_CONFIG = { ...BUILTIN_SUPERTYPE_CONFIG };
	ALL_TYPES = [...BUILTIN_TYPE_IDS];
	for (const ct of customTypes) {
		SUPERTYPE_CONFIG[ct.id] = { label: ct.label, fg: ct.fg, bg: ct.bg, border: ct.border, icon: ct.icon || null };
		if (!ALL_TYPES.includes(ct.id)) ALL_TYPES.push(ct.id);
	}
}

function loadConfig(force = false) {
	try {
		const raw = localStorage.getItem(CONFIG_KEY);
		if (!force && _configLoaded && raw === _lastConfigRaw) return;
		_lastConfigRaw = raw;
		_configLoaded = true;
		if (raw) {
			const cfg = JSON.parse(raw);
			currentFieldTypes  = Object.fromEntries(Object.entries(cfg.field_types || {}).map(([k, v]) => [k, new Set(Array.isArray(v) ? v : [])]));
			currentFieldLabels = cfg.field_labels || {};
			customTypes  = Array.isArray(cfg.custom_types)  ? cfg.custom_types  : [];
			_rebuildRuntimeTypes();
			return;
		}
	} catch (_) {}
	_applyDefaultConfig();
}

function saveConfig() {
	const serialized = JSON.stringify({
		field_types:   Object.fromEntries(Object.entries(currentFieldTypes).map(([k, v]) => [k, [...v]])),
		field_labels:  { ...currentFieldLabels },
		custom_types:  customTypes,
	});
	localStorage.setItem(CONFIG_KEY, serialized);
	_lastConfigRaw = serialized;
	_configLoaded = true;
	_rebuildRuntimeTypes();
	// Clear scan cache so _scanTypeBadges re-applies updated colours
	try { document.querySelectorAll('[data-st-styled]').forEach(el => el.removeAttribute('data-st-styled')); } catch (_) {}
}

function _applyDefaultConfig() {
	currentFieldTypes  = Object.fromEntries(Object.entries(DEFAULT_FIELD_TYPES).map(([k, v]) => [k, new Set(v)]));
	currentFieldLabels = {};
	customTypes  = [];
	_rebuildRuntimeTypes();
}

// ─── Misc helpers ─────────────────────────────────────────────────────────────
function sanitizeFieldId(label) {
	return (label || 'custom').toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') || 'custom';
}
function escapeHtml(s) {
	if (s == null) return '';
	const d = document.createElement('div'); d.textContent = s; return d.innerHTML;
}
function getFieldLabel(fieldId, configLabel) { return currentFieldLabels[fieldId] || configLabel || fieldId; }
function isFieldVisible(fieldId, typeId) {
	const a = currentFieldTypes[fieldId];
	return !a ? true : a.size === 0 ? false : a.has(typeId);
}

// Badge element — shows optional icon before label
function makeBadgeEl(cfg, doc) {
	const d = doc || document;
	const el = d.createElement('span');
	el.setAttribute('data-st-badge', '');
	el.style.cssText = [
		'display:inline-flex', 'align-items:center', 'padding:2px 8px', 'border-radius:10px',
		`background:${cfg.bg}`, `color:${cfg.fg}`, 'font-size:11px', 'font-weight:700',
		'letter-spacing:0.03em', `border:1px solid ${cfg.border}`, 'white-space:nowrap',
		'font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace', 'line-height:1.6', 'gap:4px',
	].join(';');
	el.style.setProperty('border-radius', '10px', 'important');
	if (cfg.icon) {
		const ic = d.createElement('i');
		ic.className = `ti ${cfg.icon}`;
		ic.style.cssText = 'font-size:10px;flex-shrink:0;';
		el.appendChild(ic);
	}
	el.appendChild(d.createTextNode(cfg.label));
	return el;
}

function _applyHideStyles(el) {
	el.setAttribute('data-st-hidden-row', '');
	el.style.setProperty('display',     'none',   'important');
	el.style.setProperty('visibility',  'hidden', 'important');
	el.style.setProperty('height',      '0',      'important');
	el.style.setProperty('min-height',  '0',      'important');
	el.style.setProperty('overflow',    'hidden', 'important');
	el.style.setProperty('margin',      '0',      'important');
	el.style.setProperty('padding',     '0',      'important');
}

function hiddenEl() {
	const el = document.createElement('span');
	el.setAttribute('data-st-hidden', '');
	el.style.cssText = 'display:none!important;width:0!important;height:0!important;overflow:hidden!important;position:absolute!important;visibility:hidden!important';
	function tryHide() {
		if (!el.isConnected) return false;
		el.style.setProperty('display', 'none', 'important');
		let p = el.parentElement;
		if (p) {
			p.style.setProperty('display', 'none', 'important');
			const row = p.parentElement;
			if (row && row !== document.body) { _applyHideStyles(row); return true; }
		}
		const row = el.closest('tr,[role="row"],[class*="prop"],[class*="field"],[class*="row"],[class*="item"],[class*="attr"],[class*="Property"],[class*="Field"],[data-field],[data-property],[data-field-id],[data-prop-id],[class*="page-field"],section,[class*="Section"]');
		if (row && row !== document.body && row !== document.documentElement) { _applyHideStyles(row); return true; }
		let node = el.parentElement;
		for (let i = 0; i < 15; i++) {
			if (!node || node === document.body) break;
			if (node.children.length >= 2 || node.tagName === 'TR' || node.tagName === 'SECTION') { _applyHideStyles(node); return true; }
			node = node.parentElement;
		}
		return false;
	}
	tryHide();
	requestAnimationFrame(tryHide);
	setTimeout(tryHide, 50);
	setTimeout(tryHide, 200);
	setTimeout(tryHide, 500);
	return el;
}

// ─── Plugin ───────────────────────────────────────────────────────────────────
class Plugin extends CollectionPlugin {

	_resetRuntimeHandles() {
		this._stTimeouts = [];
		this._stIntervals = [];
		this._stObservers = [];
		this._stScanQueueState = {};
	}

	_trackTimeout(id) {
		this._stTimeouts.push(id);
		return id;
	}

	_trackInterval(id) {
		this._stIntervals.push(id);
		return id;
	}

	_trackObserver(obs) {
		this._stObservers.push(obs);
		return obs;
	}

	_queueScan(scanKey, fn) {
		if (!this._stScanQueueState[scanKey]) this._stScanQueueState[scanKey] = { scheduled: false, running: false, queued: false };
		const st = this._stScanQueueState[scanKey];
		if (st.running) { st.queued = true; return; }
		if (st.scheduled) return;
		st.scheduled = true;
		const schedule = (typeof requestAnimationFrame === 'function')
			? requestAnimationFrame
			: (cb) => this._trackTimeout(setTimeout(cb, 16));
		schedule(() => {
			st.scheduled = false;
			st.running = true;
			try { fn(); } finally {
				st.running = false;
				if (st.queued) {
					st.queued = false;
					this._queueScan(scanKey, fn);
				}
			}
		});
	}

	onLoad() {
		this._resetRuntimeHandles();
		loadConfig(true);

		this.ui.injectCSS('[data-st-hidden-row]{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;}');
		this.ui.injectCSS('[data-st-badge]{border-radius:10px!important;overflow:visible!important;}');

		if (typeof document !== 'undefined' && !document.querySelector('link[href*="tabler-icons"]')) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css';
			document.head.appendChild(link);
		}

		this.ui.injectCSS(`
			[data-st-icon]{display:inline-block!important;margin-right:5px!important;font-size:13px!important;opacity:.55!important;vertical-align:middle!important;line-height:1!important;flex-shrink:0!important;pointer-events:none!important;}
		`);

		this._schedulePropertiesPanelScan();
		this._scheduleTypeBadgeScan();
		const collectionGuid = this.collectionRoot.guid;

		this.events.on('record.created', (ev) => {
			if (ev.collectionGuid !== collectionGuid) return;
			const record = ev.getRecord(); if (!record) return;
			if (!record.prop('Type')?.choice()) record.prop('Type')?.setChoice('note');
			else this._applyTypeDefaults(record, { overwrite: false });
		});

		this.events.on('record.updated', (ev) => {
			if (ev.collectionGuid !== collectionGuid || !ev.properties?.type) return;
			const record = ev.getRecord();
			if (record) this._applyTypeDefaults(record, { overwrite: true });
		});

		// Badge renderer reads live SUPERTYPE_CONFIG so custom types + icons render correctly
		this.properties.render('Type', ({ prop }) => {
			loadConfig();
			const id = prop.choice(); if (!id) return null;
			const cfg = SUPERTYPE_CONFIG[id]; if (!cfg) return null;
			return makeBadgeEl(cfg, document);
		});

		for (const { id: fieldId } of this._getManageableFields()) {
			this.properties.render(fieldId, ({ record }) => {
				const bodyText = typeof document !== 'undefined' && document.body?.textContent || '';
				if (!bodyText.includes('Properties') || bodyText.includes('Field Visibility')) return null;
				loadConfig();
				const type = record?.prop('Type')?.choice(); if (!type) return null;
				if (isFieldVisible(fieldId, type)) return null;
				return hiddenEl();
			});
		}

		// Navigation button — counts all types (built-in + custom)
		this.addCollectionNavigationButton({
			icon: 'ti-tag', label: 'Types', tooltip: 'Counts by type',
			onClick: async () => {
				loadConfig();
				const collections = await this.data.getAllCollections();
				const col = collections.find(c => c.getGuid() === collectionGuid); if (!col) return;
				const records = await col.getAllRecords();
				const counts = {};
				for (const r of records) { const t = r.prop('Type')?.choice(); if (t) counts[t] = (counts[t] || 0) + 1; }
				const total = Object.values(counts).reduce((a, b) => a + b, 0);
				const rows = ALL_TYPES.map(id => {
					const cfg = SUPERTYPE_CONFIG[id]; if (!cfg) return '';
					const count = counts[id] || 0;
					const iconHtml = cfg.icon ? `<i class="ti ${cfg.icon}" style="font-size:10px;margin-right:3px;"></i>` : '';
					const badge = `<span style="display:inline-flex;align-items:center;padding:1px 7px;border-radius:8px;background:${cfg.bg};color:${cfg.fg};font-size:11px;font-weight:700;font-family:ui-monospace,monospace;border:1px solid ${cfg.border};gap:3px;">${iconHtml}${escapeHtml(cfg.label)}</span>`;
					return `<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0">${badge}<span style="font-size:12px;font-weight:600;min-width:22px;text-align:right">${count}</span></div>`;
				}).join('');
				this.ui.addToaster({
					title: '',
					messageHTML: `<div style="padding:2px 0;min-width:200px"><div style="font-size:13px;font-weight:700;margin-bottom:10px">Supertypes</div>${rows}<div style="border-top:1px solid var(--border,#e5e7eb);margin-top:10px;padding-top:8px;display:flex;justify-content:space-between;font-size:12px"><span style="color:var(--text-secondary,#6b7280)">Total</span><span style="font-weight:700">${total}</span></div></div>`,
					dismissible: true, autoDestroyTime: 12000,
				});
			},
		});

		this._registerSettingsView();
	}

	onUnload() {
		for (const id of this._stTimeouts || []) clearTimeout(id);
		for (const id of this._stIntervals || []) clearInterval(id);
		for (const obs of this._stObservers || []) {
			try { obs.disconnect(); } catch (_) {}
		}
		this._resetRuntimeHandles();
	}

	// ─── Settings view ────────────────────────────────────────────────────────
	_registerSettingsView() {
		this.views.register('Settings', (viewCtx) => {
			this.ui.injectCSS(`
				.st-settings{padding:24px;font-family:var(--font-family);max-width:1000px;}
				.st-settings h1{font-size:18px;font-weight:700;margin:0 0 2px;}
				.st-subtitle{font-size:13px;color:var(--text-muted,#6b7280);margin:0 0 20px;}
				.st-tabs{display:flex;gap:2px;border-bottom:2px solid var(--border-default,#e5e7eb);margin-bottom:28px;}
				.st-tab{padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:none;color:var(--text-muted,#6b7280);border-bottom:2px solid transparent;margin-bottom:-2px;border-radius:6px 6px 0 0;transition:color .15s,border-color .15s;}
				.st-tab:hover{color:var(--text-default);background:var(--bg-hover,#f9fafb);}
				.st-tab.active{color:var(--accent,#6366f1);border-bottom-color:var(--accent,#6366f1);}
				.st-tab-panel{display:none;}.st-tab-panel.active{display:block;}
				.st-info{font-size:12px;color:var(--text-muted,#6b7280);margin-top:4px;margin-bottom:16px;line-height:1.5;}
				.st-btn-row{display:flex;gap:10px;align-items:center;margin-top:24px;flex-wrap:wrap;}
				.st-btn{padding:8px 18px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:opacity .15s;}
				.st-btn:hover{opacity:.85;}
				.st-btn-primary{background:var(--accent,#6366f1);color:#fff;}
				.st-btn-secondary{background:var(--bg-default,#f3f4f6);border:1px solid var(--border-default,#d1d5db);color:var(--text-default);}
				.st-btn-danger{background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;}
				.st-btn-sm{padding:4px 10px;font-size:12px;}
				.st-btn-icon{padding:4px 8px;font-size:13px;line-height:1;}
				.st-status{font-size:12px;color:var(--text-muted,#6b7280);}
				.st-status.ok{color:#16a34a;font-weight:600;}
				.st-type-badge{display:inline-flex;align-items:center;padding:1px 7px;border-radius:8px;font-size:10px;font-weight:700;font-family:ui-monospace,monospace;white-space:nowrap;gap:3px;}
				.st-divider{border:none;border-top:1px solid var(--border-default,#e5e7eb);margin:24px 0 20px;}
				/* Types tab */
				.st-types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;margin-bottom:20px;}
				.st-type-card{border:1px solid var(--border-default,#e5e7eb);border-radius:10px;padding:14px 16px;background:var(--bg-default,#fff);}
				.st-type-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
				.st-type-card-actions{display:flex;gap:4px;align-items:center;}
				.st-type-card-fields{display:flex;flex-wrap:wrap;gap:4px;}
				.st-type-card-field{font-size:11px;padding:1px 7px;border-radius:6px;background:var(--bg-subtle,#f3f4f6);color:var(--text-muted,#6b7280);border:1px solid var(--border-default,#e5e7eb);}
				.st-type-card-meta{font-size:11px;color:var(--text-muted,#9ca3af);margin-top:8px;}
				.st-type-card.built-in{opacity:.8;}
				.st-add-type-btn{display:flex;align-items:center;gap:8px;padding:12px 16px;border:2px dashed var(--border-default,#d1d5db);border-radius:10px;background:none;cursor:pointer;font-size:13px;font-weight:600;color:var(--text-muted,#6b7280);width:100%;transition:border-color .15s,color .15s;}
				.st-add-type-btn:hover{border-color:var(--accent,#6366f1);color:var(--accent,#6366f1);}
				/* Type editor */
				.st-type-editor{border:1px solid var(--accent,#6366f1);border-radius:12px;padding:20px;background:var(--bg-default,#fff);margin-bottom:20px;box-shadow:0 0 0 3px rgba(99,102,241,.08);}
				.st-type-editor h3{font-size:14px;font-weight:700;margin:0 0 16px;}
				.st-editor-row{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;margin-bottom:16px;}
				.st-editor-col{display:flex;flex-direction:column;gap:5px;}
				.st-editor-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted,#6b7280);}
				.st-editor-input,.st-editor-select{padding:7px 10px;border:1px solid var(--border-default,#d1d5db);border-radius:7px;font-size:13px;background:var(--bg-default,#fff);color:var(--text-default);outline:none;}
				.st-editor-input{min-width:160px;}
				.st-editor-input:focus,.st-editor-select:focus{border-color:var(--accent,#6366f1);box-shadow:0 0 0 2px rgba(99,102,241,.15);}
				.st-editor-input.st-error{border-color:#dc2626;}
				.st-slug-preview{font-size:11px;color:var(--text-muted,#9ca3af);margin-top:2px;}
				.st-slug-preview code{background:rgba(0,0,0,.05);padding:1px 5px;border-radius:4px;font-size:11px;}
				/* Swatches */
				.st-color-swatches{display:flex;flex-wrap:wrap;gap:6px;}
				.st-color-swatch{width:24px;height:24px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:transform .1s,border-color .1s;flex-shrink:0;}
				.st-color-swatch:hover{transform:scale(1.15);}
				.st-color-swatch.selected{border-color:var(--text-default,#111);transform:scale(1.1);}
				/* Icon picker */
				.st-icon-picker{display:flex;flex-wrap:wrap;gap:4px;max-width:340px;}
				.st-icon-btn{width:30px;height:30px;border-radius:6px;border:1px solid var(--border-default,#e5e7eb);background:var(--bg-subtle,#f9fafb);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--text-muted,#6b7280);transition:background .1s,border-color .1s,color .1s;}
				.st-icon-btn:hover{background:var(--bg-hover,#f3f4f6);color:var(--text-default);}
				.st-icon-btn.selected{background:var(--accent,#6366f1);border-color:var(--accent,#6366f1);color:#fff;}
				/* Badge preview */
				.st-badge-preview{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--bg-subtle,#f9fafb);border-radius:8px;border:1px solid var(--border-default,#e5e7eb);min-height:40px;}
				.st-badge-preview-lbl{font-size:11px;color:var(--text-muted,#9ca3af);}
				/* Field checks */
				.st-field-checks{display:flex;flex-wrap:wrap;gap:6px 14px;}
				.st-field-check-label{display:inline-flex;align-items:center;gap:5px;font-size:12px;cursor:pointer;}
				.st-field-check-label input{accent-color:var(--accent,#6366f1);}
				.st-field-checks-actions{display:flex;gap:10px;margin-bottom:8px;}
				.st-link-btn{font-size:11px;color:var(--accent,#6366f1);cursor:pointer;background:none;border:none;padding:0;text-decoration:underline;}
				/* Fields tab */
				.st-matrix{width:100%;border-collapse:collapse;}
				.st-matrix th,.st-matrix td{padding:8px 10px;font-size:12px;border-bottom:1px solid var(--border-default,#e5e7eb);text-align:center;}
				.st-matrix th:first-child,.st-matrix td:first-child{text-align:left;font-weight:500;font-size:13px;padding-left:0;}
				.st-matrix thead th{font-size:11px;font-weight:700;color:var(--text-muted,#9ca3af);text-transform:uppercase;letter-spacing:.05em;padding-bottom:6px;}
				.st-matrix tbody tr:hover{background:var(--bg-hover,#f9fafb);}
				.st-matrix input[type=checkbox]{width:15px;height:15px;cursor:pointer;accent-color:var(--accent,#6366f1);}
				/* Labels tab */
				.st-labels-table{width:100%;border-collapse:collapse;}
				.st-labels-table td{padding:6px 8px 6px 0;vertical-align:middle;font-size:13px;}
				.st-label-input{width:240px;padding:5px 8px;border:1px solid var(--border-default,#d1d5db);border-radius:6px;font-size:13px;background:var(--bg-default,#fff);color:var(--text-default);outline:none;}
				.st-label-input:focus{border-color:var(--accent,#6366f1);box-shadow:0 0 0 2px rgba(99,102,241,.15);}
				.st-placeholder{font-size:12px;color:var(--text-muted,#9ca3af);margin-left:6px;}
				/* Properties tab */
				.st-custom-list{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
				.st-custom-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px 10px;background:var(--bg-subtle,#f9fafb);border-radius:8px;font-size:13px;}
				.st-custom-label{font-weight:600;min-width:80px;}
				.st-custom-type-tag{color:var(--text-muted,#6b7280);font-size:12px;}
				.st-custom-types{display:inline-flex;flex-wrap:wrap;gap:4px;}
				.st-custom-id{font-size:12px;color:var(--text-muted,#6b7280);}
				.st-custom-id code{background:rgba(0,0,0,.06);padding:2px 6px;border-radius:4px;font-size:11px;}
				.st-add-property{margin-top:10px;}
				.st-add-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:10px;}
				.st-add-field-label{flex:1;min-width:120px;padding:6px 10px;border:1px solid var(--border-default,#d1d5db);border-radius:6px;font-size:13px;}
				.st-add-field-type{padding:6px 10px;border:1px solid var(--border-default,#d1d5db);border-radius:6px;font-size:13px;}
				.st-add-types-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:6px;}
				.st-add-types-label{font-size:12px;color:var(--text-muted,#6b7280);}
				.st-add-types-checks{display:flex;flex-wrap:wrap;gap:8px 14px;}
				.st-add-type-check{font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;}
			`);

			let statusEl    = null;
			let activeTab   = 'types';
			let editingTypeId = null;
			let wrap        = null;

			const switchTab = (id) => {
				activeTab = id;
				if (!wrap) return;
				wrap.querySelectorAll('.st-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === id));
				wrap.querySelectorAll('.st-tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === id));
			};

			// ── Types panel ──────────────────────────────────────────────────
			const buildTypesPanel = (panel) => {
				panel.innerHTML = '';
				const info = document.createElement('p');
				info.className = 'st-info';
				info.textContent = 'Built-in types are shown for reference. Add custom types to extend the list — they appear everywhere built-in types do, including in the Fields matrix and badge renderer.';
				panel.appendChild(info);

				// ── Inline editor ──
				if (editingTypeId !== null) {
					const isNew    = editingTypeId === 'new';
					const existing = isNew ? null : customTypes.find(t => t.id === editingTypeId);
					const editor   = document.createElement('div');
					editor.className = 'st-type-editor';
					const h3 = document.createElement('h3');
					h3.textContent = isNew ? 'Add custom type' : `Edit — ${existing?.label || editingTypeId}`;
					editor.appendChild(h3);

					// Form state
					let formName     = existing?.label?.replace(/^#/, '') || '';
					let formSlug     = existing?.id || '';
					let formColor    = COLOR_PALETTES.find(p => p.fg === existing?.fg) || COLOR_PALETTES[0];
					let formIcon     = existing?.icon || null;
					let formStatus   = existing?.defaultStatus   || 'active';
					let formPriority = existing?.defaultPriority || '';
					let formFields   = new Set(existing?.fieldIds || Object.keys(DEFAULT_FIELD_TYPES));

					// Preview badge wrap (declared early so refreshers can reference it)
					const previewBadgeWrap = document.createElement('span');
					const refreshBadge = () => {
						previewBadgeWrap.innerHTML = '';
						const slug = isNew ? sanitizeFieldId(formName) : formSlug;
						previewBadgeWrap.appendChild(makeBadgeEl({ label: slug ? `#${slug}` : '#type', icon: formIcon, ...formColor }, document));
					};

					// ── Row 1: Name + Status + Priority ──
					const row1 = document.createElement('div'); row1.className = 'st-editor-row';

					const colName = document.createElement('div'); colName.className = 'st-editor-col';
					const nameLabel = document.createElement('div'); nameLabel.className = 'st-editor-label'; nameLabel.textContent = 'Name';
					const nameInput = document.createElement('input'); nameInput.className = 'st-editor-input'; nameInput.placeholder = 'e.g. Client'; nameInput.value = formName;
					const slugPreview = document.createElement('div'); slugPreview.className = 'st-slug-preview';
					const refreshSlug = () => { const s = isNew ? sanitizeFieldId(formName) : formSlug; slugPreview.innerHTML = `ID: <code>#${s || '…'}</code>`; };
					nameInput.addEventListener('input', () => { formName = nameInput.value; if (isNew) formSlug = sanitizeFieldId(formName); nameInput.classList.remove('st-error'); refreshSlug(); refreshBadge(); });
					colName.appendChild(nameLabel); colName.appendChild(nameInput); colName.appendChild(slugPreview);
					row1.appendChild(colName);

					const colStatus = document.createElement('div'); colStatus.className = 'st-editor-col';
					const statusLabel = document.createElement('div'); statusLabel.className = 'st-editor-label'; statusLabel.textContent = 'Default status';
					const statusSel = document.createElement('select'); statusSel.className = 'st-editor-select';
					STATUS_OPTIONS.forEach(s => { const o = document.createElement('option'); o.value = s; o.textContent = s; o.selected = s === formStatus; statusSel.appendChild(o); });
					statusSel.addEventListener('change', () => { formStatus = statusSel.value; });
					colStatus.appendChild(statusLabel); colStatus.appendChild(statusSel);
					row1.appendChild(colStatus);

					const colPri = document.createElement('div'); colPri.className = 'st-editor-col';
					const priLabel = document.createElement('div'); priLabel.className = 'st-editor-label'; priLabel.textContent = 'Default priority';
					const priSel = document.createElement('select'); priSel.className = 'st-editor-select';
					PRIORITY_OPTIONS.forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p || '(none)'; o.selected = p === formPriority; priSel.appendChild(o); });
					priSel.addEventListener('change', () => { formPriority = priSel.value; });
					colPri.appendChild(priLabel); colPri.appendChild(priSel);
					row1.appendChild(colPri);
					editor.appendChild(row1);

					// ── Row 2: Color + Icon + Preview ──
					const row2 = document.createElement('div'); row2.className = 'st-editor-row';

					const colColor = document.createElement('div'); colColor.className = 'st-editor-col';
					const colorLabel = document.createElement('div'); colorLabel.className = 'st-editor-label'; colorLabel.textContent = 'Color';
					const swatchWrap = document.createElement('div'); swatchWrap.className = 'st-color-swatches';
					const swatchBtns = [];
					COLOR_PALETTES.forEach((preset, i) => {
						const sw = document.createElement('button'); sw.type = 'button'; sw.className = 'st-color-swatch' + (formColor.fg === preset.fg ? ' selected' : '');
						sw.style.background = preset.bg; sw.style.borderColor = preset.border; sw.title = preset.name;
						sw.addEventListener('click', () => { formColor = preset; swatchBtns.forEach((b, j) => b.classList.toggle('selected', j === i)); refreshBadge(); });
						swatchBtns.push(sw); swatchWrap.appendChild(sw);
					});
					colColor.appendChild(colorLabel); colColor.appendChild(swatchWrap);
					row2.appendChild(colColor);

					// Icon picker
					const colIcon = document.createElement('div'); colIcon.className = 'st-editor-col';
					const iconLabel = document.createElement('div'); iconLabel.className = 'st-editor-label'; iconLabel.textContent = 'Icon (optional)';
					const iconPicker = document.createElement('div'); iconPicker.className = 'st-icon-picker';
					const iconBtns = [];
					// None button
					const noneBtn = document.createElement('button'); noneBtn.type = 'button'; noneBtn.className = 'st-icon-btn' + (!formIcon ? ' selected' : ''); noneBtn.title = 'No icon';
					noneBtn.innerHTML = '<span style="font-size:9px;font-weight:700;letter-spacing:-.5px">NONE</span>';
					noneBtn.addEventListener('click', () => { formIcon = null; iconBtns.forEach((b, j) => b.classList.toggle('selected', j === 0)); refreshBadge(); });
					iconBtns.push(noneBtn); iconPicker.appendChild(noneBtn);
					TYPE_ICON_OPTIONS.forEach((opt, i) => {
						const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'st-icon-btn' + (formIcon === opt.id ? ' selected' : ''); btn.title = opt.label;
						btn.innerHTML = `<i class="ti ${opt.id}"></i>`;
						btn.addEventListener('click', () => { formIcon = opt.id; iconBtns.forEach((b, j) => b.classList.toggle('selected', j === i + 1)); refreshBadge(); });
						iconBtns.push(btn); iconPicker.appendChild(btn);
					});
					colIcon.appendChild(iconLabel); colIcon.appendChild(iconPicker);
					row2.appendChild(colIcon);

					// Badge preview
					const colPreview = document.createElement('div'); colPreview.className = 'st-editor-col';
					const prevLabel = document.createElement('div'); prevLabel.className = 'st-editor-label'; prevLabel.textContent = 'Preview';
					const previewBox = document.createElement('div'); previewBox.className = 'st-badge-preview';
					const prevLbl = document.createElement('span'); prevLbl.className = 'st-badge-preview-lbl'; prevLbl.textContent = 'Badge:';
					previewBox.appendChild(prevLbl); previewBox.appendChild(previewBadgeWrap);
					colPreview.appendChild(prevLabel); colPreview.appendChild(previewBox);
					row2.appendChild(colPreview);
					editor.appendChild(row2);
					refreshSlug(); refreshBadge();

					// ── Row 3: Fields ──
					const row3 = document.createElement('div'); row3.className = 'st-editor-row';
					const colFields = document.createElement('div'); colFields.className = 'st-editor-col'; colFields.style.width = '100%';
					const fieldsLabel = document.createElement('div'); fieldsLabel.className = 'st-editor-label'; fieldsLabel.textContent = 'Visible fields';
					const fieldCheckActions = document.createElement('div'); fieldCheckActions.className = 'st-field-checks-actions';
					const selAllBtn = document.createElement('button'); selAllBtn.type = 'button'; selAllBtn.className = 'st-link-btn'; selAllBtn.textContent = 'Select all';
					const deselAllBtn = document.createElement('button'); deselAllBtn.type = 'button'; deselAllBtn.className = 'st-link-btn'; deselAllBtn.textContent = 'Deselect all';
					fieldCheckActions.appendChild(selAllBtn); fieldCheckActions.appendChild(deselAllBtn);
					const fieldChecks = document.createElement('div'); fieldChecks.className = 'st-field-checks';
					const manFields = this._getManageableFields();
					const checkboxes = [];
					manFields.forEach(({ id: fid, label: flabel }) => {
						const lbl = document.createElement('label'); lbl.className = 'st-field-check-label';
						const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = formFields.has(fid);
						cb.addEventListener('change', () => { if (cb.checked) formFields.add(fid); else formFields.delete(fid); });
						checkboxes.push({ cb, fid });
						lbl.appendChild(cb); lbl.appendChild(document.createTextNode(getFieldLabel(fid, flabel)));
						fieldChecks.appendChild(lbl);
					});
					selAllBtn.addEventListener('click',   () => { checkboxes.forEach(({ cb, fid }) => { cb.checked = true;  formFields.add(fid); }); });
					deselAllBtn.addEventListener('click', () => { checkboxes.forEach(({ cb })      => { cb.checked = false; }); formFields.clear(); });
					colFields.appendChild(fieldsLabel); colFields.appendChild(fieldCheckActions); colFields.appendChild(fieldChecks);
					row3.appendChild(colFields); editor.appendChild(row3);

					// ── Editor action buttons ──
					const edBtns = document.createElement('div'); edBtns.className = 'st-btn-row'; edBtns.style.marginTop = '8px';
					const saveTypeBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-primary', textContent: isNew ? 'Add type' : 'Save type' });
					saveTypeBtn.addEventListener('click', () => {
						const name = formName.trim();
						if (!name) { nameInput.classList.add('st-error'); nameInput.focus(); return; }
						const slug = isNew ? sanitizeFieldId(name) : formSlug;
						if (!slug) { nameInput.classList.add('st-error'); nameInput.focus(); return; }
						const labelStr = `#${slug}`;
						const fieldIds = [...formFields];
						if (isNew) {
							const allIds = new Set([...BUILTIN_TYPE_IDS, ...customTypes.map(t => t.id)]);
							if (allIds.has(slug)) { nameInput.classList.add('st-error'); nameInput.title = 'ID already in use'; return; }
							customTypes.push({ id: slug, label: labelStr, fg: formColor.fg, bg: formColor.bg, border: formColor.border, icon: formIcon, defaultStatus: formStatus, defaultPriority: formPriority, fieldIds });
							fieldIds.forEach(fid => { if (!currentFieldTypes[fid]) currentFieldTypes[fid] = new Set(ALL_TYPES); currentFieldTypes[fid].add(slug); });
						} else {
							const idx = customTypes.findIndex(t => t.id === editingTypeId);
							if (idx !== -1) {
								const old = customTypes[idx];
								Object.values(currentFieldTypes).forEach(s => s.delete(old.id));
								fieldIds.forEach(fid => { if (!currentFieldTypes[fid]) currentFieldTypes[fid] = new Set(ALL_TYPES); currentFieldTypes[fid].add(old.id); });
								customTypes[idx] = { ...old, label: labelStr, fg: formColor.fg, bg: formColor.bg, border: formColor.border, icon: formIcon, defaultStatus: formStatus, defaultPriority: formPriority, fieldIds };
							}
						}
						saveConfig(); editingTypeId = null; build();
					});
					const cancelBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-secondary', textContent: 'Cancel' });
					cancelBtn.addEventListener('click', () => { editingTypeId = null; buildTypesPanel(panel); });
					edBtns.appendChild(saveTypeBtn); edBtns.appendChild(cancelBtn);
					editor.appendChild(edBtns);
					panel.appendChild(editor);
				}

				// ── Type cards grid ──
				const grid = document.createElement('div'); grid.className = 'st-types-grid';
				const manFields = this._getManageableFields();

				BUILTIN_TYPE_IDS.forEach(typeId => {
					const cfg = BUILTIN_SUPERTYPE_CONFIG[typeId];
					const card = document.createElement('div'); card.className = 'st-type-card built-in';
					const header = document.createElement('div'); header.className = 'st-type-card-header';
					header.appendChild(makeBadgeEl(cfg, document));
					const builtInTag = document.createElement('span'); builtInTag.style.cssText = 'font-size:10px;color:var(--text-muted,#9ca3af);font-weight:500;'; builtInTag.textContent = 'built-in';
					header.appendChild(builtInTag); card.appendChild(header);
					const visF = manFields.filter(f => isFieldVisible(f.id, typeId));
					if (visF.length) { const fw = document.createElement('div'); fw.className = 'st-type-card-fields'; visF.forEach(f => { const p = document.createElement('span'); p.className = 'st-type-card-field'; p.textContent = getFieldLabel(f.id, f.label); fw.appendChild(p); }); card.appendChild(fw); }
					const ds = TYPE_STATUS_DEFAULTS[typeId]; if (ds) { const m = document.createElement('div'); m.className = 'st-type-card-meta'; m.textContent = `Default status: ${ds}`; card.appendChild(m); }
					grid.appendChild(card);
				});

				customTypes.forEach((ct, idx) => {
					const card = document.createElement('div'); card.className = 'st-type-card'; card.style.borderColor = ct.border;
					const header = document.createElement('div'); header.className = 'st-type-card-header';
					header.appendChild(makeBadgeEl(ct, document));
					const actions = document.createElement('div'); actions.className = 'st-type-card-actions';

					const mkBtn = (ic, title, cls) => { const b = Object.assign(document.createElement('button'), { type: 'button', className: `st-btn ${cls} st-btn-sm st-btn-icon`, title }); b.innerHTML = `<i class="ti ${ic}"></i>`; return b; };

					const upBtn = mkBtn('ti-chevron-up', 'Move up', 'st-btn-secondary'); upBtn.disabled = idx === 0; upBtn.style.opacity = idx === 0 ? '0.3' : '1';
					upBtn.addEventListener('click', () => { if (idx === 0) return; [customTypes[idx-1], customTypes[idx]] = [customTypes[idx], customTypes[idx-1]]; saveConfig(); buildTypesPanel(panel); });

					const downBtn = mkBtn('ti-chevron-down', 'Move down', 'st-btn-secondary'); downBtn.disabled = idx === customTypes.length - 1; downBtn.style.opacity = idx === customTypes.length - 1 ? '0.3' : '1';
					downBtn.addEventListener('click', () => { if (idx >= customTypes.length - 1) return; [customTypes[idx], customTypes[idx+1]] = [customTypes[idx+1], customTypes[idx]]; saveConfig(); buildTypesPanel(panel); });

					const dupBtn = mkBtn('ti-copy', 'Duplicate', 'st-btn-secondary');
					dupBtn.addEventListener('click', () => {
						const allIds = new Set([...BUILTIN_TYPE_IDS, ...customTypes.map(t => t.id)]);
						let base = ct.id + '_copy', newId = base, n = 2; while (allIds.has(newId)) newId = base + (n++);
						customTypes.splice(idx + 1, 0, { ...ct, id: newId, label: `#${newId}` });
						(ct.fieldIds || []).forEach(fid => { if (!currentFieldTypes[fid]) currentFieldTypes[fid] = new Set(ALL_TYPES); currentFieldTypes[fid].add(newId); });
						saveConfig(); buildTypesPanel(panel);
					});

					const editBtn = mkBtn('ti-pencil', 'Edit', 'st-btn-secondary');
					editBtn.addEventListener('click', () => { editingTypeId = ct.id; buildTypesPanel(panel); panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); });

					const delBtn = mkBtn('ti-trash', 'Delete', 'st-btn-danger');
					delBtn.addEventListener('click', () => {
						if (!confirm(`Delete custom type "${ct.label}"? Records using this type will not be affected.`)) return;
						customTypes = customTypes.filter(t => t.id !== ct.id);
						Object.values(currentFieldTypes).forEach(s => s.delete(ct.id));
						saveConfig(); buildTypesPanel(panel);
					});

					[upBtn, downBtn, dupBtn, editBtn, delBtn].forEach(b => actions.appendChild(b));
					header.appendChild(actions); card.appendChild(header);

					if ((ct.fieldIds || []).length) {
						const fw = document.createElement('div'); fw.className = 'st-type-card-fields';
						ct.fieldIds.forEach(fid => { const f = manFields.find(m => m.id === fid); const p = document.createElement('span'); p.className = 'st-type-card-field'; p.textContent = f ? getFieldLabel(f.id, f.label) : fid; fw.appendChild(p); });
						card.appendChild(fw);
					}
					const metaParts = [];
					if (ct.defaultStatus)   metaParts.push(`Status: ${ct.defaultStatus}`);
					if (ct.defaultPriority) metaParts.push(`Priority: ${ct.defaultPriority}`);
					if (metaParts.length) { const m = document.createElement('div'); m.className = 'st-type-card-meta'; m.textContent = metaParts.join(' · '); card.appendChild(m); }
					grid.appendChild(card);
				});

				if (editingTypeId === null) {
					const addBtn = document.createElement('button'); addBtn.type = 'button'; addBtn.className = 'st-add-type-btn';
					addBtn.innerHTML = '<i class="ti ti-plus"></i> Add custom type';
					addBtn.addEventListener('click', () => { editingTypeId = 'new'; buildTypesPanel(panel); panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
					grid.appendChild(addBtn);
				}
				panel.appendChild(grid);
			};

			// ── Main build ────────────────────────────────────────────────────
			const build = () => {
				loadConfig();
				const manFields = this._getManageableFields();
				const el = viewCtx.getElement(); el.innerHTML = '';
				wrap = document.createElement('div'); wrap.className = 'st-settings';
				wrap.innerHTML = '<h1>Supertypes Settings</h1><p class="st-subtitle">Manage types, field visibility, and labels.</p>';

				const tabBar = document.createElement('div'); tabBar.className = 'st-tabs';
				['types', 'fields', 'labels'].forEach(id => {
					const btn = document.createElement('button'); btn.className = 'st-tab' + (id === activeTab ? ' active' : ''); btn.dataset.tab = id;
					btn.textContent = id.charAt(0).toUpperCase() + id.slice(1);
					btn.addEventListener('click', () => switchTab(id)); tabBar.appendChild(btn);
				});
				wrap.appendChild(tabBar);

				// Types panel
				const panelTypes = document.createElement('div'); panelTypes.className = 'st-tab-panel' + (activeTab === 'types' ? ' active' : ''); panelTypes.dataset.panel = 'types';
				buildTypesPanel(panelTypes); wrap.appendChild(panelTypes);

				// Fields panel
				const panelFields = document.createElement('div'); panelFields.className = 'st-tab-panel' + (activeTab === 'fields' ? ' active' : ''); panelFields.dataset.panel = 'fields';
				const fi = document.createElement('p'); fi.className = 'st-info'; fi.textContent = 'Check a cell to show that field on record pages for the given type. Unchecking hides it.'; panelFields.appendChild(fi);
				const table = document.createElement('table'); table.className = 'st-matrix';
				const thead = document.createElement('thead'); const hrow = document.createElement('tr');
				hrow.appendChild(Object.assign(document.createElement('th'), { textContent: 'Field' }));
				ALL_TYPES.forEach(typeId => { const cfg = SUPERTYPE_CONFIG[typeId]; if (!cfg) return; const th = document.createElement('th'); th.appendChild(makeBadgeEl(cfg, document)); hrow.appendChild(th); });
				thead.appendChild(hrow); table.appendChild(thead);
				const tbody = document.createElement('tbody');
				manFields.forEach(({ id: fid, label: dl }) => {
					const tr = document.createElement('tr'); tr.appendChild(Object.assign(document.createElement('td'), { textContent: getFieldLabel(fid, dl) }));
					ALL_TYPES.forEach(typeId => { const td = document.createElement('td'); const cb = document.createElement('input'); cb.type = 'checkbox'; const a = currentFieldTypes[fid]; cb.checked = !a ? true : a.has(typeId); cb.addEventListener('change', () => { if (!currentFieldTypes[fid]) currentFieldTypes[fid] = new Set(ALL_TYPES); if (cb.checked) currentFieldTypes[fid].add(typeId); else currentFieldTypes[fid].delete(typeId); }); td.appendChild(cb); tr.appendChild(td); });
					tbody.appendChild(tr);
				});
				table.appendChild(tbody); panelFields.appendChild(table); wrap.appendChild(panelFields);

				// Labels panel
				const panelLabels = document.createElement('div'); panelLabels.className = 'st-tab-panel' + (activeTab === 'labels' ? ' active' : ''); panelLabels.dataset.panel = 'labels';
				const li2 = document.createElement('p'); li2.className = 'st-info'; li2.textContent = 'Override display names for fields. Leave blank to use the default.'; panelLabels.appendChild(li2);
				const labelsTable = document.createElement('table'); labelsTable.className = 'st-labels-table';
				manFields.forEach(({ id: fid, label: dl }) => {
					const tr = document.createElement('tr'); const tdL = document.createElement('td'); tdL.textContent = dl; tdL.style.cssText = 'width:160px;color:var(--text-muted,#6b7280);'; tr.appendChild(tdL);
					const tdI = document.createElement('td'); const inp = Object.assign(document.createElement('input'), { type: 'text', className: 'st-label-input', value: currentFieldLabels[fid] || '', placeholder: dl }); const hint = document.createElement('span'); hint.className = 'st-placeholder'; hint.textContent = currentFieldLabels[fid] ? '' : '(default)';
					inp.addEventListener('input', () => { const v = inp.value.trim(); if (v && v !== dl) { currentFieldLabels[fid] = v; hint.textContent = ''; } else { delete currentFieldLabels[fid]; hint.textContent = '(default)'; } });
					tdI.appendChild(inp); tdI.appendChild(hint); tr.appendChild(tdI); labelsTable.appendChild(tr);
				});
				panelLabels.appendChild(labelsTable); wrap.appendChild(panelLabels);

				// ── Shared Save / Reset / Export / Import ──
				const divider = document.createElement('hr'); divider.className = 'st-divider'; wrap.appendChild(divider);
				const btnRow = document.createElement('div'); btnRow.className = 'st-btn-row';

				const saveBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-primary', textContent: 'Save Changes' });
				saveBtn.addEventListener('click', () => {
					saveConfig();
					if (statusEl) { statusEl.className = 'st-status ok'; statusEl.textContent = 'Saved.'; setTimeout(() => { if (statusEl) { statusEl.className = 'st-status'; statusEl.textContent = ''; } }, 3000); }
				});

				const resetBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-danger', textContent: 'Reset to Defaults' });
				resetBtn.addEventListener('click', () => {
					if (!confirm('Reset all types, field visibility, labels, and custom properties to defaults?')) return;
					_applyDefaultConfig(); localStorage.removeItem(CONFIG_KEY); editingTypeId = null; build();
				});

				const exportBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-secondary', textContent: 'Export config' });
				exportBtn.addEventListener('click', () => {
					const data = localStorage.getItem(CONFIG_KEY) || '{}';
					const blob = new Blob([data], { type: 'application/json' });
					const url  = URL.createObjectURL(blob);
					const a    = document.createElement('a'); a.href = url; a.download = 'supertypes-config.json'; a.click();
					setTimeout(() => URL.revokeObjectURL(url), 1000);
				});

				const importBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'st-btn st-btn-secondary', textContent: 'Import config' });
				importBtn.addEventListener('click', () => {
					const input = document.createElement('input'); input.type = 'file'; input.accept = '.json,application/json';
					input.addEventListener('change', () => {
						const file = input.files?.[0]; if (!file) return;
						const reader = new FileReader();
						reader.onload = e => {
							try {
								JSON.parse(e.target.result);
								localStorage.setItem(CONFIG_KEY, e.target.result); loadConfig(); editingTypeId = null; build();
								if (statusEl) { statusEl.className = 'st-status ok'; statusEl.textContent = 'Config imported.'; setTimeout(() => { if (statusEl) { statusEl.className = 'st-status'; statusEl.textContent = ''; } }, 3000); }
							} catch (_) { alert('Invalid config file — must be a JSON file exported from Supertypes.'); }
						};
						reader.readAsText(file);
					});
					input.click();
				});

				statusEl = document.createElement('span'); statusEl.className = 'st-status';
				[saveBtn, resetBtn, exportBtn, importBtn, statusEl].forEach(e => btnRow.appendChild(e));
				wrap.appendChild(btnRow); el.appendChild(wrap);
			};

			return { onLoad: () => build(), onRefresh: () => build(), onDestroy: () => { statusEl = null; wrap = null; } };
		});
	}

	// ─── Helpers ─────────────────────────────────────────────────────────────
	_getManageableFields() {
		return (this.getConfiguration().fields || [])
			.filter(f => !SYSTEM_FIELD_IDS.has(f.id) && !SETTINGS_HIDDEN_FIELD_IDS.has(f.id) && f.active !== false)
			.map(f => ({ id: f.id, label: f.label, type: f.type }));
	}

	_applyTypeDefaults(record, { overwrite = false } = {}) {
		const type = record.prop('Type')?.choice(); if (!type) return;
		let defaultStatus = TYPE_STATUS_DEFAULTS[type], defaultPriority = TYPE_PRIORITY_DEFAULTS[type];
		if (!defaultStatus || !defaultPriority) {
			const ct = customTypes.find(t => t.id === type);
			if (ct) { if (!defaultStatus) defaultStatus = ct.defaultStatus; if (!defaultPriority) defaultPriority = ct.defaultPriority || ''; }
		}
		if (defaultStatus)   { const c = record.prop('Status')?.choice();   if (overwrite || !c) record.prop('Status')?.setChoice(defaultStatus); }
		if (defaultPriority) { const c = record.prop('Priority')?.choice(); if (!c) record.prop('Priority')?.setChoice(defaultPriority); }
	}

	_scheduleTypeBadgeScan() {
		const runFull = () => this._queueScan('typeBadges', () => this._scanTypeBadges(document));
		[100, 500, 1200, 2500].forEach(d => this._trackTimeout(setTimeout(runFull, d)));
		// Short-lived fallback polling during initial page churn, then rely on MutationObserver.
		const iv = this._trackInterval(setInterval(runFull, 1500));
		this._trackTimeout(setTimeout(() => clearInterval(iv), 15000));
		try {
			const obs = new MutationObserver((mutations) => {
				const roots = new Set();
				for (const m of mutations || []) {
					for (const n of m.addedNodes || []) {
						if (n?.nodeType === 1) roots.add(n);
					}
				}
				if (!roots.size) return;
				this._queueScan('typeBadges', () => {
					for (const root of roots) this._scanTypeBadges(root);
				});
			});
			obs.observe(document.body, { childList: true, subtree: true });
			this._trackObserver(obs);
		} catch (_) {}
	}

	_scanTypeBadges(root) {
		loadConfig();
		const selector = '[data-field-id="type"] .prop-status-choice, [data-field-id="type"] [class*="prop-status"]';
		const scope = root && typeof root.querySelectorAll === 'function' ? root : document;
		// Find all Thymer-native choice spans inside the Type column cells
		const nodes = [];
		try {
			if (scope.nodeType === 1 && typeof scope.matches === 'function' && scope.matches(selector)) nodes.push(scope);
			nodes.push(...scope.querySelectorAll(selector));
		} catch (_) { return; }
		nodes.forEach(el => {
			if (el.getAttribute('data-st-styled')) return; // already processed
			const text = (el.textContent || '').trim().replace(/^#/, '');
			const cfg = SUPERTYPE_CONFIG[text];
			if (!cfg) return;
			el.setAttribute('data-st-styled', '1');
			el.style.setProperty('background-color', cfg.bg, 'important');
			el.style.setProperty('color', cfg.fg, 'important');
			el.style.setProperty('border', `1px solid ${cfg.border}`, 'important');
			el.style.setProperty('border-radius', '10px', 'important');
			el.style.setProperty('font-family', 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace', 'important');
			el.style.setProperty('font-size', '11px', 'important');
			el.style.setProperty('font-weight', '700', 'important');
			el.style.setProperty('padding', '2px 8px', 'important');
			el.style.setProperty('letter-spacing', '0.03em', 'important');
			el.style.setProperty('line-height', '1.6', 'important');
			el.style.setProperty('white-space', 'nowrap', 'important');
			// Prefix the label with # if missing
			if (!el.textContent.startsWith('#')) el.textContent = `#${text}`;
		});
	}

	_schedulePropertiesPanelScan() {
		const run = () => this._queueScan('propertiesPanel', () => this._scanPropertiesPanel());
		[100, 500, 1200, 2500].forEach(d => this._trackTimeout(setTimeout(run, d)));
		const iv = this._trackInterval(setInterval(run, 1500));
		this._trackTimeout(setTimeout(() => clearInterval(iv), 20000));
		try {
			const obs = new MutationObserver((mutations) => {
				for (const m of mutations || []) {
					if ((m.addedNodes && m.addedNodes.length) || (m.removedNodes && m.removedNodes.length)) {
						run();
						break;
					}
				}
			});
			obs.observe(document.body, { childList: true, subtree: true });
			this._trackObserver(obs);
			// Keep observer active for record navigation after initial page load.
		} catch (_) {}
	}

	_getDocumentsToScan() {
		const docs = [document];
		try { document.querySelectorAll('iframe').forEach(f => { try { if (f.contentDocument?.body) docs.push(f.contentDocument); } catch (_) {} }); } catch (_) {}
		return docs;
	}

	_queryAll(selector, root) {
		const r = root || document, out = [];
		try {
			out.push(...r.querySelectorAll(selector));
			const walk = node => { if (!node || node.nodeType !== 1) return; if (node.shadowRoot) { out.push(...node.shadowRoot.querySelectorAll(selector)); node.shadowRoot.querySelectorAll('*').forEach(walk); } for (const c of node.children || []) walk(c); };
			walk(r.body || r);
		} catch (_) {}
		return out;
	}

	// ── Phase 3: improved row finder — no interactive-control dependency ──────
	_findPropertyRow(el, docBody) {
		const body = docBody || document.body;
		// The matched element itself may already be the row
		if (el !== body && el.children.length >= 2 && el.children.length <= 8) return el;
		let node = el.parentElement;
		for (let up = 0; up < 10 && node && node !== body; up++) {
			const tag = node.tagName;
			if (tag === 'TR' || tag === 'SECTION' || tag === 'LI') return node;
			// 2–8 children = likely (label, value) pair — not the whole panel
			if (node.children.length >= 2 && node.children.length <= 8) return node;
			node = node.parentElement;
		}
		return null;
	}

	// ── Phase 3: computed-style hidden check ──────────────────────────────────
	_isRowHidden(row, hiddenRows) {
		if (hiddenRows?.has(row)) return true;
		if (row.getAttribute('data-st-hidden-row')) return true;
		try {
			const cs = getComputedStyle(row);
			if (cs.display === 'none' || cs.visibility === 'hidden') return true;
			if (parseFloat(cs.height) === 0 && cs.overflow === 'hidden') return true;
		} catch (_) {}
		return false;
	}

	_scanPropertiesPanel() {
		loadConfig();
		for (const doc of this._getDocumentsToScan()) this._scanPropertiesPanelInDoc(doc);
		if (!document.body?.textContent?.includes('Properties')) document.getElementById('st-hide-style')?.remove();
	}

	_scanPropertiesPanelInDoc(doc) {
		if (!doc?.body?.textContent) return;
		const bt = doc.body.textContent;
		if (!bt.includes('Properties')) return;
		if (bt.includes('Field Visibility') && bt.includes('Custom Labels')) return;

		const inSettings = el => {
			let p = el; const top = (el.getRootNode ? el.getRootNode() : doc).body || doc.documentElement;
			for (let i = 0; i < 20 && p && p !== top; i++, p = p.parentElement) { const t = (p.textContent || '').slice(0, 200); if (t.includes('Field Visibility') || t.includes('Custom Labels') || t.includes('Supertypes Settings')) return true; }
			return false;
		};

		const normalizeTypeText = (text) => (text || '').trim().replace(/^#/, '').toLowerCase();

		// Build lookup maps from all types including custom
		const typeSlugMap = Object.fromEntries(ALL_TYPES.map(id => [SUPERTYPE_CONFIG[id]?.label, id]).filter(([l]) => l));
		const typeNameMap = Object.fromEntries(ALL_TYPES.map(id => { const s = SUPERTYPE_CONFIG[id]?.label?.replace('#', ''); return s ? [s.charAt(0).toUpperCase() + s.slice(1), id] : null; }).filter(Boolean));
		const typeIdMap = Object.fromEntries(ALL_TYPES.map(id => [String(id).toLowerCase(), id]));

		let currentType = null;
		// Prefer SDK-derived active record type (more reliable than DOM text scanning).
		try {
			const activeType = this.ui?.getActivePanel?.()?.getActiveRecord?.()?.prop?.('Type')?.choice?.();
			const normalizedActiveType = normalizeTypeText(activeType);
			if (normalizedActiveType && typeIdMap[normalizedActiveType]) currentType = typeIdMap[normalizedActiveType];
		} catch (_) {}

		for (const s of this._queryAll('span', doc)) {
			if (currentType) break;
			if (inSettings(s)) continue;
			const t = (s.textContent || '').trim();
			if (typeSlugMap[t]) { currentType = typeSlugMap[t]; break; }
			const normalized = normalizeTypeText(t);
			if (typeIdMap[normalized]) { currentType = typeIdMap[normalized]; break; }
		}
		if (!currentType) {
			for (const n of this._queryAll('*', doc)) {
				if (inSettings(n)) continue;
				const t = (n.textContent || '').trim();
				if (typeNameMap[t] && n.children.length <= 3 && !n.querySelector('table,ul,ol')) { currentType = typeNameMap[t]; break; }
				const normalized = normalizeTypeText(t);
				if (typeIdMap[normalized] && n.children.length <= 3 && !n.querySelector('table,ul,ol')) { currentType = typeIdMap[normalized]; break; }
			}
		}
		if (!currentType) {
			doc.getElementById('st-hide-style')?.remove();
			return;
		}

		const allIds = new Set([...Object.keys(DEFAULT_FIELD_TYPES), ...(this.getConfiguration().fields || []).filter(f => f.active !== false).map(f => f.id).filter(id => !SYSTEM_FIELD_IDS.has(id))]);
		const toHide = [...allIds].filter(fid => !isFieldVisible(fid, currentType));

		if (!toHide.length) { doc.getElementById('st-hide-style')?.remove(); this._sortPropertiesPanelInDoc(doc, new Set()); return; }

		const fd = f => f.replace(/_/g, '-');
		const sel = f => { const d = fd(f); return `[data-field-id="${f}"],[data-field-id="${d}"],[data-prop-id="${f}"],[data-prop-id="${d}"],[data-field="${f}"],[data-field="${d}"],[data-property-id="${f}"],[data-property-id="${d}"]`; };

		let styleEl = doc.getElementById('st-hide-style');
		if (!styleEl) { styleEl = doc.createElement('style'); styleEl.id = 'st-hide-style'; (doc.head || doc.documentElement).appendChild(styleEl); }
		styleEl.textContent = toHide.map(fid => { const s = sel(fid), fs = `[data-field-id="${fid}"]`; return `${s},tr:has(${fs}),[role="row"]:has(${fs}){display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;overflow:hidden!important;margin:0!important;padding:0!important;border:none!important;}`; }).join('\n');

		const hiddenRows = new Set(), docBody = doc.body, docEl = doc.documentElement;
		const hideRow = row => { hiddenRows.add(row); _applyHideStyles(row); };

		for (const fid of toHide) { for (const el of this._queryAll(sel(fid), doc)) { if (inSettings(el)) continue; const row = this._findPropertyRow(el, docBody); if (row && row !== docBody && row !== docEl && !inSettings(row) && !hiddenRows.has(row)) hideRow(row); } }

		const fc = (this.getConfiguration().fields || []).filter(f => f.active !== false);
		const fil = Object.fromEntries(fc.map(f => [f.id, f.label]));
		const roots = [docBody]; const cr = n => { if (!n || n.nodeType !== 1) return; if (n.shadowRoot) { roots.push(n.shadowRoot); cr(n.shadowRoot); } for (const c of n.children || []) cr(c); }; cr(docBody);
		for (const fid of toHide) {
			const label = getFieldLabel(fid, fil[fid] || fid); if (!label) continue;
			const found = []; const visit = n => { if (!n || n.nodeType !== 1 || inSettings(n)) return; if ((n.textContent || '').trim() === label && n.children.length <= 2) found.push(n); for (const c of n.children || []) visit(c); if (n.shadowRoot) visit(n.shadowRoot); }; roots.forEach(r => visit(r));
			for (const el of found) { const row = this._findPropertyRow(el, docBody); if (row && row !== docBody && row !== docEl && !inSettings(row) && !hiddenRows.has(row)) hideRow(row); }
		}
		this._sortPropertiesPanelInDoc(doc, hiddenRows);
	}

	_sortPropertiesPanelInDoc(doc, hiddenRows) {
		if (!doc?.body) return;
		const fc = (this.getConfiguration().fields || []).filter(f => f.active !== false);
		const fil = Object.fromEntries(fc.map(f => [f.id, f.label]));
		const fit = Object.fromEntries(fc.map(f => [f.id, f.type]));
		const docBody = doc.body;

		const inSettings = el => { let p = el; const top = docBody; for (let i = 0; i < 20 && p && p !== top; i++, p = p.parentElement) { const t = (p.textContent || '').slice(0, 200); if (t.includes('Field Visibility') || t.includes('Custom Labels') || t.includes('Supertypes Settings')) return true; } return false; };
		const fd = f => f.replace(/_/g, '-');
		const sel = f => { const d = fd(f); return `[data-field-id="${f}"],[data-field-id="${d}"],[data-prop-id="${f}"],[data-prop-id="${d}"],[data-field="${f}"],[data-field="${d}"],[data-property-id="${f}"],[data-property-id="${d}"]`; };

		const allIds = [...new Set([...[...SYSTEM_FIELD_IDS], ...Object.keys(DEFAULT_FIELD_TYPES), ...fc.map(f => f.id)])];
		const seen = new Set(), rows = [];

		// Pass 1: data-attribute selectors
		for (const fid of allIds) {
			const label = getFieldLabel(fid, fil[fid] || fid), ic = FIELD_ICONS[fid] || FIELD_TYPE_ICONS[fit[fid]] || 'ti-point';
			for (const el of this._queryAll(sel(fid), doc)) {
				if (inSettings(el)) continue;
				const row = this._findPropertyRow(el, docBody);
				if (!row || seen.has(row) || this._isRowHidden(row, hiddenRows)) continue;
				seen.add(row); rows.push({ label, row, parent: row.parentElement, fid, ic });
			}
		}
		// Pass 2: label text fallback
		const labelEntries = [...Object.entries(FIELD_LABEL_TO_ID), ...fc.filter(f => !SYSTEM_FIELD_IDS.has(f.id)).map(f => [f.label, f.id])];
		const vl = (n, lt, fid, ic) => { if (!n || n.nodeType !== 1 || inSettings(n)) return; if ((n.textContent || '').trim() === lt && n.children.length <= 2) { const row = this._findPropertyRow(n, docBody); if (row && !seen.has(row) && !this._isRowHidden(row, hiddenRows)) { seen.add(row); rows.push({ label: lt, row, parent: row.parentElement, fid, ic }); } } for (const c of n.children || []) vl(c, lt, fid, ic); if (n.shadowRoot) vl(n.shadowRoot, lt, fid, ic); };
		for (const [lt, fid] of labelEntries) vl(docBody, getFieldLabel(fid, lt), fid, FIELD_ICONS[fid] || FIELD_TYPE_ICONS[fit[fid]] || 'ti-point');

		for (const { row, ic, label } of rows) this._injectFieldIcon(row, ic, label, doc);
		if (rows.length < 2) return;

		const byParent = new Map();
		for (const item of rows) { if (!item.parent) continue; if (!byParent.has(item.parent)) byParent.set(item.parent, []); byParent.get(item.parent).push(item); }
		for (const [parent, items] of byParent) {
			if (items.length < 2) continue;
			const sorted = [...items].sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
			const dom    = [...items].sort((a, b) => (a.row.compareDocumentPosition(b.row) & 4) ? -1 : 1);
			if (sorted.every((item, i) => item.row === dom[i].row)) continue;
			const anchor = doc.createElement('span'); anchor.setAttribute('data-st-sort-anchor', '');
			parent.insertBefore(anchor, dom[0].row); for (const { row } of sorted) parent.insertBefore(row, anchor); anchor.remove();
		}
	}

	_findLabelEl(row, labelText) {
		const s = ['[class*="label"]','[class*="Label"]','[class*="prop-name"]','[class*="field-name"]','[class*="property-name"]','[class*="PropertyName"]','[class*="FieldLabel"]','[class*="fieldLabel"]'].join(',');
		const bc = row.querySelector(s); if (bc && !bc.querySelector('input,select,textarea,[contenteditable]')) return bc;
		const td = row.querySelector('td:first-child'); if (td && !td.querySelector('input,select,textarea,[contenteditable]')) return td;
		for (const child of row.children) { if (child.querySelector('input,select,textarea,[contenteditable]')) continue; const t = (child.textContent || '').trim(); if (!labelText || t === labelText || (t.length < 80 && !t.includes('\n'))) return child; }
		return null;
	}

	_injectFieldIcon(row, iconClass, label, doc) {
		if (!row || row.querySelector('[data-st-icon]')) return;
		const labelEl = this._findLabelEl(row, label); if (!labelEl) return;
		const icon = doc.createElement('i'); icon.setAttribute('data-st-icon', iconClass); icon.className = `ti ${iconClass}`;
		labelEl.insertBefore(icon, labelEl.firstChild);
	}
}