const express = require('express');
const app = express();

// Example pre-loaded dataset (replace with your actual allArticles variable)
const allArticles = [
  { id: 101, title: "Introduction to Programming Concepts", author: "Coder One" },
  { id: 102, title: "Advanced Programming Techniques", author: "Dev Expert" },
  { id: 202, title: "Big Data Analytics Explained", author: "Analytics Pro" },
  { id: 203, title: "Data Structures Basics", author: "Algo Master" },
  { id: 301, title: "Responsive Web Development", author: "Web Guru" }
];

// ✅ GET /search endpoint
app.get('/search', (req, res) => {
  const { name, limit = 5, page = 1 } = req.query;

  // Validate name
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: "Search name parameter is required." });
  }

  // Convert pagination values to integers
  const perPage = parseInt(limit, 10);
  const currentPage = parseInt(page, 10);

  // ✅ Filter articles by case-insensitive name match
  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(name.toLowerCase())
  );

  const totalResults = filteredArticles.length;
  const totalPages = totalResults > 0 ? Math.ceil(totalResults / perPage) : 0;

  // ✅ Paginate results
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // ✅ Send response
  return res.json({
    currentPage,
    totalPages,
    totalResults,
    articles: paginatedArticles
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
