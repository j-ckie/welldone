// regex to validate email - ask jackie if you want to learn how it works
let emptyError = "Must not be empty";
let invalidEmail = "Must be a valid email address";
let pwmatchError = "Passwords must match";

const isEmail = email => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

// validate registration data
exports.validateRegistration = data => {
    let errors = {};

    if (data.email === "") {
        errors.email = emptyError;
    } else if (!isEmail(data.email)) {
        errors.email = invalidEmail;
    }

    if (data.name === "") errors.name = emptyError;
    if (data.password === "") errors.password = emptyError;
    if (data.confirmPassword === "") errors.confirmPassword = emptyError;
    if (data.password !== data.confirmPassword) errors.confirmPassword = pwmatchError;

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}

exports.validateLogin = data => {
    let errors = {}

    if (data.email === "") {
        errors.email = emptyError;
    } else if (!isEmail(data.email)) {
        errors.email = invalidEmail;
    }

    if (data.password === "") errors.name = emptyError;

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}