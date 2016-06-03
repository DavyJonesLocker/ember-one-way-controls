import Ember from 'ember';
import layout from '../templates/components/one-way-select';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

import { invokeAction } from 'ember-invoke-action';

const {
  A: emberArray,
  Component,
  computed,
  computed: { alias, empty, not, or },
  get,
  isArray,
  isBlank,
  isPresent,
  set,
  String: { w }
} = Ember;

const OneWaySelectComponent = Component.extend(DynamicAttributeBindings, {
  layout,
  tagName: 'select',

  NON_ATTRIBUTE_BOUND_PROPS: [
    'value',
    'update',
    'options',
    'prompt',
    'promptText',
    'includeBlank',
    'optionValuePath',
    'optionLabelPath',
    'groupLabelPath'
  ],

  attributeBindings: [
    'multiple'
  ],

  didReceiveAttrs() {
    this._super(...arguments);

    let value = get(this, 'paramValue');
    if (value === undefined) {
      value = get(this, 'value');
    }

    set(this, 'selectedValue', value);

    let options = get(this, 'options');
    if (typeof options === 'string') {
      options = w(options);
    }

    let firstOption = get(emberArray(options), 'firstObject');
    if (firstOption &&
        isPresent(get(firstOption, 'groupName')) &&
        isArray(get(firstOption, 'options'))) {
      set(this, 'optionsArePreGrouped', true);
    }

    if (isBlank(get(this, 'promptIsSelectable'))) {
      set(this, 'promptIsSelectable', false);
    }

    set(this, 'options', emberArray(options));
  },

  nothingSelected: empty('selectedValue'),
  promptIsDisabled: not('promptIsSelectable'),
  hasGrouping: or('optionsArePreGrouped', 'groupLabelPath'),

  optionGroups: computed('options.[]', function() {
    let groupLabelPath = get(this, 'groupLabelPath');
    let options = get(this, 'options');
    let groups = emberArray();

    if (!groupLabelPath) {
      return options;
    }

    options.forEach((item) => {
      let label = get(item, groupLabelPath);

      if (label) {
        let group = groups.findBy('groupName', label);

        if (group == null) {
          group = Ember.Object.create({
            groupName: label,
            options:   emberArray()
          });

          groups.pushObject(group);
        }

        get(group, 'options').pushObject(item);
      } else {
        groups.pushObject(item);
      }
    });

    return groups;
  }),

  change() {
    let value;

    if (get(this, 'multiple') === true) {
      value = this._selectedMultiple();
    } else {
      value = this._selectedSingle();
    }

    invokeAction(this, 'update', value);
  },

  prompt: alias('includeBlank'),

  promptText: computed('prompt', function() {
    let prompt = get(this, 'prompt');
    if (typeof prompt === 'string') {
      return prompt;
    }
  }),

  _selectedMultiple() {
    let selectedValues = this.$().val();

    return selectedValues.map((selectedValue) => {
      return this._findOption(selectedValue);
    });
  },

  _selectedSingle() {
    let selectedValue = this.$().val();
    return this._findOption(selectedValue);
  },

  _findOption(value) {
    let options = get(this, 'options');
    let optionValuePath = get(this, 'optionValuePath');
    let optionsArePreGrouped = get(this, 'optionsArePreGrouped');

    let findOption = (item) => {
      if (optionValuePath) {
        return `${get(item, optionValuePath)}` === value;
      } else {
        return `${item}` === value;
      }
    };

    if (optionsArePreGrouped) {
      return options.reduce((found, group) => {
        return found || get(group, 'options').find(findOption);
      }, undefined);
    } else {
      return options.find(findOption);
    }
  }
});

OneWaySelectComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWaySelectComponent;
