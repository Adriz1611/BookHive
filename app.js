const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter");
const productsCreateRouter = require("./routes/productsCreateRouter");
const usersRouter = require("./routes/usersRouter");
const loginRouter = require("./routes/loginRouter");
const homeRouter = require("./routes/homeRouter");
const signupRouter = require("./routes/signupRouter");
const blogRouter = require("./routes/blogRouter");

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsCreateRouter);
app.use("/signup",signupRouter);
app.use("/blog",blogRouter);

app.listen(3000);
