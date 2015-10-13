export default Ember.Controller.extend({

  actions:{
    done: function(){
      Ember.$('#message').fadeOut(500, () => {
        this.set('message', 'Doing something after focus out');
      }).fadeIn(500);
    },
    placeChanged: function(place){
      this.set('placeJSON', JSON.stringify(place, undefined, 2));
    }
  }
});