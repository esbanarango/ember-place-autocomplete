import GooglePlaceAutocompleteResponseMock from './google-place-autocomplete-response-mock';

export default function() {
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
    },
    setOptions(options) {
      for(let option in options) {
        this[option] = options[option];
      }
    }
  }
}
