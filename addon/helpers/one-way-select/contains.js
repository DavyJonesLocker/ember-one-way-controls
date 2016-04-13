import Ember from 'ember';

const { isArray } = Ember;

export function contains([haystack, needle]) {
  if (isArray(haystack)) {
    return Ember.A(haystack).contains(needle);
  } else {
    return haystack === needle;
  }
}

export default Ember.Helper.helper(contains);
