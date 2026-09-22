const Word = require("./models");

// ===============================
// GET ALL WORDS
// ===============================
const getWords = async (req, res) => {
  try {
    const words = await Word.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: words.length,
      words,
    });
  } catch (error) {
    console.error("GET WORDS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch words",
      error: error.message,
    });
  }
};


// ===============================
// GET WORD BY ID
// ===============================
const getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }

    res.status(200).json({
      success: true,
      word,
    });
  } catch (error) {
    console.error("GET WORD BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch word",
      error: error.message,
    });
  }
};


// ===============================
// CREATE SINGLE WORD
// ===============================
const createWord = async (req, res) => {
  try {
    const {
      word,
      meaning,
      hindiMeaning,
      sentence,
      category,
    } = req.body;

    if (
      !word ||
      !meaning ||
      !hindiMeaning ||
      !sentence ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newWord = await Word.create({
      word,
      meaning,
      hindiMeaning,
      sentence,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Word added successfully",
      word: newWord,
    });
  } catch (error) {
    console.error("CREATE WORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create word",
      error: error.message,
    });
  }
};


// ===============================
// CREATE MANY WORDS
// ===============================
const createManyWords = async (req, res) => {
  console.log("🔥 NEW CREATE MANY WORDS CONTROLLER RUNNING");

  try {
    const words = req.body;
    if (!Array.isArray(words)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    if (words.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Words array cannot be empty",
      });
    }

   for (const item of words) {
  if (
    !item.word ||
    !item.meaning ||
    !item.hindiMeaning ||
    !item.category
  ) {
    return res.status(400).json({
      success: false,
      message: "Word, meaning, Hindi meaning and category are required",
    });
  }

  // Sentence is required for all categories except Idioms
  if (item.category !== "Idioms" && !item.sentence) {
    return res.status(400).json({
      success: false,
      message: `Sentence is required for ${item.category}`,
    });
  }
}
    const newWords = await Word.insertMany(words);

    res.status(201).json({
      success: true,
      message: `${newWords.length} words added successfully`,
      count: newWords.length,
      words: newWords,
    });
  } catch (error) {
    console.error("CREATE MANY WORDS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create words",
      error: error.message,
    });
  }
};


// ===============================
// EXPORTS
// ===============================
module.exports = {
  getWords,
  getWordById,
  createWord,
  createManyWords,
};