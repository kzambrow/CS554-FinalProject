const express = require("express");
const router = express.Router();
const Queue = require('../models/queue-model');
const Post = require('../models/post-model');
const User = require('../models/user-model');



router.post("/join", async (req, res) => {
    const exist = await User.findById(req.body.userId);
    if (!exist) return res.status(400).json({ success: false, error: 'User not found' })

    return await Queue.findOne({ userId: req.body.userId }, async (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (user) return res.status(200).json({ success: true, data: user })
        const newUser = new Queue({
            postId: req.body.postId,
            userId: req.body.userId,
            inGameName: req.body.inGameName
        });
        return await newUser.save().then(async () => {
            await Queue.find({ queueId: req.body.postId, joinTime: { $lt: newUser.joinTime } }, (err, users) => {
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
                success: false,
                error: err,
                message: 'Could not join the line'
            })
        })
    })




});

router.post("/check", async (req, res) => {
    const user = await Queue.findById(req.body.queueId);
    if (!user) return res.status(400).json({ success: false, error: 'You are not in this line' })
    return await Queue.find({ postId: user.postId, joinTime: { $lt: user.joinTime } }, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        // console.log(users)
        if (users.length) {
            const result = users.map(user=>user.inGameName)
            return res.status(201).json({
                success: true,
                data: result
            })
        }
        return res.status(200).json({ success: true, data: -1 })

    });
});

router.post("/getCode", async (req, res) => {
    return await Queue.findById(req.body.queueId, async (err, queue) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!queue) {
            return res.status(400).json({ success: false, error: 'You are not in the waiting line' })
        } else {
            return await Queue.find({ postId: req.body.postId, joinTime: { $lt: queue.joinTime } }, async (err, users) => {
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (users.length <= 0) {
                    // await Queue.findByIdAndDelete(req.body.queueId);
                    return await Post.findById(req.body.postId, (err, post) => {
                        if (err) {
                            return res.status(400).json({ success: false, error: err })
                        }
                        // console.log(post);
                        if (!post) {
                            return res.status(404).json({ success: false, message: 'The island is already closed.' })
                        }
                        return res.status(200).json({ success: true, data: post.islandCode })
                    })
                } else {
                    return res.status(200).json({ success: true, data: 'Waiting...' })

                }
            });

        }

    });

});

router.post("/find",async(req,res)=>{
    return await Queue.findOne({postId: req.body.postId, userId: req.body.userId}, (err,queue)=>{
        if (err) {
            res.status(400).json({ success: false, error: err })
        }
        if(queue) return res.status(200).json({success: true, data: queue});
        return res.status(400).json({success:false, error: 'You are not waiting in any line'})
    })
})

router.post("/leave", async(req, res) => {
    const queueId = req.body.queueId;
    const result = await Queue.findByIdAndDelete(queueId);
    console.log(result);
})

module.exports = router;