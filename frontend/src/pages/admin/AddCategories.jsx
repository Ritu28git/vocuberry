import { useState } from "react";

function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.slug ||
      !formData.description ||
      !formData.image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add category");
      }

      alert("Category added successfully ✅");

      setFormData({
        name: "",
        slug: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080814] text-white flex items-center justify-center">
      <div className="w-full max-w-xl p-8">

        <h1 className="text-3xl font-bold mb-2">
          Add New Category
        </h1>

        <p className="text-gray-400 mb-8">
          Create a new vocabulary category.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Category Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category name"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
          />

          {/* Slug */}
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 py-3 font-semibold transition"
          >
            {loading ? "Adding..." : "Add Category"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddCategory;