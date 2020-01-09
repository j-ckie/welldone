const express = require('express')
const router = express.Router()
const PostController = require('../handlers/postController')

router.get('/',PostController.getPost)

module.exports = router
