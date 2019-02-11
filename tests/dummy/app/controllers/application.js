import Controller from '@ember/controller';
import { run } from "@ember/runloop"
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Controller.extend({
  googleAutocompleteService: service('google-autocomplete'),

  init() {
    this._super(...arguments);
    this.setProperties({ fullAddress: null, googleAuto: null, restrictions: {country: 'co'} });
  },

  actions: {
    done() {
      $('#message').fadeOut(500, () => {
        run(() => this.set('message', 'Focus out'));
      }).fadeIn(500);
    },

    placeChanged(place) {
      this.set('placeJSON', JSON.stringify(place, undefined, 2));
      this.set('googleAuto', 'done');
      if (place.adr_address) {
        let regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
            fullAddress = place.adr_address.replace(regexp, "$2");
        this.set('cleanFullAddress', fullAddress);
      }
      this.set('fullAddress', place.adr_address);
    },

    placeChangedSecondInput(place){
      this.set('placeJSONSecondInput', JSON.stringify(place, undefined, 2));
    },

    placeChangedThirdInput(place) {
      this.set('placeJSONThirdInput', JSON.stringify(place, undefined, 2));
    },

    requestPredictions(placeServiceInput) {
      let properties = { input: placeServiceInput };
      this.get('googleAutocompleteService').getPlacePredictions(properties).then((predictions) => {
        this.set('predictions', predictions);
      });
    },

    getPlaceDetails(placeId) {
      let googleRequest = {
        placeId: placeId,
        fields: ['address_components', 'formatted_address', 'place_id', 'rating']
      };
      this.get('googleAutocompleteService').getDetails(googleRequest).then((placeResult) => {
        this.set('placeServiceResultJSON', JSON.stringify(placeResult, undefined, 2));
      });
    }
  }
});
