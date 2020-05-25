import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  GoogleAutocompleteServiceMock,
  GooglePlacesServiceMock,
  GoogleAutocompleteSessionToken
} from 'ember-place-autocomplete/test-support';

module('Unit | Service | google place autocomplete', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.google.maps.places.AutocompleteService = GoogleAutocompleteServiceMock;
    window.google.maps.places.PlacesService = GooglePlacesServiceMock;
    window.google.maps.places.AutocompleteSessionToken = GoogleAutocompleteSessionToken;
    window.google.maps.places.PlacesServiceStatus = { OK: 'OK' };
  });

  test('#updateSessionToken', function(assert) {
    const service = this.owner.factoryFor('service:google-place-autocomplete').create();
    const { sessionToken: firstSessionToken } = service;

    service.updateSessionToken();

    assert.notDeepEqual(firstSessionToken.Pf, service.sessionToken.Pf, 'Updates session token after call');
  });

  test('#getDetails', async function(assert) {
    const service = this.owner.factoryFor('service:google-place-autocomplete').create();
    const { sessionToken: firstSessionToken } = service;
    const request = {
      placeId: 'ALWAYS_RETURN_THE_SAME',
      fields: ['address_components', 'formatted_address', 'place_id', 'rating']
    };

    await service.getDetails(request);

    assert.notDeepEqual(firstSessionToken.Pf, service.sessionToken.Pf, 'Refreshes session token after requesting place details');
  });

  test('#getPlacePredictions', async function(assert) {
    const service = this.owner.factoryFor('service:google-place-autocomplete').create();
    const { sessionToken: firstSessionToken } = service;
    let  i = 0;
    let usesSameToken = true;

    while(i < 5) {
      await service.getPlacePredictions({ input: 'El eslabón prendido' });
      usesSameToken = firstSessionToken.Pf === service.sessionToken.Pf;

      if (!usesSameToken) {
        break;
      }

      i += 1;
    }

    assert.equal(usesSameToken, true, 'It never updates sessionToken');
  });
});
