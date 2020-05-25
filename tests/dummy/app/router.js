import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('usage', function() {
      this.route('component');
      this.route('service');
    });
    this.route('configuration');
    this.route('installation');

    this.route('addon-tests', function() {
      this.route('mocks');
    });
  });
});

export default Router;
