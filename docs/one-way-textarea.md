# {{one-way-textarea}}

### Basics

The basic invocation of the component looks like:

```hbs
{{one-way-textarea value update=(action (mut value))}}
```

This will render an `<textarea>` element of which the value will be `value`. When
a user starts typing in the textarea `value` will automatically be updated. You can
of course also pass in any other type of action, including string actions.

The examples here pass the `value` attribute as a positional parameter, but you
can also pass `value` as an ordinary parameter:

```hbs
{{one-way-textarea value=value update=(action (mut value))}}
```

### Additional options

The one-way-textarea extends from the one-way-input component, please refer to
the [one-way-input documentation](https://github.com/DockYard/ember-one-way-controls/blob/master/docs/one-way-input.md)
for additional options.
