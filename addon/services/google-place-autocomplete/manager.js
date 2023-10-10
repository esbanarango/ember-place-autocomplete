import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);

    this.set('numberOfActiveAutoCompleteFields', 0);
  },

  /**
   * @description Increments the counter of active components.
   * Intended to be used everytime a new place-autocomplete-filed is
   * instanciated.
   */
  register() {
    this.incrementProperty('numberOfActiveAutoCompleteFields');
  },

  /**
   * @description Decrements the counter of active components.
   * Intended to be used everytime a new place-autocomplete-filed is
   * going to be destroyed.
   */
  unregister() {
    this.decrementProperty('numberOfActiveAutoCompleteFields');
  },

  /**
   * @description Cleanup DOM when ALL component instances of place-autocomplete-field
   * are removed from the DOM. If there are still components active, it does nothing.
   *
   * @return boolean - Indicates whether the DOM was cleaned or not.
   */
  removePlacesAutoCompleteContainersIfRequired() {
    if (!document || this.numberOfActiveAutoCompleteFields > 0) {
      return false;
    }

    const pacContainers = document.querySelectorAll('.pac-container');

    for (let index = 0; pacContainers.length > index; index++) {
      pacContainers[index].parentNode.removeChild(pacContainers[index]);
    }

    return true;
  },
});
