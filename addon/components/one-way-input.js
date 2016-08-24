import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  assert,
  computed,
  get,
  isNone,
  run: { schedule }
} = Ember;

const FORBIDDEN_TYPES = ['checkbox', 'radio'];

const OneWayInputComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',

  attributeBindings: [
    'type',
    '_value:value'
  ],

  NON_ATTRIBUTE_BOUND_PROPS: [
    'keyEvents',
    'classNames',
    'positionalParamValue',
    'update'
  ],

  keyEvents: {
    '13': 'onenter',
    '27': 'onescape'
  },

  change(event) {
    this._processNewValue(event.target.value);
  },

  input(event) {
    this._processNewValue(event.target.value);
  },

  sanitizeInput(input) {
    return input;
  },

  _processNewValue(rawValue) {
    let value = invokeAction(this, 'sanitizeInput', rawValue);

    if (get(this, '_value') !== value) {
      invokeAction(this, 'update', value);
    }

    schedule('afterRender', this, '_syncValue');
  },

  _syncValue() {
    if (this.isDestroyed) {
      return;
    }

    let actualValue = get(this, '_value');
    let renderedValue = this.readDOMAttr('value');

    if (!isNone(actualValue) && !isNone(renderedValue) && actualValue.toString() !== renderedValue.toString()) {
      let elem = this.$().get(0);

      let start;
      let end;

      // gaurds because only text, search, url, tel and password support this
      try {
        start = elem.selectionStart;
        end = elem.selectionEnd;
      } catch(e) {
        // no-op
      }

      this.$().val(actualValue);

      try {
        elem.setSelectionRange(start, end);
      } catch(e) {
        // no-op
      }
    }
  },

  keyUp(event) {
    let method = get(this, `keyEvents.${event.keyCode}`);
    if (method) {
      invokeAction(this, method, event.target.value);
    }
  },

  type: computed({
    get() {
      return 'text';
    },

    set(key, type) {
      assert(`The {{one-way-input}} component does not support type="${type}", use {{one-way-${type}}} instead.`, FORBIDDEN_TYPES.indexOf(type) === -1);
      return type;
    }
  }),

  _value: computed('positionalParamValue', 'value', {
    get() {
      let value = get(this, 'positionalParamValue');
      if (value === undefined) {
        value = get(this, 'value');
      }

      return value;
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this._processNewValue(get(this, '_value'));
  }
});

OneWayInputComponent.reopenClass({
  positionalParams: ['positionalParamValue']
});

export default OneWayInputComponent;
