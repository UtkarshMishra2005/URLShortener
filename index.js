const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Connected to MongoDB")
);

app.set("view engine", "ejs");
// app.set("views","views");
app.set("views", path.resolve("./views"));
app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
