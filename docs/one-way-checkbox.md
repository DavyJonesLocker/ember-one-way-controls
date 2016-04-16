# {{one-way-checkbox}}

### Basics

The basic invocation of the component looks like:

```hbs
{{one-way-checkbox isChecked update=(action (mut isChecked))}}
```

This will render a `<input>` element of `type` checkbox. The checkbox will
checked or unchecked based on the passed in `checked` param. When the user
ticks/unticks the checkbox the update action will be called.

The examples here pass the `checked` attribute as a positional parameter, but you
can also pass `checked` as an ordinary parameter:

```hbs
{{one-way-checkbox checked=isChecked update=(action (mut isChecked))}}
```

### Input element attributes

The one-way-checkbox component supports binding all attributes an `<input>`
element can have.

An example:

```hbs
{{one-way-checkbox agreedToTermsOfService
    update=(action (mut agreedToTermsOfService))
    name="sign_up_form[terms_of_service]"
    required=true
    data-validate=true
}}
```
