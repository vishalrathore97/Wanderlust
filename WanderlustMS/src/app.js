var express = require( 'express' );
var bodyParser = require( 'body-parser' );

var myErrorLogger = require( './utilities/ErrorLogger' );
var myRequestLogger = require( './utilities/RequestLogger' );

var userRouter = require( './routes/userRouter' );
var packageRouter = require( './routes/packageRouter' );
var bookingRouter = require( './routes/bookingRouter' );

var cors = require( 'cors' );

var app = express();
app.use( cors() );

app.use( bodyParser.json() );
app.use( myRequestLogger );

app.use( '/user', userRouter );
app.use( '/package', packageRouter );
app.use( '/book',bookingRouter )

app.use( myErrorLogger );

app.listen( 4000 );
/*eslint no-console: 0*/
console.log( "Server listening in port 4000" );

module.exports = app;
