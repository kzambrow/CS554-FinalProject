const express = require("express");
const router = express.Router();
const data = require('../data');
const users = data.users;
const posts = data.posts;
const { ObjectId } = require('mongodb');

router.get("/sell", async (req, res) => {
    try{
        const postList = await posts.getAllSell();
        res.json(postList);
    }catch(error){
        res.send(error);
    }
});

router.get("/buy", async (req, res) => {
    try{
        const postList = await posts.getAllBuy();
        res.send(postList);
    }catch(error){
        res.send(error);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const postList = await posts.findPostById(req.params.id);
        res.send(postList);
    }catch(error){
        res.send(error);
    }
});

router.post("/addPost", async (req, res) => {
    try{
        const newPost = req.body;
        const newPostId = await posts.addPost(newPost.price, newPost.userId, newPost.ticketPrice, newPost.islandCode, newPost.sellTag, newPost.description, newPost.endTime);
        res.send(newPostId);
    }catch(error){
        res.send(error);
    }
});

router.post("/delete/:id", async (req, res) => {
    try{
        const deletePost = await posts.deletePost(req.params.id);
        res.send(deletePost);
    }catch(error){
        res.send(error);
    }
});

router.post("/addComment", async (req, res) => {
    try{
        const newComment = req.body;
        const newComments = await posts.addComment(newComment.postId, newComment.name, newComment.comment);
        res.send(newComments);
    }catch(error){
        res.send(error);
    }
});

module.exports = router;