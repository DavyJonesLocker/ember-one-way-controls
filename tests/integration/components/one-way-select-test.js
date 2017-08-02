import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find, fillIn, triggerEvent } from 'ember-native-dom-helpers';

const { Component, String: { htmlSafe } } = Ember;

moduleForComponent('one-way-select', 'Integration | Component | {{one-way-select}}', {
  integration: true,

  setup() {
    this.set('value', 'female');
    this.set('options', ['unknown', 'male', 'female']);
  }
});

test('It renders a select box with options', function(assert) {
  this.render(hbs`
    {{one-way-select value=value options=options}}
  `);
  assert.equal(findAll('option').length, 3, 'Select has three options');
});

test('A value is selected', function(assert) {
  this.render(hbs` {{one-way-select value=value options=options}} `);
  assert.equal([...findAll('option')].find((o) => o.selected).value, 'female', 'Female is selected');
});

test('Value can be the first positional param', function(assert) {
  this.render(hbs`{{one-way-select value options=options}}`);
  assert.equal([...findAll('option')].find((o) => o.selected).value, 'female', 'Female is selected');
});

test('Selecting a value updates the selected value', async function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{one-way-select value=value options=options update=(action 'update')}}`);
  find('select').value = 'male';
  await triggerEvent('select', 'change');
  assert.equal([...findAll('option')].find((o) => o.selected).value, 'male', 'Male is selected');
  assert.equal(this.get('value'), 'male', 'Value is \'male\'');
});

test('Selecting a value updates the selected value for pre-grouped options', async function(assert) {
  let groups = [
    {
      groupName: 'group1',
      options: [ 'value1' ]
    }, {
      groupName: 'group2',
      options: [ 'value2' ]
    }
  ];

  this.set('options', groups);
  this.on('update', (value) => this.set('value', value));

  this.render(hbs`{{one-way-select value=value options=options update=(action 'update')}}`);

  await fillIn('select', 'value2');
  await triggerEvent('select', 'change');

  assert.equal([...findAll('option')].find((o) => o.selected).value, 'value2', 'value2 is selected');
  assert.equal(this.get('value'), 'value2', 'Value is \'value2\'');
});

test('Accepts a space seperated string for options', function(assert) {
  this.render(hbs`{{one-way-select value=value options="male female"}}`);
  assert.equal(findAll('option').length, 2, 'There are two options: male, female');
});

test('Can include a blank value', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options includeBlank=true}}`);
  assert.equal(findAll('option').length, 4, 'There are four options');
});

test('Blank value can be given a text', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options includeBlank="Select one"}}`);
  assert.equal(findAll('option')[0].textContent.trim(), 'Select one', 'The blank option has "Select one" as label');
  assert.ok(findAll('option')[0].disabled, 'The blank option is disabled by default');
});

test('Prompt is an alias for includeBlank', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options prompt="Select one"}}`);
  assert.equal(findAll('option')[0].textContent.trim(), 'Select one', 'The blank option has "Select one" as label');
});

test('Prompt can be given as SafeString', function(assert) {
  this.set('promptSafeString', htmlSafe('Select one'));
  this.render(hbs`{{one-way-select value=value options=options prompt=promptSafeString}}`);
  assert.equal(findAll('option')[0].textContent.trim(), 'Select one', 'The blank option has "Select one" as label');
});

test('With prompt selection still works properly', async function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{one-way-select
    value=value
    options=options
    prompt="Select one"
    update=(action 'update')
  }}`);
  find('select').value = 'male';
  await triggerEvent('select', 'change');
  assert.equal([...findAll('option')].find((o) => o.selected).value, 'male', 'Select options is male');
  assert.equal(this.get('value'), 'male', 'Value us \'male\'');
});

test('Prompt is selected by default', function(assert) {
  this.render(hbs`{{one-way-select options=options prompt="Select one"}}`);
  assert.ok(findAll('option')[0].selected, 'Prompt option is selected');
});

test('Prompt can be selectable', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options prompt="Select one" promptIsSelectable=true}}`);
  assert.notOk(findAll('option')[0].disabled, 'The blank option is enabled');
});

test('Prompt can be hidden', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options prompt="Select one"}}`);
  assert.ok(findAll('option')[0].hidden, 'The blank option is hidden');
});

test('optionValuePath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id"}}`);

  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), '12', 'Options are labeled 1, 2');
  assert.equal([...findAll('option')].find((o) => o.selected).value, 2, 'Selected option is 2');
});

test('optionLabelPath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);

  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), 'malefemale', 'Options are label male, female');
});

test('selected based on optionValuePath', function(assert) {
  this.set('options', [{ id: 1, value: 'male' }, { id: 2, value: 'female' }]);
  this.set('value', { id: 2, value: 'female' });

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);
  assert.equal([...findAll('option')].find((o) => o.selected).value, '2', 'Female is selected');
});

test('selecting with optionValuePath', async function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" update=(action (mut value))}}`);

  await fillIn('select', '1');
  await triggerEvent('select', 'change');

  assert.equal(this.get('value'), male);
});

test('optionTargetPath', async function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female.id);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionTargetPath="id" update=(action (mut value))}}`);

  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), '12', 'Options are labeled 1, 2');
  assert.equal([...findAll('option')].find((o) => o.selected).value, 2, 'Selected option is 2');

  await fillIn('select', '1');
  await triggerEvent('select', 'change');

  assert.equal([...findAll('option')].find((o) => o.selected).value, 1, 'Selected option is 1');
  assert.equal(this.get('value'), male.id);
});

test('guards against undefined options using optionValuePath', function(assert) {
  assert.expect(0);
  this.set('options', [undefined]);
  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);
});

test('groupLabelPath', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];
  this.set('value', saison);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{one-way-select value=value options=options
      optionValuePath="id" optionLabelPath="label" groupLabelPath="type"}}`);

  assert.equal(findAll('optgroup')[0].getAttribute('label'),  'Trappist', 'First optgroup label is Trappist');
  assert.equal(findAll('optgroup').length, 3, 'There should be three optgroups');
});

test('options is pre-grouped', function(assert) {
  let groups = [
    {
      groupName: 'Trappist',
      options: [
        { id: 1, label: 'Dubbel', type: 'Trappist' },
        { id: 2, label: 'Tripel', type: 'Trappist' }
      ]
    }, {
      groupName: 'IPA',
      options: [{ id: 3, label: 'IPA', type: 'IPA' }]
    }, {
      groupName: 'Saison',
      options: [{ id: 4, label: 'Saison', type: 'Saison' }]
    }
  ];

  this.set('options', groups);

  this.render(hbs`{{one-way-select value=value options=options
      optionValuePath="id" optionLabelPath="label"}}`);

  assert.equal(findAll('optgroup')[0].getAttribute('label'),  'Trappist', 'First optgroup label is Trappist');
  assert.equal(findAll('optgroup').length, 3, 'There should be three optgroups');
});

test('multiple select', function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];

  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{one-way-select value=value options=options multiple=true
      optionValuePath="id" optionLabelPath="label" groupLabelPath="type"}}`);

  assert.equal([...findAll('option')].filter((o) => o.selected)[0].value, 3, 'IPA should be selected');
  assert.equal([...findAll('option')].filter((o) => o.selected)[1].value, 4, 'Saison should be selected');
});

test('multiple select a value', async function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'Dubbel', type: 'Trappist' },
    { id: 2, label: 'Tripel', type: 'Trappist' },
    { id: 3, label: 'IPA', type: 'IPA' },
    { id: 4, label: 'Saison', type: 'Saison' }
  ];

  this.on('update', (value) => this.set('value', value));
  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{one-way-select value=value options=options multiple=true
      update=(action 'update') optionValuePath="id" optionLabelPath="label"
      groupLabelPath="type"}}`);

  findAll('option')[0].selected = true;
  findAll('option')[2].selected = true;
  findAll('option')[3].selected = true;
  await triggerEvent('select', 'change');

  assert.equal([...findAll('option')].filter((o) => o.selected)[0].value, 1, 'Dubbel is selected');
  assert.deepEqual(this.get('value'), [dubbel, ipa, saison], 'Dubbel, IPA and Saison are selected');
});

test('de-select all options in multiple select', async function(assert) {
  let [dubbel, tripel, ipa, saison] = [
    { id: 1, label: 'dubbel', type: 'trappist' },
    { id: 2, label: 'tripel', type: 'trappist' },
    { id: 3, label: 'ipa', type: 'ipa' },
    { id: 4, label: 'saison', type: 'saison' }
  ];

  this.on('update', (value) => this.set('value', value));
  this.set('value', [saison, ipa]);
  this.set('options', [dubbel, tripel, ipa, saison]);

  this.render(hbs`{{one-way-select value=value options=options multiple=true
      update=(action 'update') optionValuePath="id" optionLabelPath="label"
      groupLabelPath="type"}}`);

  findAll('option')[0].selected = true;
  findAll('option')[2].selected = true;
  findAll('option')[3].selected = true;
  await triggerEvent('select', 'change');
  findAll('option')[0].selected = false;
  findAll('option')[2].selected = false;
  findAll('option')[3].selected = false;
  await triggerEvent('select', 'change');

  assert.equal(this.get('value').length, 0, 'selects an empty array');
});

test('It handles the old style of actions', async function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.render(hbs`{{one-way-select value=value options=options update='update'}}`);
  find('select').value = 'male';
  await triggerEvent('select', 'change');
  assert.equal(fired, true, 'The update action should have fired');
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-select class="testing"}}`);
  assert.equal(true, find('select').classList.contains('testing'));
});

test('Handles block expression', function(assert) {
  this.render(hbs`{{#one-way-select options=options as |option index|}}{{option}}-{{index}}{{/one-way-select}}`);
  assert.equal(findAll('option').length, 3, 'Select has three options');
  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), 'unknown-0male-1female-2', 'Has labels with indexes');
});

test('Handles block expression (option groups)', function(assert) {
  let groups = [
    {
      groupName: 'group1',
      options: [ 'value1' ]
    }, {
      groupName: 'group2',
      options: [ 'value2', 'value3' ]
    }
  ];

  this.set('options', groups);

  this.render(hbs`{{#one-way-select options=options as |option index groupIndex|}}{{option}}-{{groupIndex}}-{{index}}{{/one-way-select}}`);
  assert.equal(findAll('option').length, 3, 'Select has three options');
  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), 'value1-0-0value2-1-0value3-1-1', 'Has labels with indexes');
});

test('I can pass a component that is rendered as option', function(assert) {
  this.register('component:option-component', Component.extend({
    layout: hbs`{{option}}-{{index}}`
  }));

  this.render(hbs`{{one-way-select options=options optionComponent="option-component"}}`);
  assert.equal(findAll('option').length, 3, 'Select has three options');
  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), 'unknown-0male-1female-2', 'Has labels with indexes');
});

test('I can pass a component that is rendered as option (option groups)', function(assert) {
  this.register('component:option-component', Component.extend({
    layout: hbs`{{option}}-{{groupIndex}}-{{index}}`
  }));

  let groups = [
    {
      groupName: 'group1',
      options: [ 'value1' ]
    }, {
      groupName: 'group2',
      options: [ 'value2', 'value3' ]
    }
  ];

  this.set('options', groups);

  this.render(hbs`{{one-way-select options=options optionComponent="option-component"}}`);
  assert.equal(findAll('option').length, 3, 'Select has three options');
  assert.equal([...findAll('option')].map((o) => o.textContent).join('').replace(/\s/g, ''), 'value1-0-0value2-1-0value3-1-1', 'Has labels with indexes');
});

test('Setting the selection to null/undefined from outside', function(assert) {
  this.render(hbs` {{one-way-select value options=options}} `);
  this.set('value', undefined);
  assert.equal([...findAll('option')].find((o) => o.selected).value, 'unknown', 'The first value is selected');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-select classNames="testing"}}`);
  assert.equal(find('select').getAttribute('classnames'), undefined);
});

test('allows to select blank without throwing', async function(assert) {
  let updates = [];

  this.on('update', (newValue) => updates.push(newValue));
  this.set('value', undefined);
  this.set('options', [
    { value: 'one', text: 'One' }
  ]);

  this.render(hbs`{{one-way-select
    prompt='myDefaultPrompt' value=value promptIsSelectable=true options=options optionTargetPath='value' optionValuePath='value' optionLabelPath='text'
    update=(action 'update')}}`);

  find('select').value = 'one';
  await triggerEvent('select', 'change');

  find('select').value = '';
  await triggerEvent('select', 'change');

  assert.equal([...findAll('option')].find((o) => o.selected).textContent.trim(), 'myDefaultPrompt');
  assert.deepEqual(updates, ['one', undefined]);
});
