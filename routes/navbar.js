const express = require('express')
const router = express.Router()
const navbar = require('../handlers/navbar')
const authenticate = require("../util/auth")

router.get('/home', authenticate,navbar.getCategories)

module.exports = router