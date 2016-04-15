# {{one-way-select}}

### Basics

The basic invocation of the component looks like:

```hbs
{{one-way-select selectedValue
    options=options
    update=(action (mut selectedValue))
}}
```

This will render a `<select>` element with options taken from the `options`
parameter and if the options contain `selectedValue`, then that option will be
marked as selected.

The `options` parameter can either be an array or a string of words separated by
spaces.

The action passed to the `update` parameter will be called whenever the user
selects an option.

The examples here pass the `value` attribute as a positional parameter, but you
can also pass `value` as an ordinary parameter:

```hbs
{{one-way-select
    value=selectedValue
    options=options
    update=(action (mut selectedValue))
}}
```

### Select element attributes

The one-way-select component supports binding all attributes a `<select>` element
can have.

An example:

```hbs
{{one-way-select selectedValue
    disabled=isDisabled
    tabindex=3
    required=true
    options=options
    update=(action (mut selectedValue))
}}
```

### Adding a blank or prompt option

You can set the `includeBlank` parameter to `true` if you want a blank option as
the first option:

```hbs
{{one-way-select selectedValue
    options=options
    includeBlank=true
    update=(action (mut selectedValue))
}}
```

If you want to have the first option to have a placeholder text you can pass a
string to the prompt parameter instead:

```hbs
{{one-way-select selectedValue
    options=options
    prompt="Please select one:"
    update=(action (mut selectedValue))
}}
```

Set the `promptIsSelectable` to `true` if you want the user to be able to select
the blank/prompt option.

### Working with objects instead of strings

Let's say you have an array filled with instances of the following `user` model:

```js
Model.extend({
  username: attr('string')
  email: attr('string')
});
```

If you want to render a select with all the users with the option's labels being
the username of the user, then you can set the `optionValuePath` and the
`optionLabelPath` parameters with the apropriate values:

```hbs
{{one-way-select selectedUser
    options=users
    optionValuePath="id"
    optionLabelPath="username"
    update=(action (mut selectedUser))
}}
```

### Multiple select

Changing the one-way-select into a multiple select is as easy as setting the
`multiple` parameter to `true`. Please note that value should now be an array of
selected items, instead of just a single item.

```hbs
{{one-way-select selectedUsers
    options=users
    multiple=true
    optionValuePath="id"
    optionLabelPath="username"
    update=(action (mut selectedUsers))
}}
```

### Grouping options

Setting the `groupLabelPath` parameter will cause all options which have the
same value on the given path to be grouped in an `<optgroup>` element. The label
of the `<optgroup>` element will be the value of the given path.

```hbs
{{one-way-select selectedCity
    options=cities
    optionValuePath="id"
    optionLabelPath="name"
    groupLabelPath="state"
    update=(action (mut selectedCity))
}}
```

Optionally you can pass the options pre-grouped, the options then need to adhere
to the following structure:

```js
[
  {
    groupName: 'Trappist',
    options: [
      { id: 1, label: 'Dubbel', type: 'Trappist' },
      { id: 2, label: 'Tripel', type: 'Trappist' }
    ]
  },
  {
    groupName: 'IPA',
    options: [
      { id: 3, label: 'IPA', type: 'IPA' }
    ]
  }
]
```
