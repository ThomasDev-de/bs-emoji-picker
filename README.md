# bs-emoji-picker

A Bootstrap 5 compatible emoji picker component that adds a clickable emoji selector to inputs and can parse emoji
shortcodes in text.

## Requirements

- Bootstrap 5+
- Bootstrap Icons 1+
- jQuery 3+

## Installation

```bash
composer require webcito/bs-emoji-picker
```

## Basic Setup

Include required files:

```html
<link href="vendor/twbs/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
<link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="vendor/components/jquery/jquery.min.js"></script>
<script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="dist/bs-emoji-picker.js"></script>
```

## Usage

Add picker and target elements:

```html
<div class="emoji-picker"></div>
<textarea id="myTextarea"></textarea>
```

Initialize the picker:

```javascript
$('.emoji-picker').bsEmojiPicker({
    targetInput: '#myTextarea',
    labels: {
        classics: 'Classic Emojis'
    }
});
```

Parse existing content:

```javascript
$.bsEmojiPicker.emojify('#contentWithEmojis');
```

## Methods

- bsEmojiPicker(options)
    - Initialize picker on element
    - Required option: targetInput

- $.bsEmojiPicker.emojify(selector)
    - Convert emoji shortcodes in content
    - Parameter: CSS selector string

## Configuration Options

```javascript
{
    targetInput: '#inputSelector', // Required
    labels: {
        classics: 'Custom Label'  // Optional category labels
    }
}
```

## Examples

See demo/index.html for complete implementation examples.

## Support

Issues and source: https://github.com/webcito/bs-emoji-picker