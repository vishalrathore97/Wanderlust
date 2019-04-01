var connection = require( "../utilities/connections" );

var bookingDB = {}

// generateId

bookingDB.generateId = () => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.distinct( "bookingId" ).then( ( ids ) => {
          if( ids===null || ids === [] ) return"B1001"
            ids = ids.map( el => el.slice( 1 ) );
            let sId = Math.max( ...ids ) + 1;
            return"B" + sId;
        } )
    } )
}

//addBookingDetails

bookingDB.addBookingDetails = ( booking ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return bookingDB.generateId().then( id => {
            booking.bookingId = id;
            return model.create( booking ).then( data => {
                if( data ) {
                    return data.bookingId;
                }
                else{
                    let err = new Error( "Package Booking Failed" );
                    err.status = 400;
                    throw err;
                }
            } )
        } )
    } )
}

//deleteBookingDetails
bookingDB.deleteBookingDetails = ( bookingId ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.deleteOne( { bookingId: bookingId } ).then( data => {
            if( data && data.deletedCount > 0 ) {
                return bookingId
            }
            else{
                let err = new Error( "Could Not cancel the booking ,Please try again" );
                err.status = 500;
                throw err;
            }
        } )
    } )
}

//getBookingDetails by destinationId

bookingDB.getBookingDetails = ( destinationId ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.find( { destId: destinationId } ).then( data => {
            if( data && data.length > 0 ) {
                return data;
            }
            else{
                let err = new Error( "error occured in fetching Booking Details" );
                err.status = 404
                throw err;
            }
        } )
    } )
}



bookingDB.generateId = () => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.distinct( "bookingId" ).then( ( ids ) => {
            let bId = ids.sort()[ids.length-1]
            let bchar = bId.match( /[a-zA-Z]+/g )[0]
            let bnum = bId.match( /\d+/g ).map( Number )[0] + 1
            return bchar+bnum
        } )
    } )
}

bookingDB.checkAvailabilityAndCharge = ( destinationId ) => {
    if( destinationId.startsWith( "D" ) ){
        return connection.getDestinationsCollection().then( ( model ) => {
            return model.findOne( {"destinationId": destinationId} ).then( data => {
                if( data ) {
                    return data
                }
                else return null
            } )
        } )
    }
    else if( destinationId.startsWith( "HD" ) ){
        return connection.getHotdealsCollection().then( ( model ) => {
            return model.findOne( {"destinationId": destinationId} ).then( data => {
                if( data ) {
                    return data
                }
                else return null
            } )
        } )

    }

}

bookingDB.updateAvailability = ( destinationId,noOfTravellers,val ) => {
    let newVal = noOfTravellers
    if( val === "decrease" ) {newVal = -noOfTravellers}
    else if( val === "increase" ) {newVal = noOfTravellers}
    if( destinationId.startsWith( "D" ) ){
        return connection.getDestinationsCollection().then( ( model ) => {
           return model.updateOne( {destinationId: destinationId},{$inc: {availability: newVal}} ).then( result => {
            if( result.nModified>0 ){
                return result
            }
            else return null
           } )
        } )
    }
    else if( destinationId.startsWith( "HD" ) ){
        return connection.getHotdealsCollection().then( ( model ) => {
            return model.updateOne( {destinationId: destinationId},{$inc: {availability: newVal}} ).then( result => {
                if( result.nModified>0 ){
                    return result
                }
                else return null
               } )
        } )

    }


}

bookingDB.bookDestination = ( bookingObj,destinationId,totalCharge ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return bookingDB.generateId().then( bookingId => {
            let bookObj = {
                "bookingId": bookingId,
                "destId": destinationId,
                "userId": bookingObj.userId,
                "checkInDate": bookingObj.checkInDate,
                "checkOutDate": bookingObj.checkOutDate,
                "noOfPersons": bookingObj.noOfPersons,
                "totalCharges": totalCharge,
                "destinationName": bookingObj.destinationName
            }
           return model.create( bookObj ).then( ( insertedData ) => {
            if( insertedData ) {
                return insertedData
            }
            else{
                let err = new Error( "Data could not be inserted.Please try again later" )
                err.status = 401
                throw err;
            }

           } )
        } )
    } )
}

bookingDB.insertUserBooking = ( userId,bookingId ) => {
    return connection.getUserCollection().then( ( model ) => {
        return model.updateOne( {userId: userId},{$push: {bookings: bookingId}} ).then( data => {
            if( data.nModified>0 ){
                return data
            }
            else{
                let err = new Error( "Some error occured. Please try again." )
                err.status = 401
                throw err
            }
        } )
    } )

}
bookingDB.checkDurationBooking = ( ( userId,endDate ) => {
    /*eslint no-console: 0*/
    console.log( endDate )
    return connection.getBookingsCollection().then( ( model ) => {
        return model.find( {userId: userId} ).then( data => {
            return data
        } )
    } )
} )
bookingDB.deleteBooking = ( bookingId ) => {
    return connection.getBookingsCollection().then( model => {
        return model.findOne( {bookingId: bookingId} ).then( bookingObj => {
            let destinationId = bookingObj.destId
            let noOfPersons = bookingObj.noOfPersons
            let userId = bookingObj.userId
            let obj = {
                destinationId: destinationId,
                noOfPersons: noOfPersons,
                userId: userId
            }
            return model.deleteOne( {bookingId: bookingId} ).then( data => {
                if( data ) return obj
                else{
                    let err = new Error( "Could not cancel the booking. Please try again later" )
                    err.status = 401
                    throw err
                }
            } )
        } )

    } )
}

bookingDB.deleteUserBooking = ( userId,bookingId ) => {
    return connection.getUserCollection().then( model => {
        return model.updateOne( {userId: userId},{$pull: {bookings: bookingId}} ).then( data => {
            if( data.nModified>0 ){
                return data
            }
            else{
                let err = new Error( "Some error occured. Please try again." )
                err.status = 401
                throw err
            }
        } )
    } )
}
module.exports = bookingDB
