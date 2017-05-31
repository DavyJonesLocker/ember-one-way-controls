import Ember from 'ember';
import { skip } from 'qunit';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

const { run } = Ember;

moduleForComponent('one-way-input', 'Integration | Component | {{one-way-input}}', {
  integration: true
});

test('It renders an input', function(assert) {
  this.render(hbs`{{one-way-input}}`);
  assert.equal(this.$('input').length, 1, 'Input is rendered');
});

test('The default type of the input is "text"', function(assert) {
  this.render(hbs`{{one-way-input}}`);
  assert.equal(this.$('input[type="text"]').length, 1, 'Input type is text');
});

test('The type param changes the type of the input', function(assert) {
  this.render(hbs`{{one-way-input type="password"}}`);
  assert.equal(this.$('input[type="password"]').length, 1, 'Input type is password');
});

test('Raises AssertionError when type is "checkbox"', function(assert) {
  assert.throws(() => {
    this.render(hbs`{{one-way-input type="checkbox"}}`);
  }, 'The {{one-way-input}} component does not support type="checkbox", use {{one-way-checkbox}} instead.');
});

test('Raises AssertionError when type is "radio"', function(assert) {
  assert.throws(() => {
    this.render(hbs`{{one-way-input type="radio"}}`);
  }, 'The {{one-way-input}} component does not support type="radio", use {{one-way-radio}} instead.');
});

test('It puts the value into the input', function(assert) {
  this.render(hbs`{{one-way-input value="test"}}`);
  assert.equal(this.$('input').val(), 'test', 'input\'s value is \'test\'');
});

test('Changing the value updates the input', function(assert) {
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value=value}}`);
  assert.equal(this.$('input').val(), 'foo', 'Input\'s value is \'foo\'');
  this.set('value', 'bar');
  assert.equal(this.$('input').val(), 'bar', 'Input\'s value is \'bar\'');
});

test('Value can be the first positional param', function(assert) {
  this.render(hbs`{{one-way-input "test"}}`);
  assert.equal(this.$('input').val(), 'test', 'input\'s value is \'test\'');
});

test('Outside positional param value of null', function(assert) {
  this.set('value', 'hello world');
  this.render(hbs`{{one-way-input value}}`);
  this.set('value', null);
  assert.equal(this.$('input').val(), '');
});

test('Outside positional param value of undefined', function(assert) {
  this.set('value', 'hello world');
  this.render(hbs`{{one-way-input value}}`);
  this.set('value', undefined);
  assert.equal(this.$('input').val(), '');
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

test('It handles the old style of actions', function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.render(hbs`{{one-way-input update="update"}}`);
  this.$('input').val('foo').trigger('input');
  assert.equal(fired, true, 'The update action should have fired');
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

test('The cursor does not jump when typing in the input', function(assert) {
  this.render(hbs`{{one-way-input value update=(action (mut value))}}`);

  ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd'].forEach((_, index, letters) => {
    let part = letters.slice(0, index + 1).join('');
    run(() => this.$('input').val(part).trigger('input'));
    assert.equal(this.$('input').get(0).selectionStart, index + 1, 'Cursor is still at right position');
  });
});

test('Does not throw an error updating an number input', function(assert) {
  assert.expect(0);
  this.set('value', 1);

  this.render(hbs`{{one-way-number value update=(action (mut value))}}`);

  run(() => this.$('input').val('12').trigger('input'));
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-input class="testing"}}`);
  assert.equal(this.$('input').hasClass('testing'), true, 'The testing class was added');
});

test('I can bind the placeholder attribute', function(assert) {
  this.render(hbs`{{one-way-input placeholder="testing"}}`);
  assert.equal(this.$('input').attr('placeholder'), 'testing');
});

test('positionalParamValue is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input "testing"}}`);
  assert.equal(this.$('input').attr('positionalparamvalue'), undefined);
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input classNames="testing"}}`);
  assert.equal(this.$('input').attr('classnames'), undefined);
});

test('update is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  assert.equal(this.$('input').attr('update'), undefined);
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

test('I can set keyEvent bindings', function(assert) {
  assert.expect(1);
  this.on('onenter', () => assert.ok(true));
  this.render(hbs`{{one-way-input keyEvents=(hash 13=(action "onenter"))}}`);
  this.$('input').trigger($.Event('keyup', { keyCode: 13 }));
});

test('Handles input masking', function(assert) {
  this.on('update', () => this.set('value', 'foo'));
  this.set('value', 'foo');

  this.render(hbs`{{one-way-input value update=(action "update")}}`);

  run(() => {
    let input = this.$('input');
    input.val('foo bar');
    input.get(0).setSelectionRange(2, 2);
    input.trigger('input');
  });

  assert.equal(this.$('input').val(), 'foo', 'Value is still foo');
  assert.equal(this.$('input').get(0).selectionStart, 2, 'Cursor is still at right position');
});

test('Does not update value when it is destroyed', function(assert) {
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value update=(action (mut value))}}`);
  run(() => {
    this.clearRender();
    this.$('input').val('foo bar').trigger('input');
  });
  assert.equal(this.get('value'), 'foo', 'Value is still foo');
});

skip('Works with type="number" and decimals', function(assert) {
  this.render(hbs`{{one-way-input type="number" update=(action (mut value))}}`);
  this.$('input').val('1.').trigger('input');
  assert.equal(this.get('value'), '1.', 'Value is updated to \'1.1\'');
  this.$('input').val('1.1').trigger('input');
  assert.equal(this.get('value'), '1.1', 'Value is updated to \'1.1\'');
});
