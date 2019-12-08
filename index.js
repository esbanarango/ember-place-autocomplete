'use strict';

module.exports = {
  name: require('./package').name,

  contentFor: function(type, config) {
    var content = '';
    if (type === 'head') {
      var placeAutocompleteConfig = config['place-autocomplete'] || {},
         src = placeAutocompleteConfig.src || '//maps.googleapis.com/maps/api/js',
         params = [],
         exclude = placeAutocompleteConfig.exclude,
         client = placeAutocompleteConfig.client,
         version = parseFloat(placeAutocompleteConfig.version),
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
          params.push('region=' + encodeURIComponent(region));
        }

        src += '?' + params.join('&') + "&libraries=places";
        if (config.environment === 'test') {
          content = '<script type="text/javascript" src="' + src + '"></script>';
        } else {
          content = '<script type="text/javascript" src="' + src + '" async defer></script>';
        }
      }
    }
    return content;
  }
};
