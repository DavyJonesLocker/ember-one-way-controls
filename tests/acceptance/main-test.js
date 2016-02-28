import { skip, test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const TEXT = '#one-way-text';
const TEXT_KEYEVENTS = '#one-way-text-keyevents';
const CHECKBOX = '#one-way-checkbox';
const NUMBER_INPUT = '#one-way-number';

moduleForAcceptance('Acceptance | main');

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

skip('it handles decimal places', function(assert) {
  visit('/');

  andThen(() => fillIn(NUMBER_INPUT, '1.'));
  andThen(() => {
    assert.equal(findWithAssert('#text-number-value').text().trim(), '1.', 'it handles decimal places');
  });
  andThen(() => fillIn(NUMBER_INPUT, '1.1'));
  andThen(() => {
    assert.equal(findWithAssert('#text-number-value').text().trim(), '1.1', 'it handles decimal places');
  });
});
