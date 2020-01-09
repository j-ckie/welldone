const models = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("login"));

router.post("/", (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    models.Users.findOne({
        where: {
            email: email
        }
    }).then(persistedUser => {
        if (persistedUser) {
            jwt.sign({ email: email }, "secret", function (error, token) {
                if (token) {
                    res.json({
                        email: persistedUser.email,
                        name: persistedUser.name,
                        id: persistedUser.id,
                        token: token,
                        status: 200
                    })
                } else {
                    res.status(500).json({ message: "Unable to generate token" });
                }
            })

            bcrypt.compare(password, persistedUser.password)
                .then(success => {
                    if (success) {
                        res.redirect("/index");
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
