const models = require('../models')
const sequelize = require("sequelize");

//Grabs Users Posts and Favourites then sends them to Page
module.exports.getYourPostsandFavourites = async function (req, res) {
    //if User is not Logged in Sends the User to Register Page
    //if(user != null) {
    let transaction = await models.sequelize.transaction({ autocommit: false });
    let userPage = await models.Users.findByPk(1, {
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
                            }
                        ],
                        as: 'post'
                    }
                ],
                as: 'favourite'
            }, {
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
                    }
                ],
                as: 'post'
            }
        ],
        transaction: transaction
    });
    let categories = await models.Categories.findAll()

    //sort posts by post id
    userPage.post.sort(function (a, b) {
        return a.id - b.id;
    })
    //res.json(userPage)

    res.render('acct', { userPage: userPage, userPosts: userPage.post, favouritePosts: userPage.favourite, categories: categories, name: userPage.name });
    await transaction.commit();
    /*} else {
    res.redirect('/register')
  } */
}

//Creates Post and sends it to database
module.exports.postToYourPosts = (req, res, next) => {
    let post = models.Posts.build({
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id
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
        console.log(req.file)
        if (req.file != null) {
            const host = req.hostname;
            const filePath = './profile_images/' + req.file.filename;
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
    console.log(req.file)
    //adds new image to Post
    if (req.file != undefined) {
        const host = req.hostname;
        const filePath = './profile_images/' + req.file.filename;
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

//add Profile image
module.exports.addProfileImage = (req, res, next) => {
    const host = req.hostname;
    const filePath = './profile_images/' + req.file.filename;
    models.Users.update({
        user_image: filePath
    }, {
        where: {
            id: 1
        }
    }).then(res.redirect('/acct'))
}
