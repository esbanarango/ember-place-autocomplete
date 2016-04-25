export default Ember.Controller.extend({

  fullAddress: null,
  restrictions: {country: "co"},

  actions:{
    done: function(){
      Ember.$('#message').fadeOut(500, () => {
        this.set('message', 'Focus out');
      }).fadeIn(500);
    },
    placeChanged: function(place){
      this.set('placeJSON', JSON.stringify(place, undefined, 2));
      if (place.adr_address) {
        let regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
            fullAddress = place.adr_address.replace(regexp, "$2");
        this.set('cleanFullAddress', fullAddress);
      }
      this.set('fullAddress', place.adr_address);

    },
    placeChangedSecondInput: function(place){
      this.set('placeJSONSecondInput', JSON.stringify(place, undefined, 2));
    }
  }
});