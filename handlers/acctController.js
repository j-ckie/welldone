const models = require('../models')
const sequelize = require("sequelize");
const fs = require('fs')


//Grabs Users Posts and Favourites then sends them to Page
module.exports.getThePostsandFavourites = async function (req, res) {
  console.log("getThePostsandFavourites")
  console.log(req.params)
    let user_id = await models.Users.findOne({
        where: {
            email: req.params.userEmail
        }
    })
    console.log(user_id + "///////////////")
      let userPage = await models.Users.findByPk(user_id.id, {
        //include users favourites
        include: [
          {
            model: models.Favourite,
            //include posts in favourites
            include: [
              {
                model: models.Posts,
                //include comments in favourites
                include: [
                  {
                    model: models.Comments,
                    as: 'comment'
                  }, {
                    model: models.Users,
                    as: 'user'
                  }
                ],
                as: 'post'
              }
            ],
            as: 'favourite'
          },{
            model: models.Posts,
            include: [
              //include categories through table in posts
              {
                model: models.PostsWithCategories,
                include: [
                  {
                    model: models.Categories,
                    as: 'category'
                  }
                ],
                as: 'postswithcategories'
              },
              //include comments in post
              {
                model: models.Comments,
                as: 'comment'
              },
              {
                model: models.PostImage,
                as: 'postImage'
              },{
                model: models.Users,
                as: 'user'
              }
            ],
            as: 'post'
          }
        ]
      })

  let categories = await models.Categories.findAll()


  res.render('account', { userPage: userPage, categories: categories });
  //res.json(userPage)
}

//Creates Post and sends it to database

module.exports.postToYourPosts = async function (req, res) {

    let user_id = await models.Users.findOne({
        where: {
            email: req.session.email
        }
    }).then()

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

        if (req.file != null) {

            const host = req.hostname;
            const filePath = './post_images/' + req.file.filename;

            let post_image = models.PostImage.build({
                imageURL: filePath,
                post_id: newpost.id
            })

            post_image.save().then()

        } else {

            let post_image = models.PostImage.build({
                imageURL: null,
                post_id: newpost.id
            })

            post_image.save().then()

        }

        res.redirect('/acct')

    })

}

//Grabs Post and Deletes it from database
module.exports.deleteFromYourPosts = (req, res, next) => {

    models.Posts.destroy({
        where: {
            id: req.body.post_id
        }
    }).then(() => res.redirect('/acct'))

}

//Grabs Post and Updates it from database
module.exports.updateFromYourPosts = (req, res, next) => {

    let title = req.body.title
    let body = req.body.body
    let category = req.body.category

    if (title != undefined) {

        models.Posts.update({
            title: title
        }, {
            where: {
                id: req.body.post_id
            }
        }).then()

    }

    if (body != undefined) {

        models.Posts.update({
            body: body
        }, {
            where: {
                id: req.body.post_id
            }
        }).then()

    }

    //destroys previous categories
    if (req.body.categories != undefined) {

        models.PostsWithCategories.destroy({
            where: {
                post_id: req.body.post_id
            }
        }).then()

        //adds new categories to Post
        for (let i = 0; i < req.body.categories.length; i++) {

            let addCatToPost = models.PostsWithCategories.build({
                post_id: req.body.post_id,
                category_id: req.body.categories[i]
            })

            addCatToPost.save().then()

        }

    }

    //adds new image to Post
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

    res.redirect('/acct')

}

//Grabs Favourite and Removes it from Your Favourites
module.exports.removeFromYourFavourites = (req, res, next) => {

    models.Favourite.destroy({
        where: {
            id: req.body.favourite_id
        }
    }).then(() => res.redirect('/acct'))

}

//add Profile Picture
module.exports.addProfileImage = async function (req, res) {

    if (req.file != null) {

        let user_id = await models.Users.findOne({
            where: {
                email: req.session.email
            }
        }).then()

        models.Users.findOne({
            where: {
                id: user_id.id
            }
        }).then(data => {
            if (data.user_image != './profile_pictures/defaultpicture.png')
                fs.unlink('./public' + data.user_image.slice(1), (err) => {
                    console.log(req.body.file_path + 'was deleted');
                })
        })

        const host = req.hostname;
        const filePath = './profile_pictures/' + req.file.filename;

        models.Users.update({
            user_image: filePath
        }, {
            where: {
                id: user_id.id
            }
        }).then(res.redirect('/acct'))

    } else {

        res.send('No file selected')

    }

}

module.exports.editprofile = async function(req, res) {
    let categories = await models.Categories.findAll()

    res.render('editprofile', {categories: categories})
}

//delete post image
module.exports.removeFromPostImage = (req, res, next) => {

    let path = './public' + req.body.file_path.slice(1)

    fs.unlink(path, (err) => {
        console.log(req.body.file_path + 'was deleted');
    })

    models.PostImage.update({
        imageURL: null
    }, {
        where: {
            post_id: req.body.post_id
        }
    }).then(() => res.redirect('/acct'))

}

module.exports.editProfile = async function(req,res) {
  let categories = await models.Categories.findAll()

  res.render('editprofile',{categories: categories})
}
