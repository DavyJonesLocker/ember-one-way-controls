import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-input', 'Integration | Component | {{one-way-input}}', {
  integration: true
});

test('Updating the value binding does not send an update action', function(assert) {
  assert.expect(1);
  
  let fired = false;
  this.on('update', function() {
    fired = true;
  });
  this.set('value', 'hey');

  this.render(hbs`{{one-way-input value=value update=(action 'update')}}`);

  this.set('value', 'ho');

  assert.equal(fired, false, 'The update action should not have fired');
});
