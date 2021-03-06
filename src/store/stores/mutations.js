import _ from 'lodash'
import Vue from 'vue'

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
  openingHours:[
    {
      day: 'monday',
      from: '',
      to: ''
    },
    {
      day: 'tuesday',
      from: '',
      to: ''
    },
    {
      day: 'wednesday',
      from: '',
      to: ''
    },
    {
      day: 'thursday',
      from: '',
      to: ''
    },
    {
      day: 'friday',
      from: '',
      to: ''
    },
    {
      day: 'saturday',
      from: '',
      to: ''
    },
    {
      day: 'sunday',
      from: '',
      to: ''
    }
  ],
  locationType: '',
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
  },

  /**
   * Add opening hours to store.
   *
   * @param {Array} state
   * @param {Object} payload
   * @returns {void}
   */
  addOpeningHour: (state, payload) => {
    const { type, activeStoreIndex, day, value } = payload
    const store = state[activeStoreIndex]

    if (store == null) {
      return
    }

    const dayOpeningHoursIndex = store.openingHours.findIndex(item => item.day === day)
    const dayOpeningHours = store.openingHours.find(item => item.day === day)
    const diff = { day }
    diff[type] = value

    const newOpeningHours = _.merge({}, dayOpeningHours, diff)

    if (dayOpeningHoursIndex === -1) {
      store.openingHours.push(newOpeningHours)
    } else {
      store.openingHours.splice(dayOpeningHoursIndex, 1, newOpeningHours)
      Vue.set(state, activeStoreIndex, store)
    }
  }
}
