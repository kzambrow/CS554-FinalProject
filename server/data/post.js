const mongoCollections = require("../config/mongoCollections");
const posts = mongoCollections.posts;

module.exports = {
    async getAllSell(){
        const postsCollection = await posts();
        return postsCollection.find({sell:true}).toArray();
    },
    async getAllBuy(){
        const postsCollection = await posts();
        return postsCollection.find({sell:false}).toArray();
    },
    async addPost(price, userId, ticketPrice, islandCode, sellTag, description){
        const newPost = {
            creator: userId,
            sell: sellTag,
            price: price,
            ticketPrice: ticketPrice,
            islandCode: islandCode,
            description: description
        }
        const postsCollection = await posts();
        const insertPost = await postsCollection.insertOne(newProject);
        if (insertPost.insertedCount === 0) throw 'Could not add post';
        const newId = insertInfo.insertedId;
        return await this.getPost(newId);
    }
    
}