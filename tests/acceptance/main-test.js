import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

const { run } = Ember;
const INPUT = '#one-way-input';

module('Acceptance | main', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    run(this.application, 'destroy');
  }
});

test('main test', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert(INPUT).val(), 'foo', 'it initializes with a value');
  });
  andThen(() => fillIn(INPUT, 'bar'));
  andThen(() => {
    assert.equal(findWithAssert(INPUT).val(), 'bar', 'should update `input` value');
    assert.equal(findWithAssert('#current-value').text().trim(), 'bar', 'should update `currentValue`');
  });
});
