import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Integration | Component | PlaceAutocompleteField', function() {
  setupTest('component:place-autocomplete-field');

  it('returns empty array on undefined/null', function(){
    let component = this.subject();
    expect(component._typesToArray()).to.eql([]);

    component.set('types', null);
    expect(component._typesToArray()).to.eql([]);
  });

  it('converts types option to array', function(){
    let component = this.subject();
    component.set('types', 'geocode');
    expect(component._typesToArray()).to.eql(['geocode']);
  });

  it('converts types option to array more two elements', function(){
    let component = this.subject();
    component.set('types', 'geocode,establishment');
    expect(component._typesToArray()).to.eql(['geocode','establishment']);
  });

  it('converts types in an empty string', function(){
    let component = this.subject();
    component.set('types', '');
    expect(component._typesToArray()).to.eql([]);
  });

  it('supports array passed as types option', function() {
    let component = this.subject();
    component.set('types', ['geocode', 'establishment']);
    expect(component._typesToArray()).to.eql(['geocode', 'establishment']);
  });

  it('get geolocate is not available', function(){
    let component = this.subject();
    let navigator = {
      geolocation: false
    };
    component.setProperties({
      navigator: navigator,
      autocomplete: {
        setBounds() {
          expect().fail();
        }
      }
    });
    component.geolocateAndSetBounds();
  });

  it('get geolocate is available', function() {
    let component = this.subject();
    let google = {};
    google.maps = {
      Circle(center, radio) {
        this.center = center;
        this.radio = radio;
        return {
          getBounds() {
            return {c: this.center, r: this.radio};
          }
        };
      },
      __gjsload__() {
        return true;
      }
    };
    component.set('google', google);
    component.set('autocomplete', {
      setBounds: function (circle) {
        if (!component.isDestroyed) {
          component.setProperties({
            navigator: null,
            google: null
          });
        }
        expect(circle).to.be.ok;
      }
    });
    component.geolocateAndSetBounds();
  });
});
