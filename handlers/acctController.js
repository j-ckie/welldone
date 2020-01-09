const models = require('../models')

//Grabs Users Posts and sends them to Page
module.exports.getYourPosts = (req,res,next) => {
  models.User.findByPk(userId, {
    include: [
      {
        model: models.Post,
        as: 'post'
      }
    ]
  }).then(user => {
    let usersPosts = user.post
    models.Post.findByPk(userId, {
      include: [
        {
          model: models.Comment,
          as: 'comment'
        }
      ]
    }).then(post => {
      let comments = post.comment
      usersPosts.comments = parseInt(comments.length)
    })
    res.render('acct', {userPosts: usersPosts})
  })
}

//Grabs Users Favourite Posts and sends them to Page
module.exports.getYourFavourites = (req,res,next) => {
  models.User.findByPk(userId, {
    include: [
      {
        model: models.Favourite,
        as: 'favourite'
      }
    ]
  }).then(user => {
    let usersFavourites = []
    let favourites = user.favourite
    for(let i = 0; i < favourites.length; i++) {
      models.Post.findByPk(favourites[i],{
        include: [
          {
            model: models.Comment,
            as: 'comment'
          }
        ]
      }).then(post => {
        let comments = post.comment
        post.comments = parseInt(comments.length)
        usersFavourites.push(post)
      })
    }
    res.render('acct', {favouritePosts: usersFavourites})
  })
}

//Creates Post and sends it to database
module.exports.postToYourPosts = (req,res,next) => {
  let post = models.Post.build({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  })
  post.save().then(() => res.redirect('/acct'))
}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req,res,next) => {
  models.Post.destroy({
    where: {
      id: req.body.postId
    }
  }).then(() => res.redirect('/acct'))
}

//Grabs Post and Updates it from database
module.exports.updateFromYourPosts = (req,res,next) => {
  models.Post.update({
    title: req.body.title,
    body: req.body.body,
    category: req.body.category
  }, {
    where: {
      id: req.body.postId
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
