/**
* REDUCERS related to userBookings
*/
import {
  CANCEL_BOOKING,
  BOOK_PACKAGE,
  UNSET_PACKAGES
} from '../actions/bookings'
import { UNSET_CANCEL_MESSAGE } from '../actions/authedUser'

export function cancelBooking (state = null, action) {
  switch (action.type) {
    case CANCEL_BOOKING:
      if (action.isError) {
        return {
          isError: action.isError
        }
      }
      return {
        ...action.cancelledBookings
      }
    case UNSET_CANCEL_MESSAGE:
      return null
    default:
      return state
  }
}

export function bookedPackage (state = null, action) {
  switch (action.type) {
    case BOOK_PACKAGE:
      if (action.bookingError) return { bookingError: action.bookingError }
      else return { ...action.bookedPackage }
    case UNSET_PACKAGES:
      return null
    default:
      return state
  }
}
