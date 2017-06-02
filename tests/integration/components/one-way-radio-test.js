import { find, click } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-radio', 'Integration | Component | one way radio', {
  integration: true
});

test('It renders', function(assert) {
  this.render(hbs`{{one-way-radio}}`);
  assert.ok(find('input[type="radio"]'));
});

test('Is selected when value matches option', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.ok(find('input').checked);
});

test('Value is set to option', function(assert) {
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.equal(find('input').value, 'yes');
});

test('Value can be a positional param', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);

  assert.ok(find('input').checked);
});

test('Is not selected when value does not match option', function(assert) {
  this.set('value', 'no');
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.notOk(find('input').checked);
});

test('Triggers update action when clicked', async function(assert) {
  assert.expect(1);
  this.on('update', (value) => assert.equal(value, 'no'));
  this.render(hbs`{{one-way-radio value=value option="no" update=(action 'update')}}`);

  await click('input');
});

test('Triggers update action when clicked in a radio button group', async function(assert) {
  assert.expect(1);
  this.on('update', (value) => assert.equal(value, 'yes'));
  this.set('value', 'no');
  this.render(hbs`
    {{one-way-radio value=value option="yes" update=(action 'update') name="x"}}
    {{one-way-radio value=value option="no"  update=(action 'update') name="x"}}
  `);

  await click('input[value="yes"]');
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-radio class="testing"}}`);
  assert.equal(true, find('input').classList.contains('testing'));
});

test('Outside value of null', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);
  this.set('value', null);
  assert.notOk(find('input').checked, 'Radio is not checked');
});

test('Outside value of undefined', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);
  this.set('value', undefined);
  assert.notOk(find('input').checked, 'Radio is not checked');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-radio classNames="testing"}}`);
  assert.equal(find('input').getAttribute('classnames'), undefined);
});
