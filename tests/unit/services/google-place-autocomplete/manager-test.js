import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | google-place-autocomplete/manager', function(hooks) {
  setupTest(hooks);

  test('exists', function(assert) {
    const service = this.owner.lookup('service:google-place-autocomplete/manager');

    assert.ok(service);
  });
});
