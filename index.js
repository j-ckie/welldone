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
app.get('/account', (req, res) => {
    res.render('account')
})

//blogpage page
app.get('/blogpage',(req,res)=>{  
    res.render('blogpage')
  })

//home page
app.get('/index',(req,res)=>{
    res.render('index')
})

//category page
app.get('/category', (req, res) => {
  res.render('category')
})

app.get('/article', (req, res) => {
  res.render('article')
})

//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000 at " + Date.now());
});
