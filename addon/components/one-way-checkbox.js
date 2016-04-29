import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  get,
  set,
  isEmpty
} = Ember;

const OneWayCheckboxComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'checkbox',

  NON_ATTRIBUTE_BOUND_PROPS: ['update'],

  attributeBindings: [
    'checked',
    'type',
    'value'
  ],

  click() {
    invokeAction(this, 'update', this.readDOMAttr('checked'));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramChecked');
    if (isEmpty(value)) {
      value = get(this, 'checked');
    }

    set(this, 'checked', value);
  }
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;
