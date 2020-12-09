const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const { ObjectId } = require('mongodb');

module.exports = {
    async getAllSell(){
        const postCollection = await posts();
        await postCollection.deleteMany( { endTime : {"$lt" : new Date() } });
        return postCollection.find({sell:true}).toArray();
    },
    async getAllBuy(){
        const postCollection = await posts();
        await postCollection.deleteMany( { endTime : {"$lt" : new Date() } });
        return postCollection.find({sell:false}).toArray();
    },
    async addPost(price, userId, ticketPrice, islandCode, sellTag, description, endTime){
        try{
            const newPost = {
                creator: userId,
                sell: sellTag,
                price: price,
                ticketPrice: ticketPrice,
                islandCode: islandCode,
                description: description,
                endTime: endTime,
                comments: []
            }
            const postCollection = await posts();
            const exist = await postCollection.findOne({creator: userId});
            if(exist) throw 'The user already has an active post'
            const insertPost = await postCollection.insertOne(newPost);
            if (insertPost.insertedCount === 0) throw 'Could not add post';
            const newId = insertPost.insertedId;
            // console.log(newId);
            return newId;
        }catch(error){
            throw error;
        }
    },
    async deletePost(postId){
        const postCollection = await posts();
        const deletePost = await postCollection.deleteOne({_id: ObjectId(postId)});
        if(deletePost.deleteCount === 0) throw 'Could not delete post';
        return true;
    },
    async addComment(postId, name, comment) {
        try {
            const postCollection = await posts();
            let post = await postCollection.findOne({ _id: ObjectId(postId) });

            if (post) {
                const newComment = {
                    _id: new ObjectId(),
                    name: name,
                    comment: comment
                }
                post.comments.push(newComment);
                const updatePost = await postCollection.updateOne({ _id: ObjectId(postId) }, { $set: post });
                if (updatePost.modifiedCount === 0) {
                    throw 'Fail to add new comment'
                } else {
                    return (await this.findPostById(postId)).comments;
                }
            } else {
                throw 'Post not found';
            }
        } catch (error) {
            throw 'Fail to add comment'
        }
    },

    async findPostByUser(userId){
        const postCollection = await posts();
        const post = postCollection.findOne({creator: userId});
        if(post) return post;
        else throw 'The user does not have active post'
    },

    async findPostById(id){
        const postCollection = await posts();
        const post = postCollection.findOne({_id: ObjectId(id)});
        if(post) return post;
        else throw 'Post not found'
    },
    
}