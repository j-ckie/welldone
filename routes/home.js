const express = require('express')
const router = express.Router()
const HomeController = require('../handlers/homeController')
// const CategoryController = require('../handlers/categoryController')

//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
//============================================

router.get('/',authenticate, HomeController.getHomePage)

module.exports = router
