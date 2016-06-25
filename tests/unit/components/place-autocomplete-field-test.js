/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';

import GooglePlaceAutocompleteResponseMock from './../../helpers/google-place-autocomplete-response-mock';

describeComponent(
  'place-autocomplete-field',
  'PlaceAutoCompleteComponent',
  {
    // specify the other units that are required for this test
    needs: ['model:fake-model']
  },

  function() {
    it('renders', function() {
      var component = this.subject();
      expect(component._state).to.equal('preRender');

      // renders the component on the page
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it("accepts 'label' option", function() {
      var component = this.subject();
      component.set('label','address fake label');
      this.render();
      expect(component.get('label')).to.equal('address fake label');
    });

    it("accepts 'value' option and updates with google autocomplete response", function() {
      // Mock only google places
      window.google.maps.places = {
        Autocomplete() {
          return {
            addListener(event, f) {
              f.call();
            },
            getPlace() {
              return GooglePlaceAutocompleteResponseMock;
            }
          };
        }
      };
      var component = this.subject();
      var fakeModel = { address: 'fake address'};
      component.set('value',fakeModel.address);
      this.render();
      expect(component.get('value')).to.equal('Cra. 65, Medellín, Antioquia, Colombia');
    });

    it('converts types option to array', function(){
      var component = this.subject();
      component.set('types', 'geocode');
      expect(component._typesToArray()).to.eql(['geocode']);
    });

    it('converts types option to array more two elements', function(){
      var component = this.subject();
      component.set('types', 'geocode,establishment');
      expect(component._typesToArray()).to.eql(['geocode','establishment']);
    });

    it('converts types in an empty string', function(){
      var component = this.subject();
      component.set('types', '');
      expect(component._typesToArray()).to.eql([]);
    });

    it('get geolocate is not available', function(){
      var component = this.subject();
      var navigator = {
        geolocation: false
      };
      component.set('navigator', navigator);
      component.set("autocomplete", {
        setBounds: function () {
          expect().fail();
        }
      });
      component.geolocate();
    });

    it('get geolocate is available', function(){
      var component = this.subject();
      var position = {
        coords: {
          latitude: 1.09,
          longitude: 2.10,
          accuracy: 10.0
        }
      };
      window.navigator.geolocation = {
        getCurrentPosition(f) {
          f(position);
        }
      };
      // Mock only google places
      var google = {};
      google.maps = {
        Circle(center, radio) {
          this.center = center;
          this.radio = radio;
          return {
            getBounds() {
              return {c: this.center, r: this.radio};
            }
          };
        }
      };
      component.set('google', google);
      component.set("autocomplete", {
        setBounds: function (circle) {
          component.set('navigator', null);
          component.set('google', null);
          expect(circle).to.be.ok;
        }
      });
      component.geolocate();
    });

  }
);
