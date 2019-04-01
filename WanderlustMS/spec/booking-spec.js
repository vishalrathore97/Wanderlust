var booking = require('../src/service/bookValidator')

//booking

describe('NoofTravellers validation suite:',function(){
    it('Test Case 1: valid NoofTravellers',function(){
        var result= booking.validateNumberOfTraveller(1)
        expect(result).toEqual(undefined)
    });
    it('Test Case 2: Valid NoofTravellers',function(){
        var result= booking.validateNumberOfTraveller(5)
        expect(result).toEqual(undefined)
    });
    it('Test Case 3: Invalid NoofTravellers',function(){
        expect( function(){ booking.validateNumberOfTraveller(7) } ).toThrow(new Error("No. of travellers should be between 1 and 5"))
    });
    it('Test Case 4: Invalid NoofTravellers',function(){
        expect( function(){ booking.validateNumberOfTraveller(0) } ).toThrow(new Error("No. of travellers should be between 1 and 5"))
    });
})


describe('Trip Date validation suite:',function(){
    it('Test Case 5: valid Tripdate',function(){
        var result= booking.validateTripDate("03/30/2019")
        expect(result).toEqual(undefined)
    });
    it('Test Case 6: Invalid NoofTravellers',function(){
        expect( function(){ booking.validateTripDate("02/27/2019") } ).toThrow(new Error("Start date should be later than today"))
    });
    it('Test Case 7: Invalid NoofTravellers',function(){
        expect( function(){ booking.validateTripDate("03/26/2019") } ).toThrow(new Error("Start date should be later than today"))
    });
})