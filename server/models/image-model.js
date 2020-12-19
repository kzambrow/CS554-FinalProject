const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Image = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('images', Image);
