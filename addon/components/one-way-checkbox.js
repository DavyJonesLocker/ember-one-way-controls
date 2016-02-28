import Ember from 'ember';
import OneWayInputComponent from './one-way-input';

const {
  get,
  set
} = Ember;

const OneWayCheckboxComponent = OneWayInputComponent.extend({
  type: 'checkbox',

  didReceiveAttrs() {
    let value = get(this, 'paramChecked') || get(this, 'checked');
    set(this, 'checked', value);
  }
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;
