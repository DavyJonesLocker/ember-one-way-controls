import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

const { run } = Ember;
const TEXT = '#one-way-text';
const TEXT_KEYEVENTS = '#one-way-text-keyevents';
const CHECKBOX = '#one-way-checkbox';
const DYNAMIC_ATTRIBUTE_INPUT = '#dynamic-attributes';

module('Acceptance | main', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
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
});

test('it responds to key events', function(assert) {
  visit('/');

  andThen(() => fillIn(TEXT_KEYEVENTS, 'hit enter'));
  andThen(() => {
    keyEvent(TEXT_KEYEVENTS, 'keyup', 13).then(() => {
      assert.equal(findWithAssert('#committed').text().trim(), 'hit enter', 'should update `committed` onenter');
    });
  });
  andThen(() => fillIn(TEXT_KEYEVENTS, 'hit escape'));
  andThen(() => {
    keyEvent(TEXT_KEYEVENTS, 'keyup', 27).then(() => {
      assert.equal(findWithAssert('#committed').text().trim(), 'hit escape', 'should update `committed` onescape');
    });
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

test('it accepts dynamic attribute bindings', function(assert) {
  visit('/');

  andThen(() => {
    assert.equal(findWithAssert(DYNAMIC_ATTRIBUTE_INPUT).attr('placeholder'), 'this is a placeholder', 'should set placeholder');
  });
  andThen(() => {
    assert.equal(findWithAssert(DYNAMIC_ATTRIBUTE_INPUT).attr('data-thing'), 'this is an arbitrary attribute', 'should set arbitrary attribute');
  });
});
