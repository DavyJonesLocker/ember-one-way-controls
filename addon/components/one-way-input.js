import Ember from 'ember';

const {
  Component,
  get
} = Ember;

export default Component.extend({
  tagName: 'input',
  type: 'text',
  attributeBindings: ['type', 'value', 'placeholder', 'name'],
  _sanitizedValue: undefined,

  input() { this._handleChangeEvent(); },
  change() { this._handleChangeEvent(); },

  _handleChangeEvent() {
    this._processNewValue.call(this, this.readDOMAttr('value'));
  },

  _processNewValue(rawValue) {
    const value = this.sanitizeInput(rawValue);

    if (this._sanitizedValue !== value) {
      this._sanitizedValue = value;
      this.attrs.update(value);
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

    this._processNewValue.call(this, get(this, 'value'));
  }
});
