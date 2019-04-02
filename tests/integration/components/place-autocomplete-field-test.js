import EmberObject from '@ember/object';
import { expect } from 'chai';
import { describe, it, context } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import GooglePlaceAutocompleteMockedObject from './../../helpers/google-place-autocomplete-object';
import { find } from 'ember-native-dom-helpers';
import { render } from '@ember/test-helpers';

describe('Integration | Component | Place Autocomplete Field', function() {
  setupRenderingTest();

  it("accepts 'placeholder' option", async function() {
    await render(hbs`{{place-autocomplete-field placeholder='fake placeholder'}}`);
    expect(find('input').getAttribute('placeholder').trim()).to.equal('fake placeholder');
  });

  it("accepts 'name' option", async function() {
    await render(hbs`{{place-autocomplete-field name='fake-name'}}`);
    expect(find('input').getAttribute('name').trim()).to.equal('fake-name');
  });

  it("accepts 'inputClass' option", async function() {
    await render(hbs`{{place-autocomplete-field inputClass='fake-input-class'}}`);
    expect(find('input').classList.contains('fake-input-class')).to.equal(true);
  });

  it("unset 'setValueWithProperty' option does not affect entered address", async function() {
    // Mock only google places
    window.google.maps.__gjsload__ = function() {
      return true;
    };
    window.google.maps.places.Autocomplete = GooglePlaceAutocompleteMockedObject;
    let fakeModel = EmberObject.extend({ address: 'fake address'}).create();
    this.set('fakeModel', fakeModel);
    await render(hbs`{{place-autocomplete-field value=fakeModel.address}}`);
    expect(this.get('fakeModel.address')).to.equal('fake address');
  });

  it("accepts 'value' option and updates with google autocomplete response", async function() {
    // Mock only google places
    window.google.maps.__gjsload__ = function() {
      return true;
    };
    window.google.maps.places.Autocomplete = GooglePlaceAutocompleteMockedObject;
    let fakeModel = EmberObject.extend({ address: 'fake address'}).create();
    this.set('fakeModel', fakeModel);
    await render(hbs`{{place-autocomplete-field value=fakeModel.address setValueWithProperty='formatted_address'}}`);
    expect(this.get('fakeModel.address')).to.equal('Cra. 65, Medellín, Antioquia, Colombia');
  });

  it("removes googles pac-container elements from the dom", async function() {
    // Mock only google places
    window.google.maps.__gjsload__ = function() {
      return true;
    };
    window.google.maps.places.Autocomplete = GooglePlaceAutocompleteMockedObject;
    let fakeModel = EmberObject.extend({ address: 'fake address'}).create();
    this.set('fakeModel', fakeModel);
    await render(hbs`{{place-autocomplete-field value=fakeModel.address}}`);
    const pacContainers = window.document.querySelectorAll('.pac-container');
    expect(this.get('fakeModel.address')).to.equal('fake address');
    expect(pacContainers).to.be.empty;
  });

  it('accepts data attributes to input', async function() {
    await render(hbs`{{place-autocomplete-field data-independiente-medellin='what is that'}}`);
    expect(find('input[data-independiente-medellin]')).to.be.ok
  });

  context('when entered value is not found in google', function() {
    it('sets the value of the not found place to the passed property', async function() {
      // Mock only google places
      window.google = {
        maps: {
          __gjsload__() {
            return true;
          },
          places: {
            Autocomplete() {
              return {
                addListener(event, f) {
                  f.call();
                },
                getPlace() {
                  return { name: 'james is not a city is just ja ja james' };
                },
                Circle(center, radio) {
                  this.center = center;
                  this.radio = radio;
                  return {
                    getBounds() {
                      return {c: this.center, r: this.radio};
                    }
                  };
                },
                __gjsload__() {
                  return true;
                },
                setBounds(circle) {
                  return circle;
                }
              };
            }
          }
        }
      }
      let fakeModel = EmberObject.extend({ address: 'james is not a city is just ja ja james'}).create();
      this.set('fakeModel', fakeModel);
      await render(hbs`{{place-autocomplete-field value=fakeModel.address}}`);
      expect(this.get('fakeModel.address')).to.equal('james is not a city is just ja ja james');
    });
  });
});
