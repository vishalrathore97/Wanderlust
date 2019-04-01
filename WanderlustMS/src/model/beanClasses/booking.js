class Booking {
    constructor ( obj ) {
        this.bookingId = obj.bookingId;
        this.userId = obj.userId;
        this.destId = obj.destId;
        this.destinationName = obj.destinationName;
        this.checkInDate = obj.tripDate;
        this.checkOutDate = obj.tripEnd;
        this.noOfPersons = obj.noOfTravelers;
        this.totalCharges = obj.charges;
        this.timeStamp = obj.timeStamp;

    }
}

module.exports = Booking;
