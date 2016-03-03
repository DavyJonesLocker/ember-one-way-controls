import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-checkbox', 'Integration | Component | {{one-way-checkbox}}', {
  integration: true
});

test('It renders a checkbox', function(assert) {
  this.render(hbs`{{one-way-checkbox}}`);
  assert.equal(this.$('input[type="checkbox"]').length, 1, 'Checkbox is rendered');
});

test('It sets the checked value', function(assert) {
  this.render(hbs`{{one-way-checkbox}}`);
  assert.equal(this.$('input:checked').length, 0, 'Checkbox is not checked');

  this.render(hbs`{{one-way-checkbox checked=true}}`);
  assert.equal(this.$('input:checked').length, 1, 'Checkbox is checked');

  this.render(hbs`{{one-way-checkbox checked=false}}`);
  assert.equal(this.$('input:checked').length, 0, 'Checkbox is not checked');
});

test('The first positional param is checked', function(assert) {
  this.render(hbs`{{one-way-checkbox true}}`);
  assert.equal(this.$('input:checked').length, 1, 'Checkbox is checked');
});

test('Setting the value property', function(assert) {
  this.render(hbs`{{one-way-checkbox value="Affirmative"}}`);
  assert.equal(this.$('input').val(), 'Affirmative', 'Checkbox value is set');
});

test('Clicking the checkbox triggers the update action', function(assert) {
  this.render(hbs`{{one-way-checkbox update=(action (mut value))}}`);
  this.$('input').trigger('click');
  assert.equal(this.get('value'), true);

  this.$('input').trigger('click');
  assert.equal(this.get('value'), false);
});
