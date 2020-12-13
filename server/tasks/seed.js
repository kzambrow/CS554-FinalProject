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
        "displayName": "testUser1"
    }).save();
    const user2 = await new User({
        "email": "testuser2@test.com",
        "displayName": "testUser2"
    }).save();
    const user3 = await new User({
        "email": "testuser3@test.com",
        "displayName": "testUser3"
    }).save();

    const currTime = new Date();

    await new Post({
        creator: user1._id.toString(),
        price: 500,
        sell: true,
        ticketPrice: 'Any',
        islandCode: 'ABCD',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 1 * 60000)
    }).save();

    await new Post({
        creator: user2._id.toString(),
        price: 90,
        sell: false,
        ticketPrice: 'Any',
        islandCode: 'ACDC',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 10 * 60000)
    }).save();

    await new Post({
        creator: user3._id.toString(),
        price: 300,
        sell: true,
        ticketPrice: 'Any',
        islandCode: 'DCBA',
        description: 'Don\'t share the password!',
        endTime: new Date(currTime.getTime() + 30 * 60000)
    }).save();

    console.log('Done Seeding!!!')
    await db.close();


})




// db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// const Post = require('../models/post-model');
// const User = require('../models/user-model');




// async function main() {

//     await db();
//     // await db.dropDatabase();
//     const user1 = new User({
//         email: 'testuser1@test.com',
//         displayName: 'testUser1'
//     });
//     const user2 = new User({
//         email: 'testuser2@test.com',
//         displayName: 'testUser2'
//     });
//     const user3 = new User({
//         email: 'testuser3@test.com',
//         displayName: 'testUser3'
//     });

//     const currTime = new Date();

//     const post1 = new Post({
//         creator: user1._id.toString(),
//         price: 500,
//         sell: true,
//         ticketPrice: 'Any',
//         islandCode: 'ABCD',
//         description: 'Don\'t share the password!',
//         endTime: new Date(currTime.getTime() + 1 * 60000)
//     });

//     const post2 = new Post({
//         creator: user2._id.toString(),
//         price: 90,
//         sell: false,
//         ticketPrice: 'Any',
//         islandCode: 'ACDC',
//         description: 'Don\'t share the password!',
//         endTime: new Date(currTime.getTime() + 10 * 60000)
//     });

//     const post3 = new Post({
//         creator: user3._id.toString(),
//         price: 300,
//         sell: true,
//         ticketPrice: 'Any',
//         islandCode: 'DCBA',
//         description: 'Don\'t share the password!',
//         endTime: new Date(currTime.getTime() + 30 * 60000)
//     });

//     // const db = await dbConnection();
//     // await db.dropDatabase();

//     // try {
//     //     var user1 =  await users.addUser('testuser1@test.com','testUser1');
//     //     var user2 =  await users.addUser('testuser2@test.com','testUser2');
//     //     var user3 =  await users.addUser('testuser3@test.com','testUser3');
//     //     const currTime = new Date();
//     //     var post1 = await posts.addPost(500, user1, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
//     //     var post2 = await posts.addPost(90, user2, 'Any', 'ACDC', false, 'Don\'t share the password!', new Date(currTime.getTime() + 10 * 60000));
//     //     var post3 = await posts.addPost(300, user3, 'Any', 'DCBA', true, 'Don\'t share the password!', new Date(currTime.getTime() + 30 * 60000));



//     // } catch (e) {
//     //         console.log(e.toString());
//     // }
//     db.close();

//     console.log('done seeding')
// }

// main().catch((error) => {
//     console.log(error.toString());
// });
