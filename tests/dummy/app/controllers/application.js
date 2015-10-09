export default Ember.Controller.extend({

  requiredInformation: {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
  },
  actions:{
    done: function(){
      var self = this;
      Ember.$('#message').fadeOut(500, () => {
        this.set('message', 'Doing something after focus out');
      }).fadeIn(500);
    }
  }
});