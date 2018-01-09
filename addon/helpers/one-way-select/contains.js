import Helper from '@ember/component/helper';
import { A as emberArray, isArray } from '@ember/array';
import { isPresent } from '@ember/utils';
import { get } from '@ember/object';

export function contains([haystack, needle, valuePath, targetPath]) {
  if (isArray(haystack)) {
    haystack = emberArray(haystack);

    if (valuePath) {
      haystack = targetPath ? haystack : haystack.mapBy(valuePath);
      return emberArray(haystack).includes(get(needle, valuePath));
    } else {
      return haystack.includes(needle);
    }
  } else {
    if (valuePath && isPresent(haystack) && isPresent(needle)) {
      haystack = targetPath ? haystack : get(haystack, valuePath);
      return haystack === get(needle, valuePath);
    } else {
      return haystack === needle;
    }
  }
}

export default Helper.helper(contains);
