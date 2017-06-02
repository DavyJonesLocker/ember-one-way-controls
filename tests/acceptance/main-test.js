import { skip, test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { visit, click, fillIn, find, keyEvent } from 'ember-native-dom-helpers';

const TEXT = '#one-way-text';
const TEXT_KEYEVENTS = '#one-way-text-keyevents';
const CHECKBOX = '#one-way-checkbox';
const NUMBER_INPUT = '#one-way-number';

moduleForAcceptance('Acceptance | main');

test('main test', async function(assert) {
  await visit('/');
  assert.equal(find(TEXT).value, 'foo', 'it initializes with a value');
  await fillIn(TEXT, 'bar');
  assert.equal(find(TEXT).value, 'bar', 'should update `input` value');
  assert.equal(find('#text-current-value').textContent.trim(), 'bar', 'should update `textCurrentValue` oninput or onchange');
});

test('it responds to key events', async function(assert) {
  await visit('/');
  await fillIn(TEXT_KEYEVENTS, 'hit enter');
  await keyEvent(TEXT_KEYEVENTS, 'keyup', 13);
  assert.equal(find('#committed').textContent.trim(), 'hit enter', 'should update `committed` onenter');
  await fillIn(TEXT_KEYEVENTS, 'hit escape');
  await keyEvent(TEXT_KEYEVENTS, 'keyup', 27);
  assert.equal(find('#committed').textContent.trim(), 'hit escape', 'should update `committed` onescape');
});

test('checkbox test', async function(assert) {
  await visit('/');
  assert.notOk(find(CHECKBOX).checked, 'it initializes as unchecked');
  await click(CHECKBOX);
  assert.ok(find(CHECKBOX).checked, 'should update `input` checked');
  assert.equal(find('#checkbox-current-value').textContent.trim(), 'true', 'should update `checkboxCurrentValue` onchange');
});

skip('it handles decimal places', async function(assert) {
  await visit('/');
  await fillIn(NUMBER_INPUT, '1.');
  assert.equal(find('#text-number-value').textContent.trim(), '1.', 'it handles decimal places');
  await fillIn(NUMBER_INPUT, '1.1');
  assert.equal(find('#text-number-value').textContent.trim(), '1.1', 'it handles decimal places');
});
