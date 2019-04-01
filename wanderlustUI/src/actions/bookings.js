/**
* ACTIONs related to WanderLust bookings
*/
import { wlPackage, wlBookPackage, wlcancelBooking } from '../utils/api'
// Implement all the booking related actions creators

export const BOOK_PACKAGE = 'BOOK_PACKAGE'
export const CANCEL_BOOKING = 'CANCEL_BOOKING'
export const GET_DETAILS = 'GET_DETAILS'
export const UNSET_PACKAGES = 'UNSET_PACKAGES'

// bookPackage PURE action creator
function bookedPackage (bookedPackage, bookingError) {
  return {
    type: BOOK_PACKAGE,
    bookedPackage,
    bookingError
  }
}

/**
 * An ASYNC ACTION creator handler
 * needs to dispatch some action later on, so it is first argument
 * Also takes login data as input
 * First, does the Back-end API call
 * then dispatches a PURE SYNC action with the data recieved from the back-end
 * CAUSING the action to Hit the Reducer
 * ReDUX Store will now update
 */
export function handleBookPackage (dispatch, authedUser, bookingDetails) {
  return wlBookPackage(authedUser.userId, bookingDetails)
    .then(booked => {
      dispatch(bookedPackage(booked))
    })
    .catch(err => {
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      dispatch(bookedPackage(null, errMsg))
    })
}

// cancelBooking PURE action creator
function cancelBooking (cancelledBookings, isError) {
  return {
    type: CANCEL_BOOKING,
    cancelledBookings,
    isError
  }
}

export function handleCancelBooking (dispatch, booking) {
  return wlcancelBooking(booking)
    .then((msg) => {
      let cancelledBookings = {}
      cancelledBookings.msg = msg
      dispatch(cancelBooking(cancelledBookings))
    })
    .catch(err => {
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      // console.log('Error in cancelBooking!: ', err)
      dispatch(cancelBooking(null, errMsg))
    })
}

// getDetails PURE action creator
function getDetails (selectedPackage) {
  return {
    type: GET_DETAILS,
    selectedPackage
  }
}

/**
 * An ASYNC ACTION creator handler
 */
export function handleGetDetails (dispatch, destinationId) {
  return wlPackage(destinationId)
    .then(selectedPackage => {
      dispatch(getDetails(selectedPackage))
    })
}

export function unsetPackages (dispatch) {
  dispatch({ type: UNSET_PACKAGES })
}
