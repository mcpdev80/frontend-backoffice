import _ from 'lodash'

const baseStore = {
  id: '',
  name: '',
  address: {
    street: '',
    zip: '',
    city: ''
  },
  clientsInStore: null,
  averageDurationPerClientInMinutes: null,
  percentageReservations: null,
  placeId: 0
}

export default {
  /**
   * Adds a new store.
   *
   * @public
   * @param {Object} state
   * @param {Object} payload
   * @returns {void}
   */
  addNewStore: (state, payload) => {
    state.push(_.merge({}, baseStore, payload))
  },

  addNewStores: (state, payload) => {
    payload.forEach(element => {
      state.push(_.merge({}, baseStore, element));
    });
  },

  /**
   * Sets an attribute of a single store.
   *
   * @param {Array} state
   * @param {Object<{ activeStoreIndex: Number, name: String, value: String }>} payload
   * @returns {void}
   */
  setStoreAttribute: (state, payload) => {
    const { activeStoreIndex, name, value } = payload
    const store = state[activeStoreIndex]

    if (store == null) {
      return
    }

    _.set(store, name, value)
  }
}
