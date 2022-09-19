const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    movements:Array,
    date:String
})

module.exports = UserSchema