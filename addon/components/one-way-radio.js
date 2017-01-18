import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

const {
  Component,
  computed,
  get,
  run: { next }
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

  checked: computed('value', 'option', function() {
    return get(this, 'value') === this.get('option');
  }),

  click(e) {
    if (!get(this, 'checked')) {
      this._triggerChange();
    }
    return e.preventDefault();
  },

  _triggerChange() {
    invokeAction(this, 'update', get(this, 'option'));
  },

  didUpdateAttrs() {
    let value = get(this, 'value');
    let option = get(this, 'option');
    let checked = get(this, 'checked');
    if (value || option || checked) {
      next(()=> {
        this.$().prop('checked', get(this, 'checked'));
      });
    }
  }
});

OneWayRadioComponent.reopenClass({
  positionalParams: ['value']
});

export default OneWayRadioComponent;
