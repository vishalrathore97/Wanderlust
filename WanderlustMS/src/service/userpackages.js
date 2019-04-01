var packageDB = require( '../model/userPackages' )

var packageservice = {}


// getHotDeals

packageservice.getHotDeals = () => {
    return packageDB.getHotDeals().then( data =>{
            return data
    } )
}
//getAllPackageDetails

packageservice.getAllPackageDetails = () => {
    return packageDB.getAllPackageDetails().then( data =>{
        return data
    } )
}

// getHotDeals

packageservice.getPackageDetails = ( destinationId ) => {
    return packageDB.getPackageDetails( destinationId ).then( data =>{
        return data
    } )
}

//search

packageservice.getDestinations = keyword => {
  return packageDB.search( keyword )
    .then( dests=>dests )
}

module.exports = packageservice;
