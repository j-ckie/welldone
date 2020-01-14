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
const postRouter = require('./routes/post')
app.use('/post', postRouter)

const acctRouter = require('./routes/acct')
app.use('/acct', authenticate, acctRouter)

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
//account page

app.get('/account', authenticate, (req, res) => {
    res.render('account')
})
//blogpage page
app.get('/blogpage', authenticate, (req, res) => {
    res.render('blogpage')
})

app.get('/', authenticate, (req, res) => { // change to "/" instead of index

    res.render('index')
})

// edit profile mustache page
app.get("/editprofile", (req, res) => res.render("editprofile"))

//category page
app.get('/category', (req, res) => {
    res.render('category')
})

//article page
app.get('/article', (req, res) => {
    res.render('article')
})


// API fetch request - not route
// app.post('/notification', (req, res) => {
// let subscription = req.body;
// // === create likenotification entry on table ===
// let likedPostId = req.query.post_id,
//     postOwnerId = req.query.users_id

// let newLikeNotification = models.LikesNotifications.build({
//     type: "like",
//     recipient_id: postOwnerId, // post owner
//     sender_id: req.session.id, // who clicked like
//     post_id: likedPostId
// });

// newLikeNotification.save().then(() => {
//     res.status(201).json({ message: "Post successfully liked!" })
// }).catch(err => console.error(err))
// // ======

// // === send push notification to endpoint ===

// let endpointPayload = models.Endpoints.build({
//     user_id: postOwnerId,
//     endpoint_data: subscription
// })

// endpointPayload.save().then(() => res.redirect("/")).catch(err => console.error(err))

// models.Endpoints.findAll({
//     where: {
//         user_id: postOwnerId
//     }
// })
//     .then(data => {
//         // title for push notification
//         const pushTitle = JSON.stringify({
//             title: `${req.sesssion.name} has liked your post.`
//         });

//         data.forEach(endpoint => {
//             webpush.sendNotification(endpoint.endpoint_data, pushTitle).catch(err => console.error(err))
//         })
//     })
//     .catch(err => console.error(err));


// ============= example of push notification =============
// const subscription = req.body;
// res.status(201).json({});
// const payload = JSON.stringify({
//     title: 'you have a new like'
// });

// // console.log(subscription);


// webpush.sendNotification(subscription, payload).catch(error => {
//     console.error(error.stack);
// })

// })

//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000 at " + Date.now());
});