const express = require("express");
const router = express.Router();
const Post = require('../models/post-model');
const Queue = require('../models/queue-model');
const User = require('../models/user-model');


router.get("/sell", (req, res) => {
    const current = new Date();
    Post.find({ archived: false, endTime: { $lte: current } }, (err, posts) => {
        if (err) return console.log("Error while updating posts: " + err);
        if (posts) {
            posts.forEach(post => {
                Queue.deleteMany({postId:post._id.toString()})
                Post.findByIdAndUpdate(post._id.toString(), { $set: { archived: true } })
            });
        }

    })

    Post.find({ sell: true, archived: false }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts) {
            return res.status(204).json({ sucess: false, message: 'No selling post' })
        }
        posts.forEach(post => {
            delete post["islandCode"];
        });
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
});

router.get("/buy", (req, res) => {
    const current = new Date();
    Post.find({ archived: false, endTime: { $lte: current } }, (err, posts) => {
        if (err) return console.log("Error while updating posts: " + err);
        if (posts) {
            posts.forEach(post => {
                Queue.deleteMany({postId:post._id.toString()})
                Post.findByIdAndUpdate(post._id.toString(), { $set: { archived: true } })
            });
        }

    })
    Post.find({ sell: false, archived: false }, (err, posts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!posts) {
            return res.status(204).json({ sucess: false, message: 'No selling post' })
        }
        posts.forEach(post => {
            delete post["islandCode"];
        });
        return res.status(200).json({ success: true, data: posts })
    }).catch(err => console.log(err))
});

router.get("/:id", async (req, res) => {
    await Post.findById(req.params.id, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' })
        }
        delete post["islandCode"];
        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))
});

router.patch("/:id", async (req, res) => {
    const body = req.body;
    await Post.findByIdAndUpdate({_id: req.params.id}, {$push: {comments: body}}, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err})
        }
        if (!post) {
            return res.status(200).json({ success: true, data: false })
        }
        return res.status(200).json({ success: true, data: post})
    }).catch(err => console.log(err))
});

router.get("/byUser/:id", async (req, res) => {
    await Post.findOne({ creator: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!post) {
            return res.status(200).json({ success: true, data: false })
        }
        return res.status(200).json({ success: true, data: post })
    }).catch(err => console.log(err))
});

router.post("/addPost", async (req, res) => {
    const body = req.body;
    const currentTime = new Date();
    if (body.price < 0) {
        return res.status(400).json({ success: false, message: 'Price cannot be below 0' })
    }

    if (!body) {
        return res.status(400).json({ success: false, message: 'You must provide post info' })
    }
    const existPost =await Post.find({creator: body.creator, archived: false});
    if(existPost.length>0) return res.status(400).json({success: false, message: 'You already have an active post', data: existPost});

    const poster = await User.findById(req.body.creator);

    const post = new Post({
        creator: body.creator,
        sell: body.sell,
        price: body.price,
        ticketPrice: body.ticketPrice,
        islandCode: body.islandCode,
        description: body.description,
        endTime: body.endTime,
        email: poster.email,
        displayName: poster.displayName,
        star: poster.star,
        inGameName: poster.inGameName,
        islandName: poster.islandName
    });
    if (!post) {
        return res.status(400).json({ success: false, message: 'Create new post fail' })
    }

    post.save().then(() => {
        return res.status(201).json({
            success: true,
            id: post._id,
            data: post,
            message: 'Post created!'
        })
    }).catch(err => {
        return res.status(400).json({
            err,
            message: 'Post not created.'
        })
    })

});

router.post("/delete/:id", async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {$set:{archived: true}},(err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post doesn\'t exist or already expired' })
        }
        return res.status(200).json({ success: true, data: post })
    }).catch(err => {
        console.log(err);
    })
});

router.post("/addComment", async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            erorr: 'You must provide comment info to add comment'
        })
    }
    const newComment = {
        name: body.name,
        posterId: body.posterId,
        comment: body.comment
    }

    Post.findByIdAndUpdate(body.postId,
        { $push: { comments: newComment } },
        (err, post) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Post not found'
                })
            }
            return res.status(200).json({
                success: true,
                id: post._id,
                message: 'Comment added!'
            })
        }
    ).catch(err => {
        return res.status(400).json({
            err,
            message: 'Comment not created.'
        })
    })

});

// router.get("/getIslandCode", async (req, res) => {
//     await Post.findById(req.body.id, (err, post) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!post) {
//             return res.status(404).json({ success: false, error: 'Post not found' })
//         }
//         delete post["islandCode"];
//         return res.status(200).json({ success: true, data: post["islandCode"] })
//     }).catch(err => console.log(err))
// });

module.exports = router;