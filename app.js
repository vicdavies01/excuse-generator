const express = require("express");
const path = require("path");
const { generateExcuse, getCategories } = require("./lib/excuses");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    categories: getCategories(),
    excuse: null,
    category: null,
  });
});

app.post("/excuse", (req, res) => {
  const { category } = req.body;
  const excuse = generateExcuse(category);
  res.render("index", {
    categories: getCategories(),
    excuse,
    category,
  });
});

app.get("/api/excuse/:category", (req, res) => {
  const excuse = generateExcuse(req.params.category);
  res.json({ excuse });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Excuse Generator running at http://localhost:${PORT}`);
  });
}

module.exports = app;
