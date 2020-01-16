const express = require('express')
const router = express.Router()
const CategoryController = require('../handlers/categoryController')
const models = require('../models')
//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
// //============================================

// router.get('/', authenticate, CategoryController.getCategories)
router.get('/:categoryId',authenticate, async (req, res) => {
  //user
  let user_id = await models.Users.findOne({
    where: {
        email: req.session.email
      }
  })


router.get('/:categoryId', authenticate, CategoryController.getCategories)

module.exports = router
