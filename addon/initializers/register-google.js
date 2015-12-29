export function initialize() {
  let application = arguments[1] || arguments[0];

  application.register('google:main', window.google, { instantiate: false });
  application.inject('component', 'google', 'google:main');
}

export default {
  name: 'register-google',
  initialize: initialize
};
