var connection = require( '../utilities/connections' );
var PackagesDB = {}

// getHotDeals

PackagesDB.getHotDeals = () =>{
    return connection.getHotdealsCollection().then( ( model ) => {
        return model.find().then( data =>{
            if( data && data.length > 0 ) {
                return data;
            }
            else{
                let err = new Error( "error occured in fetching Hot Deals" );
                err.status = 404
                throw err;
            }
        } )
    } )
}


// getAllPackageDetails

PackagesDB.getAllPackageDetails = () =>{
    return connection.getDestinationsCollection().then( ( model ) => {
        return model.find().then( data =>{
            if( data && data.length > 0 ) {
                return data;
            }
            else{
                let err = new Error( "No packages Found !" );
                err.status = 404
                throw err;
            }
        } )
    } )
}

// getPackageDetails

PackagesDB.getPackageDetails = ( destinationId ) =>{
    if( destinationId.startsWith( "HD" ) ){
      return connection.getHotdealsCollection().then( ( model ) => {
          return model.findOne( {destinationId: destinationId} ).then( data =>{
              if( data ) return data;
              else{
                  let err = new Error( "Unexpected Error" );
                  err.status = 404
                  throw err;
              }
          } )
      } )
    } else{
      return connection.getDestinationsCollection().then( ( model ) => {
          return model.findOne( {destinationId: destinationId} ).then( data =>{
              if( data ) return data;
              else{
                  let err = new Error( "Unexpected Error" );
                  err.status = 404
                  throw err;
              }
          } )
      } )
    }
}
PackagesDB.search = ( keyword )=>{
    return connection.getDestinationsCollection().then( model=>{
        return model.find( {$text: {$search: keyword}} )
            .then( dests=>{
                if( dests && dests.length>0 ) return dests;
                else{
                  let err = new Error( "Sorry! we don't have package tours in "+keyword );
                  err.status = 404
                  throw err;
                }
            } )
    } )
}

module.exports = PackagesDB
