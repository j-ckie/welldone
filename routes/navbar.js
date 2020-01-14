const express = require('express')
const router = express.Router()
const navbars = require('../handlers/navbar')
const authenticate = require("../util/auth")

router.get('/', authenticate,navbars.getCategories)

module.exports = router