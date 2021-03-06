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
const PORT = process.env.PORT || 8080;
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

//======== about ========
app.get("/aboutus", authenticate, (req, res) => res.render("about"));

//Routes
const articleRouter = require('./routes/article')
app.use('/article', articleRouter)

const acctRouter = require('./routes/acct')
app.use('/acct', acctRouter)

const homeRouter = require('./routes/home')
app.use('/', homeRouter)

const categoryRouter = require('./routes/category')
app.use('/category', categoryRouter)

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
app.get('/acct', authenticate, (req, res) => {
    res.render('account')
})
// edit profile mustache page
app.get("/editprofile", (req, res) => res.render("editprofile"))

//category page
app.get('/category', (req, res) => {
    // console.log(req.paramas.Categories)
    res.render('category')
})
//article page
app.get('/article', (req, res) => {
    res.render('article')
})
//home
app.get('/', authenticate, (req, res) => {
    res.render('index')
})

//====== notifications page ======
const notificationsRouter = require("./handlers/notifications");
app.use("/notifications", authenticate, notificationsRouter)

// API fetch request - not route MUST STAY ON INDEX.JS
// initial registration of endpoint per user per browser
app.post("/endpoint", (req, res) => {

    let email = req.session.email

    models.Users.findOne({
        where: {
            email: email
        }
    })
        .then(persistedUser => {

            let persistedId = persistedUser.id

            let userEndpoint = models.Endpoints.build({
                user_id: persistedId,
                endpoint_data: JSON.stringify(req.body)
            })

            models.Endpoints.findOne({
                where: {
                    endpoint_data: JSON.stringify(req.body)
                }
            })
                .then(persistedEndpoint => {
                    if (!persistedEndpoint) { //if endpoint doesnt exist, save to table
                        console.log("Saving new endpoint for user ", persistedId)
                        userEndpoint.save().then(() => res.status(201)).catch(err => console.error(err));
                    } else if (persistedEndpoint.user_id != persistedId) { //if current endpoint id doesn't match table, update it
                        console.log("CURRENT USER does not match endpoint user")
                        models.Endpoints.update({
                            user_id: persistedId
                        }, {
                            where: {
                                endpoint_data: persistedEndpoint.endpoint_data
                            }
                        }).then(() => res.status(201)).catch(err => console.error(err))
                    } else if (persistedEndpoint.user_id === persistedId) { //do nothing
                        console.log("CURRENT USER matches endpoint user")
                        res.status(201)
                    }
                }).catch(err => console.error(err))
        })
        .catch(err => console.error(err))

    // webpush.sendNotification(subscription, payload).catch(error => {
    //     console.error(error.stack);
    // })
})


// API fetch - will run on "push" eventListener
app.post("/notify", (req, res) => {
    let postId = req.body.postId,
        ownerId = req.body.ownerId,
        type = req.body.type
    // console.log(postId)
    // console.log(ownerId)

    // find name of likeR
    models.Users.findOne({
        where: {
            email: req.session.email
        }
    })
        .then(persistedUser => {
            let name = persistedUser.name,
                senderId = persistedUser.id;

            // build entry on Notifications table
            let newNotification = models.Notifications.build({
                type: type,
                owner_id: ownerId,
                user_id: senderId,
                post_id: postId
            });

            newNotification.save()

            // look for endpoints table to find user specific endpoints

            models.Endpoints.findAll({
                where: {
                    user_id: ownerId
                }
            })
                .then(data => {
                    console.log("Found endpoint for user")
                    data.forEach(endpoint => {
                        // todo: update endpoint if different user session is on same endpoint
                        const payload = JSON.stringify({
                            title: `${name} has liked your post.`
                        });
                        let remote = JSON.parse(endpoint.endpoint_data) // remote endpoint
                        console.log("pushing to" + remote)
                        webpush.sendNotification(remote, payload)

                    })
                    res.redirect("back")
                })
                .catch(err => console.error(err))
        }).catch(err => console.error(err))
})

//Server Connection
app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT} at ` + Date.now());
});
