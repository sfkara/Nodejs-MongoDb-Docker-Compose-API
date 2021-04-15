const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BranchSchema = new Schema({
    longtitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    full_address: {
        type: String,
        required: true
    },
    branch_id: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Branch', BranchSchema); 