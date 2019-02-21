import Controller from '@ember/controller';
import { run } from "@ember/runloop"
import $ from 'jquery';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.setProperties({ fullAddress: null, googleAuto: null, restrictions: { country: 'co' } });
  },

  actions: {
    done() {
      $('#message').fadeOut(500, () => {
        run(() => this.set('message', 'Focus out'));
      }).fadeIn(500);
    },

    placeChanged(place) {
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
    }
  }
});
