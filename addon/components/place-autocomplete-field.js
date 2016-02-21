import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

const { Component, isEmpty, isPresent, typeOf, isEqual } = Ember;

export default Ember.Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',
  types: 'geocode',
  tabindex: -1,

  didRender() {
    this._super(...arguments);
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', this.placeChanged.bind(this));
  },

  willDestroy() {
    if (isPresent(this.get('autocomplete'))) {
      let google = this.get('google') || window.google;
      google.maps.event.clearInstanceListeners(this.get('autocomplete'));
    }
  },

  getAutocomplete() {
    if (isEmpty(this.get('autocomplete'))) {
      let inputElement = this.$('input')[0],
        google = this.get('google') || window.google; //TODO: check how to use the injected google object
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement, { types: this._typesToArray() }));
    }
  },

  placeChanged() {
    this._callCallback('placeChangedAction');
  },

  _callCallback(callback) {
    let actionName = this.get(callback);
    let callbackFn = this.attrs[callback];
    if (isPresent(actionName) && isEqual(typeOf(callbackFn), 'function')) {
      this.attrs[callback](this.get('autocomplete').get('place'));
    }
  },

  _typesToArray() {
    return this.get('types').split();
  },

  actions: {
    focusOut() {
      this._callCallback('focusOutCallback');
    }
  }
});