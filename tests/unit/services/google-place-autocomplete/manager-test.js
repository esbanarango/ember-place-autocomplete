import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | google-place-autocomplete/manager', function() {
  setupTest();

  // Replace this with your real tests.
  it('exists', function() {
    let service = this.owner.lookup('service:google-place-autocomplete/manager');
    expect(service).to.be.ok;
  });
});
