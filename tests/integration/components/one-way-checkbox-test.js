import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { set } = Ember;

moduleForComponent('one-way-checkbox', 'Integration | Component | {{one-way-checkbox}}', {
  integration: true
});

test('It renders a checkbox', function(assert) {
  this.render(hbs`{{one-way-checkbox}}`);
  assert.ok(find('input[type="checkbox"]'), 'Checkbox is rendered');
});

test('It sets the checked value', function(assert) {
  this.render(hbs`{{one-way-checkbox}}`);
  assert.notOk(find('input').checked, 'Checkbox is not checked');

  this.render(hbs`{{one-way-checkbox checked=true}}`);
  assert.ok(find('input').checked, 'Checkbox is checked');

  this.render(hbs`{{one-way-checkbox checked=false}}`);
  assert.notOk(find('input').checked, 'Checkbox is not checked');
});

test('The first positional param is checked', function(assert) {
  this.render(hbs`{{one-way-checkbox true}}`);
  assert.ok(find('input').checked, 'Checkbox is checked');
});

test('Setting the value property', function(assert) {
  this.render(hbs`{{one-way-checkbox value="Affirmative"}}`);
  assert.equal(find('input').value, 'Affirmative', 'Checkbox value is set');
});

test('Clicking the checkbox triggers the update action', async function(assert) {
  this.render(hbs`{{one-way-checkbox value update=(action (mut value))}}`);

  find('input').click();
  assert.equal(this.get('value'), true);
  
  find('input').click();
  assert.equal(this.get('value'), false);
});

test('It can accept an outside toggle of checked', async function(assert) {
  this.render(hbs`{{one-way-checkbox checked=checked}}`);

  this.set('checked', true);

  assert.strictEqual(find('input').checked, true);
  assert.strictEqual(this.get('checked'), true);
});

test('It can accept an outside toggle of checked - using positional param', async function(assert) {
  this.render(hbs`{{one-way-checkbox checked update=(action (mut checked))}}`);

  this.set('checked', true);

  assert.strictEqual(this.get('checked'), true);
  assert.strictEqual(find('input').checked, true);
});

test('Does not toggle state when update action does not modify the value', async function(assert) {
  this.set('checked', false);
  this.render(hbs`{{one-way-checkbox checked update=(action (mut checked) false)}}`);

  let inputElement = find('input');
  
  assert.strictEqual(inputElement.checked, false, "Checkbox should be unchecked");
  assert.strictEqual(this.get('false'), undefined, "value should be false");
  inputElement.click();
  assert.strictEqual(inputElement.checked, false, "Checkbox should still be unchecked as it is being overriden with update");
  assert.strictEqual(this.get('checked'), false, "value should be false as it has been set specifically");
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-checkbox class="testing"}}`);
  assert.equal(true, find('input').classList.contains('testing'));
});

test('Outside value of null', function(assert) {
  this.set('checked', true);
  this.render(hbs`{{one-way-checkbox checked}}`);
  this.set('checked', null);
  assert.notOk(find('input').checked, 'Checkbox is not checked');
});

test('Outside value of undefined', function(assert) {
  this.set('checked', true);
  this.render(hbs`{{one-way-checkbox checked}}`);
  this.set('checked', undefined);
  assert.notOk(find('input').checked, 'Checkbox is not checked');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-checkbox classNames="testing"}}`);
  assert.equal(find('input').getAttribute('classnames'), undefined);
});

test('the click event can be intercepted in the action', async function(assert) {
  assert.expect(1);

  this.on('divClick', function() {
    assert.ok(false);
  });

  this.on('checkboxClick', function(value, event) {
    event.stopPropagation();

    set(this, 'checked', value);
  });

  this.render(hbs`
    <div {{action 'divClick'}}>
      {{one-way-checkbox checked update=(action 'checkboxClick')}}
    </div>
  `);

  find('input').click();

  assert.equal(this.get('checked'), true);
});
