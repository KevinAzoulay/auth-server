const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    
       
        Username: String,
        Name : String,
        Email : String,
        Street : String,
        City : String,
        hash : String,
        salt: String,
        Zipcode: Number,
        Tasks :  [{ID : String, Title: String, Completed : Boolean }],
        Posts: [{ID : String, Title : String, Body: String}],
    }
)

module.exports = mongoose.model('users', UsersSchema)
