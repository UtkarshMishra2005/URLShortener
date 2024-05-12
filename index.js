const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const path = require("path");
const app = express();
const PORT = 8001;
const { connectToMongoDB } = require("./connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Connected to MongoDB")
);

app.set("view engine", "ejs");
// app.set("views","views");
app.set("views", path.resolve("./views"));
app.use('/',staticRoute);
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

