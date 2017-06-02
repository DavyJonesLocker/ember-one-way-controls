import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('one-way-textarea', 'Integration | Component | {{one-way-textarea}}', {
  integration: true
});

test('It renders a textarea', function(assert) {
  this.render(hbs`{{one-way-textarea}}`);
  assert.ok(find('textarea'), 'a textarea was rendered');
});

test('I can add a class attribute', function(assert) {
  this.render(hbs`{{one-way-textarea class="testing"}}`);
  assert.ok(find('textarea').classList.contains('testing'));
});
