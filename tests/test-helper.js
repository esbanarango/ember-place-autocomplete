import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';
import { GooglePlaceAutocompleteResponse } from './helpers/google-place-autocomplete-response';

setResolver(resolver);

// Mock only google places
window.google.maps.places = {
  Autocomplete: function() {
    return {
      addListener: function(event, f) {
        f.call();
      },

      getPlace: function() {
        return GooglePlaceAutocompleteResponse;
      }
    };
  }
};