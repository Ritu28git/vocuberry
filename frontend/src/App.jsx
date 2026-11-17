import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import WordLearning from "./pages/WordLearning";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Leaderboard from "./pages/Leaderboard";
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

        {/* Word Learning - handles both /learn/:category and /categories/:category */}
        <Route
          path="/learn/:category"
          element={<WordLearning />}
        />
        <Route
          path="/categories/:category"
          element={<WordLearning />}
        />

        {/* Quiz */}
        <Route
          path="/quiz"
          element={<Quiz />}
        />

        {/* Progress */}
        <Route
          path="/progress"
          element={<Progress />}
        />

        {/* Leaderboard */}
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        {/* Admin - Add Category */}
        <Route
          path="/admin/categories/add"
          element={<AddCategory />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;