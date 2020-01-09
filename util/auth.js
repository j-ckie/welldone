const jwt = require("jsonwebtoken");
const models = require("../models");

module.exports = (req, res, next) => {
    let handle = req.body.handle
    models.Users.findOne({
        where: {
            handle: handle
        }
    })
        .then(user => {
            jwt.sign({ handle: handle }, "secret", (error, token) => {
                if (token) {
                    res.json({
                        handle: handle,
                        token: token,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        status: 200
                    })
                    return next();
                } else {
                    res.status(500).json({ message: "Unable to generate token" })
                }
            });
        })
        .catch(err => console.error(err));
}