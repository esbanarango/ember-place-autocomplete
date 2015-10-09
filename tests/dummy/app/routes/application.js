import Ember from 'ember';

export default Ember.Route.extend({

  model: function(transition) {
    return this.store.createRecord('fake-model');
  }
});
