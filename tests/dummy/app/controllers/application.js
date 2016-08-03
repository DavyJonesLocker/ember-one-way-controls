import Ember from 'ember';

const { Controller, set } = Ember;

export default Controller.extend({
  committed: null,
  textCurrentValue: 'foo',
  numberCurrentValue: 0,

  actions: {
    commit(value) {
      set(this, 'committed', value);
    }
  }
});
