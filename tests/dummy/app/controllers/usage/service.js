import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';

export default Controller.extend({
  googlePlaceAutocompleteService: service('google-place-autocomplete'),

  _getPlaceDetails(placeId) {
    let googleRequest = {
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'place_id', 'rating']
    };
    this.get('googlePlaceAutocompleteService').getDetails(googleRequest).then((placeResult) => {
      this.set('placeServiceResultJSON', JSON.stringify(placeResult, undefined, 2));
    });
  },

  actions: {
    findPlaceDetails(selectedPlace) {
      if (isBlank(selectedPlace)) {
        this.setProperties({
          selectedPlace: null,
          predictions: [],
          placeServiceResultJSON: null
        });
        return;
      }
      this._getPlaceDetails(selectedPlace.place_id);
      this.setProperties({
        selectedPlace: selectedPlace,
        predictions: []
      });
    },

    requestPredictions(placeServiceInput) {
      if (isBlank(placeServiceInput)) {
        this.setProperties({ predictions: [], placeServiceResultJSON: null });
      }
      let properties = { input: placeServiceInput };
      this.get('googlePlaceAutocompleteService').getPlacePredictions(properties).then((predictions) => {
        this.set('predictions', predictions);
      });
    }
  }
});
