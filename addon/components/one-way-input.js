import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const NON_ATTRIBUTE_BOUND_PROPS = [
  'keyEvents',
  'update',
  'sanitizeInput'
];

const OneWayInputComponent = Component.extend({
  tagName: 'input',
  type: 'text',

  attributeBindings: [
    'checked',
    'type',
    'value'
  ],

  keyEvents: {
    '13': 'onenter',
    '27': 'onescape'
  },

  _sanitizedValue: undefined,

  input() { this._handleChangeEvent(); },
  change() { this._handleChangeEvent(); },
  keyUp(event) { this._interpretKeyEvents(event); },

  appropriateAttr: computed('type', function() {
    let type = get(this, 'type');

    return type === 'checkbox' ? 'checked' : 'value';
  }),

  _interpretKeyEvents(event) {
    let methodName = this.keyEvents[event.keyCode];

    if (methodName) {
      this._sanitizedValue = null;
      this._processNewValue(methodName, this.readDOMAttr(get(this, 'appropriateAttr')));
    }
  },

  _handleChangeEvent() {
    this._processNewValue('update', this.readDOMAttr(get(this, 'appropriateAttr')));
  },

  _processNewValue(methodName, rawValue) {
    let value = this.sanitizeInput(rawValue);

    if (this._sanitizedValue !== value) {
      this._sanitizedValue = value;

      if (typeof methodName === 'function') {
        methodName(value);
      } else {
        invokeAction(this, methodName, value);
      }
    }
  },

  _bindDynamicAttributes() {
    let newAttributeBindings = [];
    for (let key in this.attrs) {
      if (!NON_ATTRIBUTE_BOUND_PROPS[key] && this.attributeBindings.indexOf(key) === -1) {
        newAttributeBindings.push(key);
      }
    }

    set(this, 'attributeBindings', this.attributeBindings.concat(newAttributeBindings));
  },

  sanitizeInput(input) {
    return input;
  },

  init() {
    this._super(...arguments);
    this._bindDynamicAttributes();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramValue') || get(this, 'value');
    set(this, 'value', value);
    this._sanitizedValue = get(this, get(this, 'appropriateAttr'));
    this._processNewValue('update', get(this, get(this, 'appropriateAttr')));
  }
});

OneWayInputComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayInputComponent;
