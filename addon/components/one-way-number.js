import OneWayInput from './one-way-input';

export default OneWayInput.extend({
  type: 'number',
  sanitizeInput(input) {
    return Number(input);
  }
});
