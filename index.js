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
         version = parseInt(placeAutocompleteConfig.version),
         key = placeAutocompleteConfig.key,
         language = placeAutocompleteConfig.language,
         region = placeAutocompleteConfig.region;
      if (!exclude) {
        if (key) {
          params.push('key=' + encodeURIComponent(key));
        }

        if (client) {
          params.push('client=' + encodeURIComponent(client));
        }

        if (version) {
          if (client && version < 3.24) {
            version = 3.24;
          }
          params.push('v=' + encodeURIComponent(version));
        }

        if (language) {
          params.push('language=' + encodeURIComponent(language));
        }

        if (region) {
          params.push('region=' + encodeURIComponent(language));
        }

        src += '?' + params.join('&') + "&libraries=places";
        content = '<script type="text/javascript" src="' + src + '"></script>';
      }
    }
    return content;
  }
};
