import OneWayInputComponent from './one-way-input';

export default OneWayInputComponent.extend({
  tagName: 'textarea',

  init() {
    this._super(...arguments);

    // We need to unset type, otherwise it will try to set it
    // on the element, which results in an error on textarea.
    this.set('type', undefined);
  }
});
