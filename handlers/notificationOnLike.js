const models = require("../models");
const express = require("express");
const router = express.Router();

require("dotenv").config()

const webpush = require("web-push");

const publicVapidKey = "BB9cTa531zVr4vy5_uHSK9e07xnM_2jBTnjIFvN0jzmQlNyOn5U1568NpId82jAh1R91SBkgP886-jF6mk4BKgo";
const privateVapidKey = "vOzZHwK7uQj56vDxAXW96d6FGBw4SGsfqCHxsz0YqYU";

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