var validator = require('../src/service/userValidator');


//register
describe('Name validation suite:',function(){
    it('Test Case 1: names are correct',function(){
        var result= validator.validateName("hari Venkat")
        expect(result).toEqual(undefined)
    });
    it('Test Case 2: names are incorrect',function(){
        expect(function(){ validator.validateName(" hari Venkat") }).toThrow(new Error("Enter correct name"))
    });
    it('Test Case 3: names are incorrect',function(){
        expect( function(){ validator.validateName("hariVenkat ") } ).toThrow(new Error("Enter correct name"))
    });
})


describe('Email validation suite:',function(){
    it('Test Case 4: email Id is correct',function(){
        var result= validator.validateEmailId("abc@gmail.com")
        expect(result).toEqual(undefined)
    });
    it('Test Case 5: email Id incorrect',function(){
        expect( function(){ validator.validateEmailId("abcgmail.com") } ).toThrow(new Error("Invalid Email Id"))
    });
})

describe('ContactNo validation suite:',function(){
    it('Test Case 6: ContactNo is correct',function(){
        var result= validator.validateContact(9875638734)
        expect(result).toEqual(undefined)
    });
    it('Test Case 7: ContactNo incorrect',function(){
        expect( function(){ validator.validateContact(5464235565) } ).toThrow(new Error("Invalid Contact number"))
    });
    it('Test Case 8: ContactNo incorrect',function(){
        expect( function(){ validator.validateContact(98756387344) } ).toThrow(new Error("Invalid Contact number"))
    });
})

describe('Password validation suite:',function(){
    it('Test Case 9: Password is correct',function(){
        var result= validator.validatePassword('hariVenkat!56')
        expect(result).toEqual(undefined)
    });
    it('Test Case 10: Password is incorrect',function(){
        expect( function(){ validator.validatePassword('hiI!56') } ).toThrow(new Error("Invalid Password"))
    });
    it('Test Case 11: Password is incorrect',function(){
        expect( function(){ validator.validatePassword('hihfjsdhfjs56') } ).toThrow(new Error("Invalid Password"))
    });
})




