import { expect } from 'chai';
import { describe, it, beforeEach, context } from 'mocha';
import { setupTest } from 'ember-mocha';
import GoogleAutocompleteServiceMock from './../../helpers/google-autocomplete-service-class-mock';
import GooglePlacesServiceMock from './../../helpers/google-places-service-mock';
import GoogleAutocompleteSessionToken from './../../helpers/google-autocomplete-session-token';

describe('Unit | Service | google place autocomplete', function() {
  setupTest('service:google-place-autocomplete');

  beforeEach(function() {
    window.google.maps.places.AutocompleteService = GoogleAutocompleteServiceMock;
    window.google.maps.places.PlacesService = GooglePlacesServiceMock;
    window.google.maps.places.AutocompleteSessionToken = GoogleAutocompleteSessionToken;
    window.google.maps.places.PlacesServiceStatus = { OK: 'OK' };
  })

  context('updateSessionToken', function() {
    it('updates service session token', function() {
      let service = this.subject();
      let firstSessionToken = service.get('sessionToken');
      service.updateSessionToken();
      expect(firstSessionToken.Pf).not.to.equal(service.get('sessionToken').Pf);
    });
  });


  context('getDetails', function() {
    it('refresh session token after requesting place details', function() {
      let service = this.subject();
      let firstSessionToken = service.get('sessionToken');
      let request = {
        placeId: 'ALWAYS_RETURN_THE_SAME',
        fields: ['address_components', 'formatted_address', 'place_id', 'rating']
      };

      return service.getDetails(request).then(() => {
        expect(firstSessionToken.Pf).not.to.equal(service.get('sessionToken').Pf);
      });
    });
  });

  context('getPlacePredictions', function() {
    context('when placeDetails is not called', function() {
      it('never updates sessionToken', function() {
        let service = this.subject();
        let sessionToken = service.get('sessionToken');
        let i = 0;
        while(i < 5) {
          service.getPlacePredictions({ input: 'El eslabón prendido' });
          expect(sessionToken.Pf).to.equal(service.get('sessionToken').Pf);
          i += 1;
        }
      });
    });
  });
});
