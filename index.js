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

//Routes
const postRouter = require('./routes/post')
app.use('/post',postRouter)

const acctRouter = require('./routes/acct')
app.use('/acct',acctRouter)

//Mustache
app.use(express.static(path.join(__dirname, "partials")));
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set("views", "./views");
app.set("view engine", "mustache");

//Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//Server Connection
app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000");
});
