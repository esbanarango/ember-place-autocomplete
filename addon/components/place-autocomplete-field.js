import layout from '../templates/components/place-autocomplete-field';
import Component from '@ember/component';
import { isArray } from '@ember/array';
import { isEmpty, isPresent, typeOf, isEqual, isBlank } from '@ember/utils';
import { scheduleOnce, run } from "@ember/runloop";

export default Component.extend({
  /**
   * Set default values in component init
   */
  init() {
    this._super(...arguments);
    this._applyDefaults();
  },

  didInsertElement() {
    this._super(...arguments);
    // TODO: check if a block was passed to avoid trying to set
    // the data attributes
    this._bindDataAttributesToInput();
    scheduleOnce('afterRender', this, 'setupComponent');
  },

  /**
   * Acts as an observer an updates the autocomplete instance with any
   * updated options that have been passed into the component.
   */
  didReceiveAttrs() {
    if (this.autocomplete) {
      this.autocomplete.setOptions(this.getOptions());
    }
  },

  /**
   * Returns an object containing any options that are to be passed to the autocomplete instance.
   */
  getOptions() {
    const google = this.get('google') || ((window) ? window.google : null);
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
      this.autocomplete.addListener('place_changed', () => {
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

  keyDown(e) {
    if (this.get('preventSubmit') && isEqual(e.keyCode, 13)) {
      e.preventDefault();
    }
  },

  willDestroy() {
    if (isPresent(this.autocomplete)) {
      let google = this.get('google') || ((window) ? window.google : null);
      if(google && google.maps && google.maps.event) {
        google.maps.event.clearInstanceListeners(this.autocomplete);
      }
    }
  },

  setAutocomplete() {
    if (isEmpty(this.autocomplete)) {
      const inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
            google = this.get('google') || window.google; //TODO: check how to use the inyected google object

      let autocomplete = new google.maps.places.Autocomplete(inputElement, this.getOptions());
      this.set('autocomplete', autocomplete);
    }
  },

  // @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
  geolocateAndSetBounds() {
    let navigator = this.get('navigator') || ((window) ? window.navigator : null);
    let autocomplete = this.autocomplete;
    if (navigator && navigator.geolocation && isPresent(autocomplete)) {
      navigator.geolocation.getCurrentPosition((position) => {
        const google = this.get('google') || window.google;
        const geolocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        const circle = new google.maps.Circle({ center: geolocation, radius: position.coords.accuracy });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  },

  placeChanged() {
    let place = this.autocomplete.getPlace();
    this._callCallback('placeChangedCallback', place);

    // If setValueWithProperty is undefined, use Google Autocomplete default behavior
    if (place[this.get('setValueWithProperty')] !== undefined) {
      this.set('value', place[this.get('setValueWithProperty')]);
    }
  },

  _callCallback(callback, place) {
    let callbackFn = this.get(callback);
    if (isEqual(typeOf(callbackFn), 'function')) {
      callbackFn(place);
    }
  },

  _typesToArray() {
    let types = this.get('types');

    if (isArray(types)) {
      return types;
    }
    else if (typeOf(types) === 'string') {
      if (types.trim() === '') {
        return [];
      }
      else {
        return types.split(',');
      }
    }
    else {
      return [];
    }
  },

  _applyDefaults() {
    const defaultProperties = {
      layout: layout,
      disabled: false,
      inputClass: 'place-autocomplete--input',
      types: undefined,
      restrictions: {},
      tabindex: 0,
      withGeoLocate: false,
      setValueWithProperty: undefined,
      preventSubmit: false
    };

    for(let property in defaultProperties) {
      if (isBlank(this.get(property))) {
        this.set(property, defaultProperties[property]);
      }
    }
  },

  _bindDataAttributesToInput() {
    let properties = Object.keys(this).filter((prop) => prop.indexOf('data-') >= 0) || [];
    let input = document.getElementById(this.elementId).getElementsByTagName('input')[0];
    properties.forEach((property) => input.setAttribute(property, this.get(property)));
  },

  actions: {
    focusOut() {
      this._callCallback('focusOutCallback');
    }
  }
});
