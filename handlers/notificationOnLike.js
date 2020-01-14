const models = require("../models");
const express = require("express");
const router = express.Router();
const path = require("path");
require("dotenv").config({ path: '../.env' })

const webpush = require("web-push");

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(`mailto:test@email.com`, publicVapidKey, privateVapidKey);

router.use(express.urlencoded());

router.get("/", (req, res) => res.render("notifications"));

router.post("/", (req, res) => {
    // Get pushNotification object
    const likeNotification = req.body;

    // send 201 - resource created
    res.status(201).json({})

    // create payload
    const payload = JSON.stringify({ title: "PUSH test" });

    // pass object into sendNotification
    webpush.sendNotification(likeNotification, payload).catch(err => console.error(err));
});


module.exports = router;