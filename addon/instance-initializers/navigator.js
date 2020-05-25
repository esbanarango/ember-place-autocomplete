export function initialize(appInstance) {
  if(window && window.google){
    appInstance.register('navigator:main', window.navigator, { instantiate: false });
  }
}

export default {
  name: 'register-navigator',
  initialize
};
