import { find, click } from 'ember-native-dom-helpers';
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
  assert.ok(find('input:checked'), 'Checkbox is checked');
});

test('Setting the value property', function(assert) {
  this.render(hbs`{{one-way-checkbox value="Affirmative"}}`);
  assert.equal(find('input').value, 'Affirmative', 'Checkbox value is set');
});

test('Clicking the checkbox triggers the update action', async function(assert) {
  this.render(hbs`{{one-way-checkbox update=(action (mut value))}}`);
  await click('input');
  assert.equal(this.get('value'), true);

  await click('input');
  assert.equal(this.get('value'), false);
});

test('It can accept an outside toggle of checked', async function(assert) {
  this.render(hbs`{{one-way-checkbox checked=checked update=(action (mut checked))}}`);

  await click('input');
  this.set('checked', false);
  await click('input');

  assert.strictEqual(this.get('checked'), true);
});

test('It can accept an outside toggle of checked - using positional param', async function(assert) {
  this.render(hbs`{{one-way-checkbox checked update=(action (mut checked))}}`);

  await click('input');
  this.set('checked', false);
  await click('input');

  assert.strictEqual(this.get('checked'), true);
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

  await click('input');

  assert.equal(this.get('checked'), true);
});

