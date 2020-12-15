const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        name: {type: String, require: true},
        posterId: {type: String, require: true},
        comment: {type: String, require: true}
    }
);

const Post = new Schema(
    {
        creator: { type: String, required: true, unique: true },
        sell: { type: Boolean, require: true },
        price: {type: Number, require: true},
        ticketPrice: { type: String, required: true },
        islandCode: { type: String, require: true },
        description: { type: String, default: '',require: false },
        endTime: { type: Date, require: true },
        comments: { type: [Comment], default: [],require: false },
        archived:{type: Boolean, default: false}
    },
    { timestamps: true }
);

module.exports = mongoose.model('posts', Post,'posts');