const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const { Mongoose } = require("mongoose");

router.get("/", (req, res) => {
  Category.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const categoryId = req.params.id;

  Category.findById(categoryId)
    .populate("sessions")
    .then((category) => {
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post("", async (req, res) => {
  console.log("geldium,", req.body);
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });
  const newcat = await category.save();
  console.log("ge", newcat);
  res.json(newcat);
});
module.exports = router;
