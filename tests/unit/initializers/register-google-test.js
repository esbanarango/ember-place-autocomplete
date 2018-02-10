/* jshint expr:true */
import { expect } from 'chai';
import { run } from '@ember/runloop';
import { describe, it, beforeEach } from 'mocha';
import Application from '@ember/application';
import { initialize } from 'ember-place-autocomplete/initializers/register-google';

describe('RegisterGoogleInitializer', function() {
  let container, application;

  beforeEach(function() {
    run(function() {
      application = Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(container, application);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
