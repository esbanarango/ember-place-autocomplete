import { describe, it, beforeEach, afterEach, context } from 'mocha';
import { expect, assert } from 'chai';
import destroyApp from './../helpers/destroy-app';
import startApp from './../helpers/start-app';
import Ember from 'ember';
import GooglePlaceAutocompleteResponseMock from './../helpers/google-place-autocomplete-response-mock';

const { $ } = Ember;

describe('Acceptance | place autocomplete', function() {
  let application;

  beforeEach(function() {
    application = startApp();
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
  });

  afterEach(function() {
    destroyApp(application);
  });

  context('place_changed is fired', function(){
    it('renders options from google', function(){
      visit('/');
      andThen(() =>{
        expect(find('.place-autocomplete--input').length).to.equal(1);
      });
      andThen(() => {
        $('.place-autocomplete--input').val('Medellin');
        $('.place-autocomplete--input').trigger('plan_changed');
        andThen(() => {
          expect($('.place-autocomplete--input').val(), 'Medellin');
          let timeOut = setTimeout(() => {
            assert(false, 'Event never fired');
          }, 1000);
          $('.place-autocomplete--input').on('plan_changed',() => {
            window.clearTimeout(timeOut);
            expect($('.pac-container').length > 0).to.equal(true);
          });
        });
      });
    });

    it('event listener works as expected', function(){
      visit('/');
      andThen(() =>{
        expect($('.place-autocomplete--input').val('El Poblado, Medellín - Antioquia, Colombia'));
        expect($('div[data-google-auto="done"]').length, 1);
      });
    });
  });
});