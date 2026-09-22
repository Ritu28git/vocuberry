const Category = require("./categoryModel");

// GET all categories
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

// POST single category
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

// POST multiple categories
const createManyCategories = async (req, res) => {
  try {
    const categories = req.body;

    if (!Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array",
      });
    }

    const existing = await Category.find({
      slug: { $in: categories.map((item) => item.slug) },
    });

    const existingSlugs = existing.map((item) => item.slug);

    const newCategories = categories.filter(
      (item) => !existingSlugs.includes(item.slug)
    );

    if (newCategories.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All categories already exist",
      });
    }

    const created = await Category.insertMany(newCategories);

    res.status(201).json({
      success: true,
      count: created.length,
      message: "Categories added successfully",
      categories: created,
    });
  } catch (error) {
    console.error("CREATE MANY CATEGORIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add categories",
      error: error.message,
    });
  }
};

module.exports.getCategories = getCategories;
module.exports.createCategory = createCategory;
module.exports.createManyCategories = createManyCategories;