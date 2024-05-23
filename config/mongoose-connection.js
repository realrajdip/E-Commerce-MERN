const mongoose = require('mongoose');
//const dbgr = require('debug')('development:mongoos')

mongoose
.connect("mongodb://127.0.0.1:27017/scatch")
.then(() => console.log("connected"))
.catch((err) => console.log(err))

module.exports = mongoose.connection;  