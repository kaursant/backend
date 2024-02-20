let mongoose = require('mongoose');
let connection = require('../connection');
let schemaObj = {
    'name': String,
    'email': String,
    'phone': String
}
let userSchema = new mongoose.Schema(schemaObj);
let userTable = mongoose.model('contactList', userSchema)

module.exports = userTable;