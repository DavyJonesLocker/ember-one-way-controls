# {{one-way-input}}

### Basics

The basic invocation of the component looks like:

```hbs
{{one-way-input value update=(action (mut value))}}
```

This will render an `<input>` element of which the value will be `value`. When
a user starts typing in the input `value` will automatically be updated. You can
of course also pass in any other type of action, including string actions.

The examples here pass the `value` attribute as a positional parameter, but you
can also pass `value` as an ordinary parameter:

```hbs
{{one-way-input value=value update=(action (mut value))}}
```

### HTML5 input types

You can set the `type` attribute on the component to change the type of the
one-way-input component.

```hbs
{{one-way-input user.email type="email" update=(action (mut user.email))}}
```

The `{{one-way-input}}` has also been subclassed into a named component for each
type of text like input. (`{{one-way-text}}`, `{{one-way-number}}`,
`{{one-way-search}}`, etc.)

### Input element attributes

The one-way-input component supports binding all attributes an `<input>` element
can have.

An example:

```hbs
{{one-way-input questionaire.question10
    update=(action (mut questionaire.question10))
    placeholder="Enter your answer here"
    name="questionaire[question-10]"
    required=true
    spellcheck=true
    data-validate=true
}}
```

### Listening for keyboard events

The `keyEvents` attribute accepts a hash of which the keys resemble
[`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)'s
from the `KeyboardEvent`. The values of that hash should be actions that handle
that specific `KeyboardEvent`.

For example, if you would want to handle when the user presses enter or escape:

```hbs
{{one-way-input value
    update=(action (mut value))
    keyEvents=(hash
      13=(action "onEnter")
      27=(action "onEscape")
    )
}}
```

If you are working on an app that is before Ember version 2.3, then you can
install the ([ember-hash-helper-polyfill](https://github.com/cibernox/ember-hash-helper-polyfill)).

### Sanitizing the input

If you want to sanitize the input of a certain input, you can do that with the
update action.

You can for example filter out anything other then numbers for a credit card
input:

```js
actions: {
  sanitizeCreditCardNumber(ccNumber) {
    set(this, 'creditCard.number', ccNumber.replace(/[^\d]/g, ''));
  }
}
```
