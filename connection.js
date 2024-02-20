var mongoose = require('mongoose');
const url = "mongodb+srv://sant:sk@cluster0.rc1wqzy.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });

var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully')
});

conn.on('disconnected', function () {
    console.log('database is disconnected')
});

conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;