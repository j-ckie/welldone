// user registration and login
const models = require("../models");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const {
    validateRegistration,
    validateLogin
} = require("../util/validators");

let token, userID;

// registration
exports.register = (req, res) => {
    let email = req.body.email,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword,
        handle = req.body.confirmPassword;

    const newUser = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        handle: handle
    };

    const { valid, errors } = validateRegistration(newUser);

    if (!valid) return res.status(400).json(errors);

    // profile pic stuff for later
    //const noImg = "./img/no-image.png";

    models.Users.findOne({
        where: {
            handle: req.body.handle
        }
    }).then(user => {
        if (user) res.status(500).json({ message: "Handle already exists" })
        else {
            let handle = req.body.handle,
                password = req.body.password,
                email = req.body.email;
            bcrypt.hash(password, SALT_ROUNDS).then(hash => {
                let newUser = models.Users.build({
                    handle: handle,
                    password: hash,
                    email: email
                })
                newUser.save().then(() => res.redirect("/login"))
                    .then(data => {
                        userID = data.user.id // checks and sets user id. confirm if this follows columns on table later
                        return data.user.getIdToken();
                    })
                    .then(idToken => {
                        token = idToken;
                        const userCredentials = {
                            handle: newUser.handle,
                            email: newUser.email,
                            createdAt: new Date().toISOString(),
                            userID
                            // imgURL: `stuff`
                        };
                        userCredentials.save().then(() => {
                            return res.status(201).json({ token })
                        }).catch(err => console.error(err))
                    })
                    .catch(err => {
                        console.error(err);
                        if (err.code === "auth/email-already-in-use") {
                            return res.status(400).json({ email: "Email is already in use" });
                        } else {
                            return res.status(400).json({ general: "Something went wrong, please try again" });
                        }
                    });
            });
        }
    });
}

// console.log(validateRegistration({
//     email: "test@",
//     password: "123456"
// }))

exports.login = (req, res) => {
    let email = req.body.email,
        password = req.body.password;
    const user = {
        email: email,
        password: password
    };

    const { valid, errors } = validateLogin(user);

    if (!valid) return res.status(400).json(errors); // if the user information is not valid, end the script;

    models.Users.findOne({
        where: {
            email: email
        }
    })
        .then(persistedUser => {
            if (!persistedUser) {
                res.render("register", { message: "Please sign up!" })
            } else if (persistedUser) {
                bcrypt.compare(password, persistedUser.password).then(success => {
                    if (success) {
                        return success.user.getIdToken(); // retrieve token?
                    } else {
                        res.render("login", { message: "Invalid information" })
                    }
                })
                    .then(token => {
                        return res.json({ token })
                    })
                    .catch(err => console.error(err))
            }
        })
        .then(() => res.render("index"))
}