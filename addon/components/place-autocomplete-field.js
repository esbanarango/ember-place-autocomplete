import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';

export default Ember.Component.extend({
  layout: layout,
  disabled: false,
  inputClass: 'place-autocomplete--input',

  autocompleteCallback: Ember.on('didInsertElement', function() {
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => { this.placeChanged(); });
  }),

  getAutocomplete: function(){
    if( Ember.isEmpty(this.get('autocomplete')) ){
      let inputElement = document.getElementsByTagName('input')[0],
          google = this.get('google') || window.google; //TODO: check how to use the inyected google object
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement,{types: ['geocode']}));
    }
  },

  placeChanged: function(){
    this._callCallback("placeChangedCallback");
  },

  _isString: function(str){
    return Ember.isEqual(Ember.typeOf(str), 'string');
  },

  _callCallback: function(callback){
    let actionName = this.get(callback);
    if( !Ember.isEmpty(actionName) && !Ember.isEmpty(this.get('contr')) && this._isString(actionName) ){
      this.get('contr').send(actionName, this.get('autocomplete').get('place'));
    }
  },

  actions:{
    focusOut: function(){
      this._callCallback("focusOutCallback");
    }
  }
});