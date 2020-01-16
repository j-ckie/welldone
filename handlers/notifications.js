const models = require("../models");
const express = require("express");
const router = express.Router();

router.use(express.urlencoded());

router.get("/", async (req, res) => {
    let email = req.session.email;

    const renderNotifications = () => {
        models.Users.findOne({
            where: {
                email: email
            }
        })
            .then(persistedUser => {
                console.log("There is a persisted user")
                let ownerId = persistedUser.id;
                models.Notifications.findAll({
                    where: {
                        owner_id: ownerId
                    }
                })
                    .then(data => {
                        data.forEach(notification => {
                            console.log("i have found notification data")
                            let type = notification.type;
                            let postId = notification.post_id;

                            models.Users.findOne({
                                where: {
                                    id: notification.sender_id
                                }
                            })
                                .then(sender => {
                                    console.log("thar be sender")
                                    let senderName = sender.name
                                    models.Posts.findOne({
                                        where: {
                                            id: postId
                                        }
                                    }).then(post => {
                                        console.log("thar be post")
                                        let items = {
                                            type: type,
                                            sender: senderName,
                                            post: post.title
                                        }

                                        return items
                                    })
                                })
                        })
                    })
            })
    }

    await res.render("notifications", { notification: renderNotifications(req) })

    // console.log(notifItems.type, notifItems.sender, notifItems.post)
})




module.exports = router 