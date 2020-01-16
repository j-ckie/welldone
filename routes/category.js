const express = require('express')
const router = express.Router()
const CategoryController = require('../handlers/categoryController')
const models = require('../models')
//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
// //============================================
// router.get('/', authenticate, CategoryController.getCategories)
router.get('/:categoryId', async (req, res) => {
  let categoryId = req.params.categoryId
  let category = await models.Categories.findOne({
      include:[
          {
              model:models.Posts,
              as: 'post'
          }
      ],
      where:{
           category:categoryId
       }
  })
  res.json(category)
  // res.render('category')
})
module.exports = router
