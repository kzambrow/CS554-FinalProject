const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Image = new Schema({
//     imageName: {
//         type: String,
//         default: "none",
//         required: true
//     },
//     imageData: {
//         type: String,
//         required: true
//     }
// }
    


const User = new Schema(
    {
        email: {type: String, required: true, unique: true},
        displayName: {type: String, require: true},
        star: {type: Number, default:0, required: false},
        inGameName: {type: String},
        islandName: {type:String}
        
    },
    {timestamps: true}
);

module.exports = mongoose.model('users', User, 'users');
