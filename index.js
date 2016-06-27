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
         exclude = placesAutocompleteConfig.exclude,
         key = placeAutocompleteConfig.key;
      if (!exclude) {
        if (key)
          params.push('key=' + encodeURIComponent(key));
        src += '?' + params.join('&') + "&libraries=places";
        content = '<script type="text/javascript" src="' + src + '"></script>';
      }
    }
    return content;
  }
};
