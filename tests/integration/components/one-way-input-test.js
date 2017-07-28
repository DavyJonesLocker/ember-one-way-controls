import Ember from 'ember';
import { skip } from 'qunit';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, fillIn, blur, keyEvent, triggerEvent } from 'ember-native-dom-helpers';

const { run } = Ember;

moduleForComponent('one-way-input', 'Integration | Component | {{one-way-input}}', {
  integration: true
});

test('It renders an input', function(assert) {
  this.render(hbs`{{one-way-input}}`);
  assert.ok(find('input'), 'Input is rendered');
});

test('The default type of the input is "text"', function(assert) {
  this.render(hbs`{{one-way-input}}`);
  assert.ok(find('input[type="text"]'), 'Input type is text');
});

test('The type param changes the type of the input', function(assert) {
  this.render(hbs`{{one-way-input type="password"}}`);
  assert.ok(find('input[type="password"]'), 'Input type is password');
});

test('Raises AssertionError when type is "checkbox"', function(assert) {
  if (Ember.VERSION.slice(0, 4) === '1.13') {
    assert.throws(() => {
      this.render(hbs`{{one-way-input type="checkbox"}}`);
    }, 'The {{one-way-input}} component does not support type="checkbox", use {{one-way-checkbox}} instead.');
  } else {
    assert.expectAssertion(() => {
      this.render(hbs`{{one-way-input type="checkbox"}}`);
    }, 'The {{one-way-input}} component does not support type="checkbox", use {{one-way-checkbox}} instead.');
  }
});

test('Raises AssertionError when type is "radio"', function(assert) {
  if (Ember.VERSION.slice(0, 4) === '1.13') {
    assert.throws(() => {
      this.render(hbs`{{one-way-input type="radio"}}`);
    }, 'The {{one-way-input}} component does not support type="radio", use {{one-way-radio}} instead.');
  } else {
    assert.expectAssertion(() => {
      this.render(hbs`{{one-way-input type="radio"}}`);
    }, 'The {{one-way-input}} component does not support type="radio", use {{one-way-radio}} instead.');
  }
});

test('It puts the value into the input', function(assert) {
  this.render(hbs`{{one-way-input value="test"}}`);
  assert.equal(find('input').value, 'test', 'input\'s value is \'test\'');
});

test('Changing the value updates the input', function(assert) {
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value=value}}`);
  assert.equal(find('input').value, 'foo', 'Input\'s value is \'foo\'');
  this.set('value', 'bar');
  assert.equal(find('input').value, 'bar', 'Input\'s value is \'bar\'');
});

test('Value can be the first positional param', function(assert) {
  this.render(hbs`{{one-way-input "test"}}`);
  assert.equal(find('input').value, 'test', 'input\'s value is \'test\'');
});

test('Outside positional param value of null', function(assert) {
  this.set('value', 'hello world');
  this.render(hbs`{{one-way-input value}}`);
  this.set('value', null);
  assert.equal(find('input').value, '');
});

test('Outside positional param value of undefined', function(assert) {
  this.set('value', 'hello world');
  this.render(hbs`{{one-way-input value}}`);
  this.set('value', undefined);
  assert.equal(find('input').value, '');
});

test('Typing in the input triggers the update action', async function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  await fillIn('input', 'foo');
  assert.equal(this.get('value'), 'foo', 'Value is updated to \'foo\'');
});

test('Changing the input value triggers the update action', async function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  await fillIn('input', 'foo');
  await blur('input');
  assert.equal(this.get('value'), 'foo', 'Value is updated to \'foo\'');
});

test('It handles the old style of actions', async function(assert) {
  assert.expect(1);
  let fired = false;
  this.on('update', () => fired = true);
  this.render(hbs`{{one-way-input update="update"}}`);
  await fillIn('input', 'foo');
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
    fillIn('input', part);
    assert.equal(find('input').selectionStart, index + 1, 'Cursor is still at right position');
  });
});

test('Does not throw an error updating an number input', function(assert) {
  assert.expect(0);
  this.set('value', 1);

  this.render(hbs`{{one-way-number value update=(action (mut value))}}`);

  fillIn('input', '12');
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-input class="testing"}}`);
  assert.ok(find('input').classList.contains('testing'), 'The testing class was added');
});

test('I can bind the placeholder attribute', function(assert) {
  this.render(hbs`{{one-way-input placeholder="testing"}}`);
  assert.equal(find('input').getAttribute('placeholder'), 'testing');
});

test('positionalParamValue is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input "testing"}}`);
  assert.equal(find('input').getAttribute('positionalparamvalue'), undefined);
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input classNames="testing"}}`);
  assert.equal(find('input').getAttribute('classnames'), undefined);
});

test('update is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-input update=(action (mut value))}}`);
  assert.equal(find('input').getAttribute('update'), undefined);
});

test('It responds to the enter keypress', function(assert) {
  assert.expect(1);
  this.on('enter', () => assert.ok(true));
  this.render(hbs`{{one-way-input onenter=(action 'enter')}}`);
  keyEvent('input', 'keyup', 13);
});

test('It responds to the escape keypress', function(assert) {
  assert.expect(1);
  this.on('escape', () => assert.ok(true));
  this.render(hbs`{{one-way-input onescape=(action 'escape')}}`);
  keyEvent('input', 'keyup', 27);
});

test('I can set keyEvent bindings', function(assert) {
  assert.expect(1);
  this.on('onenter', () => assert.ok(true));
  this.render(hbs`{{one-way-input keyEvents=(hash 13=(action "onenter"))}}`);
  keyEvent('input', 'keyup', 13);
});

test('Handles input masking', async function(assert) {
  this.on('update', () => this.set('value', 'foo'));
  this.set('value', 'foo');

  this.render(hbs`{{one-way-input value update=(action "update")}}`);

  let input = find('input');
  input.value = 'foo bar';
  input.setSelectionRange(2, 2);
  await triggerEvent(input, 'input');

  assert.equal(find('input').value, 'foo', 'Value is still foo');
  assert.equal(find('input').selectionStart, 2, 'Cursor is still at right position');
});

test('Does not update value when it is destroyed', async function(assert) {
  this.set('value', 'foo');
  this.render(hbs`{{one-way-input value update=(action (mut value))}}`);
  run(() => this.clearRender());
  assert.equal(this.get('value'), 'foo', 'Value is still foo');
});

skip('Works with type="number" and decimals', async function(assert) {
  this.render(hbs`{{one-way-input type="number" update=(action (mut value))}}`);
  await fillIn('input', '1.');
  assert.equal(this.get('value'), '1.', 'Value is updated to \'1.1\'');
  await fillIn('input', '1.1');
  assert.equal(this.get('value'), '1.1', 'Value is updated to \'1.1\'');
});
