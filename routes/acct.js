
const express = require('express')
const sequelize = require("sequelize");
const router = express.Router()
const crypto = require('crypto')
const path = require('path')
const authenticate = require("../util/auth");
const fs = require('fs')
const bcrypt = require("bcrypt");

const multer = require("multer")
const profile_picture_storage = multer.diskStorage({
  destination: 'public/profile_pictures',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);

      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
})
var profile_picture_upload = multer({storage: profile_picture_storage})

const post_image_storage = multer.diskStorage({
  destination: 'public/post_images',
  filename: function (req, file, callback) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);

      callback(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
})
var post_image_upload = multer({storage: post_image_storage})

const AcctController = require('../handlers/acctController')

router.get('/', authenticate,AcctController.getYourPostsandFavourites)

router.post('/addPost', post_image_upload.single('post_image'), authenticate,AcctController.postToYourPosts)

router.post('/deletePost', authenticate,AcctController.deleteFromYourPosts)

router.post('/updatePost', post_image_upload.single('post_image'),authenticate,AcctController.updateFromYourPosts)

router.post('/removeFavourite', authenticate,AcctController.removeFromYourFavourites)

router.post('/user_image', profile_picture_upload.single('user_image'),authenticate,AcctController.addProfileImage)

router.post('/removePostImage', authenticate, AcctController.removeFromPostImage)

module.exports = router
