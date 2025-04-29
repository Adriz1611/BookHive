/* ─────────────────────────  app.js  ─────────────────────────
   Express entry point for the BookHive project
   • Loads env vars
   • Connects to MongoDB first
   • Starts the web server only after a successful DB connection
   • Mounts all routers and global middle-ware
────────────────────────────────────────────────────────────── */

require("dotenv").config(); // 1️⃣  load .env FIRST

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const connectDB = require("./config/mongoose-connection"); // ⬅ DB helper
const ownersRouter = require("./routes/ownersRouter");
const productsCreateRouter = require("./routes/productsCreateRouter");
const usersRouter = require("./routes/usersRouter");
const loginRouter = require("./routes/loginRouter");
const homeRouter = require("./routes/homeRouter");
const signupRouter = require("./routes/signupRouter");
const blogRouter = require("./routes/blogRouter");
const productRoutes = require("./routes/bookRoutes");
const cartRouter = require("./routes/cartRouter");

const app = express();

/* ── global middle-wares ─────────────────────────────────── */
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

/* ── static assets & view engine ─────────────────────────── */
app.use("/upload", express.static("upload")); // images from multer
app.use(express.static(path.join(__dirname, "public"))); // CSS, JS, etc.
app.set("view engine", "ejs");

/* ── mount routers ───────────────────────────────────────── */
app.use("/", homeRouter);
app.use("/login", loginRouter); // GET + POST handled in router
app.use("/signup", signupRouter);
app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/product", productRoutes); // individual product pages
app.use("/products", productsCreateRouter); // admin product CRUD
app.use("/blog", blogRouter);
app.use("/cart", cartRouter);

/* ── 404 fallback ────────────────────────────────────────── */
app.all("*", (_req, res) => res.status(404).send("Route not found"));

/* ── start server  _after_ DB connection ─────────────────── */
(async () => {
  try {
    await connectDB(); // wait until MongoDB is ready
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`➜  Server listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("💥  Cannot start server without DB:", err.message);
    process.exit(1);
  }
})();
