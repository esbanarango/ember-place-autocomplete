/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect, assert } from 'chai';
import Ember from 'ember';

import startApp from '../helpers/start-app';

describe('Acceptance : place autocomplete', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    Ember.run(application, 'destroy');
  });

  context('place_changed is fired', function(){
    it('renders options from google', function(){
      visit('/');
      andThen(() =>{
        expect(find('.place-autocomplete--input').length).to.equal(1);
      });
      andThen(() => {
        Ember.$('.place-autocomplete--input').val('Medellin');
        Ember.$('.place-autocomplete--input').trigger('plan_changed');
        andThen(() => {
          expect(Ember.$('.place-autocomplete--input').val(), 'Medellin');
          let timeOut = setTimeout(() => {
            assert(false, 'Event never fired');
          }, 1000);
          Ember.$('.place-autocomplete--input').on('plan_changed',() => {
            window.clearTimeout(timeOut);
            expect(Ember.$('.pac-container').length > 0).to.equal(true);
          });
        });
      });
    });

    it('event listener works as expected', function(){
      visit('/');
      andThen(() =>{
        expect(Ember.$('.place-autocomplete--input').val('El Poblado, Medellín - Antioquia, Colombia'));
        expect(Ember.$('div[data-google-auto="done"]').length, 1);
      });
    });
  });
});

