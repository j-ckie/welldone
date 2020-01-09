// regex to validate email
const isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

// validate registration data
exports.validateRegistration = data => { // exports.FUNCTIONNAME exports function in same line
    let errors = {};

    if (data.email === "") {
        errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be a valid email address";
    }

    if (data.password === "") errors.password = "Must not be empty";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords must match";
    if (data.handle === "") errors.handle = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

// validate login data
exports.validateLogin = data => {
    let errors = {};
    if (data.email === "") errors.email = "Must not be empty";
    if (data.password === "") errors.password = "Must not be empty";
    // console.log("FOO")
    console.log(data)
    console.log(errors)
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};