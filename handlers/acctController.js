const models = require('../models')
const sequelize = require("sequelize");

//Grabs Users Posts and sends them to Page
module.exports.getYourPostsandFavourites = async function (req,res){
    let transaction = await models.sequelize.transaction({autocommit:false});
    let userPage = await models.Users.findByPk(1,{
      include: [
        {
          model: models.Favourite,
          include: [
            {
              model: models.Posts,
              as: 'post'
            }
          ],
          as: 'favourite'
        }, {
          model: models.Posts,
          include: [
            {
              model: models.PostsWithCategories,
              include: [
                {
                  model: models.Categories,
                  as: 'category'
                }
              ],
              as: 'postswithcategories'
            }
          ],
          as: 'post'
        }
      ],
      transaction:transaction
    });
    let categories = await models.Categories.findAll()

    userPage.post.sort(function (a, b) {
      return a.id - b.id;
    })
    //res.json(userPage)

    res.render('acct',{userPosts:userPage.post, favouritePosts: userPage.favourite, categories:categories});
    await transaction.commit();
}

//Creates Post and sends it to database
module.exports.postToYourPosts = (req,res,next) => {
  let post = models.Posts.build({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id
  })
  post.save().then(newpost => {
    for(let i = 0; i < req.body.categories.length; i++) {
      let addCatToPost = models.PostsWithCategories.build({
        post_id: newpost.id,
        category_id: req.body.categories[i]
      })
      addCatToPost.save().then()
    }
    res.redirect('back')
  })
}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req,res,next) => {
  models.Posts.destroy({
    where: {
      id: req.body.post_id
    }
  }).then(() => res.redirect('back'))
}

//Grabs Post and Updates it from database
module.exports.updateFromYourPosts = (req,res,next) => {
  models.Posts.update({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  }, {
    where: {
      id: req.body.post_id
    }
  }).then()
  models.PostsWithCategories.destroy({
    where: {
      post_id: req.body.post_id
    }
  }).then()
  for(let i = 0; i < req.body.categories.length; i++) {
    let addCatToPost = models.PostsWithCategories.build({
      post_id: req.body.post_id,
      category_id: req.body.categories[i]
    })
    addCatToPost.save().then()
  }
  res.redirect('back')
}

//Grabs Favourite and Removes it from Your Favourites
module.exports.removeFromYourFavourites = (req,res,next) => {
  models.Favourite.destroy({
    where: {
      id: req.body.favourite_id
    }
  }).then(() => res.redirect('back'))
}
