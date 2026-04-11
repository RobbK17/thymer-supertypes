# Supertypes

A collection plugin for [Thymer](https://thymer.com) that adds typed records with coloured badges, per-type field visibility, automatic status and priority defaults, field icons, and a full Settings UI.

---

## Version

Current version: `1.0.1`

### 1.0.1 changes

- Improved scan performance with coalesced scheduling and reduced redundant config parsing.
- Improved reliability when switching between records so field visibility stays in sync with the active type.
- Updated observer/scheduling behavior to reduce drift in properties visibility after navigation.

---

## Installation (Collection Plugin)

1. In your Thymer workspace, open the collection you want this plugin to enhance.
2. Create/add a new **Collection Plugin**.
3. Set the plugin manifest/metadata from this repo's `collection-plugin.json`.
4. Set the plugin implementation code from this repo's `collection-plugin.js`.
5. Save and enable the plugin, then reload the collection page.
6. Open the collection sidebar and use the **Supertypes / Types** button to access the Settings UI.

---

## Built-in types

Seven types are included out of the box. Each renders as a coloured monospace badge on every record.

| Badge | ID | Default status | Default priority |
|---|---|---|---|
| `#task` | `task` | todo | medium |
| `#person` | `person` | active | — |
| `#project` | `project` | planning | medium |
| `#meeting` | `meeting` | todo | — |
| `#note` | `note` | active | — |
| `#idea` | `idea` | raw | — |
| `#resource` | `resource` | active | — |

Built-in types are read-only — they cannot be edited or deleted.

---

## Field visibility

Each field in your collection can be shown or hidden per type. The defaults are:

| Field | Visible for |
|---|---|
| Status | all types |
| Priority | task, project |
| Due Date | task, project |
| Meeting Date | meeting |
| Role | person |
| Email | person |
| Company | person |
| Phone | person |
| URL | resource |
| Source | note, idea, resource |
| Attendees | meeting |

When a record's Type is set, any fields not configured for that type are automatically hidden on the record page. Fields marked as inactive in your Thymer collection are excluded entirely.

---

## Automatic defaults

When a record is created, the plugin sets its Type to `note` if no type is assigned. When the Type is changed, the plugin applies the default status and priority for that type (without overwriting values the user has already set for status; priority is only set if blank).

---

## Field icons

Icons from the [Tabler Icons](https://tabler-icons.io) library are injected next to field labels on record pages. The icon set is loaded from the Tabler CDN automatically on first load.

---

## Settings

Open Settings from the Supertypes navigation button. Settings has three tabs.

### Types tab

Shows all built-in types as read-only cards and any custom types you have created with Edit and Delete controls.

**To add a custom type:**
1. Click **+ Add type**
2. Enter a name — the slug is generated automatically (e.g. `Client` → `#client`)
3. Pick a colour from the 12-swatch palette
4. Optionally select an icon
5. Set a default status and default priority
6. Choose which fields are visible for this type
7. Click **Add type**

> **⚠️ Important — Type dropdown not updated automatically**
>
> This is a fundamental limitation, not a bug in the plugin. The Type field's dropdown choices are owned by Thymer's collection configuration — the plugin has no API to add or modify field choices. It can only read them and render badges over the top.
>
> When you add a custom type in Settings, the plugin stores it in `localStorage` and knows how to render its badge — but Thymer's Type dropdown has no idea it exists because that list of choices lives in Thymer, not the plugin.
>
> **What you have to do manually in Thymer:**
> 1. Open your collection's field settings in Thymer
> 2. Find the **Type** field
> 3. Add a new choice with the exact same slug the plugin generated (e.g. if you named it "Client", the slug would be `client`)
> 4. Once that choice exists in Thymer, the plugin will render it as a badge automatically
>
> The slug to use is shown as the badge label minus the `#` — so `#client` → add choice `client` in Thymer.

### Fields tab

A visibility matrix — rows are fields, columns are types. Check a cell to show that field for that type; uncheck to hide it. Includes both built-in and custom types. Click **Save Changes** to persist.

**Adding a custom property:**

The plugin reads fields directly from your Thymer collection, so a custom property must be created in Thymer first before it can be managed here.

1. Go to your collection in Thymer and open **Settings → Properties**
2. Add a new property with your desired name and type (text, number, date, etc.)
3. Return to the Supertypes **Fields tab** — the new property will now appear as a row in the matrix
4. Check the types you want the property to be visible for, then click **Save Changes**

> Any property not checked for a given type will be automatically hidden when a record of that type is open.

### Labels tab

Override the display name of any field. Leave blank to use the default label from Thymer. Click **Save Changes** to persist.

---

## Types count button

A **Types** navigation button in the collection sidebar opens a summary toaster showing the count of records per type and the total.

---

## Config export and import

At the bottom of any Settings tab there are **Export config** and **Import config** buttons. Exporting saves a `supertypes-config.json` file containing all field visibility, label overrides, and custom types. Importing replaces the current config from a previously exported file — useful for backing up settings or moving them to another collection.

---

## Config storage

All settings are stored in `localStorage` under the key `thymer_supertypes_config`. Clicking **Reset to Defaults** clears this key and restores the original built-in field visibility, removes all custom types and label overrides.

---

## Technical notes

- Requires the Thymer collection plugin API (`CollectionPlugin` base class)
- Tabler Icons webfont loaded from `https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css`
- Field hide/show uses Thymer render hooks on record pages; for the Properties panel it uses scheduled scans at 100 ms, 500 ms, 1.2 s, and 2.5 s, then every 1.5 s for 20 seconds, plus a coalesced `MutationObserver` that remains active for record navigation updates
- Fields with `active: false` in `getConfiguration().fields` are treated as archived and excluded from all plugin UI and logic
- The `summary` and `icon` system fields are hidden from Settings UI but not from record pages