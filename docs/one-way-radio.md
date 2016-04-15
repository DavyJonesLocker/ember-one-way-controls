# {{one-way-radio}}

### Basics

The basic invocation of the component looks like:

```hbs
{{one-way-radio selectedGender option="female" update=(action (mut selectedGender))}}
```

This will render an `<input>` element of `type` radio. The radio button will be
checked when the `value` param is equal to the `option` param. When the user
clicks the radio button the update action will be called with the value of the
`option` param.

The examples here pass the `value` attribute as a positional parameter, but you
can also pass `value` as an ordinary parameter:

```hbs
{{one-way-radio value=selectedGender option="female" update=(action (mut selectedGender))}}
```

### Input element attributes

The one-way-radio component supports binding all attributes an `<input>`
element can have.

An example:

```hbs
{{one-way-radio selectedGender
    update=(action (mut selectedGender))
    name="sign_up_form[gender]"
    required=true
    data-validate=true
}}
```
