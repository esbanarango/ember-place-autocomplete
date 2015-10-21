export default Ember.Controller.extend({

  actions:{
    done: function(){
      Ember.$('#message').fadeOut(500, () => {
        this.set('message', 'Focus out');
      }).fadeIn(500);
    },
    placeChanged: function(place){
      this.set('placeJSON', JSON.stringify(place, undefined, 2));
    },
    placeChangedSecondInput: function(place){
      this.set('placeJSONSecondInput', JSON.stringify(place, undefined, 2));
    }
  }
});