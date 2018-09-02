const mongoose = require("mongoose");
const configKeys = require("../Config/keys");
const isProduction = (process.env.NODE_ENV === "production");

mongoose.Promise = global.Promise;

if(isProduction){
	mongoose.connect(configKeys.mongodbURI, { useNewUrlParser: true }, function(err) {		
  	if (err) console.log(err);
  	console.log("Connected to remote database");
	});
} else {
	mongoose.connect(configKeys.localdbURI, { useNewUrlParser: true }, (err) => {
		if(err) console.log("Mongoose connection error occurred ", err);
		console.log('Connected to local database');
	});
}

module.exports = mongoose;