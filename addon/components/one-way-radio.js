import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend(DynamicAttributeBindings, {
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
    'type',
  ],

  click() {
    invokeAction(this, 'update', get(this, 'option'));
  },

  checked: computed('value', 'option', function() {
    return get(this, 'value') === get(this, 'option');
  })
});
