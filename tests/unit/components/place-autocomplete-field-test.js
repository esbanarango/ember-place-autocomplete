/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';

describeComponent(
  'place-autocomplete-field',
  'PlaceAutoCompleteComponent',
  {
    // specify the other units that are required for this test
    needs: ['model:fake-model']
  },

  function() {
    it('renders', function() {
      var component = this.subject();
      expect(component._state).to.equal('preRender');

      // renders the component on the page
      this.render();
      expect(component._state).to.equal('inDOM');
    });

    it("accetps 'label' option", function() {
      var component = this.subject();
      component.set('label','address fake label');
      this.render();
      expect(component.get('label')).to.equal('address fake label');
    });

    it("accetps 'value' option", function() {
      var component = this.subject();
      var fakeModel = { address: 'fake address'};
      component.set('value',fakeModel.address);
      this.render();
      expect(component.get('value')).to.equal('fake address');
    });

    it('converts types option to array', function(){
      var component = this.subject();
      component.set('types', 'geocode');
      expect(component._typesToArray()).to.eql(['geocode']);
    });

    it('converts types option to array more two elements', function(){
      var component = this.subject();
      component.set('types', 'geocode,establishment');
      expect(component._typesToArray()).to.eql(['geocode','establishment']);
    });

    it('converts types in an empty string', function(){
      var component = this.subject();
      component.set('types', '');
      expect(component._typesToArray()).to.eql("");
    });
  }
);
