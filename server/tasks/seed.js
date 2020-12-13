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
        var user4 =  await users.addUser('testuser4@test.com','testUser4');
        var user5 =  await users.addUser('testuser5@test.com','testUser5');
        var user6 =  await users.addUser('testuser6@test.com','testUser6');
        var user7 =  await users.addUser('testuser7@test.com','testUser7');
        var user8 =  await users.addUser('testuser8@test.com','testUser8');
        var user9 =  await users.addUser('testuser9@test.com','testUser9');
        const currTime = new Date();
        var post1 = await posts.addPost(500, user1, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post2 = await posts.addPost(90, user2, 'Any', 'ACDC', false, 'Don\'t share the password!', new Date(currTime.getTime() + 10 * 60000));
        var post3 = await posts.addPost(300, user3, 'Any', 'DCBA', true, 'Don\'t share the password!', new Date(currTime.getTime() + 30 * 60000));
        var post4 = await posts.addPost(500, user4, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post5 = await posts.addPost(500, user5, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post6 = await posts.addPost(500, user6, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post7 = await posts.addPost(500, user7, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post8 = await posts.addPost(500, user8, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));
        var post9 = await posts.addPost(500, user9, 'Any', 'ABCD', true, 'Don\'t share the password!', new Date(currTime.getTime() + 1 * 60000));



    } catch (e) {
            console.log(e.toString());
    }

    
    await db.serverConfig.close();
    console.log('done seeding')
}

main().catch((error) => {
    console.log(error.toString());
});