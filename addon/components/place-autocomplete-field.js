import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

export default Ember.Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',
  inputId: 'place-autocomplete--input',

  autocompleteCallback: Ember.on('didInsertElement', function() {
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => { this.placeChanged(); });
  }),

  getAutocomplete: function(){
    if( Ember.isEmpty(this.get('autocomplete')) ){
      let inputElement = document.getElementById(this.get('inputId')),
          google = this.get('google') || window.google; //TODO: check how to use the inyected google object
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement,{types: ['geocode']}));
    }
  },

  placeChanged: function(){
    this._callCallback('placeChangedCallback');
  },

  _callCallback: function(callback){
    let actionName = this.get(callback);
    if(Ember.isPresent(actionName) && Ember.isPresent(this.get('handlerController'))){
      this.get('handlerController').send(actionName, this.get('autocomplete').get('place'));
    }
  },

  actions:{
    focusOut: function(){
      this._callCallback('focusOutCallback');
    }
  }
});