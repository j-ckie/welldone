const models = require('../models')

//========= web push ===========
const webpush = require("web-push");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(`mailto:test@email.com`, publicVapidKey, privateVapidKey);
//=================================

//Grabs post and sends it to page

module.exports.getPost = async function (req, res) {

    let user_id = await models.Users.findOne({
        where: {
            email: req.session.email
        }
    })

  let post = await models.Posts.findByPk(req.params.postId, {
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
        },{
          model: models.Notifications,
          as: 'notification'
        }
      ]
    })

    let liked = await models.Notifications.findAll({
      where: {
        user_id: user_id.id,
        type: 'like',
        post_id: req.params.postId
      }
    })

    if(liked != null) {
      user_id.hideAdd = 'hidden'
    } else {
      user_id.hideRemove = 'hidden'
    }

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

  //res.json(post)
  res.render('article', {post: post, sessionUser: user_id})

}

//add favourite button
module.exports.addFavourite = async function (req, res, next) {
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
module.exports.addComment = (req, res, next) => {

    let comment = models.Comments.build({
        body: req.body.body,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })

    comment.save()

    // ==== create notification on comment
    let postId = req.body.post_id,
        ownerId = req.body.ownerId,
        type = req.body.type
    // console.log(postId)
    // console.log(ownerId)

    // find name of likeR
    models.Users.findOne({
        where: {
            email: req.session.email
        }
    })
        .then(persistedUser => {
            let name = persistedUser.name,
                senderId = persistedUser.id;

            // build entry on Notifications table
            let newNotification = models.Notifications.build({
                type: type,
                owner_id: ownerId,
                user_id: senderId,
                post_id: postId
            });

            newNotification.save()

            // look for endpoints table to find user specific endpoints

            models.Endpoints.findAll({
                where: {
                    user_id: ownerId
                }
            })
                .then(data => {
                    console.log("Found endpoint for user")
                    data.forEach(endpoint => {
                        // todo: update endpoint if different user session is on same endpoint
                        const payload = JSON.stringify({
                            title: `${name} has commented on your post.`
                        });
                        let remote = JSON.parse(endpoint.endpoint_data) // remote endpoint
                        console.log("pushing to" + remote)
                        webpush.sendNotification(remote, payload)

                    })
                    res.redirect("back")
                })
                .catch(err => console.error(err))
        }).catch(err => console.error(err))

}

//update comment button
module.exports.updateComment = (req, res, next) => {

    models.Comments.update({
        body: req.body.body
    }, {
        where: {
            id: req.body.comment_id
        }
    }).then(() => res.redirect('back'))

}

//delete comment button
module.exports.deleteComment = (req, res, next) => {

    models.Comments.destroy({
        where: {
            id: req.body.comment_id
        }
    }).then(() => res.redirect('back'))

}
