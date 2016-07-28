import Ember from 'ember';

const {
  A: emberArray,
  Helper,
  isArray,
  isPresent,
  get
} = Ember;

export function contains([haystack, needle, valuePath]) {
  if (isArray(haystack)) {
    haystack = emberArray(haystack);

    if (valuePath) {
      return emberArray(haystack.mapBy(valuePath)).contains(get(needle, valuePath));
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

export default Helper.helper(contains);
