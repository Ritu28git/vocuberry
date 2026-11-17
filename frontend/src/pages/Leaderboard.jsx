import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Brain,
  BookOpen,
  ArrowUpRight,
  Shield,
  Star,
  User,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// Base learners data
const BASE_LEADERBOARD = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    badge: "Word Prodigy",
    level: 28,
    wordsMastered: 840,
    streak: 34,
    points: { week: 1420, month: 5890, allTime: 24800 },
    league: "Diamond",
  },
  {
    id: "user-2",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    badge: "Vocab Master",
    level: 26,
    wordsMastered: 790,
    streak: 29,
    points: { week: 1310, month: 5420, allTime: 22400 },
    league: "Diamond",
  },
  {
    id: "user-3",
    name: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    badge: "Polyglot Legend",
    level: 25,
    wordsMastered: 755,
    streak: 21,
    points: { week: 1190, month: 4950, allTime: 20100 },
    league: "Diamond",
  },
  {
    id: "user-4",
    name: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    badge: "Fluent Speaker",
    level: 22,
    wordsMastered: 620,
    streak: 18,
    points: { week: 980, month: 4100, allTime: 17200 },
    league: "Platinum",
  },
  {
    id: "user-5",
    name: "Lucas Silva",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    badge: "Idiom Expert",
    level: 20,
    wordsMastered: 580,
    streak: 15,
    points: { week: 890, month: 3820, allTime: 15600 },
    league: "Platinum",
  },
  {
    id: "user-6",
    name: "Ananya Patel",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    badge: "Grammar Ace",
    level: 19,
    wordsMastered: 530,
    streak: 12,
    points: { week: 820, month: 3450, allTime: 14100 },
    league: "Platinum",
  },
  {
    id: "user-7",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    badge: "Speed Reader",
    level: 18,
    wordsMastered: 490,
    streak: 9,
    points: { week: 740, month: 3100, allTime: 12800 },
    league: "Gold",
  },
  {
    id: "user-8",
    name: "Meera Iyer",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    badge: "Word Hunter",
    level: 16,
    wordsMastered: 440,
    streak: 8,
    points: { week: 670, month: 2850, allTime: 11500 },
    league: "Gold",
  },
  {
    id: "user-9",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    badge: "Language Enthusiast",
    level: 15,
    wordsMastered: 410,
    streak: 6,
    points: { week: 590, month: 2500, allTime: 10200 },
    league: "Gold",
  },
  {
    id: "user-10",
    name: "Zara Khan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    badge: "Curious Scholar",
    level: 14,
    wordsMastered: 370,
    streak: 5,
    points: { week: 510, month: 2200, allTime: 8900 },
    league: "Silver",
  },
];

function Leaderboard() {
  const navigate = useNavigate();

  // Timeframe filter: 'week', 'month', 'allTime'
  const [timeframe, setTimeframe] = useState("week");
  const [searchTerm, setSearchTerm] = useState("");

  // Current user's dynamic points from localStorage
  const [userScore, setUserScore] = useState(0);
  const [userStreak, setUserStreak] = useState(3);
  const [userWordsLearned, setUserWordsLearned] = useState(15);

  useEffect(() => {
    try {
      const savedQuiz = localStorage.getItem("vocaberry-quiz-stats");
      const quizStats = savedQuiz ? JSON.parse(savedQuiz) : {};

      const savedFavs = localStorage.getItem("vocaberry-favourites");
      const favCount = savedFavs ? JSON.parse(savedFavs).length : 0;

      const totalCorrect = quizStats.totalCorrect || 0;
      const totalQuizzes = quizStats.totalQuizzes || 0;
      const streak = quizStats.bestStreak || 3;

      setUserStreak(streak);
      setUserWordsLearned(favCount * 3 + totalCorrect + 12);

      // Points formula: 50 XP per correct quiz answer + 20 XP per favorite + 30 XP per quiz
      const points = totalCorrect * 50 + favCount * 20 + totalQuizzes * 30 + 380;
      setUserScore(points);
    } catch (e) {
      console.warn("Could not calculate user leaderboard stats:", e);
    }
  }, []);

  // Construct combined list including Current User
  const combinedList = React.useMemo(() => {
    // Multipliers for timeframes
    const multiplier = timeframe === "week" ? 1 : timeframe === "month" ? 3.8 : 14.5;
    const dynamicUserPoints = Math.round(userScore * multiplier);

    const currentUserObj = {
      id: "current-user",
      isCurrentUser: true,
      name: "You (Vocuberry Learner)",
      avatar: null,
      badge: "Rising Learner",
      level: Math.max(5, Math.floor(userWordsLearned / 10)),
      wordsMastered: userWordsLearned,
      streak: userStreak,
      pointsValue: dynamicUserPoints,
      league: dynamicUserPoints > 4000 ? "Diamond" : dynamicUserPoints > 2000 ? "Platinum" : "Gold",
    };

    const regularUsers = BASE_LEADERBOARD.map((u) => ({
      ...u,
      isCurrentUser: false,
      pointsValue: u.points[timeframe],
    }));

    const all = [...regularUsers, currentUserObj].sort((a, b) => b.pointsValue - a.pointsValue);

    // Assign final dynamic ranks
    return all.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  }, [timeframe, userScore, userWordsLearned, userStreak]);

  // Current user's calculated rank
  const currentUserEntry = combinedList.find((u) => u.isCurrentUser) || {
    rank: 7,
    pointsValue: userScore,
    streak: userStreak,
  };

  // Filtered by search
  const filteredList = combinedList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Top 3 Podium
  const top1 = combinedList[0];
  const top2 = combinedList[1];
  const top3 = combinedList[2];

  return (
    <div className="min-h-screen bg-[#070713] text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
        {/* =========================================================
            HEADER & TIMEFRAME SELECTOR
        ========================================================= */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Trophy size={14} /> Global Vocabulary Arena
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Learner{" "}
            <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400 md:text-base">
            Compete with English learners worldwide. Master words, ace quizzes, and climb to the top of the Diamond League!
          </p>

          {/* Timeframe Tabs */}
          <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-[#0c0c18] p-1.5 shadow-xl">
            {[
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
              { id: "allTime", label: "All Time" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`relative rounded-xl px-5 py-2 text-xs font-bold transition md:text-sm ${
                  timeframe === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================
            PODIUM SECTION (Top 3)
        ========================================================= */}
        <div className="mt-14 grid grid-cols-3 items-end gap-2 md:gap-6">
          {/* Rank 2 (Silver) */}
          {top2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-3 flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-slate-300 bg-slate-800 p-0.5 shadow-xl md:h-20 md:w-20">
                  <img src={top2.avatar} alt={top2.name} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="absolute -bottom-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-300 text-xs font-black text-slate-900 shadow-md">
                  2
                </div>
              </div>

              <div className="w-full rounded-3xl border border-slate-400/20 bg-gradient-to-b from-slate-400/10 via-[#0c0c18] to-[#0c0c18] p-4 text-center md:p-6">
                <h3 className="truncate text-xs font-bold text-white md:text-base">
                  {top2.name}
                </h3>
                <span className="text-[10px] font-semibold text-slate-400 md:text-xs">
                  {top2.badge}
                </span>
                <div className="mt-3 text-sm font-black text-slate-200 md:text-xl">
                  {top2.pointsValue.toLocaleString()} <span className="text-xs text-purple-400">XP</span>
                </div>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Flame size={12} /> {top2.streak}d
                </div>
              </div>
            </motion.div>
          )}

          {/* Rank 1 (Gold - Center, elevated) */}
          {top1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center -translate-y-4"
            >
              <div className="relative mb-3 flex flex-col items-center">
                <Crown size={28} className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] -mb-1 animate-bounce" />
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-amber-400 bg-amber-950/40 p-0.5 shadow-2xl shadow-amber-500/30 md:h-24 md:w-24">
                  <img src={top1.avatar} alt={top1.name} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="absolute -bottom-3 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-xs font-black text-slate-950 shadow-lg">
                  1
                </div>
              </div>

              <div className="w-full rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-amber-500/15 via-[#0e0e1c] to-[#0c0c18] p-5 text-center shadow-2xl shadow-amber-500/15 md:p-7">
                <span className="inline-block rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  🏆 Champion
                </span>
                <h3 className="mt-1.5 truncate text-sm font-extrabold text-white md:text-lg">
                  {top1.name}
                </h3>
                <span className="text-[10px] font-semibold text-gray-400 md:text-xs">
                  {top1.badge}
                </span>
                <div className="mt-3 text-lg font-black text-amber-300 md:text-2xl">
                  {top1.pointsValue.toLocaleString()} <span className="text-xs text-purple-400">XP</span>
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-1 text-xs text-amber-400 font-bold">
                  <Flame size={14} /> {top1.streak} day streak
                </div>
              </div>
            </motion.div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-3 flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 border-amber-700 bg-amber-950 p-0.5 shadow-xl md:h-20 md:w-20">
                  <img src={top3.avatar} alt={top3.name} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="absolute -bottom-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-black text-white shadow-md">
                  3
                </div>
              </div>

              <div className="w-full rounded-3xl border border-amber-700/30 bg-gradient-to-b from-amber-700/10 via-[#0c0c18] to-[#0c0c18] p-4 text-center md:p-6">
                <h3 className="truncate text-xs font-bold text-white md:text-base">
                  {top3.name}
                </h3>
                <span className="text-[10px] font-semibold text-amber-500/80 md:text-xs">
                  {top3.badge}
                </span>
                <div className="mt-3 text-sm font-black text-amber-200 md:text-xl">
                  {top3.pointsValue.toLocaleString()} <span className="text-xs text-purple-400">XP</span>
                </div>
                <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-amber-400 font-semibold">
                  <Flame size={12} /> {top3.streak}d
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* =========================================================
            STICKY USER STANDING BANNER
        ========================================================= */}
        <div className="mt-10 rounded-3xl border-2 border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-[#101026] to-[#0c0c18] p-5 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 font-black text-lg text-white shadow-lg">
                #{currentUserEntry.rank}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base md:text-lg">
                    Your Standing
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Rank <span className="text-purple-300 font-semibold">#{currentUserEntry.rank}</span> • {currentUserEntry.streak} day streak • {userWordsLearned} words explored
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 sm:justify-end">
              <div className="text-right">
                <div className="text-xl font-black text-purple-300 md:text-2xl">
                  {currentUserEntry.pointsValue.toLocaleString()} <span className="text-xs text-gray-400">XP</span>
                </div>
                <span className="text-[11px] text-gray-400">Total Score</span>
              </div>

              <button
                onClick={() => navigate("/quiz")}
                className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/30 transition hover:brightness-110"
              >
                <Brain size={14} /> Earn XP
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            SEARCH & LEAGUE OVERVIEW
        ========================================================= */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search learner by name..."
              className="w-full rounded-2xl border border-white/10 bg-[#0c0c18] py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-gray-500 focus:border-purple-500/50"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield size={14} className="text-purple-400" />
            <span>Diamond League: Top 3 advance each week</span>
          </div>
        </div>

        {/* =========================================================
            FULL RANKINGS TABLE
        ========================================================= */}
        <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c18] shadow-2xl">
          <div className="divide-y divide-white/[0.06]">
            {filteredList.map((learner) => {
              const isUser = learner.isCurrentUser;

              return (
                <div
                  key={learner.id}
                  className={`flex items-center justify-between p-4 transition md:px-6 ${
                    isUser
                      ? "bg-purple-950/25 border-l-4 border-l-purple-500"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Left: Rank & User details */}
                  <div className="flex items-center gap-3 md:gap-5">
                    {/* Rank Badge */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs ${
                        learner.rank === 1
                          ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                          : learner.rank === 2
                          ? "bg-slate-300/20 text-slate-200 border border-slate-300/40"
                          : learner.rank === 3
                          ? "bg-amber-700/20 text-amber-400 border border-amber-700/40"
                          : "text-gray-400"
                      }`}
                    >
                      {learner.rank}
                    </span>

                    {/* Avatar */}
                    {learner.avatar ? (
                      <img
                        src={learner.avatar}
                        alt={learner.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-xs font-bold text-white">
                        YOU
                      </div>
                    )}

                    {/* Names */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${isUser ? "text-purple-300" : "text-white"}`}>
                          {learner.name}
                        </span>
                        {isUser && (
                          <span className="rounded-md bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-bold text-purple-300">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                        <span>Lvl {learner.level}</span>
                        <span>•</span>
                        <span>{learner.wordsMastered} words</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-400/80">
                          <Flame size={11} /> {learner.streak}d
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Points */}
                  <div className="text-right">
                    <div className="text-sm font-black text-white md:text-base">
                      {learner.pointsValue.toLocaleString()}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
                      XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM CALL TO ACTION
        ========================================================= */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/20 via-[#0c0c18] to-pink-900/20 p-8 text-center shadow-xl">
          <h2 className="text-xl font-bold text-white md:text-2xl">
            Want to climb to the #1 spot?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs text-gray-400 md:text-sm">
            Earn 50 XP for every correct answer in the Quiz and 20 XP for every new word you bookmark and master!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/quiz")}
              className="flex items-center gap-2 rounded-2xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-500"
            >
              <Brain size={16} /> Play Quiz & Earn Points
            </button>
            <button
              onClick={() => navigate("/categories")}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <BookOpen size={16} /> Explore Categories
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;
