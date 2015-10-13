# Ember Place Autocomplete

[![Build Status](https://travis-ci.org/dmuneras/ember-place-autocomplete.svg?branch=master)](https://travis-ci.org/dmuneras/ember-place-autocomplete)

## Description

Ember cli addon to provide a component that uses Google Places API to autocomplete place information when someone writes an address
in a text field.

## Usage

In order to use this addon you just have to use the component in your templates.

````js

{{place-autocomplete-field
  value= model.address
  label= "Model Address"
  error= model.errors.address
  showErrors= true
  contr= this
  containerClass= 'place-autocomplete--container'
  labelClass= 'place-autocomplete--label'
  errorClass= 'place-autocomplete--error'
  inputClass= 'place-autocomplete--input'
  focusOutCallback="done" //Name of the action in the controller
  placeChangedCallback="placeChanged" //Name of the action in the controller
}}

```

### Options:

**option**             | **description**
---                    | ---                 |
value                  | Model attribute whe re the address attribute is going to be stored.
label                  | String: Label for the address attribute input.
errors                 | Attribute validation errors to be able to display validation errors when needed.
showErrors             | Boolean: value to know if the attributes errors should be displayed.
contr                  | Controller that is going to handle the callbacks functions that could be triggered from the component.
focusOutCallback       | String : Name of the function that is going to be executed after focus out in the address input
placeChangedCallback   | String : Name of the function that is going to be executed when address changed
containerClass         | String : CSS class for the main component container.
labelClass             | String : CSS class for the label.
errorClass             | String : CSS class for errors.
inputClass             | String : CSS class for the attribute input.


## PlaceChangedCallback

This controller action is going to receive a javascript object with the response from Google Places API ([Response details](https://developers.google.com/places/web-service/details)). You can use the information as you wish.

### Example

```js
  {
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
}

``
## Collaborating


This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
