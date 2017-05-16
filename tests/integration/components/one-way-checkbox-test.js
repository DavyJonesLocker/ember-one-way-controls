import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { set } = Ember;

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

test('It can accept an outside toggle of checked', function(assert) {
  this.render(hbs`{{one-way-checkbox checked=checked update=(action (mut checked))}}`);

  this.$('input').trigger('click');
  this.set('checked', false);
  this.$('input').trigger('click');

  assert.strictEqual(this.get('checked'), true);
});

test('It can accept an outside toggle of checked - using positional param', function(assert) {
  this.render(hbs`{{one-way-checkbox checked update=(action (mut checked))}}`);

  this.$('input').trigger('click');
  this.set('checked', false);
  this.$('input').trigger('click');

  assert.strictEqual(this.get('checked'), true);
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-checkbox class="testing"}}`);
  assert.equal(true, this.$('input').hasClass('testing'));
});

test('I can bind the aria-describedby attribute', function(assert) {
  this.render(hbs`{{one-way-checkbox describedBy="testing"}}`);
  assert.equal(this.$('input').attr('aria-describedby'), 'testing', 'The aria-describedby attribute was added');
});

test('Outside value of null', function(assert) {
  this.set('checked', true);
  this.render(hbs`{{one-way-checkbox checked}}`);
  this.set('checked', null);
  assert.equal(this.$('input:checked').length, 0, 'Checkbox is not checked');
});

test('Outside value of undefined', function(assert) {
  this.set('checked', true);
  this.render(hbs`{{one-way-checkbox checked}}`);
  this.set('checked', undefined);
  assert.equal(this.$('input:checked').length, 0, 'Checkbox is not checked');
});

test('classNames is not passed as an html attribute', function(assert) {
  this.render(hbs`{{one-way-checkbox classNames="testing"}}`);
  assert.equal(this.$('input').attr('classnames'), undefined);
});

test('the click event can be intercepted in the action', function(assert) {
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

  this.$('input').trigger('click');

  assert.equal(this.get('checked'), true);
});

