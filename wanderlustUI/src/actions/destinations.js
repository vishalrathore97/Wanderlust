/**
* ACTIONs related to WanderLust destinations
*/
import { getWLDestinations } from '../utils/api'

export const RECEIVE_DESTINATIONS = 'RECEIVE_DESTINATIONS'
export const UNSET_DESTINATIONS = 'UNSET_DESTINATIONS'

export function receiveDestinations (destinations, keyword, searchError) {
  return {
    type: RECEIVE_DESTINATIONS,
    destinations,
    keyword,
    searchError
  }
}

/**
 * An ASYNC ACTION creator handler
 * needs to dispatch some action later on, so it is first argument
 * Also takes login data as input
 * First, does the Back-end API call
 * then dispatches a PURE SYNC action with the data recieved from the back-end
 * CAUSING the action to Hit the Reducer
 * ReDUX Store will now update -
 * { ...existingState, destinations }
 */

export function handleReceiveDestinations (dispatch, keyword, searchError) {
  // STEP 1: Calling the API
  return getWLDestinations(keyword)
    .then((destinations) => {
      // STEP 2: Dispatching a PURE action creator with recieved data as the payload
      dispatch(receiveDestinations(destinations, keyword))
    })
    .catch((e) => {
      // Handling any Errors
      let errMsg = ''
      if (e.response) errMsg = e.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      dispatch(receiveDestinations(null, null, errMsg))
      console.log('Error in getWLDestinations: ', e)
    })
}
export function unSetWLDestinations (dispatch) {
  dispatch({ type: UNSET_DESTINATIONS })
}

export const RECEIVE_HOTDEALS = 'RECEIVE_HOTDEALS'

export function receiveHotDeals (deals, isError) {
  return {
    type: RECEIVE_HOTDEALS,
    deals,
    isError
  }
}
