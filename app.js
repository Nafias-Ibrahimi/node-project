const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./modules/users/user");
const homeRoutes = require('./modules/home/home')


const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

if (app.get("env") == "develoment") {
  app.use(morgan("tiny"));
}


app.use('/', homeRoutes)
app.use("/api/user", userRoutes);


let users = require("./users");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Initial users:", users);
});
