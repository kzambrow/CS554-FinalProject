const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;
const { ObjectId } = require('mongodb');

module.exports = {
    async getAllSell(){
        const postCollection = await posts();
        postCollection.remove( { endTime : {"$lt" : new Date() } });
        return postCollection.find({sell:true}).toArray();
    },
    async getAllBuy(){
        const postCollection = await posts();
        postCollection.remove( { endTime : {"$lt" : new Date() } });
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
            const insertPost = await postCollection.insertOne(newProject);
            if (insertPost.insertedCount === 0) throw 'Could not add post';
            const newId = insertInfo.insertedId;
            return await this.getPost(newId);
        }catch(error){
            throw 'Fail to add new post'
        }
    },
    async deletePost(postId){
        const postCollection = await posts();
        postCollection.deleteOne({_id: ObjectId(postId)});
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
                    return await postCollection.findOne({ _id: ObjectId(postId) });
                }
            } else {
                throw 'Post not found';
            }
        } catch (error) {
            throw 'Fail to add comment'
        }
    }

    
}