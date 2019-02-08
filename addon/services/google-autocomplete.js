import Service from '@ember/service';
import { Promise as EmberPromise } from 'rsvp';
import { isBlank } from '@ember/utils';

export default Service.extend({
  init() {
    this._super(...arguments);
    const google = this.get('google') || ((window) ? window.google : null);
    let service = new google.maps.places.AutocompleteService();
    let sessionToken = new google.maps.places.AutocompleteSessionToken();
    this.setProperties({ autocompleteService: service, google: google, sessionToken: sessionToken });
  },

  getPredictions(properties) {
    if (!properties.hasOwnProperty('input')) {
      return EmberPromise.reject(
        new Error('[service/google-autocomplete] input property was not passed inside properties object param')
      );
    }

    if (isBlank(properties.input)) {
      return EmberPromise.resolve([]);
    }

    return new EmberPromise((resolve, reject) => {
      this.get('autocompleteService').getPlacePredictions(
        properties,
        this._placePredictionCallback.bind(this, [resolve])
      );
    });
  },

  _placePredictionCallback(promiseCallbacks, predictions, status) {
    const google = this.get('google') || ((window) ? window.google : null);
    const [resolve] = promiseCallbacks;
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      return resolve(predictions);
    }
    resolve([]);
  }
});
