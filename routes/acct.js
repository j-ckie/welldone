const express = require('express')
const router = express.Router()
const AcctController = require('../controllers/acctController')

router.get('/',AcctController.getYourPosts)

module.exports = router
