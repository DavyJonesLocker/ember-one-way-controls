import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const OneWayInputComponent = Component.extend({
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
    'maxlength',
    'min',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'size',
    'step',
    'type',
    'value',
    'width',
    'indeterminate'
  ],
  KEY_EVENTS: {
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
    let methodName = this.KEY_EVENTS[event.keyCode];

    if (methodName) {
      this._sanitizedValue = null;
      this._processNewValue.call(this, methodName, this.readDOMAttr(get(this, 'appropriateAttr')));
    }
  },

  _handleChangeEvent() {
    this._processNewValue.call(this, 'update', this.readDOMAttr(get(this, 'appropriateAttr')));
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

    let value = get(this, 'paramValue') || get(this, 'value');
    set(this, 'value', value);

    this._sanitizedValue = get(this, 'value') || get(this, 'checked');
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this._processNewValue.call(this, 'update', get(this, get(this, 'appropriateAttr')));
  }
});

OneWayInputComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayInputComponent;
