# ember-one-way-controls ![Download count all time](https://img.shields.io/npm/dt/ember-one-way-controls.svg) [![Build Status](https://travis-ci.org/DockYard/ember-one-way-controls.svg?branch=master)](https://travis-ci.org/DockYard/ember-one-way-controls) [![npm version](https://badge.fury.io/js/ember-one-way-controls.svg)](https://badge.fury.io/js/ember-one-way-controls) [![Ember Observer Score](http://emberobserver.com/badges/ember-one-way-controls.svg)](http://emberobserver.com/addons/ember-one-way-controls)
*Credit: @rwjblue's [twiddle](https://gist.github.com/rwjblue/2d7246875098d0dbb4a4)*

Demo: http://ember-twiddle.com/2d7246875098d0dbb4a4

This addon provides a simple and consistent API to add form controls to your app. Each form control will not update the passed in value(s) directly. Instead it will send the `update` action with the updated value.

```hbs
{{one-way-input value update=(action (mut value))}}

{{one-way-textarea value update=(action (mut value))}}

{{one-way-checkbox checked update=(action (mut checked))}}

{{one-way-radio selected option=option update=(action (mut selected))}}

{{one-way-select selected options=options update=(action (mut selected))}}
```

If you do not know the type of input before hand you could do the following:

```hbs
{{component (concat "one-way-" type) value update=(action (mut value))}}
```

Each of the controls are documented in more detail in their own readme's:
 - [`{{one-way-input}}`](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-input.md)
 - [`{{one-way-textarea}}`](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-textarea.md)
 - [`{{one-way-checkbox}}`](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-checkbox.md)
 - [`{{one-way-radio}}`](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-radio.md)
 - [`{{one-way-select}}`](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-select.md)

## Why?

With Glimmer landing in 1.13.x, native `<input>` elements can now be used in your apps, without the two way binding semantics of the `{{input}}` helper. Shifting to one way bindings ("data down, actions up") makes your app easier to reason about and debug, and is generally the idiomatic way of building Ember apps going forward.

Unfortunately, there is a small gotcha with using a native input like so:

```hbs
<input
  value={{currentValue}}
  oninput={{action (mut currentValue) value="target.value"}}
>
```

In the following [demo](http://jsbin.com/juxedi/edit?output), move your cursor to a character in the middle of the value, and attempt to input new text. You will notice that your cursor immediately jumps to the end of the string, which is entirely unintuitive and annoying.

![](https://i.imgur.com/D0pReSs.jpg)

This addon fixes the cursor jumping issue by using [`readDOMAttr`](http://emberjs.com/api/classes/Ember._MetamorphView.html#method_readDOMAttr), which provides a way to read an element's attribute and update the last value Ember knows about at the same time. This makes setting an attribute idempotent.

__Note:__ The cursor jumping issue has been fixed in Ember since 2.3.1.

## Compatibility

This addon will work on Ember versions `1.13.x` and up.

## Installing the addon

```
ember install ember-one-way-controls
```

## Contributing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
