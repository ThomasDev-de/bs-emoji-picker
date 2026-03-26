# bs-emoji-picker

A Bootstrap 5 compatible emoji picker for **jQuery**, with support for:

- `input`
- `textarea`
- `contenteditable="true"` elements
- parsing emoji shortcodes in plain text
- parsing/replacing shortcodes in HTML and DOM nodes
- inserting emojis at the current caret position

It is designed as a lightweight plugin that adds a Bootstrap dropdown-based emoji picker and exposes utility methods for shortcode-to-emoji conversion.

---

## Features

- Bootstrap 5 dropdown based UI
- Works with jQuery 3+
- Inserts emojis into:
  - text inputs
  - textareas
  - `contenteditable` editors
- Converts classic emoticons like `:-)` and shortcodes like `:heart:`
- DOM parsing helpers for existing content
- Customizable category labels
- Click callback for selected emojis
- Can be used as:
  - UI picker plugin
  - text parser
  - DOM/HTML emojifier

---

## Requirements

- Bootstrap 5+
- Bootstrap Icons 1+
- jQuery 3+

---

## Installation

### Composer

```bash
composer require webcito/bs-emoji-picker
```

### Manual

Copy the plugin file into your project, for example:

```text
dist/bs-emoji-picker.js
```

Then include the required dependencies.

---

## Include Assets

```html
<link href="vendor/twbs/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

<script src="vendor/components/jquery/jquery.min.js"></script>
<script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="dist/bs-emoji-picker.js"></script>
```

---

## Basic Setup

### Markup

```html
<div class="emoji-picker"></div>
<textarea id="myTextarea" class="form-control"></textarea>
```

### Initialization

```javascript
$('.emoji-picker').bsEmojiPicker({
    targetInput: '#myTextarea'
});
```

---

## Use With `contenteditable`

The plugin also supports editable DOM nodes such as rich text editors based on `contenteditable="true"`.

### Markup

```html
<div id="editor" class="form-control" contenteditable="true" style="min-height: 120px;"></div>
<div class="emoji-picker-editor"></div>
```

### Initialization

```javascript
$('.emoji-picker-editor').bsEmojiPicker({
    targetInput: '#editor'
});
```

### Notes for `contenteditable`

- Emojis are inserted at the current caret position
- Shortcodes can be converted on input/paste
- Complex nested HTML editors may behave differently depending on browser selection handling
- For best results, use simple text-oriented editable containers

---

## Quick Examples

### 1. Insert emojis into a textarea

```html
<div id="picker1"></div>
<textarea id="message" class="form-control"></textarea>

<script>
$('#picker1').bsEmojiPicker({
    targetInput: '#message'
});
</script>
```

### 2. Insert emojis into a contenteditable editor

```html
<div id="editor" contenteditable="true" class="form-control"></div>
<div id="picker2"></div>

<script>
$('#picker2').bsEmojiPicker({
    targetInput: '#editor'
});
</script>
```

### 3. Customize labels

```javascript
$('#picker1').bsEmojiPicker({
    targetInput: '#message',
    labels: {
        classics: 'Classic Emojis',
        heartsAndLove: 'Love',
        handsAndGestures: 'Hands'
    }
});
```

### 4. React when an emoji is clicked

```javascript
$('#picker1').bsEmojiPicker({
    targetInput: '#message',
    onClickEmoji(emoji) {
        console.log('Selected emoji:', emoji);
        return emoji;
    }
});
```

---

## Usage

## Initialize the picker

```javascript
$('.emoji-picker').bsEmojiPicker({
    btnClass: 'btn btn-outline-secondary',
    btnText: '<i class="bi bi-emoji-smile"></i>',
    btnIconClass: 'bi bi-emoji-smile',
    btnShowToggle: false,
    targetInput: '#myTextarea',
    labels: {
        classics: "Classics",
        slackDiscordFaces: "Slack/Discord Faces",
        heartsAndLove: "Hearts & Love",
        handsAndGestures: "Hands & Gestures",
        symbolsAndObjects: "Symbols & Objects",
        animalsAndNature: "Animals & Nature",
        foodAndDrink: "Food & Drink",
        activitiesAndSports: "Activities & Sports",
        travelAndPlaces: "Travel & Places",
        weatherAndNatureExtras: "Weather & Nature (Extra)",
        plantsAndFlowers: "Plants & Flowers",
        techAndObjectsExtra: "Tech & Objects (Extra)",
        uiSymbolsExtra: "UI Symbols",
        communicationAndMedia: "Communication & Media",
        peopleAndEmotionsExtra: "People & Emotions (Extra)",
        flagsBasic: "Flags (Basic)"
    },
    onClickEmoji(emoji) {
        return emoji;
    }
});
```

The plugin creates a Bootstrap dropdown button and inserts the selected emoji into the configured target.

---

## Static Utility Methods

The plugin also exposes global helper methods via `$.bsEmojiPicker`.

### `$.bsEmojiPicker.emojify(input)`

Converts shortcodes/emoticons depending on input type.

Supported input types:

- plain string
- HTML string
- jQuery object
- DOM element
- `NodeList`
- selector string

#### Plain text

```javascript
const output = $.bsEmojiPicker.emojify('Hello <3 :-)');
// "Hello ❤️ 🙂"
```

#### HTML string

```javascript
const html = $.bsEmojiPicker.emojify('<p>Hello <3 :-)</p>');
```

#### DOM / jQuery / selector

```javascript
$.bsEmojiPicker.emojify('#contentWithEmojis');
$.bsEmojiPicker.emojify(document.getElementById('contentWithEmojis'));
$.bsEmojiPicker.emojify($('.message'));
```

---

### `$.bsEmojiPicker.emojifyHtml(html)`

Parses an HTML string and replaces matching shortcode text in text nodes.

```javascript
const html = $.bsEmojiPicker.emojifyHtml('<p>:heart: Hello :-)</p>');
```

---

### `$.bsEmojiPicker.emojifyDom(root)`

Parses existing DOM content and replaces matching text nodes in place.

```javascript
$.bsEmojiPicker.emojifyDom('#chat');
$.bsEmojiPicker.emojifyDom(document.getElementById('chat'));
$.bsEmojiPicker.emojifyDom($('.chat-message'));
```

---

### `$.bsEmojiPicker.emojifyElement(target)`

Parses a specific editable target element.

Useful for:

- `input`
- `textarea`
- `contenteditable`

```javascript
$.bsEmojiPicker.emojifyElement($('#editor'));
$.bsEmojiPicker.emojifyElement($('#myTextarea'));
```

---

### `$.bsEmojiPicker.isOnlyEmoji(text)`

Returns `true` when the given string contains only emoji characters (ignoring whitespace).

```javascript
$.bsEmojiPicker.isOnlyEmoji('😀 😀');
// true

$.bsEmojiPicker.isOnlyEmoji('😀 hello');
// false
```

---

### `$.bsEmojiPicker.showDemo($wrapper, count, time)`

Creates a simple emoji demo background effect.

```javascript
$.bsEmojiPicker.showDemo($('#demoArea'), 50, 200);
```

Parameters:

- `$wrapper`: jQuery target
- `count`: number of emoji elements to create
- `time`: interval in milliseconds

---

## jQuery Plugin Methods

## Initialize

```javascript
$('.emoji-picker').bsEmojiPicker({
    targetInput: '#myTextarea'
});
```

## Call internal methods

If needed, methods can also be called through the jQuery plugin entry point.

```javascript
$('.emoji-picker').bsEmojiPicker('fillDropdown');
```

> Only use method calls if you know the plugin internals. For most use cases, initialization plus the global helpers are sufficient.

---

## Configuration Options

Default configuration:

```javascript
{
    btnClass: 'btn btn-outline-secondary',
    btnIconClass: 'bi bi-emoji-smile',
    targetInput: null,
    labels: {
        classics: 'Classics',
        slackDiscordFaces: 'Slack/Discord Faces',
        heartsAndLove: 'Hearts & Love',
        handsAndGestures: 'Hands & Gestures',
        symbolsAndObjects: 'Symbols & Objects',
        animalsAndNature: 'Animals & Nature',
        foodAndDrink: 'Food & Drink',
        activitiesAndSports: 'Activities & Sports',
        travelAndPlaces: 'Travel & Places',
        weatherAndNatureExtras: 'Weather & Nature',
        plantsAndFlowers: 'Plants & Flowers',
        techAndObjectsExtra: 'Tech & Objects',
        uiSymbolsExtra: 'UI Symbols',
        communicationAndMedia: 'Communication & Media',
        peopleAndEmotionsExtra: 'People & Emotions',
        flagsBasic: 'Flags'
    },
    onClickEmoji(emoji) {
        return emoji;
    }
}
```

### Option Reference

#### `targetInput`
Type: `string | Element | jQuery`

Target element that receives the selected emoji.

Examples:

```javascript
targetInput: '#myTextarea'
targetInput: '#editor'
targetInput: document.getElementById('editor')
```

Supported target types:

- `input`
- `textarea`
- `contenteditable` element

---

#### `btnClass`
Type: `string`

CSS classes used for the Bootstrap dropdown toggle button.

Example:

```javascript
btnClass: 'btn btn-sm btn-outline-primary'
```

---

#### `btnIconClass`
Type: `string`

CSS classes for the button icon.

Example:

```javascript
btnIconClass: 'bi bi-emoji-laughing'
```

---

#### `labels`
Type: `object`

Allows renaming category headers in the dropdown.

Example:

```javascript
labels: {
    classics: 'Classic Faces',
    foodAndDrink: 'Food',
    flagsBasic: 'Flags'
}
```

---

#### `onClickEmoji(emoji)`
Type: `function`

Callback fired whenever an emoji is clicked.

Example:

```javascript
onClickEmoji(emoji) {
    console.log('Clicked:', emoji);
}
```

---

## Supported Categories

Depending on the configured emoji map, the picker can include categories such as:

- Classics
- Slack/Discord Faces
- Hearts & Love
- Hands & Gestures
- Symbols & Objects
- Animals & Nature
- Food & Drink
- Activities & Sports
- Travel & Places
- Weather & Nature
- Plants & Flowers
- Tech & Objects
- UI Symbols
- Communication & Media
- People & Emotions
- Flags

---

## Supported Input Types

### Text parsing

- plain strings
- HTML strings

### DOM parsing

- selector strings
- DOM elements
- jQuery objects
- `NodeList` / array-like collections

### Editable targets

- `input`
- `textarea`
- `contenteditable="true"`

---

## What Gets Converted

The exact conversion depends on the bundled emoji map.

Typical examples:

```text
:-)           -> 🙂
:D            -> 😁
<3            -> ❤️
</3           -> 💔
:heart:       -> ❤️
:thumbsup:    -> 👍
:rocket:      -> 🚀
:fire:        -> 🔥
:tada:        -> 🎉
:smile:       -> 😄
```

---

## Example: Parse Existing Content

### HTML

```html
<div id="contentWithEmojis">
    Hello :heart: world :-)
</div>

<script>
$.bsEmojiPicker.emojify('#contentWithEmojis');
</script>
```

After parsing, the text content becomes:

```text
Hello ❤️ world 🙂
```

---

## Example: Parse Raw Text Before Rendering

```javascript
const rawMessage = 'Launch successful :rocket: Great job <3';
const parsedMessage = $.bsEmojiPicker.emojify(rawMessage);

$('#output').text(parsedMessage);
```

---

## Example: Parse HTML String Before Inserting Into DOM

```javascript
const html = '<p>Welcome :tada: Let us begin :-)</p>';
const parsedHtml = $.bsEmojiPicker.emojifyHtml(html);

$('#container').html(parsedHtml);
```

---

## Styling

The plugin uses Bootstrap dropdown markup and utility classes.

You can style the picker further with your own CSS.

Example:

```css
.bs-emoji-picker .dropdown-menu {
    border-radius: 0.75rem;
}

.bs-emoji-picker [data-emoji] {
    transition: transform 0.1s ease-in-out;
}

.bs-emoji-picker [data-emoji]:hover {
    transform: scale(1.15);
}
```

---

## Bootstrap Notes

The plugin expects Bootstrap's dropdown JavaScript to be available.

Include:

```html
<script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

Using `bootstrap.bundle.min.js` is recommended because it includes Popper.

---

## Error Handling / Common Pitfalls

### The picker button is visible, but clicking does nothing
Check that:

- Bootstrap JS is loaded
- jQuery is loaded before the plugin
- `targetInput` points to an existing element

### Emojis are not inserted into the editor
Check that:

- the selector in `targetInput` matches exactly one element
- the target is an `input`, `textarea`, or `contenteditable` element
- the target is focusable and not disabled/read-only

### DOM parsing does not change anything
Check that:

- the content really contains matching shortcodes/emoticons
- you are parsing text nodes, not attributes
- the selector passed to `emojify()` or `emojifyDom()` matches an existing node

### `contenteditable` caret behavior feels inconsistent
This depends partly on browser selection APIs and the complexity of your editor markup. Simple text-focused editable areas work best.

---

## Browser Compatibility

The plugin is intended for modern browsers that support:

- jQuery 3+
- Bootstrap 5
- standard DOM Selection and Range APIs
- Unicode emoji rendering

If you need to support older browsers, test carefully, especially for `contenteditable`.

---

## Development Notes

The plugin is split conceptually into:

- picker UI setup
- shortcode/emoticon parsing
- DOM traversal helpers
- editable target insertion logic

If you extend the emoji map, keep in mind:

- overlapping patterns may affect replacement order
- more specific/longer regex patterns should generally win
- duplicate aliases should be reviewed carefully

---

## Demo

See:

```text
demo/index.html
```

for a full usage example.

---

## Changelog

### 1.0.1
- improved DOM parsing support
- restored `emojify()` dispatcher for strings, HTML, DOM, and jQuery objects
- added `contenteditable` support

### 1.0.0
- initial public plugin version

---

## License

MIT

---

## Support / Issues

Issues and source:

```text
https://github.com/webcito/bs-emoji-picker
```