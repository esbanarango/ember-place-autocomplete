import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

const { Component, isEmpty, isPresent, typeOf, isEqual } = Ember;

export default Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',
  types: 'geocode',
  restrictions: {},
  tabindex: -1,

  didRender() {
    this._super(...arguments);
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', this.placeChanged.bind(this));
  },

  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || window.google;
      google.maps.event.clearInstanceListeners(this.get('autocomplete'));
    }
  },

  getAutocomplete(){
    if(isEmpty(this.get('autocomplete'))){
      let inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
          google = this.get('google') || window.google; //TODO: check how to use the inyected google object
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement,
        { types: this._typesToArray(), componentRestrictions: this.get('restrictions') }));
    }
  },

  placeChanged() {
    this._callCallback('placeChangedCallback');
  },

  _callCallback(callback) {
    let callbackFn = this.attrs[callback];
    let place      = this.get('autocomplete').get('place');
    if (isEqual(typeOf(callbackFn), 'function')) {
      callbackFn(place);
    } else {
      let actionName = this.get(callback);
      if (isPresent(this.get('handlerController')) && isPresent(actionName)) {
        this.get('handlerController').send(actionName, place);
      }
    }
  },

  _typesToArray() {
    return this.get('types').split();
  },

  actions: {
    focusOut() {
      this._callCallback('focusOutCallback');
    }
  }
});