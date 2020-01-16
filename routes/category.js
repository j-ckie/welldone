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

  let categoryId = req.params.categoryId
  let category = await models.Categories.findOne({
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
                },
                {
                  model: models.PostImage,
                  as: 'postImage'
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

  console.log(category.postswithcategories)

  for(let i = 0; i < category.postswithcategories.length; i++){
    let likes = await models.Notifications.findAll({
      where: {
        post_id: category.postswithcategories[i].id,
        type: 'like'
      }
    })

    category.postswithcategories[i].likes = likes

    //finds if user liked post
    let liked = await models.Notifications.findOne({
      where: {
        user_id: user_id.id,
        type: 'like',
        post_id: category.postswithcategories[i].id
      }
    })

    category.postswithcategories[i].liked = liked

    //determines which button to show
    if(liked != null) {
      category.postswithcategories[i].hideAdd = 'hidden'
    } else {
      category.postswithcategories[i].hideRemove = 'hidden'
    }
  }
  //res.json(category)
  res.render('category',{category:category,postswithcategories:category.postswithcategories,post:category.post,user:category.user})
})
module.exports = router
