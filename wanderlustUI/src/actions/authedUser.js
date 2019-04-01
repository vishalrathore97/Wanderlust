/**
* ACTIONs related to WanderLust AUTHED_USER
*/
import { wlLogin, wlRegister, wlViewBooking } from '../utils/api'

export const SET_WL_AUTHED_USER = 'SET_WL_AUTHED_USER'
export const UNSET_WL_AUTHED_USER = 'UNSET_WL_AUTHED_USER'

export const GET_BOOKINGS = 'GET_BOOKINGS'
export const WL_REGISTER = 'WL_REGISTER'
export const UNSET_BOOKINGS = 'UNSET_BOOKINGS'
export const UNSET_CANCEL_MESSAGE = 'UNSET_CANCEL_MESSAGE'
export const UNSET_IS_ERROR = 'UNSET_IS_ERROR'

export function setWLAuthedUser (wlAuthedUser, isError) {
  // You can store these credentials in Session Storage.
  // sessionStorage.setItem("wlAuthedUser", JSON.stringify(wlAuthedUser))

  // Later on Whenever the app loads - first check from session, if available login from there...
  // Do not forget to clear session when the user logs out!!
  return {
    type: SET_WL_AUTHED_USER,
    wlAuthedUser,
    isError
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
 * {...existingState, wlAuthedUser }
 */
export function handleSetWLAuthedUser (dispatch, loginData) {
  return wlLogin(loginData)
    .then((wlAuthedUser) => {
      dispatch(setWLAuthedUser(wlAuthedUser))
    })
    .catch(err => {
      // console.log('Error in Login!: ', err)
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      dispatch(setWLAuthedUser(null, errMsg))
    })
}

export function unSetWLAuthedUser () {
  return {
    type: UNSET_WL_AUTHED_USER
  }
}

export function getBookings (userBookings, isError) {
  return {
    type: GET_BOOKINGS,
    userBookings,
    isError
  }
}

export function handleGetBookings (dispatch, wlAuthedUser) {
  return wlViewBooking(wlAuthedUser)
    .then((userBookings) => {
      dispatch(getBookings(userBookings))
    })
    .catch(err => {
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      // console.log('Error in getBookings: ', err)
      dispatch(getBookings(null, errMsg))
    })
}
export function unsetBookings (dispatch) {
  dispatch({ type: UNSET_BOOKINGS })
  dispatch({ type: UNSET_CANCEL_MESSAGE })
}
export function registerUser (wlAuthedUser, isError) {
  return {
    type: WL_REGISTER,
    wlAuthedUser,
    isError
  }
}
export function handleRegisterUser (dispatch, userData) {
  return wlRegister(userData)
    .then(wlRegisteredUser => {
      // console.log(wlRegisteredUser)
      dispatch(registerUser(wlRegisteredUser))
    })
    .catch(err => {
      // console.log('Error in Register!: ', err)
      let errMsg = ''
      if (err.response) errMsg = err.response.data.message
      else errMsg = 'Server Error: Please connect to server !'
      dispatch(registerUser(null, errMsg))
    })
}
