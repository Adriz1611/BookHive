/* ───────────────────────── app.js ───────────────────────── */
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ── routers ─────────────────────────────── */
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

/* ── db ───────────────────────────────────── */
require("./config/mongoose-connection");

/* ── global middlewares ───────────────────── */
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

/* 🟢  Make the logged-in user & flash messages available to EVERY view */
app.use(async (req, res, next) => {
  /* expose user */
  res.locals.user = null;
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const User = require("./models/user-model");
      res.locals.user = await User.findById(decoded.id).select("email");
    } catch (_) {
      /* invalid / expired → ignore */
    }
  }

  /* expose flash messages */
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

/* ── static / views ───────────────────────── */
app.use("/upload", express.static("upload"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/* ── route-mounting order ─────────────────── */
app.use("/", homeRouter);
app.use("/login", loginRouter); /* GET only            */
app.use("/signup", signupRouter); /* GET only            */
app.use("/users", usersRouter); /* auth actions        */
app.use("/owners", ownersRouter);
app.use("/product", bookRoutes);
app.use("/products", productsCreateRouter);
app.use("/blog", blogRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

/* ── 404 fallback ─────────────────────────── */
app.all("*", (_req, res) => res.status(404).send("Route not found"));

/* ── start server ─────────────────────────── */
app.listen(3000, () =>
  console.log("➜  Server listening on http://localhost:3000")
);
