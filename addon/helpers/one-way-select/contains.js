import Ember from 'ember';

const { isArray, isPresent, get } = Ember;

export function contains([haystack, needle, valuePath]) {
  if (isArray(haystack)) {
    haystack = Ember.A(haystack);

    if (valuePath) {
      return Ember.A(haystack.mapBy(valuePath)).contains(get(needle, valuePath));
    } else {
      return haystack.contains(needle);
    }
  } else {
    if (valuePath && isPresent(haystack) && isPresent(needle)) {
      return get(haystack, valuePath) === get(needle, valuePath);
    } else {
      return haystack === needle;
    }
  }
}

export default Ember.Helper.helper(contains);
