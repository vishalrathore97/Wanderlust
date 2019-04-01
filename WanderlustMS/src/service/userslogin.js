var userDB = require( '../model/userslogin' );
var Validator=require( '../service/userValidator' );

var userBL = {}


//login a user
userBL.login = function ( contactNo, userPassword ) {
    return userDB.checkUser( contactNo ).then( function ( user ) {
       if( user==null ){
            let err= new Error( "Enter registered contact number! If not registered, please register" )
            err.status = 404;
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( function ( password ) {
                if( password != userPassword ) {
                    let err = new Error( "Incorrect password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}


// userBL.register = function (userObj) {
//     Validator.validateName(userObj.name);
//     Validator.validateEmailId(userObj.emailId);
//     Validator.validateContactNo(userObj.contactNo);
//     Validator.validatePassword(userObj.password);
//     return userDB.checkUserCredentials(userObj.contactNo).then(data=>{
//         if(data){
//             return userDB.registerUser(userObj).then(data=>{
//                 return data
//             })
//         }
//     })
//
// }
//registration
userBL.registerUser=( userObj )=>{
    Validator.validateName( userObj.name );
    Validator.validateEmailId( userObj.emailId );
    Validator.validateContact( userObj.contactNo );
    Validator.validatePassword( userObj.password );
    return userDB.checkContact( userObj.contactNo ).then( data=>{
        if( data ){
            return userDB.registerUser( userObj ).then( register=>{
                return register;
            } )
        }
    } )
}

// getBookingDetails by userId

userBL.getBookingDetails = ( userId ) => {
    return userDB.getBookingDetails( userId ).then( bookings => {
        if( bookings === null ) {
            let err = new Error( "No Bookings found in" + userId );
            err.status = 404;
            throw err;
        } else{
            return bookings;
        }
    } )

}
module.exports = userBL
