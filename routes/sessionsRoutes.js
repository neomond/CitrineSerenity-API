const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { Mongoose } = require("mongoose");
const { Session } = require("../models/session");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const sessions = await Session.find({
    categories: { $in: [id] }, // Use the $in operator to find sessions with the given categoryId in the categories array.
  }).populate("categories");

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
