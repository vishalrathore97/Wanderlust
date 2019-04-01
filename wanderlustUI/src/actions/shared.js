/**
* Shared handleWLInitialData() - between deals , destinations, and authed_user
*/

import { getWLHotDeals } from '../utils/api'
import { receiveHotDeals } from '../actions/destinations'

// const AUTHED_USER_Dummy = { contactNo: 9098765432, password: 'Abc@1234' }

/**
 * An ASYNC ACTION creator handler
 * needs to dispatch some action later on, so it is first argument
 * Also takes login data as input
 * First, does the Back-end API call
 * then dispatches a PURE SYNC action with the data recieved from the back-end
 * CAUSING the action to Hit the Reducer
 * ReDUX Store will now update -
 * { ...existingState, deals }
 */
export function handleWLDeals (dispatch) {
  // STEP 1: Calling the API
  // - no data needed to do the API call - that it why it contains only dispatch
  return getWLHotDeals()
    .then((deals) => {
      // STEP 2: Dispatching a PURE action creator with recieved data as the payload
      dispatch(receiveHotDeals(deals)) // SYNC Action Creator call
      // handleSetWLAuthedUser(dispatch, AUTHED_USER_Dummy) // For testing only - remove later
    })
    .catch(err => {
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      dispatch(receiveHotDeals(null, errMsg)) // SYNC Action Creator call
      // console.log('Error in getWLHotDeals: ', e)
    })
}
