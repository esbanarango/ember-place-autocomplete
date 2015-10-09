export function initialize(container, application) {
  application.register('google:main', window.google, { instantiate: false });
  application.inject('component', 'google', 'google:main');
}

export default {
  name: 'register-google',
  initialize: initialize
};
