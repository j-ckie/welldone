const models = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

router.use(express.urlencoded());

const {
    validateRegistration
} = require("../util/validators");

router.get("/", (req, res) => res.render("register"));

// registration
router.post("/", (req, res) => {
    let email = req.body.email,
        name = req.body.name,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword;

    let registerData = {
        email: email,
        name: name,
        password: password,
        confirmPassword: confirmPassword
    }

    const { valid, errors } = validateRegistration(registerData);
    if (!valid) return res.status(400).json(errors) // validates data, if invalid, end

    models.Users.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(persistedUser => {
            if (persistedUser) {
                res.status(500).json({ message: "Email already registered" })
            } else {
                let persistedEmail = req.body.email,
                    persistedName = req.body.name,
                    persistedPassword = req.body.password,
                    persistedConfirmPassword = req.body.confirmPassword

                bcrypt.hash(persistedPassword, SALT_ROUNDS)
                    .then(hash => {
                        let newUser = models.Users.build({
                            email: persistedEmail,
                            name: persistedName,
                            password: hash
                        })

                        newUser.save().then(() => res.redirect("/login")).catch(err => console.error(err))
                    })

            }
        })
})

module.exports = router