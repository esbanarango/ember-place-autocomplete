import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import { next } from '@ember/runloop';

export default Controller.extend({
  googlePlaceAutocompleteService: service('google-place-autocomplete'),

  async _getPlaceDetails(placeId) {
    let googleRequest = {
      placeId: placeId,
      fields: ['address_components', 'formatted_address', 'place_id', 'rating']
    };
    let placeDetails = await this.get('googlePlaceAutocompleteService').getDetails(googleRequest);
    this._refreshPrettyResponse(placeDetails);
  },

  _refreshPrettyResponse(placeDetails) {
    this.set('placeServiceResultJSON', null);
    next(() => {
      this.set('placeServiceResultJSON', JSON.stringify(placeDetails, undefined, 2));
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

    async requestPredictions(placeServiceInput) {
      if (isBlank(placeServiceInput)) {
        this.setProperties({ predictions: [], placeServiceResultJSON: null });
      }
      let properties = { input: placeServiceInput };
      let predictions = await this.get('googlePlaceAutocompleteService').getPlacePredictions(properties);
      this.set('predictions', predictions);
    }
  }
});
