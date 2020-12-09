const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;


async function main(){
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        var user1 =  await users.addUser('testuser1@test.com','testUser1');
        var user2 =  await users.addUser('testuser2@test.com','testUser2');
        var user3 =  await users.addUser('testuser3@test.com','testUser3');
        const currTime = new Date();
        var post1 = await posts.addPost(500, user1, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post2 = await posts.addPost(90, user2, 'Any', 'ACDC', false, 'Don\'t share the password!', new Date(currTime.getTime() + 10 * 60000));
        var post3 = await posts.addPost(300, user3, 'Any', 'DCBA', true, 'Don\'t share the password!', new Date(currTime.getTime() + 30 * 60000));



    } catch (e) {
            console.log(e.toString());
    }

    
    await db.serverConfig.close();
    console.log('done seeding')
}

main().catch((error) => {
    console.log(error.toString());
});