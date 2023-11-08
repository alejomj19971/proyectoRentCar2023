const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    rentnumber:String,
    username:String,
    platenumber:String,
    initialdate:Date,
    finaldate: Date,
    status:Boolean,
    created:{
        type:Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('rent', ProductSchema);