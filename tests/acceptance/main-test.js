import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

const { run } = Ember;
const TEXT = '#one-way-text';
const CHECKBOX = '#one-way-checkbox';

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
    assert.equal(findWithAssert(TEXT).val(), 'foo', 'it initializes with a value');
  });
  andThen(() => fillIn(TEXT, 'bar'));
  andThen(() => {
    assert.equal(findWithAssert(TEXT).val(), 'bar', 'should update `input` value');
    assert.equal(findWithAssert('#text-current-value').text().trim(), 'bar', 'should update `textCurrentValue` oninput or onchange');
  });
  andThen(() => {
    keyEvent(TEXT, 'keyup', 13).then(() => {
      assert.equal(findWithAssert('#committed').text().trim(), 'bar', 'should update `committed` onenter');
    });
    keyEvent(TEXT, 'keyup', 27);
    keyEvent(TEXT, 'keyup', 52);
  });
});

test('checkbox test', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert(CHECKBOX).is(':checked'), false, 'it initializes as unchecked');
  });
  andThen(() => click(CHECKBOX));
  andThen(() => {
    assert.equal(findWithAssert(CHECKBOX).is(':checked'), true, 'should update `input` checked');
    assert.equal(findWithAssert('#checkbox-current-value').text().trim(), 'true', 'should update `checkboxCurrentValue` onchange');
  });
});
