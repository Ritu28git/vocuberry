const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    // ==============================
    // NORMAL VOCABULARY
    // ==============================

    word: {
      type: String,
      trim: true,
    },

    meaning: {
      type: String,
      trim: true,
    },

    hindiMeaning: {
      type: String,
      trim: true,
    },

   sentence: {
  type: String,
  trim: true,
},

useItWhen: {
  type: String,
  trim: true,
},

    // ==============================
    // SAY IT BETTER
    // ==============================

    normal: {
      type: String,
      trim: true,
    },

    better: {
      type: String,
      trim: true,
    },

    // ==============================
    // TONGUE TWISTERS
    // ==============================

    text: {
      type: String,
      trim: true,
    },

    difficulty: {
      type: String,
      trim: true,
    },

    // ==============================
    // CATEGORY
    // ==============================

    category: {
      type: String,
      required: true,
      trim: true,
    },
    

  },
  {
    timestamps: true,
  }
);

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;