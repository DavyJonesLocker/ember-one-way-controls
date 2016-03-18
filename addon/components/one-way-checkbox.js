import OneWayInputComponent from './one-way-input';

const OneWayCheckboxComponent = OneWayInputComponent.extend({
  type: 'checkbox',

  didReceiveAttrs() {
    this._handleDataDownValueChange('paramChecked', 'checked');
  }
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;
