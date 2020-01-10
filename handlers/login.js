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
    console.log("FOO")
    const { valid, errors } = validateLogin(loginData)
    if (!valid) return res.status(400).json(errors)

    models.Users.findOne({
        where: {
            email: email
        }
    }).then(persistedUser => {
        if (persistedUser) {
            bcrypt.compare(password, persistedUser.password)
                .then(success => {
                    if (success) {
                        // res.redirect("/index");
                        jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60), // sets token expiration to 1hr
                            email: email
                        }, "everythingisfine", function (error, token) {
                            if (token) {
                                res.cookie()
                                // res.json({
                                //     email: persistedUser.email,
                                //     name: persistedUser.name,
                                //     id: persistedUser.id,
                                //     token: token,
                                //     status: 200
                                // })
                                // res.redirect(200, "/index")
                                console.log(res)
                            } else {
                                res.status(500).json({ message: "Unable to generate token" });
                            }
                        })
                    } else {
                        res.render("login", { message: "invalid information" })
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