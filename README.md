# Ember Place Autocomplete

![Download count all time](https://img.shields.io/npm/dt/ember-place-autocomplete.svg) [![Build Status](https://travis-ci.org/dmuneras/ember-place-autocomplete.svg?branch=master)](https://travis-ci.org/dmuneras/ember-place-autocomplete) [![Ember Observer Score](http://emberobserver.com/badges/ember-place-autocomplete.svg)](http://emberobserver.com/addons/ember-place-autocomplete) [![npm version](https://badge.fury.io/js/ember-place-autocomplete.svg)](https://badge.fury.io/js/ember-place-autocomplete)

## Description

Ember addon that provides a component which uses Google Places API to autocomplete place information when someone writes an address in a text field.

This addon is very simple and gives you all the information of a place from Google, you can do whatever you want with that information using a callback function.

![Autocomplete](http://i.imgur.com/wzGgfiY.gif)


## Installation

```
ember install ember-place-autocomplete
```

## Usage


In order to use this addon you just have to use the component in your templates.

```js

{{place-autocomplete-field
  value= model.address
  disabled=false
  inputClass= 'place-autocomplete--input'
  focusOutCallback=(action 'done') //Name of the action to execute
  placeChangedCallback=(action 'placeChanged') //Name of the action in the controller
  types='(cities)' //You don't have to pass this value, default value is 'geocode'
  restrictions= restrictionsObject // You can pass and object with restriction options.
  withGeoLocate= true // You don't have to pass this value, default value is false
  setValueWithProperty= 'formatted_address' // Optional, defaults to typical Google Autocomplete behavior
  preventSubmit= true // You don't have to pass this value, default value is false. Prevents the form to be submitted if the user hits ENTER
}}

```

You can supply your own Google API key or client ID in `config/environment.js`. You may also choose to exclude the Google API from the page if it is already loaded in your app. You may also choose to set the specific version of the google api.

```js
ENV['place-autocomplete'] = {
  exclude: true,
  key: 'AIZ...',
  client: 'gme-myclientid',
  version: 3.27, // Optional - if client is set version must be above 3.24
  language: 'en', // Optional - be default will be based on your browser language
  region: 'GB' // Optional
};
```


### Options:

**option**             | **description**
---                    | ---                 |
value                  | Model attribute whe re the address attribute is going to be stored.
focusOutCallback       | String : Name of the function that is going to be executed after focus out in the address input
placeChangedCallback   | String : Name of the function that is going to be executed when address changed
inputClass             | String : CSS class for the input.
types                  | String: featured types separate by comma describing the given result, for more info [Available types](https://developers.google.com/places/supported_types#table3)
restrictions           | Object: ex. `{country: "us"}`, more info [Component Restrictions](https://developers.google.com/maps/documentation/javascript/examples/geocoding-component-restriction)
placeIdOnly            | Boolean: Optional, defaults to false, only fetches the Place ID when calling the Google Places API (more details can be found [here](https://developers.google.com/maps/documentation/javascript/places-autocomplete#get_place_information))
withGeoLocate          | Boolean: ex. `true`, It allows searching places near by the coordinates given into browser. more info [See attribute options.bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)
setValueWithProperty   | String: Name of the property returned by Google to set the input field value after selection. more info about properties available you can find [here](https://developers.google.com/maps/documentation/javascript/3.exp/reference#PlaceResult)
latLngBounds           | Object: ex. `{sw: {lat: -34, lng: 151}, ne: {lat: -33, lng: 152}}`, It allows searching places near by the given coordinates. more info [See attribute options.bounds](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete)
preventSubmit          | Boolean: ex. `true`, allows to prevent the form to be submitted if the user selects a location and hit ENTER

## withGeoLocate in True
![Autocomplete-withGeoLocate](https://camo.githubusercontent.com/3516be6011e878d55d6d3eeaf6f6d2f48f371850/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f662e636c2e6c792f6974656d732f31593157324c31533036315932473063303732412f47656f6c6f636174696f6e5f67657443757272656e74506f736974696f6e5f5f5f2d5f5765625f415049735f5f5f4d444e2e706e673f763d6165383837656364)


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

```

If `placeIdOnly` is set to true you will only receive the place_id in the response here. This gives you more control on how to retrieve more details about the location. For instance you can use Reverse Geocoding by Place ID (https://developers.google.com/maps/documentation/javascript/examples/geocoding-place-id) which uses the Geocoding API that is approx. 10x cheaper than Places API.

### Example

```js
{
  "name": "Carrera 65",
  "place_id": "ChIJf_jt0QIpRI4RJ3oqKTE4GB0",
  "types": [
    "route"
  ]
}

```

## Security policy

If you are using [`ember-cli-content-security-policy`](https://github.com/rwjblue/ember-cli-content-security-policy) in your application, you have to add google maps to your white list in your config environment .

### Example

```js
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval' *.googleapis.com maps.gstatic.com",
      'font-src': "'self' fonts.gstatic.com",
      'connect-src': "'self' maps.gstatic.com",
      'img-src': "'self' *.googleapis.com maps.gstatic.com csi.gstatic.com data:",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com maps.gstatic.com assets-cdn.github.com"
    },

```

## Acceptance tests

If you're writting _acceptance tests_ for a part of you're application that interacts with `place-autocomplete-field` you will need to mock google's Autocomplete. The before each action of your acceptance test is a good place to do it.

Here's the code you need to add to your acceptance test file. And here's the [GooglePlaceAutocompleteResponseMock](https://github.com/dmuneras/ember-place-autocomplete/blob/master/tests/helpers/google-place-autocomplete-response-mock.js) file with a fake response.

```js

import GooglePlaceAutocompleteResponseMock from './../helpers/google-place-autocomplete-response-mock';

    // Mock only google places
    window.google.maps.places.Autocomplete = function() {
      return {
        addListener(event, f) {
          f.call();
        },
        getPlace() {
          return GooglePlaceAutocompleteResponseMock;
        },
        Circle(center, radio) {
          this.center = center;
          this.radio = radio;
          return {
            getBounds() {
              return {c: this.center, r: this.radio};
            }
          };
        },
        setBounds(circle) {
          return circle;
        }
      };
    };
```

## Collaborating


## Installation

* `git clone <repository-url>` this repository
* `cd ember-place-autocomplete`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests
* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
