import Mixin from '@ember/object/mixin';
import { set } from '@ember/object';

export default Mixin.create({
  NON_ATTRIBUTE_BOUND_PROPS: ['class', 'classNames'],
  concatenatedProperties: ['NON_ATTRIBUTE_BOUND_PROPS'],
  init() {
    this._super(...arguments);

    let newAttributeBindings = [];
    // eslint-disable-next-line ember/no-attrs-in-components
    for (let key in this.attrs) {
      if (this.NON_ATTRIBUTE_BOUND_PROPS.indexOf(key) === -1 && this.attributeBindings.indexOf(key) === -1) {
        newAttributeBindings.push(key);
      }
    }

    set(this, 'attributeBindings', this.attributeBindings.concat(newAttributeBindings));
  }
});
