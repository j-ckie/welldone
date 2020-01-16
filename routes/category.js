const express = require('express')
const router = express.Router()
const CategoryController = require('../handlers/categoryController')
const models = require('../models')
//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
// //============================================
// router.get('/', authenticate, CategoryController.getCategories)
router.get('/category/:categoryId', async (req, res) => {
    
  let categoryId = req.params.categoryId
  let category = await models.Categories.findOne({
      include:[
          {
              model:models.Posts,
              as: 'post'
          }
      ]
      // where:{
      //     id:categoryId
      // }
  })
  console.log(category)
  res.json(category)
})
module.exports = router