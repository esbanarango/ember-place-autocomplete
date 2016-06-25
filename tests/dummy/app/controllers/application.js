export default Ember.Controller.extend({

  fullAddress: null,
  googleAuto: null,
  restrictions: {country: "co"},

  actions:{
    done(){
      Ember.$('#message').fadeOut(500, () => {
        this.set('message', 'Focus out');
      }).fadeIn(500);
    },
    placeChanged(place){
      this.set('placeJSON', JSON.stringify(place, undefined, 2));
      this.set('googleAuto', 'done');
      if (place.adr_address) {
        let regexp = /(<span(?: \w+="[^"]+")*(?: \w+="[^"]+")*>([^<]*)<\/span>)/g,
            fullAddress = place.adr_address.replace(regexp, "$2");
        this.set('cleanFullAddress', fullAddress);
      }
      this.set('fullAddress', place.adr_address);
    },
    placeChangedSecondInput(place){
      this.set('placeJSONSecondInput', JSON.stringify(place, undefined, 2));
    },
    placeChangedThirdInput(place) {
      this.set('placeJSONThirdInput', JSON.stringify(place, undefined, 2));
    }
  }
});
