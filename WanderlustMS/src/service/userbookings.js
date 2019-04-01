var bookingDAL = require( '../model/userbooking' );
var bookValidator = require( "./bookValidator" )

var bookingBL = {}

//implement your buisness logic
bookingBL.checkBookings = ( bookObj ) => {
    let startDate = bookObj.checkInDate
    let endDate = bookObj.checkOutDate
    return bookingDAL.checkDurationBooking( bookObj.userId,endDate ).then( userBooking => {
         if( userBooking.length > 1 ){
             userBooking.forEach( booking  => {
                let bookingStartDate = new Date( booking.checkInDate )
                let bookingEndDate = new Date( booking.checkOutDate )
                let sdate = new Date( startDate )
                if( sdate >= bookingStartDate && sdate <= bookingEndDate ){
                    let err = new Error( "You cant book more than 1 package in same duration" )
                    err.status = 401
                    throw err
                }

             } )
             return true
         }
     } )
}
bookingBL.bookDestination = ( ( bookObj,includeFlight ) =>
{
    let noOfTravellers = parseInt( bookObj.noOfPersons )
    let startDate = bookObj.checkInDate
    let destinationId = bookObj.destId
    bookValidator.validateNumberOfTraveller( noOfTravellers )
    bookValidator.validateTripDate( startDate )
    return bookingBL.checkBookings( bookObj ).then( () => {
        return bookingDAL.checkAvailabilityAndCharge( destinationId ).then( data => {

            if( data === null ){
                let err = new Error( "Destination doesnot exists" )
                err.status = 401
                throw err
            }
            else if( data.availability === 0 ){
                let err = new Error( "Destination "+destinationId+" is already full!!" )
                err.status = 404
                throw err
            }
            else if( data.availability < noOfTravellers ){
                let err = new Error( "Destinaion almost Full.. Only "+data.availability+" left!!" )
                err.status = 401
                throw err
            }
            else{
                let flightCharge = data.flightCharges
                let perPersonCharge = data.chargesPerPerson
                let discount = data.discount
                let charge = perPersonCharge
                if( includeFlight ) {
                    charge += flightCharge
                }
                charge = charge * noOfTravellers
                let totalCharge = Math.round( charge*( 1-( discount/100 ) ) )
                return bookingDAL.bookDestination( bookObj,destinationId,totalCharge ).then( ( insertedData ) => {
                    let bookingId = insertedData.bookingId
                    return bookingDAL.updateAvailability( destinationId,noOfTravellers,"decrease" ).then( ( result ) => {
                        if( result ){
                            return bookingDAL.insertUserBooking( bookObj.userId,bookingId ).then( () => {
                                return insertedData
                            } )
                        }
                    } )

                } )
            }
        } )
    } )


} )

bookingBL.cancelBooking = ( bookingId ) => {
    return bookingDAL.deleteBooking( bookingId ).then( ( bookObj ) => {
        let destinationId = bookObj.destinationId
        let noOfTravellers = bookObj.noOfPersons
        let userId = bookObj.userId
        return bookingDAL.updateAvailability( destinationId,noOfTravellers,"increase" ).then( result => {
            if( result ) {
                return bookingDAL.deleteUserBooking( userId,bookingId ).then( () => {
                    return bookingId
                } )
            }
        } )

    } )
}

bookingBL.getBookingDetails = ( destinationId ) => {
    return bookingDAL.getBookingDetails( destinationId ).then( bookings => {
        if( bookings === null ) {
            let err = new Error( "No Bookings found in" + destinationId );
            err.status = 404;
            throw err;
        } else{
            return bookings;
        }
    } )

}

module.exports = bookingBL
