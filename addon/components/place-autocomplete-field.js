import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

const { Component, isEmpty, isPresent, typeOf, isEqual, run } = Ember;

export default Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',
  types: 'geocode',
  restrictions: {},
  tabindex: 0,
  withGeoLocate: false,
  setValueWithProperty: 'formatted_address',


  // @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
  geolocate() {
    let navigator = this.get('navigator') || ((window) ? window.navigator : null);
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let google = this.get('google') || window.google;
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.get('autocomplete').setBounds(circle.getBounds());
      });
    }
  },

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', this, 'setupComponent');
  },

  setupComponent() {
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => {
      run(() => { this.placeChanged(); });
    });
    if (this.get("withGeoLocate")) {
      this.geolocate();
    }
  },


  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || ((window) ? window.google : null);
      if(google.maps.event) {
        google.maps.event.clearInstanceListeners(this.get('autocomplete'));
      }
    }
  },

  getAutocomplete() {
    if(isEmpty(this.get('autocomplete'))){
      if(document && window){
        let inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
            google = this.get('google') || window.google, //TODO: check how to use the inyected google object
            options = { types: this._typesToArray() };
        if (Object.keys(this.get('restrictions')).length > 0) {
          options.componentRestrictions = this.get('restrictions');
        }
        let autocomplete = new google.maps.places.Autocomplete(inputElement, options);
        this.set('autocomplete', autocomplete);
      }
    }
  },

  placeChanged() {
    let place = this.get('autocomplete').getPlace();
    this._callCallback('placeChangedCallback', place);

    if (place[this.get('setValueWithProperty')] !== undefined) {
      this.set('value', place[this.get('setValueWithProperty')]);
    } else {
      // Address not found use value
      this.set('value', place.name);
    }
  },

  _callCallback(callback, place) {
    let callbackFn = this.get(callback);
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
    if (this.get('types') !== "") {
      return this.get('types').split(',');
    } else {
      return [];
    }
  },

  actions: {
    focusOut() {
      this._callCallback('focusOutCallback');
    }
  }
});
