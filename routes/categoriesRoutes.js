const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", (req, res) => {
  Category.find()
    .populate("likedItems")
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

module.exports = router;
