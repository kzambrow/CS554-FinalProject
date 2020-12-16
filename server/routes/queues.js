const express = require("express");
const router = express.Router();
const Queue = require('../models/queue-model');
const Post = require('../models/post-model');


router.post("/join", (req, res) => {
    const newUser = new Queue({
        postId: req.body.postId,
        userId: req.body.userId,
        inGameName: req.body.inGameName
    });

    newUser.save().then(() => {
        Queue.find({ queueId: req.body.postId, joinTime: { $lt: newUser.joinTime } }, (err, users) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!users) {
                return res.status(200).json({ success: true, data: -1 })
            }
            return res.status(201).json({
                success: true,
                data: newUser,
                message: 'Successfully join the line!'
            })
        });
    }).catch(err => {
        return res.status(400).json({
            err,
            message: 'Could not join the line'
        })
    })
});

router.get("/check", (req, res) => {
    Queue.find({ queueId: req.body.postId, joinTime: { $lt: newUser.joinTime } }, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users) {
            return res.status(200).json({ success: true, data: -1 })
        }
        return res.status(201).json({
            success: true,
            data: users
        })
    });
});

router.get("/getCode", async (req, res) => {
    let usersInFront = await Queue.find({ queueId: req.body.postId, joinTime: { $lt: newUser.joinTime } }, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users) {
            return -1
        }
        return users;
    });
    while (usersInFront !== -1) {
        usersInFront = await Queue.find({ queueId: req.body.postId, joinTime: { $lt: newUser.joinTime } }, (err, users) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!users) {
                return -1
            }
            return users;
        });
    }
    Post.findById(req.postId, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!post) {
            return res.status(404).json({ success: false, message: 'The island is already closed.' })
        }
        return res.status(200).json({ success: true, data: post.islandCode })
    })
})

module.exports = router;