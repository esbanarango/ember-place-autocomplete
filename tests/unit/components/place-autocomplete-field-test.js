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

    it("accetps 'inputId' option", function() {
      var component = this.subject();
      component.set('inputId', 'some-id');
      this.render();
      expect(component.get('inputId')).to.equal('some-id');
    });

    it("sets default 'inputId'", function() {
      var component = this.subject();
      this.render();
      expect(component.get('inputId')).to.equal('place-autocomplete--input');
    });
  }
);