import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  computed,
  get,
  run,
} = Ember;

const OneWayCheckboxComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'checkbox',

  NON_ATTRIBUTE_BOUND_PROPS: ['update'],

  attributeBindings: [
    'type',
    'value'
  ],

  checkedValue: computed('paramChecked', 'checked', function() {
    let checkedValue = get(this, 'paramChecked');

    if (checkedValue === undefined) {
      return checkedValue = get(this, 'checked');
    }

    return checkedValue;
  }),

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener('click', (e) => this._click(e));

    const checkedValue = get(this, 'checkedValue');
    if (checkedValue) {
      this.element.setAttribute('checked', 'checked');
    }
  },

  didUpdateAttrs() {
    let checkedValue = get(this, 'checkedValue');
    this.element.checked = checkedValue;
  },

  _click(event) {
    let checkedProp = this.element.checked;
    run(() => {
      invokeAction(this, 'update', checkedProp, event);
    });

    let checkedValue = get(this, 'checkedValue');
    this.element.checked = checkedValue;
  },
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;
