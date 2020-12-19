const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
    postId: {type: String, require:true},
    userId: {type: String, require: true},
    joinTime: {type: Date, default: Date.now},
    inGameName: {type: String, default:'Anonymous'},
    createdAt: { type: Date, expires: 300, default: Date.now }
})

const Queue = module.exports = mongoose.model('queues',QueueSchema, 'queues');
