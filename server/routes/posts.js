const express = require("express");
const router = express.Router();
const Post = require('../models/post-model');
const Queue = require('../models/queue-model');

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

router.post("/addPost", (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide post info' })
    }

    const post = new Post(body);
    if (!post) {
        return res.status(400).json({ success: false, error: 'Create new post fail' })
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
    await Post.findByIdAndDelete(req.params.id, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' })
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