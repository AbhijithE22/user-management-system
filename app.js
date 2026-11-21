// Core
import express from "express";
const app = express();
// Third Party Middleware
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();


import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).render("404.ejs");
});

export default app;
 