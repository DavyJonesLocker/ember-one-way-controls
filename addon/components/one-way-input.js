import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  get,
  set
} = Ember;

const OneWayInputComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'text',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'keyEvents',
    'update',
    'sanitizeInput'
  ],

  attributeBindings: [
    'type',
    'value'
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

  sanitizeInput(input) {
    return input;
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramValue') || get(this, 'value');

    set(this, 'value', value);

    this._sanitizedValue = value;
    this._processNewValue('update', value);
  }
});

OneWayInputComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayInputComponent;
