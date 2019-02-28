import Controller from '@ember/controller';
import { later, next } from "@ember/runloop"

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.setProperties({ googleAuto: null, restrictions: { country: 'co' } });
  },

  _refreshPrettyResponse(blockProperty, placeDetails) {
    this.set(blockProperty, null);
    next(() => {
      this.set(blockProperty, JSON.stringify(placeDetails, undefined, 2));
    });
  },

  actions: {
    done() {
      let messageElement = document.getElementById('message');
      messageElement.classList.add('fade-in-element');
      this.set('message', 'blur blur blur');
      later(() => messageElement.classList.remove('fade-in-element'), 2000);
      later(() => this.set('message', null), 2100);
    },

    placeChanged(place) {
      this._refreshPrettyResponse('placeJSON', place);
      this.set('googleAuto', 'done');
      this.set('model.address', place.formatted_address);
    },

    placeChangedSecondInput(place) {
      this._refreshPrettyResponse('placeJSONSecondInput', place);
    }
  }
});
