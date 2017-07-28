import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  get,
  set
} = Ember;

const OneWayCheckboxComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'checkbox',

  NON_ATTRIBUTE_BOUND_PROPS: ['update'],

  attributeBindings: [
    'isChecked:checked',
    'type',
    'value'
  ],

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener('click', (e) => this._click(e));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramChecked');
    if (value === undefined) {
      value = get(this, 'checked');
    }

    set(this, 'isChecked', value);
  },

  _click(event) {
    invokeAction(this, 'update', this.readDOMAttr('checked'), event);
  },
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;
