const express = require('express')
const router = express.Router()
const PostController = require('../handlers/postController')

router.get('/',PostController.getPost)

router.post('/addFavourite',PostController.addFavourite)

router.post('/addComment',PostController.addComment)

router.post('/updateComment',PostController.updateComment)

router.post('/deleteComment',PostController.deleteComment)

module.exports = router
