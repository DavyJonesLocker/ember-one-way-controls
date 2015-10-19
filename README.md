# ember-one-way-input [![Build Status](https://travis-ci.org/dockyard/ember-one-way-input.svg?branch=master)](https://travis-ci.org/dockyard/ember-one-way-input)
*Credit: @rwjblue's [twiddle](https://gist.github.com/rwjblue/2d7246875098d0dbb4a4)*

Demo: http://ember-twiddle.com/2d7246875098d0dbb4a4

This addon provides a simple one way input that sends an `update` action when it is updated, and can be used like any other input.

```hbs
  {{one-way-input
      value=currentValue
      update=(action (mut currentValue))
  }}
```

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
