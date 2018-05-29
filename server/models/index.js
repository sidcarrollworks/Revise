const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.
    connect("mongodb://localhost/revise_db", {
	})
    .then(() => {
	    console.log("Connected to MongoDB");
	})
    .catch(err => {
	    console.log(err);
	});

exports.User = require('./User');
exports.User = require('./Projects');