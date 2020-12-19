const db = require('../db');
const Post = require('../models/post-model');
const User = require('../models/user-model');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    console.log("Connection Successful!");
    await User.collection.drop();
    await Post.collection.drop();

    const user1 = await new User({
        "email": "testuser1@test.com",
        "displayName": "testUser1",
        "islandName": "testIsland1",
        "inGameName": "inGameName1"
    }).save();
    const user2 = await new User({
        "email": "testuser2@test.com",
        "displayName": "testUser2",
        "islandName": "testIsland2",
        "inGameName": "inGameName2"
    }).save();
    const user3 = await new User({
        "email": "testuser3@test.com",
        "displayName": "testUser3",
        "islandName": "testIsland3",
        "inGameName": "inGameName3"
    }).save();

    const currTime = new Date();

    await new Post({
        creator: user1._id.toString(),
        price: 500,
        sell: true,
        ticketPrice: 'Any',
        islandCode: 'ABCD',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 1 * 60000),
        email: user1.email,
        displayName: user1.displayName,
        star: user1.star,
        inGameName: user1.inGameName,
        islandName: user1.islandName
    }).save();

    await new Post({
        creator: user2._id.toString(),
        price: 90,
        sell: false,
        ticketPrice: 'Any',
        islandCode: 'ACDC',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 10 * 60000),
        email: user2.email,
        displayName: user2.displayName,
        star: user2.star,
        inGameName: user2.inGameName,
        islandName: user2.islandName
    }).save();

    await new Post({
        creator: user3._id.toString(),
        price: 300,
        sell: true,
        ticketPrice: 'Any',
        islandCode: 'DCBA',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 30 * 60000),
        email: user3.email,
        displayName: user3.displayName,
        star: user3.star,
        inGameName: user3.inGameName,
        islandName: user3.islandName
    }).save();

    console.log('Done Seeding!!!')
    await db.close();


})


