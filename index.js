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

//======= express-session ========
const session = require("express-session");
app.set("trust proxy", 1)
app.use(session({
    secret: "everyth_ing is perfectly fine",
    resave: false,
    saveUninitialized: false // true - always have cookie (tasty), false - have to do something with session first before you can get cookie
}))


app.use(express.urlencoded({ extended: true }))


//======== registration ========
const registrationRouter = require('./handlers/register');
app.use("/register", registrationRouter);
//==============================

//======== login ========
const loginRouter = require("./handlers/login")
app.use("/login", loginRouter)
//app.get("/login", (req, res) => res.render("login"));

//testing stuff
app.get("/test", (req, res) => res.render("test"));
//=======================

//========== account page route ==========
app.get('/account', (req, res) => {
    res.render('account')
})

//========== blog page route ==========
app.get('/blogpage', (req, res) => {
    res.render('blogpage')
})
//=====================================

//Routes
const postRouter = require('./routes/post')
app.use('/post', postRouter)

const acctRouter = require('./routes/acct')
app.use('/acct', acctRouter)

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
app.get('/account',(req,res)=>{
    res.render('account')
  })
//blogpage page
app.get('/blogpage',(req,res)=>{
    res.render('blogpage')
  })
app.get('/index',(req,res)=>{
    res.render('index')
})
//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000 at " + Date.now());
});
