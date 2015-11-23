import Ember from 'ember';

const {
  Component,
  get
} = Ember;

export default Component.extend({
  tagName: 'input',
  type: 'text',
  attributeBindings: [
    'accept',
    'autocomplete',
    'autosave',
    'checked',
    'dir',
    'disabled',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'min',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'size',
    'step',
    'type',
    'value',
    'width'
  ],
  KEY_EVENTS: {
    '13': 'onenter',
    '27': 'onescape'
  },
  _sanitizedValue: undefined,

  input() { this._handleChangeEvent(); },
  change() { this._handleChangeEvent(); },
  keyUp(event) { this._interpretKeyEvents(event); },

  _interpretKeyEvents(event) {
    const methodName = this.KEY_EVENTS[event.keyCode];

    if (methodName) {
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
    const value = this.sanitizeInput(rawValue);
    const action = this.attrs[methodName];

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

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.attrs.update) {
      throw new Error(`You must provide an \`update\` action to \`{{${this.templateName}}}\`.`);
    }

    this._processNewValue.call(this, 'update', get(this, 'value'));
  }
});
