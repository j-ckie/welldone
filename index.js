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

app.use(express.static(path.join(__dirname, "partials")));
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.listen(3000, () => {
    console.log("Server is live on http://localhost:3000");
});

// ############ render homepage ############
app.get("/", (req, res) => res.render("index"))
// ############ end homepage ############

// ############ user registration and login ############
const {
    register,
    login
} = require("./handlers/users");

app.post("/register", register);
app.post("/login", login);

app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
// ########### end user registration and login ##########