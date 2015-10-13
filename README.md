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
  errors= model.errors.address
  showErrors= true
  contr= this
  containerClass= 'place-autocomplete--container'
  labelClass= 'place-autocomplete--label'
  errorClass= 'place-autocomplete--error'
  inputClass= 'place-autocomplete--input'
  requiredDetails= requiredDetails
  showDetails=true
}}

```
### Options:

**option**       | **description**
---              | ---            |
value            | Model attribute where the address attribute is going to be stored.
label            | String: Label for the address attribute input.
errors           | Attribute validation errors to be able to display validation errors when needed.
showErrors       | Boolean: value to know if the attributes errors should be displayed.
contr            | Controller that is going to handle the **focusOutCallback** function that could be triggered from the component.
containerClass   | String : CSS class for the main component container.
labelClass       | String : CSS class for the label.
errorClass       | String : CSS class for errors.
inputClass       | String : CSS class for the attribute input.
requiredDetails  | Details that you want to display and which style is going to be used to display it.
requireLocation  | Boolean: to know if location details should be displayed
showDetails      | Boolean: to know if google Details described in **requiredDetails** should be displayed.
detailsDisable   | Boolean: to indicate if the details fields should be disabled or not.
focusOutCallback | String : Name of the function that is going to be executed after focus out in the address input

#### requitedDetails

you can defined a variable in you controller to tell the component which google Details you want to display and the style you want to use. Ex:
```js
 export default Ember.Controller.extend({
   requiredDetails: {
    street_number: 'short_name',
     route: 'long_name',
     locality: 'long_name',
     administrative_area_level_1: 'long_name',
     country: 'long_name',
     postal_code: 'short_name'
   }
 });
```
You have to styles:
* 'long_name'
* 'short_name'

#### requitedDetails

Location details are the Lat and Lng of the place.

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
