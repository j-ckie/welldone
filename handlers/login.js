const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {
    validateLogin
} = require("../util/validators");

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    let email = req.body.email,
        password = req.body.password;
    // id = req.body.id;

    let loginData = {
        email: email,
        password: password
    }

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
                        if (req.session) {
                            req.session.email = persistedUser.email
                            req.session.name = persistedUser.name
                            req.session.id = persistedUser.id
                        }
                        res.redirect("/home");
                    } else {
                        res.render("login", { message: "invalid information" })
                    }
                })
        } else {
            let invalidLogin = "Invalid login attempt";
            res.status(500).json({ message: invalidLogin });
        }
    });
});

module.exports = router;