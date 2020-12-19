const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        displayName: {type: String, require: true},
        userId: {type: String, require: true},
        comment: {type: String, require: true}
    }
);

const Post = new Schema(
    {

        creator: { type: String, required: true},
        sell: { type: Boolean, require: true },
        price: {type: Number, require: true},
        ticketPrice: { type: String, required: true },
        islandCode: { type: String, require: true },
        description: { type: String, default: '',require: false },
        endTime: { type: Date, require: true },
        comments: { type: [Comment], default: [],require: false },
        archived:{type: Boolean, default: false},
        email: {type: String,},
        displayName: {type: String},
        star: {type: Number, default:0},
        inGameName: {type: String},
        islandName: {type:String}
    },
    { timestamps: true }
);

module.exports = mongoose.model('posts', Post,'posts');