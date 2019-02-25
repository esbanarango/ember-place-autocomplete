import { visit } from '@ember/test-helpers';
import {
  describe,
  it,
  beforeEach,
  afterEach,
  context
} from 'mocha';
import { expect } from 'chai';
import destroyApp from './../helpers/destroy-app';
import startApp from './../helpers/start-app';
import $ from 'jquery';
import GooglePlaceAutocompleteMockedObject from './../helpers/google-place-autocomplete-object';

describe('Acceptance | place autocomplete', function() {
  let application;

  beforeEach(function() {
    application = startApp();
    // Mock only google places
    window.google.maps.__gjsload__ = function() {
      return true;
    };
    window.google.maps.places.Autocomplete = GooglePlaceAutocompleteMockedObject;
  });

  afterEach(function() {
    destroyApp(application);
  });

  context('place_changed is fired', function() {
    it('event listener works as expected', async function() {
      await visit('/');
      expect($('.place-autocomplete--input').val('El Poblado, Medellín - Antioquia, Colombia'));
      expect($('div[data-google-auto="done"]').length, 1);
    });
  });
});