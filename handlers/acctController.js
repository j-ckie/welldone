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
          as: 'post'
        }
      ],
      transaction:transaction
    });
    //res.json(userPage)
    
    res.render('acct',{userPosts:userPage.post, favouritePosts: userPage.favourite});
    await transaction.commit();
}

//Creates Post and sends it to database
module.exports.postToYourPosts = (req,res,next) => {
  let post = models.Posts.build({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id
  })
  post.save().then(() => res.redirect('/acct'))
}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req,res,next) => {
  models.Posts.destroy({
    where: {
      id: req.body.post_id
    }
  }).then(() => res.redirect('/acct'))
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
  }).then(() => res.redirect('/acct'))
}

//Grabs Favourite and Removes it from Your Favourites
module.exports.removeFromYourFavourites = (req,res,next) => {
  models.Favourite.destroy({
    where: {
      id: req.body.favouriteId
    }
  }).then(() => res.redirect('/acct'))
}
