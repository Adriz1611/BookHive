

require("dotenv").config();             

const express           = require("express");
const app               = express();
const cookieParser      = require("cookie-parser");
const path              = require("path");
const expressSession    = require("express-session");
const flash             = require("connect-flash");
const jwt               = require("jsonwebtoken");

const connectDB         = require("./config/mongoose-connection"); 

const ownersRouter      = require("./routes/ownersRouter");
const productsCreateRouter = require("./routes/productsCreateRouter");
const usersRouter       = require("./routes/usersRouter");
const loginRouter       = require("./routes/loginRouter");
const homeRouter        = require("./routes/homeRouter");
const signupRouter      = require("./routes/signupRouter");
const blogRouter        = require("./routes/blogRouter");
const bookRoutes        = require("./routes/bookRoutes");
const cartRouter        = require("./routes/cartRouter");
const checkoutRouter    = require("./routes/checkoutRouter");

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

app.use(async (req, res, next) => {
  res.locals.user = null;

  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const User = require("./models/user-model");
      res.locals.user = await User.findById(decoded.id).select("email");
    } catch (_) {
   
    }
  }

  res.locals.error   = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/upload", express.static("upload"));                 // uploaded images
app.use(express.static(path.join(__dirname, "public")));      // css, js, etc.
app.set("view engine", "ejs");


app.use("/",         homeRouter);
app.use("/login",    loginRouter);          
app.use("/signup",   signupRouter);
app.use("/users",    usersRouter);          
app.use("/owners",   ownersRouter);
app.use("/product",  bookRoutes);
app.use("/products", productsCreateRouter);
app.use("/blog",     blogRouter);
app.use("/cart",     cartRouter);
app.use("/checkout", checkoutRouter);

/* ── 404 fallback ───────────────────────────────────────── */
app.all("*", (_req, res) => res.status(404).send("Route not found"));


(async () => {
  try {
    await connectDB();                      // wait until MongoDB is ready
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log('➜  Server listening on http://localhost:${PORT}')
    );
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);                        // fail fast – don’t start half-broken
  }
})();