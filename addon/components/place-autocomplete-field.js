import Ember from 'ember';
import layout from '../templates/components/place-autocomplete-field';
import addressDetails from '../address-details';

export default Ember.Component.extend({
  layout: layout,
  disabled: false,
  detailsDisabled:true,
  showErrors: true,
  containerClass: 'place-autocomplete--container',
  labelClass: 'place-autocomplete--label',
  errorClass: 'place-autocomplete--error',
  inputClass: 'place-autocomplete--input',
  inputId: 'place-autocomplete',
  showDetails: true,
  requiredDetails: addressDetails.addressComponents,
  requireLocation: true,

  didInsertElement: function(){
    this.autocompleteCallback();
  },

  autocompleteCallback: function(){
    this.getAutocomplete();
    this.get('autocomplete').addListener('place_changed', () => { this.fillAllInformation(); });
  },

  getAutocomplete: function(){
    if( Ember.isEmpty(this.get('autocomplete')) ){
      var inputElement = document.getElementById(this.get('inputId')),
        google = this.get('google') || window.google;
      this.set('autocomplete', new google.maps.places.Autocomplete(inputElement,{types: ['geocode']}));
    }
  },

  fillAllInformation: function(){
    var place = this.get('autocomplete').getPlace();
    this.fillAddress(place);
    this.fillLocation(place);
  },

  fillAddress: function(place){
    var requiredDetails =  this.get('requiredDetails'),
      placeInformation = Ember.A([]);

    if( !Ember.isEmpty(place.address_components) ){
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (requiredDetails[addressType]) {
          placeInformation.push({
            'name': Ember.String.capitalize(addressType).replace(/_/g, ' '),
            'value' : place.address_components[i][requiredDetails[addressType]]
          });
        }
      }
    }
    this.set('placeInformation', placeInformation);
  },

  fillLocation: function(place){
    if( !Ember.isEmpty(place.geometry) ){
      this.set('locationDetails', {
        'lat' : place.geometry.location.lat(),
        'lng' : place.geometry.location.lng()
      });
    }
  },

  showLocationDetails: Ember.computed.and('locationDetails', 'requiredDetails'),
  showDetailsContainer: Ember.computed.and('placeInformation','showDetails'),

  actions:{
    focusOut: function(){
      var funcName = this.get("focusOutCallback");
      if( !Ember.isEmpty(funcName) && !Ember.isEmpty(this.get('contr')) && Ember.isEqual(Ember.typeOf(funcName), 'string')){
        this.get('contr').send(funcName);
      }
    }
  }
});