const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const config = require("./config");

dotenv.config();

const checkToken = async (req, res, next) => {
    let token = req.cookies.token || '';
    try {
        if (!token) {
            return res.status(401).json({ message: "Please log in" })
        }

        const decrypt = await jwt.verify(token, "everythingisfine");
        req.user = {
            id: decrypt.id,
            email: decrypt.email
        };
        res.locals.loggedIn = true
        next();
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: err })
    }
};

module.exports = checkToken;