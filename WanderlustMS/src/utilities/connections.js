const{ Schema } = require( "mongoose" );
var Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
Mongoose.set( 'useCreateIndex', true )
let url = "mongodb://localhost:27017/Wanderlust_DB";


let userSchema = Schema( {
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        unique: true,
        required: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bookings: {
        type: Array,
        default: []
    }
}, { collection: "User" } )


let bookingSchema= Schema( {
    bookingId: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    destId: {
        type: String,
        required: true
    },
    destinationName: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    noOfPersons: {
        type: Number,
        required: true
    },
    totalCharges: {
        type: Number,
        required: true
    },
    timeStamp: {type: String, default: new Date().getTime().toString() } 
},{collection: "Bookings"} )


let destinationSchema= Schema( {
    destinationId: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    details: {
        about: String,
        itinerary: {
            dayWiseDetails: {
                    firstDay: String,
                    restDaysSightSeeing: [String],
                    lastDay: String
            },
            packageInclusions: [String],
            tourHighlights: [String],
            tourPace: [String]
        }
    },
    noOfNights: Number,
    flightCharges: {
        type: Number,
        required: true
    },
    chargesPerPerson: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        required: true
    },
    availability: Number
},{collection: "Destinations"} )
destinationSchema.index( {'$**': 'text'} );

let hotDealsSchema= Schema( {
    destinationId: {
        type: String,
        required: true
    },
    continent: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    details: {
        about: String,
        itinerary: {
            dayWiseDetails: {
                    firstDay: String,
                    restDaysSightSeeing: [String],
                    lastDay: String
            },
            packageInclusions: [String],
            tourHighlights: [String],
            tourPace: [String]
        }
    },
    noOfNights: Number,
    flightCharges: {
        type: Number,
        required: true
    },
    chargesPerPerson: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        required: true
    },
    availability: Number
},{collection: "HotDeals"} )


var collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'User', userSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database=>User" );
        err.status = 500;
        throw err;
    } )
}

collection.getBookingsCollection = () =>{
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'Bookings', bookingSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database=>Bookings" );
        err.status = 500;
        throw err;
    } )
}

collection.getDestinationsCollection = () =>{
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'Destinations', destinationSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database=>Destinations" );
        err.status = 500;
        throw err;
    } )
}

collection.getHotdealsCollection = () =>{
    return Mongoose.connect( url, { useNewUrlParser: true } ).then( ( database ) => {
        return database.model( 'HotDeals', hotDealsSchema )
    } ).catch( () => {
        let err = new Error( "Could not connect to Database=>HotDeals" );
        err.status = 500;
        throw err;
    } )
}
module.exports = collection;
