import Ember from 'ember';

const { Mixin, set } = Ember;

export default Mixin.create({
  NON_ATTRIBUTE_BOUND_PROPS: ['class', 'classNames'],
  concatenatedProperties: ['NON_ATTRIBUTE_BOUND_PROPS'],
  init() {
    this._super(...arguments);

    let newAttributeBindings = [];
    for (let key in this.attrs) {
      if (this.NON_ATTRIBUTE_BOUND_PROPS.indexOf(key) === -1 && this.attributeBindings.indexOf(key) === -1) {
        newAttributeBindings.push(key);
      }
    }

    set(this, 'attributeBindings', this.attributeBindings.concat(newAttributeBindings));
  }
});
