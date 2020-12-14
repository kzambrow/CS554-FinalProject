const express = require("express");
const router = express.Router();
const User = require('../models/user-model');

router.post("/addUser", async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide post info' })
    }

    const user = new User(body);
    if (!user) {
        return res.status(200).json({ success: false, message: 'User already exist or missing info' })
    }

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            id: user._id,
            data: user,
            message: 'Post created!'
        })
    }).catch(err => {
        return res.status(200).json({
            err,
            message: 'User not created.'
        })
    })
});

router.get("/", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(200).json({ success: true, data: false })
        }
        return res.status(200).json({ success: true, data: true })
    }).catch(err => console.log(err))
});

router.get("/email/:email", (req, res) => {
    User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(200).json({ success: true, data: false })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
});


router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
});

router.post("/addStar", async (req, res) => {
    const body = req.body;

    if (!body || !body.creatorId) {
        return res.status(400).json({ success: false, error: 'You must provide user info' })
    }
    User.findByIdAndUpdate(body.creatorId, { $inc: { star: 1 } },
        (err, user) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Could not add star'
                })
            }
            if (user) {
                return res.status(200).json({
                    success: true,
                    message: 'Star added!'
                })
            }
            return res.status(404).json({
                err,
                message: 'User not found'
            })
        }
    ).catch(err => {
        return res.status(400).json({
            err,
            message: 'Star not added.'
        })
    })

});

router.post("/changeDisplayName/:id", async (req, res) => {
    const body = req.body;

    if (!body || !body.newName) {
        return res.status(400).json({ success: false, error: 'You must provide a new name' })
    }
    User.findOneAndUpdate(req.params.id, { $set: { displayName: body.newName } },
        (err, user) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Could not update display name'
                })
            }
            if (user) {
                return res.status(200).json({
                    success: true,
                    data: user,
                    message: 'Display name changed!'
                })
            }
            return res.status(404).json({
                err,
                message: 'Display name not changed.'
            })
        }
    ).catch(err => {
        return res.status(400).json({
            err,
            message: 'Display name not changed.'
        })
    })

});

module.exports = router;