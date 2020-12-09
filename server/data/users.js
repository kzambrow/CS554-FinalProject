const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const users = mongoCollections.users;

module.exports = {
    async addUser(email, displayName) {
        try {
            const userCollection = await users();
            const newUser = {
                displayName: displayName,
                email: email,
                star: 0
            };
            let insertUser = await userCollection.insertOne(newUser);
            if (insertUser.insertedCount === 0) throw 'Could not add user';
            return insertUser.insertedId;

        } catch (error) {
            return error;

        }
    },
    async addStar(id){
        const userCollection = await users();
        const updateUser = await userCollection.updateOne( { _id: ObjectId(id) },{ $inc: { star: 1 }});
        return updateUser;
    },
    async getUser(id){
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: new ObjectId(id) });
        if(user) return { displayName: user.displayName, star: user.star};
        throw 'User not found';
    }
    
}