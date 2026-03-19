# supertype-tagger.js (Supertypes Tagger)

`supertype-tagger.js` is an **App plugin** that lets you apply a Supertypes type to the **currently active record** via:

- a command palette command: `Apply Supertype...`
- a status bar item

It also scans the UI for existing `#supertypes`-style hashtags and annotates them for styling.

## Supported Supertypes (built-in + custom)

The tagger loads supertypes from two sources:

1. **Built-in** supertypes
   - `#task`
   - `#person`
   - `#project`
   - `#meeting`
   - `#note`
   - `#idea`
   - `#resource`
2. **User-defined custom types** stored in Supertypes config localStorage under:
   - `thymer_supertypes_config`
   - `custom_types` (array)

If you create custom supertypes in the Supertypes collection, the tagger will pick them up automatically.

## What gets written when you apply a type

When you click a supertype in the picker, the plugin tries to update structured properties first:

1. **Type property**
   - If the active record exposes a `Type` choice property (and it matches a known supertype id), it sets it to the supertype id (e.g. `task`, `person`, etc.).
2. **Tag property (optional)**
   - If a `Tag` (or `tag`) property exists, it sets that field using the hashtag label (for example: `#task`).

If neither `Type` nor `Tag` can be written (i.e. the active record does not expose those properties), the plugin does nothing to the record.

## Note on `Type`

Setting the `Type` attribute on a record does not add new UI features by itself. It mainly enables consistent tag searching behavior across collections that include searchable `Type`/tag fields.

More robust filtering becomes available when the record is actually in the **Supertypes** collection, because the Supertypes plugin can then apply type/status-based filtering (for example via the **All Nodes** tab and collection views).

## How hashtag detection works (scan)

During runtime, the plugin:

- watches the document with a `MutationObserver`
- finds elements containing text that matches `^#(task|person|project|meeting|note|idea|resource)$`
  - plus any custom ids loaded from localStorage
- sets a marker attribute on the element for styling:
  - `data-supertype="<id>"`

## Notes / troubleshooting

- If `Type` is not being set, double-check that the active record actually has a `Type` property exposed by the SDK as a choice property.
- If neither `Type` nor `Tag` exist, nothing is written to the record.

