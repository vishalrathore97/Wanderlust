/**
* REDUCERS related to destinations and hotdeals
*/
import {
  RECEIVE_DESTINATIONS,
  RECEIVE_HOTDEALS,
  UNSET_DESTINATIONS
} from '../actions/destinations'

export function destinations (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DESTINATIONS:
      if (action.searchError) return { searchError: action.searchError }
      return {
        ...state,
        ...action.destinations
      }
    case UNSET_DESTINATIONS:
      return {}
    default:
      return state
  }
}

export function deals (state = {}, action) {
  switch (action.type) {
    case RECEIVE_HOTDEALS:
      return {
        ...state,
        ...action.deals
      }
    default:
      return state
  }
}
