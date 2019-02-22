import Router from '@ember/routing/router';
import config from './config/environment';

const AppRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

AppRouter.map(function() {
  this.route('about', { path: '/' });
  this.route('usage', function() {
    this.route('component');
    this.route('service');
  });
  this.route('configuration');
  this.route('installation');
});

export default AppRouter;
