var express = require( 'express' );
var router = express.Router();
const setupUser = require( "../model/setupUser" )
var userservice = require( '../service/userslogin' )
var Users=require( "../model/beanClasses/users" )

router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( ( err ) => {
        next( err )
    } )
} );

router.post( '/register', function ( req, res, next ) {
    let userObj=new Users( req.body );
    userservice.registerUser( userObj )
      .then( user=>res.send( user ) )
      .catch( err=>next( err ) );

} )

//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( function ( err ) {
        next( err );
    } )
} )

router.get( '/getBookings/:userId', ( request,response,next ) => {
    let userId = request.params.userId
    userservice.getBookingDetails( userId ).then( data =>{
        response.send( data )
    } ).catch( err => { next( err )} )
} )




module.exports = router;
