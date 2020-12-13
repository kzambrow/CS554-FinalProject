const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {type: String, required: true, unique: true},
        displayName: {type: String, require: true},
        star: {type: Number, defaule:0, required: false}
    },
    {timestamps: true}
);

module.exports = mongoose.model('users', User, 'users');