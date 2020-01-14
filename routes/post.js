const express = require('express')
const router = express.Router()
const PostController = require('../handlers/postController')

//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
//============================================

router.get('/',authenticate,PostController.getPost)

router.post('/addFavourite',authenticate,PostController.addFavourite)

router.post('/addComment',authenticate,PostController.addComment)

router.post('/updateComment',authenticate,PostController.updateComment)

router.post('/deleteComment',authenticate,PostController.deleteComment)

module.exports = router
