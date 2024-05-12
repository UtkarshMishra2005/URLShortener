const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  console.log("You are in generate function")
  const shortId = shortid.generate();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", {
    shortId: shortId,
  });
}

module.exports={
    handleGenerateNewShortURL,
}
