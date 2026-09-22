import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import WordLearning from "../pages/WordLearning";
import Quiz from "../pages/Quiz";
import Progress from "../pages/Progress";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Categories */}
        <Route path="/categories" element={<Categories />} />

        {/* Category ke words */}
        <Route
          path="/categories/:category"
          element={<WordLearning />}
        />

        {/* Quiz */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Progress */}
        <Route path="/progress" element={<Progress />} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;