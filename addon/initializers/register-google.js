export function initialize() {
  let application = arguments[1] || arguments[0];
  if(window && window.google){
    application.register('google:main', window.google, { instantiate: false });
    application.inject('component', 'google', 'google:main');
  }
}

export default {
  name: 'register-google',
  initialize: initialize
};
