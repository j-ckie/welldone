const express = require('express')
const router = express.Router()
const AcctController = require('../handlers/acctController')

router.get('/',AcctController.getYourPostsandFavourites)

router.post('/addPost',AcctController.postToYourPosts)

router.post('/deletePost',AcctController.deleteFromYourPosts)

router.post('/updatePost',AcctController.updateFromYourPosts)

router.post('/removeFavourite',AcctController.removeFromYourFavourites)

module.exports = router
