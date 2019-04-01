/**
* ROOT REDUCERS combining these - wlAuthedUser, deals and destinations - reducers
* the final state of app = { wlAuthedUser, deals, destinations }
*/
import { combineReducers } from 'redux'

import { wlAuthedUser, userBookings } from './wlAuthedUser'
import selectedPackage from './selectedPackage'
import { destinations, deals } from './wlDestinations'
import { cancelBooking, bookedPackage } from './userBookings'

export default combineReducers({
  wlAuthedUser,
  deals,
  destinations,
  selectedPackage,
  userBookings,
  cancelBooking,
  bookedPackage
})

// The final root reducer of the app might look as shown below:

/**
export default combineReducers({
  wlAuthedUser,
  deals,
  destinations,
  selectedPackage,
})

 */
