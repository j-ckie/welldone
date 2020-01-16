const express = require('express')
const router = express.Router()
const CategoryController = require('../handlers/categoryController')
const models = require('../models')
//=============login/authenticate=============
const authenticate = require("../util/auth");
const bcrypt = require("bcrypt");
// //============================================
router.get('/', authenticate, CategoryController.getCategories)
router.get('/:categoryId', async (req, res) => {
  let categoryId = req.params.categoryId
  let category = await models.Categories.findAll({
      include:[
          {
              model:models.PostsWithCategories,
              include:[
                {
                model:models.Posts,
                include:[
                {
                  model: models.Users,
                  as: "user"
                }
              ],
                as:'post'
                },
              ],
              as: 'postswithcategories'
          }       
      ],
      where:{
           category:categoryId
       }
  })
  // res.json(category)
  res.render('category',{category:category,postswithcategories:category.postswithcategories,post:category.post,user:category.user})
})
module.exports = router
