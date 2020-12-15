// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')

const settings = require('./settings');
const mongoConfig = settings.mongoConfig;

// let _connection = undefined;
// let _db = undefined;

// module.exports = async () => {
//     if (!_connection) {
//         _connection = mongoose
//         .connect(mongoConfig.serverUrl + mongoConfig.database, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         .catch(e => {
//             console.error('Connection error', e.message)
//         })
//         _db = mongoose.connection
//     }

//     return _db;
// };

mongoose
    .connect(mongoConfig.serverUrl + mongoConfig.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db