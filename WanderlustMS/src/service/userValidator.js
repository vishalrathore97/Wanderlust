var userValidator = {}

userValidator.validateName =( name )=> {

    if( !name.match( /^[a-zA-Z][a-zA-Z\s]+[a-zA-Z]$/ ) ) {
        var err = new Error( 'Enter correct name' )
        err.status = 406
        throw err;
    }
}

userValidator.validateEmailId =( emailId )=> {
    if( !emailId.match( /^[a-z]+@[a-z]+\.[a-z]{2,3}$/ ) ) {
        var err = new Error( 'Invalid Email Id' )
        err.status = 406
        throw err;
    }
}

userValidator.validateContact=( contactNo )=> {
    contactNo=String( contactNo )
    if( !contactNo.match( /^[9,8,7][0-9]{9}$/ ) ) {
        var err = new Error( 'Invalid Contact number' )
        err.status = 406
        throw err;
    }
}

userValidator.validatePassword=( password )=>{
    if( !password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/ ) ){
        var err = new Error( 'Invalid Password' )
        err.status = 406
        throw err;
    }
    
}

module.exports = userValidator;
