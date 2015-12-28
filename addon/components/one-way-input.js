import Ember from 'ember';

const {
  Component,
  get
} = Ember;
const NON_ATTRIBUTE_BOUND_PROPS = [
  'update',
  'sanitizeInput',
  'keyEvents'
];

export default Component.extend({
  tagName: 'input',
  type: 'text',
  keyEvents: {
    '13': 'onenter',
    '27': 'onescape'
  },
  _sanitizedValue: undefined,

  input() { this._handleChangeEvent(); },
  change() { this._handleChangeEvent(); },
  keyUp(event) { this._interpretKeyEvents(event); },

  _interpretKeyEvents(event) {
    let methodName = this.keyEvents[event.keyCode];

    if (methodName) {
      this._sanitizedValue = null;
      this._processNewValue.call(this, methodName, this._readAppropriateAttr());
    }
  },

  _handleChangeEvent() {
    this._processNewValue.call(this, 'update', this._readAppropriateAttr());
  },

  _readAppropriateAttr() {
    let attr;
    if (get(this, 'type') === 'checkbox') {
      attr = 'checked';
    } else {
      attr = 'value';
    }

    return this.readDOMAttr(attr);
  },

  _processNewValue(methodName, rawValue) {
    let value = this.sanitizeInput(rawValue);
    let action = this.attrs[methodName];

    if (this._sanitizedValue !== value) {
      this._sanitizedValue = value;
      if (action) {
        action(value);
      }
    }
  },

  sanitizeInput(input) {
    return input;
  },

  init() {
    this._super(...arguments);
    this._sanitizedValue = get(this, 'value') || get(this, 'checked');

    for (let key in this.attrs) {
      if (!NON_ATTRIBUTE_BOUND_PROPS[key]) {
        this.attributeBindings.push(key);
      }
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._processNewValue.call(this, 'update', get(this, 'value') || get(this, 'checked'));
  }
});
