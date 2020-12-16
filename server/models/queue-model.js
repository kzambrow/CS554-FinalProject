const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QueueSchema = new Schema({
    postId: {type: String},
    userId: {type: String},
    joinTime: {type: Date, default: Date.now},
    inGameName: {type: String}
})

const Queue = module.exports = mongoose.model('queues',QueueSchema, 'queues');
// module.exports = {
//     createQueue(newQueue, callback){
//         newQueue.save(callback);
//     },
//     getQueueById(queueId, callback){
//         Queue.findById(queueId, callback);
//     },
//     getUserInFront(joinTime, queueId, callback){
//         Queue.find({queueId: queueId, joinTime: {$lte: joinTime}}).count(callback);
//     },
//     getIslandCode(postId,userId){
//         const islandCode = await Post.findById(postId,(err,post) => {
//             if(err||!post) return -1;
//         });
        
//     }
// }