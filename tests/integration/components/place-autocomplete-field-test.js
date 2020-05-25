// BEGIN-SNIPPET tests-example.js

import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { GooglePlaceAutocompleteMockedObject } from 'ember-place-autocomplete/test-support';
import { render, find, settled } from '@ember/test-helpers';

module('Integration | place-autocomplete-field', function(hooks) {
  setupRenderingTest(hooks);

  test('renders passed attributes properly', async function(assert) {
    const fakeModel = EmberObject.create({ address: 'fake address'});

    await render(hbs`
      {{place-autocomplete-field
        placeholder='fake placeholder'
        name='fake-name'
        inputClass='fake-input-class'
        value=fakeModel.address
        data-independiente-medellin='what is that'
      }}
    `);

    const inputElement = find('input');

    assert.strictEqual(inputElement.getAttribute('placeholder').trim(), 'fake placeholder', 'Renders passed input placeholder');
    assert.strictEqual(inputElement.getAttribute('name').trim(), 'fake-name', 'Renders passed input name');
    assert.strictEqual(inputElement.classList.contains('fake-input-class'), true, 'Adds passed inputClass to input classes');
    assert.strictEqual(fakeModel.address, 'fake address', "unset 'setValueWithProperty' option does not affect entered address");
    assert.ok(find('input[data-independiente-medellin]'));
  });

  test( "sets value when 'setValueWithProperty' option it present", async function(assert) {
    // Mock only google places
    window.google.maps.__gjsload__ = function() {
      return true;
    };

    window.google.maps.places.Autocomplete = GooglePlaceAutocompleteMockedObject;
    const fakeModel = EmberObject.create({ address: 'fake address'});

    this.set('fakeModel', fakeModel);

    await render(hbs`
      {{place-autocomplete-field
        value=fakeModel.address
        setValueWithProperty="formatted_address"
      }}
    `);

    await settled();

    assert.strictEqual(
      fakeModel.address,
      'Cra. 65, Medellín, Antioquia, Colombia'
    );
  });
});
// END-SNIPPET
