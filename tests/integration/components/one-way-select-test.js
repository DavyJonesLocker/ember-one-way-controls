import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Component, A, Object: EmberObject } = Ember;

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
  assert.equal(this.$('option').length, 3, 'Select has three options');
});

test('A value is selected', function(assert) {
  this.render(hbs` {{one-way-select value=value options=options}} `);
  assert.equal(this.$('option:selected').val(), 'female', 'Female is selected');
});

test('Value can be the first positional param', function(assert) {
  this.render(hbs`{{one-way-select value options=options}}`);
  assert.equal(this.$('option:selected').val(), 'female', 'Female is selected');
});

test('Selecting a value updates the selected value', function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{one-way-select value=value options=options update=(action 'update')}}`);
  this.$('select').val('male');
  this.$('select').trigger('change');
  assert.equal(this.$('option:selected').val(), 'male', 'Male is selected');
  assert.equal(this.get('value'), 'male', 'Value is \'male\'');
});

test('Selecting a value updates the selected value for pre-grouped options', function(assert) {
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

  this.$('select').val('value2');
  this.$('select').trigger('change');

  assert.equal(this.$('option:selected').val(), 'value2', 'value2 is selected');
  assert.equal(this.get('value'), 'value2', 'Value is \'value2\'');
});

test('Accepts a space seperated string for options', function(assert) {
  this.render(hbs`{{one-way-select value=value options="male female"}}`);
  assert.equal(this.$('option').length, 2, 'There are two options: male, female');
});

test('Can include a blank value', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options includeBlank=true}}`);
  assert.equal(this.$('option').length, 4, 'There are four options');
});

test('Blank value can be given a text', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options includeBlank="Select one"}}`);
  assert.equal(this.$('option:eq(0)').text().trim(), 'Select one', 'The blank option has "Select one" as label');
  assert.equal(this.$('option:eq(0):disabled').length, 1, 'The blank option is disabled by default');
});

test('Prompt is an alias for includeBlank', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options prompt="Select one"}}`);
  assert.equal(this.$('option:eq(0)').text().trim(), 'Select one', 'The blank option has "Select one" as label');
});

test('With prompt selection still works properly', function(assert) {
  this.on('update', (value) => this.set('value', value));
  this.render(hbs`{{one-way-select
    value=value
    options=options
    prompt="Select one"
    update=(action 'update')
  }}`);
  this.$('select').val('male');
  this.$('select').trigger('change');
  assert.equal(this.$('option:selected').val(), 'male', 'Select options is male');
  assert.equal(this.get('value'), 'male', 'Value us \'male\'');
});

test('Prompt is selected by default', function(assert) {
  this.render(hbs`{{one-way-select options=options prompt="Select one"}}`);
  assert.equal(this.$('option:eq(0)').is(':selected'), true, 'Prompt option is selected');
});

test('Prompt can be selectable', function(assert) {
  this.render(hbs`{{one-way-select value=value options=options prompt="Select one" promptIsSelectable=true}}`);
  assert.equal(this.$('option:eq(0):disabled').length, 0, 'The blank option is enabled');
});

test('optionLabelPath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id"}}`);

  assert.equal(this.$('option').text().replace(/\s/g, ''), '12', 'Options are labeled 1, 2');
  assert.equal(this.$('option:selected').val(), 2, 'Selected option is 2');
});

test('optionValuePath', function(assert) {
  let [male, female] = [{ id: 1, value: 'male' }, { id: 2, value: 'female' }];
  this.set('value', female);
  this.set('options', [male, female]);

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);

  assert.equal(this.$('option').text().replace(/\s/g, ''), 'malefemale', 'Options are label male, female');
});

test('selected based on optionValuePath', function(assert) {
  this.set('options', [{ id: 1, value: 'male' }, { id: 2, value: 'female' }]);
  this.set('value', { id: 2, value: 'female' });

  this.render(hbs`{{one-way-select
    value=value options=options optionValuePath="id" optionLabelPath="value"}}`);
  assert.equal(this.$('option:selected').val(), '2', 'Female is selected');
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

  assert.equal(this.$('optgroup').eq(0).attr('label'),  'Trappist', 'First optgroup label is Trappist');
  assert.equal(this.$('optgroup').length, 3, 'There should be three optgroups');
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

  assert.equal(this.$('optgroup').eq(0).attr('label'),  'Trappist', 'First optgroup label is Trappist');
  assert.equal(this.$('optgroup').length, 3, 'There should be three optgroups');
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

  assert.equal(this.$('option:selected:eq(0)').val(), 3, 'IPA should be selected');
  assert.equal(this.$('option:selected:eq(1)').val(), 4, 'Saison should be selected');
});

test('multiple select a value', function(assert) {
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

  this.$('select').val(['1', '3', '4']);
  this.$('select').trigger('change');

  assert.equal(this.$('option:selected:eq(0)').val(), 1, 'Dubbel is selected');
  assert.deepEqual(this.get('value'), [dubbel, ipa, saison], 'Dubbel, IPA and Saison are selected');
});

test('de-select all options in multiple select', function(assert) {
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

  this.$('select').val(['1', '3', '4']);
  this.$('select').trigger('change');
  this.$('select').val('');
  this.$('select').trigger('change');

  assert.ok(this.get('value'), 'selects an empty array');
});

test('It handles the old style of actions', function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.render(hbs`{{one-way-select value=value options=options update='update'}}`);
  this.$('select').val('male');
  this.$('select').trigger('change');
  assert.equal(fired, true, 'The update action should have fired');
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-select class="testing"}}`);
  assert.equal(true, this.$('select').hasClass('testing'));
});

test('Handles block expression', function(assert) {
  this.render(hbs`{{#one-way-select options=options as |option index|}}{{option}}-{{index}}{{/one-way-select}}`);
  assert.equal(this.$('option').length, 3, 'Select has three options');
  assert.equal(this.$('option').text().replace(/\s/g, ''), 'unknown-0male-1female-2', 'Has labels with indexes');
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
  assert.equal(this.$('option').length, 3, 'Select has three options');
  assert.equal(this.$('option').text().replace(/\s/g, ''), 'value1-0-0value2-1-0value3-1-1', 'Has labels with indexes');
});

test('I can pass a component that is rendered as option', function(assert) {
  this.register('component:option-component', Component.extend({
    layout: hbs`{{option}}-{{index}}`
  }));

  this.render(hbs`{{one-way-select options=options optionComponent="option-component"}}`);
  assert.equal(this.$('option').length, 3, 'Select has three options');
  assert.equal(this.$('option').text().replace(/\s/g, ''), 'unknown-0male-1female-2', 'Has labels with indexes');
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
  assert.equal(this.$('option').length, 3, 'Select has three options');
  assert.equal(this.$('option').text().replace(/\s/g, ''), 'value1-0-0value2-1-0value3-1-1', 'Has labels with indexes');
});

test('Setting the selection to null/undefined from outside', function(assert) {
  this.render(hbs` {{one-way-select value options=options}} `);
  this.set('value', undefined);
  assert.equal(this.$('option:selected').val(), 'unknown', 'The first value is selected');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-select classNames="testing"}}`);
  assert.equal(this.$('select').attr('classnames'), undefined);
});

test('options can be an array of objects', function(assert) {
  let alex = EmberObject.create({ id: '1', name: 'Alex' });
  let ben = EmberObject.create({ id: '2', name: 'Ben' });
  let options = A([alex, ben]);

  this.set('options', options);
  this.set('value', options.get('lastObject.id'));
  this.render(hbs` {{one-way-select value=value options=options optionValuePath="id" optionLabelPath="name"}} `);
  assert.equal(this.$('option:selected').val(), '2', 'The second option is selected');
});
