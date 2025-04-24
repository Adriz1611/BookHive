const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
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
require("./config/mongoose-connection"); // just require; it connects

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

/* ── static / views ───────────────────────── */
app.use("/upload", express.static("upload"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

/* ── route-mounting order ─────────────────── */
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter); // GET page only
app.use("/users", usersRouter); // POST login/register + logout
app.use("/owners", ownersRouter);
app.use("/product", bookRoutes);
app.use("/products", productsCreateRouter);
app.use("/blog", blogRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);

/* ── fallback 404 (optional) ──────────────── */
app.all("*", (_req, res) => res.status(404).send("Route not found"));

/* ── start server ─────────────────────────── */
app.listen(3000, () =>
  console.log("➜  Server listening on http://localhost:3000")
);
