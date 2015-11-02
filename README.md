# ember-one-way-input [![Build Status](https://travis-ci.org/dockyard/ember-one-way-input.svg?branch=master)](https://travis-ci.org/dockyard/ember-one-way-input) [![npm version](https://badge.fury.io/js/ember-one-way-input.svg)](https://badge.fury.io/js/ember-one-way-input)
*Credit: @rwjblue's [twiddle](https://gist.github.com/rwjblue/2d7246875098d0dbb4a4)*

Demo: http://ember-twiddle.com/2d7246875098d0dbb4a4

This addon provides a simple one way input that sends an `update` action when it is updated, and can be used like any other input.

```hbs
  {{one-way-input
      value=currentValue
      update=(action (mut currentValue))
  }}
```

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

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
