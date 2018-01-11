# DEPRECATED: ember-one-way-controls

**[ember-one-way-controls was built by DockYard, contact us for expert Ember.js consulting](https://dockyard.com/ember-consulting)**.

This project has been deprecated. When Ember 1.13 came out it became possible to
use the native `<input>` element with one-way bindings. Unfortunately, that
version contained a bug that made the cursor jump to the end of the text in the
input. This addon was built to correct that bug.

That bug has since been fixed in Ember 2.3.1. In the meantime, we had added
some other form components to the addon, like a radio component, a textarea
component and a select component. This kept the addon useful to us for a while.

Recently we started noticing that we only really needed the select component
from this addon. This made us decide to extract this component to its own
addon and deprecate this addon.

The new addon is called [ember-one-way-select](https://github.com/DockYard/ember-one-way-select).

You can find the README of the old version [here](https://github.com/DockYard/ember-one-way-controls/blob/1e57a70bba221999a8cf7439c1a34a46a86d67b2/README.md).

## Migrating

### one-way-input

```hbs
{{! old }}
{{one-way-input myValue update=(action (mut myValue))}}

{{! new }}
<input value={{myValue}} oninput={{action (mut myValue) value="target.value"}}>
```

### one-way-textarea

```hbs
{{! old }}
{{one-way-textarea myValue update=(action (mut myValue))}}

{{! new }}
<textarea value={{myValue}} oninput={{action (mut myValue) value="target.value"}}></textarea>
```

### one-way-checkbox

```hbs
{{! old }}
{{one-way-checkbox myValue update=(action (mut myValue))}}

{{! new }}
<input type="checkbox" checked={{myValue}} onclick={{action (mut myValue) value="target.checked"}}>
```

### one-way-radio

```hbs
{{! old }}
{{one-way-radio myValue option=myOption update=(action (mut myValue))}}

{{! new }}
<input type="radio" checked={{eq myValue myOption}} onclick={{action (mut myValue) myOption}}>
```

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
