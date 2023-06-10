const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get("/", (req, res) => {
  Category.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
