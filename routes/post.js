const express = require('express')
const router = express.Router()
const PostController = require('../handlers/postController')

router.get('/',PostController.getPost)

router.post('/addFavourite',PostController.addFavourite)

module.exports = router
