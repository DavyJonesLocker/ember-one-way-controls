import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  computed,
  get,
  set
} = Ember;

const OneWayRadioComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'radio',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'update',
    'option',
    'value'
  ],

  attributeBindings: [
    'checked',
    'option:value',
    'type'
  ],

  checked: computed('_value', 'option', function() {
    return get(this, '_value') === get(this, 'option');
  }),

  click() {
    invokeAction(this, 'update', get(this, 'option'));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramValue');
    if (value === undefined) {
      value = get(this, 'value');
    }

    set(this, '_value', value);
  }
});

OneWayRadioComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayRadioComponent;
