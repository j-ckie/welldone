const jwt = require("jsonwebtoken");

// generates web token to authenticate against - returns a cookie
const generateToken = (res, id, email) => {
    const expiration = 3600;
    const token = jwt.sign({ id, email }, "everythingisfine", {
        expiresIn: '1d'
    });
    return res.cookie("token", token, {
        expires: new Date(Date.now() + expiration),
        secure: false,
        httpOnly: true
    });
};

module.exports = generateToken