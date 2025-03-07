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
const bookRoutes = require("./routes/bookRoutes");
const cartRouter = require("./routes/cartRouter");
const checkoutRouter = require("./routes/checkoutRouter");

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
app.use("/upload", express.static("upload"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/product", bookRoutes);//dynamic routing
app.use("/products", productsCreateRouter);//product creation
app.use("/signup",signupRouter);
app.use("/blog",blogRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);


app.listen(3000);
