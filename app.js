const express = require("express");
const users = require("./users");
const morgan = require("morgan");

const db=require('./config/dbConnection')
// make the app
const app = express();
const port = process.env.PORT || 3000;
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

// development
if (app.get("env") == "develoment") {
  app.use(morgan("tiny"));
}

app.get('/api/userd' ,async(req,res) =>{
  const q='SELECT * FROM user';
  const rows=await db.query('SELECT * FROM user')

console.log(rows);

})
//  import the routes
const userRoutes = require("./modules/users/user");
const homeRoutes = require('./modules/home/home')



//  user the routes
app.use('/', homeRoutes)
app.use("/api/user", userRoutes);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log("Initial users:", users);
});
