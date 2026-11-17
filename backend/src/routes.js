
const express = require("express");
const router = express.Router();

const {
  getWords,
  getWordById,
  createWord,
  createManyWords,
} = require("./wordController");

const {
  getCategories,
  createCategory,
  createManyCategories,
} = require("./categoryController");

// ===============================
// CATEGORY ROUTES
// ===============================
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.post("/categories/bulk", createManyCategories);

// ===============================
// WORD ROUTES
// ===============================
// GET all words (supports optional ?category= query parameter)
router.get("/words", getWords);

// GET one word
router.get("/words/:id", getWordById);

// POST one word
router.post("/words", createWord);

// POST many words
router.post("/words/bulk", createManyWords);

module.exports = router;