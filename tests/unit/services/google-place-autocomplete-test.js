import { expect } from 'chai';
import { describe, it, beforeEach, context } from 'mocha';
import { setupTest } from 'ember-mocha';
import {
  GoogleAutocompleteServiceMock,
  GooglePlacesServiceMock,
  GoogleAutocompleteSessionToken
} from 'ember-place-autocomplete/test-support';

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
      const service = this.owner.factoryFor('service:google-place-autocomplete').create();
      const { sessionToken: firstSessionToken } = service;

      service.updateSessionToken();

      expect(firstSessionToken.Pf).not.to.equal(service.sessionToken.Pf);
    });
  });


  context('getDetails', function() {
    it('refresh session token after requesting place details', async function() {
      const service = this.owner.factoryFor('service:google-place-autocomplete').create();
      const { sessionToken: firstSessionToken } = service;
      const request = {
        placeId: 'ALWAYS_RETURN_THE_SAME',
        fields: ['address_components', 'formatted_address', 'place_id', 'rating']
      };

      await service.getDetails(request);

      expect(firstSessionToken.Pf).not.to.equal(service.sessionToken.Pf);
    });
  });

  context('getPlacePredictions', function() {
    context('when placeDetails is not called', function() {
      it('never updates sessionToken', function() {
        const service = this.owner.factoryFor('service:google-place-autocomplete').create();
        const { sessionToken } = service;
        let  i = 0;

        while(i < 5) {
          service.getPlacePredictions({ input: 'El eslabón prendido' });
          expect(sessionToken.Pf).to.equal(service.sessionToken.Pf);
          i += 1;
        }
      });
    });
  });
});
