/**
* REDUCERS related to selectedPackage
*/

import {
  GET_DETAILS,
  UNSET_PACKAGES
} from '../actions/bookings'

export default function selectedPackage (state = null, action) {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...action.selectedPackage
      }
    case UNSET_PACKAGES:
      return null
    default:
      return state
  }
}
