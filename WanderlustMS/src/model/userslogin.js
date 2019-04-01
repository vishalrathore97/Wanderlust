var userDetails = require( './beanClasses/users' );
var connection = require( "../utilities/connections" )

var usersDB = {}



usersDB.checkUser = function ( contactNo ) {
    return connection.getUserCollection().then( function ( collection ) {
        return collection.findOne( { "contactNo": contactNo } ).then( function ( customerContact ) {
            if( customerContact ) {
                return new userDetails( customerContact );
            }
            else return null;
        } )
    } )
}

usersDB.getPassword = function ( contactNo ) {
    return connection.getUserCollection().then( function ( collection ) {
        return collection.find( { "contactNo": contactNo }, { _id: 0, password: 1 } ).then( function ( password ) {
            if( password.length != 0 )
                return password[0].password;
            else
                return null;
        } )
    } )

}

usersDB.generateUserId=()=>{
    return connection.getUserCollection().then( model=>{
        return model.distinct( "userId" ).then( id=>{
            id=id.map( a=>a.slice( 1,11 ) )
            let Uid=Math.max( ...id );
            return"U"+( Uid+1 )
        } )
    } )
}

usersDB.registerUser = ( userObj ) => {
  return connection.getUserCollection().then( model => {
      return usersDB.generateUserId().then( uId => {
          userObj.userId = uId
          return model.create( userObj ).then( inserted => {
              if( inserted ) {
                  return userObj
              }
              else{
                  let err = new Error( "Registration failed" );
                  err.status = 400;
                  throw err;
              }
          } )
      } )
  } )
}

usersDB.checkContact = ( contactNo ) => {
    return connection.getUserCollection().then( model => {
        return model.findOne( { contactNo: contactNo } ).then( data => {
            if( data ) {
                let err = new Error( "Contact number already exists" );
                err.status = 400;
                throw err;
            } else{
                return true;
            }
        } )
    } )
}

usersDB.getBookingDetails = ( userId ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.find( { userId: userId } ).then( data => {
            if( data && data.length>0 ) return data;
            else{
                let err = new Error( "You have not Booked any Packages yet!!" );
                err.status = 404
                throw err;
            }
        } )
    } )
}


//getBookingDetails by userId

usersDB.getBookingDetails = ( userId ) => {
    return connection.getBookingsCollection().then( ( model ) => {
        return model.find( { userId: userId } ).then( data => {
            if( data && data.length > 0 ) {
                return data;
            }
            else{
                let err = new Error( "You have not Booked any Packages yet!!" );
                err.status = 404
                throw err;
            }
        } )
    } )
}


/**************************************************************************** */

module.exports = usersDB;
