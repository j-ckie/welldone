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

//file upload
const crypto = require('crypto')
const multer = require("multer")
const morgan = require('morgan')
app.use(morgan('dev'))

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//category page
app.get('/category', (req, res) => {
    res.render('category')
})

// API fetch request - not route
app.post('/notification/like', (req, res) => {
    // create likenotification entry on table
    let likedPostId = req.query.post_id,
        postOwnerId = req.query.users_id;

    let newLikeNotification = models.LikesNotifications.build({
        type: "like",
        recipient_id: postOwnerId,
        sender_id: req.session.id,
        post_id: likedPostId
    });

    newLikeNotification.save().then(() => {
        res.status(201).json({ message: "Post successfully liked!" })
    }).catch(err => console.error(err))

    // send push notification to endpoint
    models.Endpoints.findAll({
        where: {
            user_id: postOwnerId
        }
    })
        .then(data => {
            // title for push notification
            const pushTitle = JSON.stringify({
                title: `${req.session.name} has liked your post.`
            });

            data.forEach(endpoint => {
                webpush.sendNotification(endpoint.endpoint_data, pushTitle).catch(err => console.error(err))
            })
        })
            .catch(err => console.error(err))
})
//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000 at " + Date.now());
});
