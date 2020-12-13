const express = require("express");
const router = express.Router();
// const data = require('../data');
// const users = data.users;
// const posts = data.posts;
const User = require('../models/user-model');

router.post("/addUser", async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({ success: false, error: 'You must provide post info' })
    }

    const user = new User(body);
    if (!user) {
        return res.status(400).json({ success: false, error: 'Create new post fail' })
    }

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            id: user._id,
            data: user,
            message: 'Post created!'
        })
    }).catch(err => {
        return res.status(400).json({
            err,
            message: 'User not created.'
        })
    })
});

// router.get("/", async (req, res) => {
//     try {
//         const exist = await users.getUserByEmail(req.body.email);
//         res.send(exist);
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const user = await users.getUser(req.params.id);
//         res.send(user);
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.post("/addStar", async (req, res) => {
//     try {
//         const user = await users.addStar(req.body.email);
//         const newUser = await users.getUser(req.body.email)
//         res.send(newUser);
//     } catch (error) {
//         res.send(error);
//     }
// });

// router.post("/changeDisplayName", async (req, res) => {
//     try {
//         const newUser = await users.updateDisplayName(req.body.email, req.body.displayName);
//         res.send(newUser);
//     } catch (error) {
//         res.send(error);
//     }
// });

module.exports = router;