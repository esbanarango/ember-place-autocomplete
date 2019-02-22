import Controller from '@ember/controller';
import { run } from "@ember/runloop"
import $ from 'jquery';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.setProperties({ googleAuto: null, restrictions: { country: 'co' } });
  },

  actions: {
    done() {
      $('#message').fadeOut(500, () => {
        run(() => this.set('message', 'Focus out'));
      }).fadeIn(500);
    },

    placeChanged(place) {
      this.setProperties({
        placeJSON: JSON.stringify(place, undefined, 2),
        googleAuto: 'done'
      });
      this.set('model.address', place.formatted_address);
    },

    placeChangedSecondInput(place){
      this.set('placeJSONSecondInput', JSON.stringify(place, undefined, 2));
    }
  }
});
