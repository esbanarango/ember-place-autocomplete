import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'fake-name'}),
  email: DS.attr('string',{defaultValue: 'fake-email'}),
  address: DS.attr('string',{defaultValue: 'fake-address'})
});
