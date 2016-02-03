import Ember from 'ember';

const { K, Controller, set } = Ember;

export default Controller.extend({
  committed: null,
  textCurrentValue: 'foo',
  numberCurrentValue: 0,

  actions: {
    noop: K,
    commit(value) {
      set(this, 'committed', value);
    }
  }
});
