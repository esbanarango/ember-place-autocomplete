/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-place-autocomplete',
  contentFor: function(type, config) {
    var content = '';
    if (type === 'body-footer') {
      var src = "//maps.googleapis.com/maps/api/js",
         placeAutocompleteConfig = config['place-autocomplete'] || {},
         params = [],
         exclude = placeAutocompleteConfig.exclude,
         client = placeAutocompleteConfig.client,
         version = placeAutocompleteConfig.version,
         key = placeAutocompleteConfig.key;
      if (!exclude) {
        if (key)
          params.push('key=' + encodeURIComponent(key));
        if (client)
          params.push('client=' + encodeURIComponent(client) + '&v=3.24');
        if (version && !client)
          params.push('v=' + encodeURIComponent(version));
        src += '?' + params.join('&') + "&libraries=places";
        content = '<script type="text/javascript" src="' + src + '"></script>';
      }
    }
    return content;
  }
};
