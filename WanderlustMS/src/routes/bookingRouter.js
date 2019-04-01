var express = require( 'express' );
var router = express.Router();
//import neccessary modules
const Booking = require( '../model/beanClasses/booking' );
const packageBL = require( '../service/userpackages' );
const bookingBL = require( '../service/userbookings' );

// addBookingDetails
router.post( '/:userId/:destinationId',function ( request,response,next ){
    let BookingObj = new Booking( request.body )
    BookingObj.userId= request.params.userId
    BookingObj.destId = request.params.destinationId
    return bookingBL.bookDestination( BookingObj,request.body.includeFlight ).then( data =>{
        response.status( 201 );
        response.json( {"message": "Congratulations your booking is successful with Booking Id :"+data.bookingId} )
    } ).catch( err => { next( err )} )
} );


// deleteBookingDetails

router.delete( '/cancelBooking/:bookingId',function ( request,response,next ){
    let bookingId = request.params.bookingId
    return bookingBL.cancelBooking( bookingId ).then( data =>{
        response.json( {"message": `Booking Number ${data} has been cancelled`} )
    } ).catch( err => { next( err )} )
} )


// getBookingDetails
router.get( '/getDetails/:destinationId', ( request,response,next ) => {
    let destinationId = request.params.destinationId
    return packageBL.getPackageDetails( destinationId ).then( data =>{
        response.send( data )
    } ).catch( err => { next( err )} )
} )

module.exports = router;
