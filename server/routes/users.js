const express = require("express");
const router = express.Router();
const data = require('../data');
const users = data.users;
const { ObjectId } = require('mongodb');

router.post("/addUser", async (req, res) => {
    try{
        const newUser = req.body;
        const newUserId = await users.addUser(newUser.email, newUser.displayName);
        res.send(newUserId);
    }catch(error){
        res.send(error);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const user = await users.getUser(req.params.id);
        res.send(user);
    }catch(error){
        res.send(error);
    }
});

router.post("/addStar/:id", async (req, res) => {
    try{
        const user = await users.addStar(req.params.id);
        const newUser = await users.getUser(req.params.id)
        res.send(newUser);
    }catch(error){
        res.send(error);
    }
});

module.exports = router;