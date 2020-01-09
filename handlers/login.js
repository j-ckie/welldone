const models = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
    validateLogin
} = require("../util/validators");

router.use(express.urlencoded());

router.post("/", (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    let loginData = {
        email: email,
        password: password
    }
    // console.log("FOO")
    const { valid, errors } = validateLogin(loginData)
    if (!valid) return res.status(400).json(errors)

    models.Users.findOne({
        where: {
            email: email
        }
    }).then(persistedUser => {
        if (persistedUser) {
            jwt.sign({ email: email }, "everythingisfine", function (error, token) {
                if (token) {
                    bcrypt.compare(password, persistedUser.password)
                        .then(success => {
                            if (success) {
                                console.log("FOO")
                                res.json({
                                    email: persistedUser.email,
                                    name: persistedUser.name,
                                    id: persistedUser.id,
                                    token: token,
                                    status: 200
                                })
                            } else {
                                res.render("login", { message: "invalid information" })
                            }
                        }).then(() => res.redirect("/index"))

                } else {
                    res.status(500).json({ message: "Unable to generate token" });
                }
            })
        } else {
            let invalidLogin = "Invalid login attempt";
            res.status(500).json({ message: invalidLogin });
            console.log("Login failed; incorrect information");
        }
    });
});

module.exports = router;