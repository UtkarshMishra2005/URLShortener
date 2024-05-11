const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");
const URL = require("../models/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:id", async (req, res) => {
  const shortid = req.params.id;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortid,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );
  res.redirect(entry.redirectURL);
});
router.get("/analytics/:id", async (req, res) => {
  const shortid = req.params.id;
  const entry = await URL.findOne({ shortId: shortid });

  return res.json({
    totalclicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
});


router.get('/test',(req,res)=>{
    return res.end('hello');
})

module.exports = router;
