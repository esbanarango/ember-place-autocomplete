import layout from '../templates/components/place-autocomplete-field';
import Component from '@ember/component';
import { isArray } from '@ember/array';
import {
  isEmpty,
  isPresent,
  typeOf,
  isEqual,
  isBlank
} from '@ember/utils';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { getOwner }  from '@ember/application';

const RETRY_WINDOW = 100;

export default Component.extend({
  /* SERVICES
  ---------------------------------------------------------------------------*/
  placeAutocompleteManagerService: service('google-place-autocomplete/manager'),

  /* COMPUTED PROPERTIES
  ---------------------------------------------------------------------------*/
  isGoogleAvailable: computed('google', function() {
    return !!this.google;
  }),

  isGoogleMapsAvailable: computed('isGoogleAvailable', function() {
    return this.isGoogleAvailable && this.google.maps;
  }),

  /* HOOKS
  ---------------------------------------------------------------------------*/
  /**
   * Set default values in component init
   */
  init() {
    this._super(...arguments);
    this._applyDefaults();

    const owner = getOwner(this);
    const google = owner.lookup('google:main');
    const navigator = owner.lookup('navigator:main');

    this.setProperties({ google, navigator });
  },

  /**
   * @description Initialize component after is has been added to the DOM
   */
  didInsertElement() {
    this._super(...arguments);
    this._bindDataAttributesToInput();
    this.setupComponent();

    this.get('placeAutocompleteManagerService').register();
  },

  /**
   * @description Clean up component before removing it from the DOM
   */
  willDestroy() {
    if (isPresent(this.autocomplete)) {
      const google = this.google;

      this.get('placeAutocompleteManagerService').unregister();

      if(google && google.maps && google.maps.event) {
        google.maps.event.clearInstanceListeners(this.autocomplete);

        this
          .get('placeAutocompleteManagerService')
          .removePlacesAutoCompleteContainersIfRequired();
      }
    }
  },

  /**
   * @description Acts as an observer an updates the autocomplete instance with any
   * updated options that have been passed into the component.
   */
  didReceiveAttrs() {
    if (this.autocomplete) {
      this.autocomplete.setOptions(this.getOptions());
    }
  },

  /**
   * @description Returns an object containing any options that are
   * to be passed to the autocomplete instance.
   * @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
   */
  getOptions() {
    const google = this.google;
    const options = { types: this._typesToArray() };

    if (this.latLngBnds && Object.keys(this.latLngBnds).length === 2){
      const { sw, ne } = this.latLngBnds;
      options.bounds = new google.maps.LatLngBounds(sw, ne);
    }

    if (this.restrictions && Object.keys(this.restrictions).length > 0) {
      options.componentRestrictions = this.restrictions;
    }

    if (this.fields) {
      options.fields = this._fieldsToArray();
    } else if (this.placeIdOnly) {
      options.fields = ['place_id', 'name', 'types'];
    }

    return options;
  },

  // Wait until the google library is loaded by calling this method
  // every 100ms
  setupComponent() {
    if (document && this.isGoogleAvailable && this.isGoogleMapsAvailable) {
      this.setAutocomplete();
      if (this.withGeoLocate) {
        this.geolocateAndSetBounds();
      }
      this.autocomplete.addListener('place_changed', () => {
        this.placeChanged();
      });

    } else {
      if (!this.isDestroyed && !this.isDestroying) {
        later(this, 'setupComponent', RETRY_WINDOW);
      }
    }
  },

  keyDown(e) {
    if (this.preventSubmit && isEqual(e.keyCode, 13)) {
      e.preventDefault();
    }
  },

  setAutocomplete() {
    if (isEmpty(this.autocomplete)) {
      const inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
            google = this.google || window.google; //TODO: check how to use the inyected google object

      let autocomplete = new google.maps.places.Autocomplete(inputElement, this.getOptions());
      this.set('autocomplete', autocomplete);
    }
  },

  /**
   * @see https://developers.google.com/maps/documentation/javascript/places-autocomplete#set_search_area
   */
  geolocateAndSetBounds() {
    const { autocomplete } = this;
    if (this.navigator && this.navigator.geolocation && isPresent(autocomplete)) {
      this.navigator.geolocation.getCurrentPosition((position) => {
        const google = this.google;
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });

        autocomplete.setBounds(circle.getBounds());
      });
    }
  },

  placeChanged() {
    let place = this.autocomplete.getPlace();
    this._callCallback('placeChangedCallback', place);

    if (place[this.setValueWithProperty] !== undefined) {
      this.set('value', place[this.setValueWithProperty]);
    }
  },

  _callCallback(callback, place) {
    let callbackFn = this.get(callback);
    if (isEqual(typeOf(callbackFn), 'function')) {
      callbackFn(place);
    }

    return this.bubbles ? true : false;
  },

  _toArray(value) {
    if (isArray(value)) {
      return value;
    }
    else if (typeOf(value) === 'string') {
      if (value.trim() === '') {
        return [];
      }
      else {
        return value.split(',');
      }
    }
    else {
      return [];
    }
  },

  _typesToArray() {
    return this._toArray(this.types);
  },

  _fieldsToArray() {
    return this._toArray(this.fields);
  },

  _applyDefaults() {
    const defaultProperties = {
      layout,
      disabled: false,
      inputClass: 'place-autocomplete--input',
      types: undefined,
      restrictions: {},
      tabindex: 0,
      withGeoLocate: false,
      setValueWithProperty: undefined,
      preventSubmit: false,
      placeIdOnly: false
    };

    for(let property in defaultProperties) {
      if (isBlank(this.get(property))) {
        this.set(property, defaultProperties[property]);
      }
    }
  },

  _bindDataAttributesToInput() {
    if (!window || !document) {
      return false;
    }

    const componentProperties = Object.keys(this) || [];
    const properties = componentProperties.filter((prop) => prop.indexOf('data-') >= 0);
    const input = document.getElementById(this.elementId).getElementsByTagName('input')[0];

    properties.forEach((property) => input.setAttribute(property, this.get(property)));

    return true;
  },

  actions: {
    onBlur() {
      this._callCallback('onBlurCallback');
    }
  }
});
