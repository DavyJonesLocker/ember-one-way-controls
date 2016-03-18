import { skip } from 'qunit';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-input', 'Integration | Component | {{one-way-input}}', {
  integration: true
});

test('It renders an text input', function(assert) {
  this.render(hbs`{{one-way-input}}`);
  assert.equal(this.$('input[type="text"]').length, 1, 'Input is rendered');
});

test('It puts the value into the input', function(assert) {
  this.render(hbs`{{one-way-input value="test"}}`);
  assert.equal(this.$('input').val(), 'test', 'input\'s value is \'test\'');
});

test('Value can be the first positional param', function(assert) {
  this.render(hbs`{{one-way-input "test"}}`);
  assert.equal(this.$('input').val(), 'test', 'input\'s value is \'test\'');
});

test('Changing the value updates the input', function(assert) {
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value=value}}`);
  assert.equal(this.$('input').val(), 'foo', 'Input\'s value is \'foo\'');
  this.set('value', 'bar');
  assert.equal(this.$('input').val(), 'bar', 'Input\'s value is \'bar\'');
});

test('Typing in the input triggers the update action', function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  this.$('input').val('foo').trigger('input');
  assert.equal(this.get('value'), 'foo', 'Value is updated to \'foo\'');
});

test('Changing the input value triggers the update action', function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  this.$('input').val('foo').trigger('change');
  assert.equal(this.get('value'), 'foo', 'Value is updated to \'foo\'');
});

test('It is possible to specify a sanitizeInput function', function(assert) {
  this.on('sanitize', (value) => value && value.toUpperCase());
  this.render(hbs`{{one-way-input
    sanitizeInput=(action 'sanitize') update=(action (mut value))}}`);
  this.$('input').val('foo').trigger('change');
  assert.equal(this.get('value'), 'FOO', 'Value was transformed to uppercase');
});

test('It responds to the enter keypress', function(assert) {
  assert.expect(1);
  this.on('enter', () => assert.ok(true));
  this.render(hbs`{{one-way-input onenter=(action 'enter')}}`);
  this.$('input').trigger($.Event('keyup', { keyCode: 13 }));
});

test('It responds to the escape keypress', function(assert) {
  assert.expect(1);
  this.on('escape', () => assert.ok(true));
  this.render(hbs`{{one-way-input onescape=(action 'escape')}}`);
  this.$('input').trigger($.Event('keyup', { keyCode: 27 }));
});

skip('Works with type="number" and decimals', function(assert) {
  this.render(hbs`{{one-way-input type="number" update=(action (mut value))}}`);
  this.$('input').val('1.').trigger('input');
  assert.equal(this.get('value'), '1.', 'Value is updated to \'1.1\'');
  this.$('input').val('1.1').trigger('input');
  assert.equal(this.get('value'), '1.1', 'Value is updated to \'1.1\'');
});

test('Updating the value binding does not send an update action', function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.set('value', 'hey');
  this.render(hbs`{{one-way-input value=value update=(action 'update')}}`);
  this.set('value', 'ho');
  assert.equal(fired, false, 'The update action should not have fired');
});

test('It triggers sanitizeInput on value binding change', function(assert) {
  this.on('sanitize', (value) => value && value.toUpperCase());
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value=value
    sanitizeInput=(action 'sanitize')
    update=(action (mut value))}}`);

  // initial render with an invalid value gets sanitized and calls update
  assert.equal(this.get('value'), 'FOO');

  this.set('value', 'bar');
  // set triggered a rerender, which sanitized the input and called update
  assert.equal(this.get('value'), 'BAR');
});

test('It handles the old style of actions', function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.render(hbs`{{one-way-input update='update'}}`);
  this.$('input').val('foo').trigger('input');
  assert.equal(fired, true, 'The update action should have fired');
});
