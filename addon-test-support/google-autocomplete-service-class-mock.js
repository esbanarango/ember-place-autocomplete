import GooglePlaceAutocompleteResponseMock from './google-place-autocomplete-response-mock';

class GoogleAutocompleteServiceMock {
  getPlacePredictions(properties, callback) {
    callback.call(GooglePlaceAutocompleteResponseMock, 'OK');
  }
}

export default GoogleAutocompleteServiceMock;