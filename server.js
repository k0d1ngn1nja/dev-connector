const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = (process.env.PORT || 3000);
const passport = require("passport");
const isProductionEnv = (process.env.NODE_ENV === "production");

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require("./app/Config/passport")(passport);

// DATABASE
require("./app/Database");

// MODELS
require("./app/Models/User");
require("./app/Models/Profile");

// ROUTES
app.use("/api", require("./app/Routes/users"));
app.use("/api/profile", require("./app/Routes/profile"));
app.use("/api/posts", require("./app/Routes/posts"));


app.listen(port, (err) =>{
	if(err) return console.log("Server error has occured: ", err);
	return console.log(`Server is live on port ${port}`);
});