import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | PlaceAutocompleteField', function(hooks) {
  setupTest(hooks);

  test('_typesToArray', function(assert){
    const component = this.owner.lookup('component:place-autocomplete-field');

    assert.deepEqual(component._typesToArray(), [], 'Returns empty array when undefined/null');

    component.set('types', null);

    assert.deepEqual(component._typesToArray(), [], 'Returns empty array when type is undefined/null');

    component.set('types', '');

    assert.deepEqual(component._typesToArray(), [], 'Returns empty array when empty string as types');

    component.set('types', 'geocode');

    assert.deepEqual(component._typesToArray(), ['geocode'], 'Returns geocode when types includes `geocode`');


    component.set('types', 'geocode,establishment');

    assert.deepEqual(
      component._typesToArray(),
      ['geocode','establishment'],
      'Returns geocode when types includes `geocode`'
    );

    component.set('types', 'place_id,name,types');

    assert.deepEqual(component._typesToArray(), ['place_id', 'name', 'types'], 'Parses correctly types');
  });

  test('#getOptions', function(assert){
    const component = this.owner.lookup('component:place-autocomplete-field');

    component.set('placeIdOnly', true);

    const options = component.getOptions();

    assert.deepEqual(
      options.fields,
      ['place_id', 'name', 'types'],
      'populates the fields option when placeIdOnly is specified'
    );
  });

  test('#geolocateAndSetBounds', function(assert) {
    assert.expect(1);

    let component = this.owner.lookup('component:place-autocomplete-field');
    let navigator = {
      geolocation: false
    };

    component.setProperties({
      navigator,
      autocomplete: {
        setBounds() {
          assert.notOk(false, 'Called setBounds, but it shouldnt because geolocation is false');
        }
      }
    });

    component.geolocateAndSetBounds();

    const google = {};
    const Circle = function(center, radio) {
      this.center = center;
      this.radio = radio;
      return {
        getBounds() {
          return {c: this.center, r: this.radio};
        }
      };
    };

    navigator = {
      geolocation: {
        getCurrentPosition: function(fb) {
          const position = {
            coords: {
              latitude: 0,
              longitude: 0,
              accuracy: 100
            }
          };

          fb(position);
        }
      }
    };

    google.maps = {
      Circle,
      __gjsload__() {
        return true;
      }
    };

    component.setProperties({
      google,
      navigator,
      autocomplete: {
        setBounds: function () {
          if (!component.isDestroyed) {
            component.setProperties({
              navigator: null,
              google: null
            });
          }
          assert.ok(true, 'Calls setBounds because geolocation is enabled');
        }
      }
    });

    component.geolocateAndSetBounds();
  });
});
