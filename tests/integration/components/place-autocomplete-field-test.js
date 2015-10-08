/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'place-autocomplete-field',
  'Integration: PlaceAutocompleteFieldComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#place-autocomplete-field}}
      //     template content
      //   {{/place-autocomplete-field}}
      // `);

      this.render(hbs`{{place-autocomplete-field}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
