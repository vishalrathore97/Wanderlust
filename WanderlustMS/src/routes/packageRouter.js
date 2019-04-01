var express = require( 'express' );
var router = express.Router();
var packageBL = require( '../service/userpackages' )

// getHotDeals

router.get( '/hotDeals', ( request,response,next ) => {
    packageBL.getHotDeals()
        .then( data => {if( data ) response.json( data )} )
        .catch( err => {next( err )} )
} );

//getAllPackageDetails

router.get( '/destinations', ( request,response,next ) => {
    packageBL.getAllPackageDetails().then( data =>{
        response.send( data )
    } ).catch( err => { next( err )} )
} );


// getPackageDetails

router.get( '/destinations/:keyword', ( request,response,next ) => {
    let keyword = request.params.keyword
    packageBL.getDestinations( keyword )
      .then( data =>response.json( data ) )
      .catch( err => { next( err )} )
} );

module.exports = router
