const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;


async function main(){
    const db = await dbConnection();
    await db.dropDatabase();
    


    
    await db.serverConfig.close();
    console.log('done seeding')
}

main().catch((error) => {
    console.log(error.toString());
});