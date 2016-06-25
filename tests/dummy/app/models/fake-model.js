import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string', {defaultValue: 'fake-name'}),
  email: DS.attr('string',{defaultValue: 'fake-email'}),
  address: DS.attr('string',{defaultValue: 'fake-address'}),
  address2: DS.attr('string',{defaultValue: 'fake-address2'}),
  address3: DS.attr('string',{defaultValue: 'fake-address3'})
});
