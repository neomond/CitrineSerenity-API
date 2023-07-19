const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { Mongoose } = require("mongoose");
const { Session } = require("../models/session");

router.get("/", async (req, res) => {
  const sessions = await Session.find().populate("categories");
  res.json(sessions);
});

router.post("/", async (req, res) => {
  const session = new Session(req.body);
  //   console.log("sess", session);
  const categoryIds = req.body.categories;

  const newsession = await session.save();
  categoryIds.forEach(async (id) => {
    let category = await Category.findById(id);
    category.sessions.push(newsession._id);
    await category.save();
  });
  res.json(newsession);
});

module.exports = router;
