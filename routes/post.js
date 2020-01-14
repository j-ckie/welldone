const express = require('express')
const router = express.Router()
const PostController = require('../handlers/postController')
const authenticate = require("../util/auth");

router.get('/',authenticate,PostController.getPost)

router.post('/addFavourite',authenticate,PostController.addFavourite)

router.post('/addComment',authenticate,PostController.addComment)

router.post('/updateComment',authenticate,PostController.updateComment)

router.post('/deleteComment',authenticate,PostController.deleteComment)

module.exports = router
