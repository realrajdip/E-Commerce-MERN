const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRoute = require('./routes/ownersRouter.js')
const usersRoute = require('./routes/usersRoute.js'); 
const productsRouter = require('./routes/productsRoute.js') 

const db = require("./config/mongoose-connection.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRoute);
app.use("/users", usersRoute);
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
