const express = require("express");
const app = express();
const port = (process.env.PORT || 3000);
const isProductionEnv = (process.env.NODE_ENV === "production");

// DATABASE
require("./app/Database");

// ROUTES
app.use("/api", require("./app/Routes/users"));
app.use("/api/profile", require("./app/Routes/profile"));
app.use("/api/posts", require("./app/Routes/posts"));


app.get("/", (req, res) => res.send("Hello there"));

app.listen(port, (err) =>{
	if(err) return console.log("Server error has occured: ", err);
	return console.log(`Server is live on port ${port}`);
});