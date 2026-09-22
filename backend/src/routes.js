const express = require("express");

const router = express.Router();

const {
  getWords,
  getWordById,
  createWord,
  createManyWords,
} = require("./wordController");

// GET all words
router.get("/words", getWords);

// GET one word
router.get("/words/:id", getWordById);

// POST one word
router.post("/words/bulk", createManyWords);

// POST many words
router.post("/words/many", createManyWords);

module.exports = router;