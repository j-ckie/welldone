//Variable Set-Up
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const models = require("./models");
const SALT_ROUNDS = 10;
const path = require("path");
const VIEWS_PATH = path.join(__dirname, "/views")
const mustacheExpress = require("mustache-express");
const bcrypt = require("bcrypt");
require("dotenv").config();

//========= web push ===========
const webpush = require("web-push");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(`mailto:test@email.com`, publicVapidKey, privateVapidKey);

//========== express-session ========
const session = require("express-session");
app.set("trust proxy", 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false // true - always have cookie (tasty), false - have to do something with session first before you can get cookie
}))
//===================================


//========== authentication middleware ==========
const authenticate = require("./util/auth");
/*
To add authentication to route:

ex: app.get("/private-info", authenticate, (req, res) => {<CODE HERE>})

Ask Jackie for more information
*/
//===============================================


app.use(express.urlencoded({ extended: true }))

var $ = require("jquery")

//======== registration ========
const registrationRouter = require('./handlers/register');
app.use("/register", registrationRouter);
//==============================

//======== login ========
const loginRouter = require("./handlers/login")
app.use("/login", loginRouter)

//testing stuff
app.get("/test", authenticate, (req, res) => res.render("test"));
//=======================

//======== logout ========
app.post("/logout", authenticate, (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

//Routes
const articleRouter = require('./routes/article')
app.use('/article', articleRouter)

const acctRouter = require('./routes/acct')
app.use('/acct', acctRouter)

const homeRouter = require('./routes/home')
app.use('/', homeRouter)

//Mustache
app.use(express.static(path.join(__dirname, "partials")));
app.use(express.static(path.join(__dirname, '/public')))
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set("views", "./views");
app.set("view engine", "mustache");

//Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// edit profile mustache page
app.get("/editprofile", (req, res) => res.render("editprofile"))

//category page
app.get('/category', (req, res) => {
    res.render('category')
})

// API fetch request - not route

app.post('/notification', (req, res) => {
    // const subscription = req.body;
    // res.status(201).json({});
    // const payload = JSON.stringify({
    //     title: 'you have a new like'
    // });

    // // console.log(subscription);


    // webpush.sendNotification(subscription, payload).catch(error => {
    //     console.error(error.stack);
    // })
})
//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000 at " + Date.now());
});
