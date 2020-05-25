export function initialize(appInstance) {
  if(window && window.google){
    appInstance.register('google:main', window.google, { instantiate: false });
  }
}

export default {
  name: 'register-google',
  initialize
};
