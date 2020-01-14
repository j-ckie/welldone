
const express = require('express')
const sequelize = require("sequelize");
const router = express.Router()
const crypto = require('crypto')
const path = require('path')

const multer = require("multer")
const storage = multer.diskStorage({
  destination: 'public/profile_images',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);

      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
})
var upload = multer({storage: storage})

const AcctController = require('../handlers/acctController')

router.get('/',AcctController.getYourPostsandFavourites)

router.post('/addPost', upload.single('post_image'),AcctController.postToYourPosts)

router.post('/deletePost',AcctController.deleteFromYourPosts)

router.post('/updatePost', upload.single('post_image'),AcctController.updateFromYourPosts)

router.post('/removeFavourite',AcctController.removeFromYourFavourites)

router.post('/user_image', upload.single('user_image'),AcctController.addProfileImage)

module.exports = router
