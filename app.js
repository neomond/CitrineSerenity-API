const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const activityLevelRoutes = require("./routes/activityLevelRoutes");

const Category = require("./models/category").Category;
const { categoriesData } = require("./data/categoryData");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// categoriesData.forEach(async (categoryData) => {
//   try {
//     const category = new Category(categoryData);
//     await category.save();
//     console.log("Category saved:", category);
//   } catch (err) {
//     console.error(err);
//   }
// });

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRouter);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
