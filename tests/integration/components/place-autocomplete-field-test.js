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
    const passedProperties = EmberObject.create({
      placeholder: 'fake placeholder',
      name: 'fake-name',
      inputClass: 'fake-input-class',
      fakeModel,
      setValueWithProperty: null
    });

    this.set('passedProperties', passedProperties);

    await render(hbs`
      {{place-autocomplete-field
        placeholder=passedProperties.placeholder
        name=passedProperties.name
        inputClass=passedProperties.inputClass
        value=fakeModel.address
        setValueWithProperty=passedProperties.setValueWithProperty
        data-independiente-medellin='what is that'
      }}
    `);

    assert.strictEqual(find('input').getAttribute('placeholder').trim(), 'fake placeholder', 'Renders passed input placeholder');
    assert.strictEqual(find('input').getAttribute('name').trim(), 'fake-name', 'Renders passed input name');
    assert.strictEqual(find('input').classList.contains('fake-input-class'), true, 'Adds passed inputClass to input classes');
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
