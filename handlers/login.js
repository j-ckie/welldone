const models = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const generateToken = require("./generateToken");

const cookieParser = require("cookie-parser");
require("dotenv").config();

const {
    validateLogin
} = require("../util/validators");

router.use(express.urlencoded());

router.use(cookieParser());

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    let email = req.body.email,
        password = req.body.password;

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
                        let userToken = generateToken(res, persistedUser.id, persistedUser.email);


                        res.redirect("/test");
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