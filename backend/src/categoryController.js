const Category = require("./categoryModel");

// ======================================
// GET ALL CATEGORIES
// ======================================

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};


// ======================================
// CREATE SINGLE CATEGORY
// ======================================

const createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      image,
    } = req.body;

    if (!name || !slug || !description || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await Category.findOne({ slug });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({
      name,
      slug,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      category: newCategory,
    });

  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};


// ======================================
// CREATE MANY CATEGORIES
// ======================================

const createManyCategories = async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    if (categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Categories array cannot be empty",
      });
    }

    for (const item of categories) {
      if (
        !item.name ||
        !item.slug ||
        !item.description ||
        !item.image
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Every category must contain name, slug, description and image",
        });
      }
    }

    const createdCategories = await Category.insertMany(categories);

    res.status(201).json({
      success: true,
      message: `${createdCategories.length} categories added successfully`,
      count: createdCategories.length,
      categories: createdCategories,
    });

  } catch (error) {
    console.error("CREATE MANY CATEGORIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create categories",
      error: error.message,
    });
  }
};


// ======================================
// EXPORTS
// ======================================

module.exports = {
  getCategories,
  createCategory,
  createManyCategories,
};