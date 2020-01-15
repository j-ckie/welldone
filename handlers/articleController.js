const models = require('../models')

//Grabs post and sends it to page

module.exports.getPost = async function(req,res){

  let user_id = await models.Users.findOne({
    where: {
      email: req.session.email
    }
  })

  models.Posts.findByPk(req.params.postId,{

    //include comments
    include: [
      {
        model: models.Comments,
        include: [
          {
            model: models.Users,
            as: 'user'
          }
        ],
        as: 'comment'
      },{
        model: models.Users,
        as: 'user'
      },{
        model: models.PostImage,
        as: 'postImage'
      }
    ]
  }).then(post => {

    //crosscheck user with comments
    for(let i = 0; i < post.comment.length; i++) {

      if(post.comment[i].user_id == user_id.id) {

        //if user made comment show update comment
        post.comment[i].hidden = ''

      } else {

        //if user did not make comment hide update comment
        post.comment[i].hidden = 'hidden'

      }

    }

    //crosscheck users favourites with this post
    models.Notifications.findAll({
      where: {
        post_id: req.params.postId,
        user_id: user_id.id
      }
    }).then(result => {

      if(result = null) {

        //if user does not have post favourited show add favourite
        post.hidden = ''

      } else {

        //if user does have post favourited hide add favourite
        post.hidden = 'hidden'

      }

      //res.json(post)
      res.render('article', {post: post, sessionUser: user_id})

    })

  })

}

//add favourite button
module.exports.addFavourite = async function (req,res,next) {
  let user_id = await models.Users.findOne({
    where: {
      email: req.session.email
    }
  })

  let favourite = models.Favourite.build({
    isFavourite: 'TRUE',
    post_id: req.body.post_id,
    user_id: user_id.id
  })
  favourite.save().then(() => res.redirect('back'))

}

//add comment button
module.exports.addComment = (req,res,next) => {

  let comment = models.Comments.build({
    body: req.body.body,
    post_id: req.body.post_id,
    user_id: req.body.user_id
  })

  comment.save().then(() => res.redirect('back'))

}

//update comment button
module.exports.updateComment = (req,res,next) => {

  models.Comments.update({
    body: req.body.body
  }, {
    where: {
      id: req.body.comment_id
    }
  }).then(() => res.redirect('back'))

}

//delete comment button
module.exports.deleteComment = (req,res,next) => {

  models.Comments.destroy({
    where: {
      id: req.body.comment_id
    }
  }).then(() => res.redirect('back'))

}
