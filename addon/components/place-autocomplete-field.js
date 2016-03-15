import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

export default Ember.Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',
  types: 'geocode',

  autocompleteCallback: Ember.on('didInsertElement', function() {
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => { this.placeChanged(); });
  }),

  getAutocomplete: function(){
    if( Ember.isEmpty(this.get('autocomplete')) ){
      let inputElement = document.getElementById(this.elementId).getElementsByTagName('input')[0],
          google = this.get('google') || window.google; //TODO: check how to use the inyected google object
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement,{ types: this._typesToArray() }));
    }
  },

  placeChanged: function(){
    this._callCallback('placeChangedCallback');
  },

  _callCallback: function(callback){
    let actionName = this.get(callback);
    if(Ember.isPresent(actionName) && Ember.isPresent(this.get('handlerController'))){
      this.get('handlerController').send(actionName, this.get('autocomplete').get('place'));
      // Clicking on the auto-complete result does NOT update this.value - Ember 2.4.1
      this.set('value', Ember.$('input').val());
    }
  },

  _typesToArray: function(){
    return this.get('types').split();
  },

  actions:{
    focusOut: function(){
      this._callCallback('focusOutCallback');
    }
  }
});
