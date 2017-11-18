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

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', this, 'setupComponent');
  },

  /**
   * Acts as an observer an updates the autocomplete instance with any
   * updated options that have been passed into the component.
   */
  didReceiveAttrs() {
    if (this.get('autocomplete')) {
      this.get('autocomplete').setOptions(this.getOptions());
    }
  },

  /**
   * Returns an object containing any options that are to be passed to the autocomplete instance.
   */
  getOptions() {

    const options = { types: this._typesToArray() };

    const latLngBnds = this.get('latLngBounds');

    if (latLngBnds && Object.keys(latLngBnds).length === 2){
      // @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
      const { sw, ne } = latLngBnds;
      options.bounds = new google.maps.LatLngBounds(sw, ne);
    }

    const restrictions = this.get('restrictions');

    if (restrictions && Object.keys(restrictions).length > 0) {
      options.componentRestrictions = restrictions;
    }

    return options;
  },

  // Wait until the google library is loaded by calling this method
  // every 100ms
  setupComponent() {
    if (document && window && window.google && window.google.maps) {
      this.setAutocomplete();
      if (this.get('withGeoLocate')) {
        this.geolocateAndSetBounds();
      }
      this.get('autocomplete').addListener('place_changed', () => {
        run(() => {
          this.placeChanged();
        });
      });
    } else {
      if (!this.isDestroyed && !this.isDestroying) {
        run.later(this, 'setupComponent', 100);
      }
    }
  },

  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || ((window) ? window.google : null);
      if(google && google.maps && google.maps.event) {
        google.maps.event.clearInstanceListeners(this.get('autocomplete'));
      }
    }
  },

  setAutocomplete() {
    if (isEmpty(this.get('autocomplete'))) {
      let inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
          google = this.get('google') || window.google; //TODO: check how to use the inyected google object

      let autocomplete = new google.maps.places.Autocomplete(inputElement, this.getOptions());
      this.set('autocomplete', autocomplete);
    }
  },

  // @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
  geolocateAndSetBounds() {
    let navigator = this.get('navigator') || ((window) ? window.navigator : null);
    let autocomplete = this.get('autocomplete');
    if (navigator && navigator.geolocation && isPresent(autocomplete)) {
      navigator.geolocation.getCurrentPosition((position) => {
        let google = this.get('google') || window.google;
        let geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
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
    if (this.get('types') !== '') {
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
