var fs = require( 'fs' );

var logger = function ( err, req, res, next ) {
    if( err ) {
        fs.appendFile( 'ErrorLogger.txt', err.stack + "\n", function ( err ) {
            if( err ) {
                /*eslint no-console: 0*/
                console.log( "logging error failed" );
            }
        } );
        if( err.status ) {
            res.status( err.status )
        } else{
            res.status( 500 );
        }
        res.json( { "message": err.message } )
    }
    next();
}

module.exports = logger;
