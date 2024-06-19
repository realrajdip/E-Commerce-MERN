const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const index = require('./routes/index.js') 
const ownersRoute = require('./routes/ownersRouter.js')
const usersRoute = require('./routes/usersRoute.js'); 
const productsRouter = require('./routes/productsRoute.js') 
const db = require("./config/mongoose-connection.js");
const expressSession = require('express-session'); 
const flash = require('connect-flash')

require('dotenv').config(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
  resave: false, 
  saveUninitialized: false, 
  secret: process.env.SESSION_SECRET
}))
app.use(flash())
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/owners", ownersRoute);
app.use("/users", usersRoute);
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
