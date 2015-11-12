import Ember from 'ember';

const { Controller, set } = Ember;

export default Controller.extend({
  committed: null,
  currentValue: 'foo',

  actions: {
    commit(value) {
      set(this, 'committed', value);
    }
  }
});
