import {
  Search,
  Moon,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import vLogo from "../assets/images/Vocuberry.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070713]/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* ================= LOGO ================= */}

        <button
          onClick={() => goTo("/")}
          className="flex items-center gap-2"
        >
          <img
            src={vLogo}
            alt="Vocuberry"
            className="h-12 w-12 object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.65)]"
          />

          <span className="text-xl font-bold tracking-wide text-white">
            Vocu
            <span className="text-violet-400">
              berry
            </span>
          </span>
        </button>


        {/* ================= DESKTOP MENU ================= */}

        <div className="hidden items-center gap-7 md:flex">

          <button
            onClick={() => goTo("/")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Home
          </button>

          <button
            onClick={() => goTo("/categories")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Categories
          </button>

          <button
            onClick={() => goTo("/learn/daily-use-words")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Daily Words
          </button>

          <button
            onClick={() => goTo("/quiz")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Quiz
          </button>

          <button
            onClick={() => goTo("/progress")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Progress
          </button>

          <button
            onClick={() => goTo("/leaderboard")}
            className="text-sm text-gray-300 transition hover:text-violet-400"
          >
            Leaderboard
          </button>

        </div>


        {/* ================= RIGHT SIDE ================= */}

        <div className="hidden items-center gap-3 md:flex">

          {/* Search */}

          <button
            onClick={() => goTo("/search")}
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-300 transition hover:border-violet-400/40 hover:text-white"
          >
            <Search size={18} />
          </button>


          {/* Theme */}

          <button
            className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-gray-300 transition hover:border-violet-400/40 hover:text-white"
          >
            <Moon size={18} />
          </button>


          {/* Sign In */}

          <button
            onClick={() => goTo("/login")}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-105"
          >
            Sign In
          </button>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#070713]/95 px-6 py-5 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-5">

            <button
              onClick={() => goTo("/")}
              className="text-left text-violet-400"
            >
              Home
            </button>

            <button
              onClick={() => goTo("/categories")}
              className="text-left text-gray-300 transition hover:text-violet-400"
            >
              Categories
            </button>

            <button
              onClick={() => goTo("/learn/daily-use-words")}
              className="text-left text-gray-300 transition hover:text-violet-400"
            >
              Daily Words
            </button>

            <button
              onClick={() => goTo("/quiz")}
              className="text-left text-gray-300 transition hover:text-violet-400"
            >
              Quiz
            </button>

            <button
              onClick={() => goTo("/progress")}
              className="text-left text-gray-300 transition hover:text-violet-400"
            >
              Progress
            </button>

            <button
              onClick={() => goTo("/leaderboard")}
              className="text-left text-gray-300 transition hover:text-violet-400"
            >
              Leaderboard
            </button>


            <button
              onClick={() => goTo("/login")}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white"
            >
              Sign In
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;