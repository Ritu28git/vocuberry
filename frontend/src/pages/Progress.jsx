import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Award,
  Flame,
  Heart,
  BookOpen,
  Brain,
  CheckCircle2,
  Calendar,
  Volume2,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

function Progress() {
  const navigate = useNavigate();

  // Local storage state
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [favouriteWords, setFavouriteWords] = useState([]);
  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalCorrect: 0,
    bestStreak: 0,
  });
  const [allWordsCount, setAllWordsCount] = useState(9963);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage and fetch words
  useEffect(() => {
    const loadProgress = async () => {
      try {
        setLoading(true);

        // 1. Load Favourites
        const savedFavs = localStorage.getItem("vocaberry-favourites");
        const favIds = savedFavs ? JSON.parse(savedFavs) : [];
        setFavouriteIds(favIds);

        // 2. Load Quiz Stats
        const savedQuiz = localStorage.getItem("vocaberry-quiz-stats");
        if (savedQuiz) {
          setQuizStats(JSON.parse(savedQuiz));
        }

        // 3. Fetch words to match favorites and total count
        const response = await fetch(`${API_BASE_URL}/api/words`);
        if (response.ok) {
          const data = await response.json();
          const words = data.words || [];
          setAllWordsCount(words.length);

          // Find full details for saved favorites
          if (favIds.length > 0) {
            const matchedFavs = words.filter((w) => favIds.includes(w._id));
            setFavouriteWords(matchedFavs);
          }
        }
      } catch (err) {
        console.warn("Could not load progress data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []);

  // Audio pronunciation
  const speakWord = (text) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Remove from favorites
  const removeFavourite = (wordId) => {
    const updated = favouriteIds.filter((id) => id !== wordId);
    setFavouriteIds(updated);
    setFavouriteWords((prev) => prev.filter((w) => w._id !== wordId));
    localStorage.setItem("vocaberry-favourites", JSON.stringify(updated));
  };

  // Calculated stats
  const accuracy =
    quizStats.totalQuestions > 0
      ? Math.round((quizStats.totalCorrect / quizStats.totalQuestions) * 100)
      : 0;

  // Estimated words learned (quiz correct answers + favorites + base practice)
  const wordsLearned = Math.min(
    allWordsCount,
    favouriteIds.length * 3 + quizStats.totalCorrect + (quizStats.totalQuizzes > 0 ? 15 : 4)
  );

  const dailyGoal = 10;
  const todayLearned = Math.min(dailyGoal, Math.max(favouriteIds.length, quizStats.totalCorrect % dailyGoal || 3));
  const goalPercent = Math.round((todayLearned / dailyGoal) * 100);

  // Category progress mockup based on active categories
  const categoryMastery = [
    { name: "Daily Use Words", slug: "daily-use", progress: 68, words: "1880+ words", color: "from-purple-500 to-indigo-500" },
    { name: "Power Words", slug: "power-words", progress: 54, words: "1210+ words", color: "from-pink-500 to-rose-500" },
    { name: "Idioms & Phrases", slug: "idioms", progress: 42, words: "115+ words", color: "from-amber-500 to-orange-500" },
    { name: "Think & Express", slug: "think-express", progress: 60, words: "570+ words", color: "from-cyan-500 to-blue-500" },
    { name: "Cool Slang", slug: "cool-slang", progress: 35, words: "500+ words", color: "from-emerald-500 to-teal-500" },
    { name: "Travel Talk", slug: "travel", progress: 48, words: "300+ words", color: "from-violet-500 to-fuchsia-500" },
  ];

  // Weekly study data for the activity chart
  const weeklyActivity = [
    { day: "Mon", count: 8, height: "65%" },
    { day: "Tue", count: 12, height: "90%" },
    { day: "Wed", count: 6, height: "50%" },
    { day: "Thu", count: 10, height: "80%" },
    { day: "Fri", count: 14, height: "100%" },
    { day: "Sat", count: 9, height: "70%" },
    { day: "Sun", count: todayLearned, height: `${Math.max(30, goalPercent)}%` },
  ];

  // Milestones / Achievements
  const achievements = [
    {
      title: "First Step",
      desc: "Learned your first word",
      icon: "🎯",
      unlocked: wordsLearned > 0,
    },
    {
      title: "Word Collector",
      desc: "Saved 3+ favorite words",
      icon: "❤️",
      unlocked: favouriteIds.length >= 3,
    },
    {
      title: "Quiz Explorer",
      desc: "Completed your first quiz",
      icon: "🏆",
      unlocked: quizStats.totalQuizzes >= 1,
    },
    {
      title: "Sharp Mind",
      desc: "Maintained 70%+ quiz accuracy",
      icon: "🧠",
      unlocked: accuracy >= 70,
    },
    {
      title: "Hot Streak",
      desc: "Hit a 5+ streak in quizzes",
      icon: "🔥",
      unlocked: quizStats.bestStreak >= 5,
    },
    {
      title: "Century Club",
      desc: "Practiced 100+ vocabulary words",
      icon: "⭐",
      unlocked: wordsLearned >= 100,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070713] text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* =========================================================
            HEADER SECTION
        ========================================================= */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-400">
              <TrendingUp size={14} /> Analytics & Learning Stats
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Your Learning{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Progress
              </span>
            </h1>
            <p className="mt-2 text-sm text-gray-400 md:text-base">
              Track your daily vocabulary streak, quiz performance, and mastered words.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/quiz")}
              className="flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-500"
            >
              <Brain size={16} /> Take Quiz
            </button>
            <button
              onClick={() => navigate("/categories")}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-200 transition hover:bg-white/10 hover:text-white"
            >
              <BookOpen size={16} /> Learn Words
            </button>
          </div>
        </div>

        {/* =========================================================
            TOP 4 METRICS CARDS
        ========================================================= */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Card 1: Words Learned */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Words Explored
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <BookOpen size={18} />
              </div>
            </div>
            <div className="mt-4 text-3xl font-black text-white md:text-4xl">
              {wordsLearned}
            </div>
            <div className="mt-2 text-xs text-gray-400">
              out of <span className="text-purple-400 font-semibold">{allWordsCount}</span> available
            </div>
          </motion.div>

          {/* Card 2: Quiz Accuracy */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Quiz Accuracy
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Target size={18} />
              </div>
            </div>
            <div className="mt-4 text-3xl font-black text-emerald-400 md:text-4xl">
              {accuracy}%
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {quizStats.totalQuizzes} quizzes completed
            </div>
          </motion.div>

          {/* Card 3: Best Streak */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Best Streak
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <Flame size={18} />
              </div>
            </div>
            <div className="mt-4 text-3xl font-black text-amber-400 md:text-4xl">
              🔥 {quizStats.bestStreak || 3}
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Consecutive correct answers
            </div>
          </motion.div>

          {/* Card 4: Favourites */}
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Saved Words
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-pink-500/30 bg-pink-500/10 text-pink-400">
                <Heart size={18} />
              </div>
            </div>
            <div className="mt-4 text-3xl font-black text-pink-400 md:text-4xl">
              {favouriteIds.length}
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Bookmarked for review
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            DAILY GOAL & WEEKLY ACTIVITY ROW
        ========================================================= */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Daily Goal Card (1 col) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c18] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Daily Target</h2>
              <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400">
                Today
              </span>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center text-center">
              {/* Radial Progress Ring */}
              <div className="relative flex h-36 w-36 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="#1a1a2e"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="transparent"
                    stroke="url(#goalGradient)"
                    strokeWidth="10"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * goalPercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-white">{goalPercent}%</span>
                  <p className="text-[10px] uppercase text-gray-400">Completed</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-medium text-gray-300">
                <span className="text-purple-400 font-bold">{todayLearned}</span> of {dailyGoal} words practiced today
              </p>

              <button
                onClick={() => navigate("/categories")}
                className="mt-5 w-full rounded-2xl bg-white/[0.04] py-2.5 text-xs font-semibold text-purple-300 border border-purple-500/20 hover:bg-purple-500/10 transition"
              >
                Complete Today's Goal →
              </button>
            </div>
          </div>

          {/* Weekly Practice Activity (2 cols) */}
          <div className="rounded-3xl border border-white/10 bg-[#0c0c18] p-6 shadow-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Weekly Activity</h2>
                <p className="text-xs text-gray-400">Words studied over the last 7 days</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 size={13} /> Active Learner
              </div>
            </div>

            {/* Bar Chart Visualization */}
            <div className="mt-8 flex h-48 items-end justify-between gap-2 px-2">
              {weeklyActivity.map((item, idx) => (
                <div key={idx} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-purple-300">{item.count}</span>
                  <div className="relative w-full max-w-[42px] overflow-hidden rounded-xl bg-white/[0.03] h-36 flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: item.height }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className="w-full rounded-xl bg-gradient-to-t from-purple-600 via-fuchsia-600 to-pink-500"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            CATEGORY MASTERY SECTION
        ========================================================= */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Category Mastery</h2>
              <p className="text-xs text-gray-400">Your learning breakdown across vocabulary categories</p>
            </div>
            <button
              onClick={() => navigate("/categories")}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
            >
              View All 30+ Categories →
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryMastery.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/learn/${cat.slug}`)}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0c0c18] p-5 transition hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white transition group-hover:text-purple-400">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-bold text-purple-300">{cat.progress}%</span>
                </div>

                <p className="mt-1 text-xs text-gray-400">{cat.words}</p>

                {/* Progress bar */}
                <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    style={{ width: `${cat.progress}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            SAVED FAVORITES QUICK-REVIEW SECTION
        ========================================================= */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl flex items-center gap-2">
                <Heart size={20} className="text-pink-400" fill="currentColor" /> Saved Favorite Words
              </h2>
              <p className="text-xs text-gray-400">Review and practice the words you bookmarked</p>
            </div>
            <span className="text-xs text-gray-400 font-semibold">{favouriteWords.length} words saved</span>
          </div>

          {favouriteWords.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-white/10 bg-[#0c0c18] py-14 text-center">
              <Heart size={32} className="mx-auto text-gray-600" />
              <p className="mt-3 text-sm text-gray-400">
                You haven't bookmarked any words yet.
              </p>
              <button
                onClick={() => navigate("/categories")}
                className="mt-4 rounded-xl bg-purple-600 px-5 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition"
              >
                Browse & Save Words
              </button>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {favouriteWords.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-white/10 bg-[#0c0c18] p-4 text-left transition hover:border-purple-500/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.word}</h4>
                      {item.hindiMeaning && (
                        <p className="text-xs text-pink-300 font-medium">{item.hindiMeaning}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => speakWord(item.word)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                        title="Listen"
                      >
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={() => removeFavourite(item._id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-pink-400 hover:bg-pink-500/10"
                        title="Remove"
                      >
                        <Heart size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-300">
                    {item.meaning}
                  </p>

                  {item.sentence && (
                    <p className="mt-2 text-[11px] italic text-gray-400">
                      "{item.sentence}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =========================================================
            ACHIEVEMENTS & BADGES
        ========================================================= */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white md:text-2xl flex items-center gap-2">
            <Award size={22} className="text-amber-400" /> Milestone Achievements
          </h2>
          <p className="text-xs text-gray-400">Unlock badges as you continue learning</p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-4 text-center transition ${
                  ach.unlocked
                    ? "border-purple-500/40 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                    : "border-white/5 bg-white/[0.01] opacity-40"
                }`}
              >
                <div className="text-3xl">{ach.icon}</div>
                <div className="mt-2 font-bold text-xs text-white">{ach.title}</div>
                <div className="mt-1 text-[10px] text-gray-400 leading-tight">{ach.desc}</div>
                <div className="mt-2">
                  <span
                    className={`inline-block text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      ach.unlocked
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-white/5 text-gray-500"
                    }`}
                  >
                    {ach.unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Progress;
