const jwt = require("jsonwebtoken");
const config = require("./config");

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token.startsWith("Bearer ")) { // "Bearer " is industry standard
        token = token.slice(7, token.length); // removes Bearer from string
    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Token is invalid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
};

module.exports = {
    checkToken: checkToken
}