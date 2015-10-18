import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);

// Mocking google places service
var placeInformation = {
  "address_components": [
    {
      "long_name": "Carrera 65",
      "short_name": "Cra. 65",
      "types": [
        "route"
      ]
    },
    {
      "long_name": "Medellín",
      "short_name": "Medellín",
      "types": [
        "locality",
        "political"
      ]
    },
    {
      "long_name": "Antioquia",
      "short_name": "Antioquia",
      "types": [
        "administrative_area_level_1",
        "political"
      ]
    },
    {
      "long_name": "Colombia",
      "short_name": "CO",
      "types": [
        "country",
        "political"
      ]
    }
  ],
  "adr_address": "<span> class=\"street-address\"</span>Cra. 65</spa>n</span>, <span> class=\"locality\"</span>Medellín</spa>n</span>, <span> class=\"region\"</span>Antioquia</spa>n</span>, <span> class=\"country-name\"</span>Colombia</spa>n</span>",
  "formatted_address": "Cra. 65, Medellín, Antioquia, Colombia",
  "geometry": {
    "location": {}
  },
  "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
  "id": "22239bf10d4e7c0cc69bf635098c0d61c1a5b69e",
  "name": "Carrera 65",
  "place_id": "ChIJf_jt0QIpRI4RJ3oqKTE4GB0",
  "reference": "CpQBhQAAAC6cyMkVkoXenESGPRBGIFfY4hK6Mz7Z_OHK78V-fEcZeKwvB6Hh4vTh42NpH_8CuFBDNxx6-GObDN0VYsF9wEy3Sqn85-r15w2pG6VUZb8L4xUBTQiFE5_7hpOO7SbQhuQ_DJQj0OsA5HzmdCCsn4P9JFn_UEy05haFsF4wIDQIZrIt7PYdvVvZpuuohJBhxxIQHFOm6bZXMG6aCTQeRTsBThoUAUWEkPRslBO2jYpJBLsvTNC9QXU",
  "scope": "GOOGLE",
  "types": [
    "route"
  ],
  "url": "https://maps.google.com/maps/place?q=Cra.+65,+Medell%C3%ADn,+Antioquia,+Colombia&&ftid=0x8e442902d1edf87f:0x1d183831292a7a27",
  "vicinity": "Medellín",
  "html_attributions": []
};

window.google = {
  maps: {
    places: {
      Autocomplete: function(){
        return  placeInformation;
      }
    }
  }
};