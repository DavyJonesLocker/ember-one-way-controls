import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('documentation', function() {
    this.route('index', { path: '/' });
    this.route('installation');
    this.route('quickstart');

    this.route('one-way-input');
    this.route('one-way-textarea');
    this.route('one-way-checkbox');
    this.route('one-way-radio');
    this.route('one-way-select');
  });
});

export default Router;
