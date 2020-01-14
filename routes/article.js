const express = require('express')
const router = express.Router()
const ArticleController = require('../handlers/articleController')

//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
//============================================

router.get('/',authenticate,ArticleController.getPost)

router.post('/addFavourite',authenticate,ArticleController.addFavourite)

router.post('/addComment',authenticate,ArticleController.addComment)

router.post('/updateComment',authenticate,ArticleController.updateComment)

router.post('/deleteComment',authenticate,ArticleController.deleteComment)

module.exports = router
