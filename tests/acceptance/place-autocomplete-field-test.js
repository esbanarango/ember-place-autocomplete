import { describe, it, beforeEach, afterEach, context } from 'mocha';
import { expect } from 'chai';
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
    window.google.maps.__gjsload__ = function() {
      return true;
    };
    window.google.maps.places.Autocomplete = function() {
      return {
        addListener(event, f) {
          f.call();
        },
        getPlace() {
          return GooglePlaceAutocompleteResponseMock;
        },
        Circle(center, radio) {
          this.center = center;
          this.radio = radio;
          return {
            getBounds() {
              return {c: this.center, r: this.radio};
            }
          };
        },
        setBounds(circle) {
          return circle;
        }
      };
    };
  });

  afterEach(function() {
    destroyApp(application);
  });

  context('place_changed is fired', function() {
    it('event listener works as expected', function() {
      visit('/');
      andThen(() =>{
        expect($('.place-autocomplete--input').val('El Poblado, Medellín - Antioquia, Colombia'));
        expect($('div[data-google-auto="done"]').length, 1);
      });
    });
  });
});