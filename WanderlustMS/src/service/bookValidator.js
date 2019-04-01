
const bookValidator = {}
//implement your validators

bookValidator.validateNumberOfTraveller = ( noOfTravellers ) => {
  if( noOfTravellers<1 || noOfTravellers > 5 ){
    let err = new Error( "No. of travellers should be between 1 and 5" )
    err.status = 400
    throw err
  }
}

bookValidator.validateTripDate = ( startDate ) => {
  let sdate = new Date( startDate )
  let cdate = new Date()
  if( sdate <= cdate ){
    let err = new Error( "Start date should be later than today" )
    err.status = 400
    throw err
  }
}

module.exports = bookValidator
