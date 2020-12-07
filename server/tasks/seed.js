const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.posts;
const projects = data.comments;


async function main(){
    const db = await dbConnection();
    await db.dropDatabase();
    

    
    await db.serverConfig.close();
    console.log('done seeding')
}

main().catch((error) => {
    console.log(error.toString());
});