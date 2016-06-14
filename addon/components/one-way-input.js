import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  assert,
  get,
  set
} = Ember;

const OneWayInputComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'text',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'keyEvents',
    'update',
    'sanitizeInput',
    'paramValue'
  ],

  attributeBindings: [
    'type',
    '_value:value'
  ],

  keyEvents: {
    '13': 'onenter',
    '27': 'onescape'
  },

  input() {
    this._handleChangeEvent();
  },

  change() {
    this._handleChangeEvent();
  },

  keyUp(event) {
    this._interpretKeyEvents(event);
  },

  _interpretKeyEvents(event) {
    let method = get(this, `keyEvents.${event.keyCode}`);

    if (method) {
      this._sanitizedValue = null;
      this._handleChangeEvent(method);
    }
  },

  _handleChangeEvent(method = 'update') {
    let value = this.readDOMAttr('value');
    this._processNewValue(method, value);
  },

  _processNewValue(method, rawValue) {
    let value = this.sanitizeInput(rawValue);

    if (this._sanitizedValue !== value) {
      this._sanitizedValue = value;

      if (typeof method === 'function') {
        method(value);
      } else {
        invokeAction(this, method, value);
      }
    }
  },

  _raiseTypeAssertion(type) {
    assert(`The {{one-way-input}} component does not support type="${type}", use {{one-way-${type}}} instead.`, false);
  },

  sanitizeInput(input) {
    return input;
  },

  init() {
    this._super(...arguments);

    if (this.type === 'checkbox' || this.type === 'radio') {
      this._raiseTypeAssertion(this.type);
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramValue');
    if (value === undefined) {
      value = get(this, 'value');
    }

    set(this, '_value', value);

    this._sanitizedValue = value;
    this._processNewValue('update', value);
  }
});

OneWayInputComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayInputComponent;
