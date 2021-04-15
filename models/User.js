const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 3

    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 3
    }
});

module.exports = mongoose.model('User', UserSchema);