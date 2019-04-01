/**
* REDUCERS related to authenticated users
*/
import {
  SET_WL_AUTHED_USER,
  UNSET_WL_AUTHED_USER,
  WL_REGISTER,
  GET_BOOKINGS,
  UNSET_BOOKINGS,
  UNSET_IS_ERROR
} from '../actions/authedUser'

/**
 * return {
        ...state,
        [state.wlAuthedUser]:action.wlAuthedUser,
      }
 */

export function wlAuthedUser (state = null, action) {
  switch (action.type) {
    case SET_WL_AUTHED_USER:
      if (action.isError) {
        return {
          isError: action.isError
        }
      }
      return {
        ...action.wlAuthedUser
      }
    case UNSET_WL_AUTHED_USER:
      return null
    case WL_REGISTER:
      if (action.isError) {
        return {
          isError: action.isError
        }
      }
      return {
        ...action.wlAuthedUser
      }

    default:
      return state
  }
}

export function userBookings (state = null, action) {
  switch (action.type) {
    case GET_BOOKINGS:
      if (action.isError) {
        return {
          isError: action.isError
        }
      }
      return {
        ...action.userBookings
      }
    case UNSET_BOOKINGS:
      return null
    default:
      return state
  }
}
