const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const users = mongoCollections.users;

module.exports = {
    async addUser(email, displayName) {
        try {
            const userCollection = await users();
            const exist = await userCollection.findOne({ email: email.toLowerCase() });
            if(exist){
                return exist._id;
            }else{
                const newUser = {
                    _id: email.toLowerCase(),
                    displayName: displayName,
                    star: 0
                };
                let insertUser = await userCollection.insertOne(newUser);
                if (insertUser.insertedCount === 0) return email.toLowerCase();
                return insertUser.insertedId;
            }

        } catch (error) {
            return email.toLowerCase();

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
    },
    async getUserByEmail(email){
        const userCollection = await users();
        const user = await userCollection.findOne({ email: email });
        if(user) return true;
        return false;
    }
    
}