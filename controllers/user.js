const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const Url = require("../models/url");
async function handleUserSingup(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  const allUrls = await Url.find({createdBy: user._id});
  return res.render("home",{
    urls:[],
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user.password === password) {
    const token=setUser(user);
    res.cookie("uid", token);
    const allUrls = await Url.find({createdBy: user._id});
    return res.render("home",{
      urls: allUrls,
    });
  }
  return res.render("login");
}

module.exports = { handleUserSingup, handleUserLogin };
