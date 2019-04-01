const conn = require( "../utilities/connections" )

let package = {}

package.search = ( keyword )=>{
    return conn.getDestinationsCollection().then( model=>{
        return model.find( {$text: {$search: keyword}} )
            .then( dests=>{
                if( dests ) return dests;
                else throw new Error( "Search Error !" );
            } )
    } )
}

module.exports = package;
