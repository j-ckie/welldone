// const jwt = require("jsonwebtoken");
const config = require("../util/config");

// generates web token to authenticate against - returns a cookie
const generateToken = (res, id, email) => {
    // const expiration = 3600;
    // const token = jwt.sign({ id, email }, config.secret, {
    //     expiresIn: '1h'
    // });
    // res.status(200).send({ access_token: token });
    // return token;
    // return res.cookie("token", token, {
    //     expires: new Date(Date.now() + expiration),
    //     secure: false,
    //     httpOnly: true
    // });
};

module.exports = generateToken