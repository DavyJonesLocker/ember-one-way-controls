import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-radio', 'Integration | Component | one way radio', {
  integration: true
});

test('It renders', function(assert) {
  this.render(hbs`{{one-way-radio}}`);
  assert.equal(this.$('input[type="radio"]').length, 1);
});

test('Is selected when value matches option', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.equal(this.$('input:checked').length, 1);
});

test('Value is set to option', function(assert) {
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.equal(this.$('input').val(), 'yes');
});

test('Value can be a positional param', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);

  assert.equal(this.$('input:checked').length, 1);
});

test('Is not selected when value does not match option', function(assert) {
  this.set('value', 'no');
  this.render(hbs`{{one-way-radio value=value option="yes"}}`);

  assert.equal(this.$('input:checked').length, 0);
});

test('Triggers update action when clicked', function(assert) {
  assert.expect(1);
  this.on('update', (value) => assert.equal(value, 'no'));
  this.render(hbs`{{one-way-radio value=value option="no" update=(action 'update')}}`);

  this.$('input').click();
});

test('Triggers update action when clicked in a radio button group', function(assert) {
  assert.expect(1);
  this.on('update', (value) => assert.equal(value, 'yes'));
  this.set('value', 'no');
  this.render(hbs`
    {{one-way-radio value=value option="yes" update=(action 'update') name="x"}}
    {{one-way-radio value=value option="no"  update=(action 'update') name="x"}}
  `);

  this.$('input[value="yes"]').click();
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-radio class="testing"}}`);
  assert.equal(true, this.$('input').hasClass('testing'));
});

test('Outside value of null', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);
  this.set('value', null);
  assert.equal(this.$('input:checked').length, 0, 'Radio is not checked');
});

test('Outside value of undefined', function(assert) {
  this.set('value', 'yes');
  this.render(hbs`{{one-way-radio value option="yes"}}`);
  this.set('value', undefined);
  assert.equal(this.$('input:checked').length, 0, 'Radio is not checked');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-radio classNames="testing"}}`);
  assert.equal(this.$('input').attr('classnames'), undefined);
});
