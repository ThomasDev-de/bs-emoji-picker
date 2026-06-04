# Changelog

All notable changes to this project will be documented in this file.

## [2.0.2] - 2026-06-04

### Added
- Massive expansion of the emoji collection across all categories (hundreds of new emojis).
- New "Recently Used" (History) category that automatically tracks used emojis (stored in localStorage).
- Tab-based navigation in the dropdown for quick access to categories (WhatsApp style).
- Search functionality within the dropdown.
- Debug logging system for troubleshooting scroll and interaction issues.

### Changed
- Improved dropdown UI: Sticky headers and tab navigation for better overview.
- Switched category display to a long scrollable list with anchor-link tabs.
- Optimized scroll synchronization: Active tabs now update reliably while scrolling.
- Refactored event handling to prevent unwanted dropdown closing when interacting with navigation elements.
- Limit "Recently Used" emojis to the last 20 entries.
- **Improved History:** Selecting an emoji already in the history now moves it to the front of the list.

### Fixed
- Fixed an issue where the dropdown would sometimes not close until the second click on an emoji.
- Fixed dropdown closing issue specifically for emojis selected from categories when they also exist in the history.
- Fixed dropdown closing issue specifically for emojis selected from the "Recently Used" history.
- Fixed a remaining issue where emojis clicked from the history or certain categories didn't reliably close the dropdown.
- Fixed dropdown closing issues on tab clicks and search interaction.
- Fixed scroll-to-category logic for sticky headers (especially when scrolling upwards).
- Fixed `TypeError` when loading/filtering the emoji history.
- Fixed history refresh issue (now updates every time the dropdown opens).

## [2.0.1]

### Added
- Integrated basic search functionality.
- Initial implementation of category grouping.

## [2.0.0]

### Changed
- Refactored the internal emoji architecture for better maintainability and extensibility.
- Replaced the old regex-only category map with a split data model:
  - `emojiData` for picker/display data
  - `shortcodeMap` generation for `:shortcode:` replacements
  - `asciiMap` for classic ASCII emoticons such as `:)`, `:D`, and `<3`
- Improved shortcode handling to use direct lookup instead of large numbers of individual regex rules.
- Updated dropdown rendering to use real shortcode metadata instead of raw regex source strings.
- Improved emoji search in the picker by searching actual shortcode names rather than regex patterns.
- Simplified and cleaned up emoji grouping logic for dropdown categories.
- Updated the public API structure to better separate text, HTML, and DOM emoji conversion flows.

### Added
- Added automatic shortcode lookup generation from emoji category data.
- Added support for cleaner shortcode tooltips in the picker, for example `:heart:` instead of regex expressions.
- Added a search input inside the emoji dropdown.
- Added helper methods for rebuilding and retrieving the shortcode lookup map:
  - `$.bsEmojiPicker.rebuildShortcodeMap()`
  - `$.bsEmojiPicker.getShortcodeMap()`
- Added `$.bsEmojiPicker.emojifyText()` as an explicit text-only conversion method.
- Added picker rebuild support via:
  - `$('#element').bsEmojiPicker('rebuild')`
- Added dropdown filtering support via:
  - `$('#element').bsEmojiPicker('search', query)`

### Improved
- Improved maintainability when adding new emojis or shortcodes.
- Improved picker usability by showing human-readable shortcode aliases in button titles.
- Improved duplicate handling for emojis that share multiple shortcodes.
- Improved internal cache handling for shortcode generation.
- Improved demo emoji generation by collecting unique emojis from both structured emoji data and ASCII replacements.

### Fixed
- Fixed structural issues caused by using one data source for both picker rendering and text replacement.
- Fixed dropdown metadata showing regex source text instead of user-friendly shortcode values.
- Fixed several shortcode collision and maintenance issues caused by the previous regex-heavy design.
- Fixed extensibility problems when adding multiple aliases for the same emoji.

### Notes
- This release includes breaking internal changes and is therefore published as **2.0.0**.
- If you previously extended `$.bsEmojiPicker.map`, you must migrate custom entries to the new structure:
  - `$.bsEmojiPicker.emojiData`
  - `$.bsEmojiPicker.asciiMap`
- If custom emoji data is added at runtime, rebuild the shortcode cache with:
  - `$.bsEmojiPicker.rebuildShortcodeMap()`

## [1.0.1]
- improved DOM parsing support
- restored `emojify()` dispatcher for strings, HTML, DOM, and jQuery objects
- added `contenteditable` support

## [1.0.0]
- initial public plugin version
