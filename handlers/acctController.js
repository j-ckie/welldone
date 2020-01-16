const models = require('../models')
const sequelize = require("sequelize");
const Op = sequelize.Op;
const fs = require('fs')


//Grabs Users Posts and Favourites then sends them to Page
module.exports.getThePostsandFavourites = async function (req, res) {
  //grabs user of the page
  let user_id = await models.Users.findOne({
    where: {
      email: req.params.userEmail
    }
  })

  //grabs user of the session
  let sessionId = await models.Users.findOne({
    where: {
      email: req.session.email
    }
  })

  //grabs all the information related to the Profile Page
  let userPage = await models.Users.findByPk(user_id.id, {
    include: [
      {
        model: models.Notifications,
        include: [
          {
            model: models.Posts,
            include: [
              {
                model: models.Users,
                as: 'user'
              }
            ],
            as: 'post'
          }
        ],
        as: 'notification'
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
          }, {
            model: models.Comments,
            as: 'comment'
          }, {
            model: models.PostImage,
            as: 'postImage'
          }, {
            model: models.Users,
            as: 'user'
          }
        ],
        as: 'post'
      }
    ]
  })

  //determines if the user of the session is the same as the user of the page
  if(userPage.id == sessionId.id) {
    userPage.hidden = ''
  } else {
    userPage.hidden = 'hidden'
  }

  //hides information and actions from users who dont own the page
  for(let i = 0; i < userPage.notification.length; i++) {
    if(userPage.notification[i].type == 'like') {
      userPage.notification[i].hidden = ''
    } else {
      userPage.notification[i].hidden = 'hidden'
    }
  }

  //grabs categories
  let categories = await models.Categories.findAll()

  res.render('account', { userPage: userPage, categories: categories, sessionId: sessionId });
  //res.json(userPage)
}

//Creates Post and sends it to database
module.exports.postToYourPosts = async function (req, res) {
  let user_id = await models.Users.findOne({
    where: {
      email: req.session.email
    }
  })

  //creates post
  let post = models.Posts.build({
    title: req.body.title,
    body: req.body.body,
    user_id: user_id.id
  })

  post.save().then(newpost => {

    //adds categories to post
    if (req.body.categories != undefined) {
      for (let i = 0; i < req.body.categories.length; i++) {
        let addCatToPost = models.PostsWithCategories.build({
          post_id: newpost.id,
          category_id: req.body.categories[i]
        })
        addCatToPost.save().then()
      }
    }

    //adds image to post
    if (req.file != null) {
      const host = req.hostname;
      const filePath = '/post_images/' + req.file.filename;

      let post_image = models.PostImage.build({
        imageURL: filePath,
        post_id: newpost.id
      })
      post_image.save().then()
    } else {
      let post_image = models.PostImage.build({
        imageURL: '/post_images/defaultImage.png',
        post_id: newpost.id
      })
      post_image.save().then()
    }

    res.redirect('back')
  })
}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req, res, next) => {
  models.Posts.destroy({
    where: {
      id: req.body.post_id
    }
  })
  .then(() => res.redirect('back'))
}

//Grabs Post and Updates it from database
module.exports.updateFromYourPosts = (req, res, next) => {
  let title = req.body.title
  let body = req.body.body
  let category = req.body.category

  //tests title for update
  if (title != undefined) {
    models.Posts.update({
      title: title
      }, {
        where: {
          id: req.body.post_id
        }
      }
    )
    .then()
  }
  if (body != undefined) {
    models.Posts.update({
      body: body
    }, {
      where: {
        id: req.body.post_id
      }
    })
    .then()
  }

  //tests categories for update
  if (req.body.categories != undefined) {
    models.PostsWithCategories.destroy({
      where: {
        post_id: req.body.post_id
      }
    })
    .then()
    //adds new categories to Post
    for (let i = 0; i < req.body.categories.length; i++) {
      let addCatToPost = models.PostsWithCategories.build({
        post_id: req.body.post_id,
        category_id: req.body.categories[i]
      })
      addCatToPost.save().then()
    }
  }

  //test image for update
  if (req.file != undefined) {
    const host = req.hostname;
    const filePath = './post_images/' + req.file.filename;

    models.PostImage.update({
      imageURL: filePath
    }, {
      where: {
        post_id: req.body.post_id
      }
    })
  }
  res.redirect('back')
}

//Grabs Favourite and Removes it from Your Favourites
module.exports.removeFromYourFavourites = (req, res, next) => {
  models.Notifications.destroy({
    where: {
      id: req.body.favourite_id
    }
  })
  .then(() => res.redirect('back'))
}

//add Profile Picture
module.exports.addProfileImage = async function (req, res) {
  //tests to see if a file was sent
  if (req.file != null) {
    let user_id = await models.Users.findOne({
      where: {
        email: req.session.email
      }
    })
    .then()
    //finds user
    models.Users.findOne({
      where: {
        id: user_id.id
      }
    })
    .then(data => {
      //deletes previous picture if not the default
      if (data.user_image != '/profile_pictures/defaultpicture.png') {
        fs.unlink('./public' + data.user_image, (err) => {
          console.log(req.body.file_path + 'was deleted');
        })
      }
    })

    const host = req.hostname;
    const filePath = '/profile_pictures/' + req.file.filename;

    //updates the picture
    models.Users.update({
      user_image: filePath
    }, {
      where: {
        id: user_id.id
      }
    })
    .then(res.redirect('back'))
  } else {
    res.send('No file selected')
  }
}

//delete post image
module.exports.removeFromPostImage = (req, res, next) => {
  //gets path and deletes it from server
  let path = './public' + req.body.file_path
  fs.unlink(path, (err) => {
    console.log(req.body.file_path + 'was deleted');
  })

  //deletes from database
  models.PostImage.update({
    imageURL: null
  }, {
    where: {
      post_id: req.body.post_id
    }
  })
  .then(() => res.redirect('back'))
}

//updates user profile
module.exports.editProfile = async function(req,res) {
  //finds user
  let user_id = await models.Users.findOne({
    where: {
      email: req.session.email
    }
  })

  //user details
  let userPage = await models.Users.findByPk(user_id.id)

  let categories = await models.Categories.findAll()

  res.render('editprofile',{userPage: userPage, categories: categories})
}
