import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import WordLearning from "./pages/WordLearning";
import AddCategory from "./pages/admin/AddCategories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={<Categories />}
        />

        {/* Word Learning */}
        <Route
          path="/learn/:category"
          element={<WordLearning />}
        />

        {/* Admin - Add Category */}
        <Route
          path="/admin/categories/add"
          element={<AddCategory />}
        />
       <Route
           path="/learn/:category"
           element={<WordLearning />}
             />
      </Routes>
    </BrowserRouter>
  );
}

export default App;