import axios from 'axios'

const backendAPIprops = { port: '4000', host: 'localhost' }

const usersBackendURL = `http://${backendAPIprops.host}:${backendAPIprops.port}/user`
const packagesBackendURL = `http://${backendAPIprops.host}:${backendAPIprops.port}/package`
const bookingsBackendURL = `http://${backendAPIprops.host}:${backendAPIprops.port}/book`

export function getWLHotDeals () {
  return axios
    .get(packagesBackendURL + `/hotDeals`)
    .then(response => {
      // console.log("HOTDEALS=>"+JSON.stringify(response.data));
      return response.data
    })
    .catch(err => {
      // console.log("HOTDEALS API error=>"+JSON.stringify(error));
      throw err
    })
}

export function getWLDestinations (keyword) {
  return axios
    .get(packagesBackendURL + `/destinations/:${keyword}`)
    .then(response => {
      // console.log("Searched Destinations=>"+JSON.stringify(response.data));
      return response.data
    })
    .catch(err => {
      // console.log("Destinations API error=>"+JSON.stringify(error));
      throw err
    })
}

export function wlLogin (loginData) {
  return axios
    .post(usersBackendURL + `/login/`, loginData)
    .then(response => {
      // console.log("LOGIN API=>"+JSON.stringify(response.data));
      return response.data
    })
    .catch(err => {
      // console.log("Login API error=>"+JSON.stringify(error));
      throw err
    })
}

export function wlRegister (userData) {
  return axios
    .post(usersBackendURL + `/register`, userData)
    .then(response => {
      // console.log("LOGIN API=>"+JSON.stringify(response.data));
      return response.data
    })
    .catch(err => {
      // console.log("Login API error=>"+JSON.stringify(error));
      throw err
    })
}

export function wlPackage (destinationId) {
  return axios.get(bookingsBackendURL + `/getDetails/` + destinationId)
    .then(res => res.data)
    .catch(err => {
      // console.log("wlPackage API error=>"+JSON.stringify(error));
      throw err
    })
}

export function wlBookPackage (userId, bookingDetails) {
  return axios.post(bookingsBackendURL + `/${userId}/${bookingDetails.destinationId}`, bookingDetails)
    .then(res => res.data)
    .catch(err => {
      throw err
    })
}

export function wlViewBooking (wlAuthedUser) {
  return axios
    .get(usersBackendURL + '/getBookings/' + wlAuthedUser.userId)
    .then(response => {
      return response.data
    })
    .catch(err => {
      // console.log("Login API error=>"+JSON.stringify(error));
      throw err
    })
}

export function wlcancelBooking (booking) {
  return axios
    .delete(bookingsBackendURL + '/cancelBooking/' + booking.bookingId)
    .then(response => {
      return response.data.message
    })
    .catch(err => {
      throw err
    })
}
