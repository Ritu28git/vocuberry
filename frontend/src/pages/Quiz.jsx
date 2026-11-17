import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  ArrowRight,
  Sparkles,
  Brain,
  Flame,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../config/api";

// Helper to shuffle an array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function Quiz() {
  const navigate = useNavigate();

  // Data states
  const [allWords, setAllWords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quiz config
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quizMode, setQuizMode] = useState("mixed"); // 'meaning', 'hindi', 'mixed'
  const [questionCount, setQuestionCount] = useState(10);

  // Gameplay state: 'setup', 'playing', 'result'
  const [gameState, setGameState] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);

  // Fetch words and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch words from backend
        const wordsRes = await fetch(`${API_BASE_URL}/api/words`);
        if (!wordsRes.ok) throw new Error("Failed to fetch words from backend");
        const wordsData = await wordsRes.json();
        const validWords = (wordsData.words || []).filter(
          (w) => w.word && (w.meaning || w.hindiMeaning)
        );
        setAllWords(validWords);

        // Fetch categories from backend
        try {
          const catRes = await fetch(`${API_BASE_URL}/api/categories`);
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategories(catData.categories || []);
          }
        } catch (catErr) {
          console.warn("Could not fetch categories:", catErr);
        }
      } catch (err) {
        console.error("Quiz init error:", err);
        setError("Unable to connect to the backend server. Please make sure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pronunciation
  const speakWord = (text) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Generate Questions
  const startQuiz = () => {
    // Filter candidate pool by category
    let pool = allWords;
    if (selectedCategory !== "all") {
      pool = allWords.filter(
        (w) =>
          String(w.category || "").toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (pool.length < 4) {
      alert("Not enough words in this category to create a 4-option quiz. Please select another category or 'All Categories'.");
      return;
    }

    const shuffledPool = shuffleArray(pool);
    const selectedPool = shuffledPool.slice(0, Math.min(questionCount, shuffledPool.length));

    const generatedQuestions = selectedPool.map((targetWord) => {
      // Determine question type: 'word-to-meaning', 'word-to-hindi', or 'meaning-to-word'
      let type = "word-to-meaning";
      if (quizMode === "hindi") {
        type = "word-to-hindi";
      } else if (quizMode === "meaning") {
        type = "word-to-meaning";
      } else {
        const types = ["word-to-meaning", "word-to-hindi", "meaning-to-word"];
        type = types[Math.floor(Math.random() * types.length)];
      }

      // Pick 3 distractors from the rest of the pool
      const otherWords = pool.filter((w) => w._id !== targetWord._id);
      const distractors = shuffleArray(otherWords).slice(0, 3);

      let questionText = "";
      let correctAnswer = "";
      let options = [];

      if (type === "word-to-meaning") {
        questionText = `What is the meaning of "${targetWord.word}"?`;
        correctAnswer = targetWord.meaning || targetWord.hindiMeaning;
        const wrongAnswers = distractors.map(
          (d) => d.meaning || d.hindiMeaning || "Alternative meaning"
        );
        options = shuffleArray([correctAnswer, ...wrongAnswers]);
      } else if (type === "word-to-hindi") {
        questionText = `What is the Hindi meaning of "${targetWord.word}"?`;
        correctAnswer = targetWord.hindiMeaning || targetWord.meaning;
        const wrongAnswers = distractors.map(
          (d) => d.hindiMeaning || d.meaning || "वैकल्पिक अर्थ"
        );
        options = shuffleArray([correctAnswer, ...wrongAnswers]);
      } else {
        // meaning-to-word
        questionText = `Which word means: "${targetWord.meaning || targetWord.hindiMeaning}"?`;
        correctAnswer = targetWord.word;
        const wrongAnswers = distractors.map((d) => d.word);
        options = shuffleArray([correctAnswer, ...wrongAnswers]);
      }

      return {
        word: targetWord.word,
        meaning: targetWord.meaning,
        hindiMeaning: targetWord.hindiMeaning,
        sentence: targetWord.sentence,
        category: targetWord.category,
        type,
        questionText,
        correctAnswer,
        options,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setAnswersHistory([]);
    setGameState("playing");
  };

  // Answer handler
  const handleSelectOption = (option) => {
    if (isAnswered) return;

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    setAnswersHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        selectedAnswer: option,
        isCorrect,
      },
    ]);
  };

  // Next question or finish
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Save stats to localStorage for Progress page
      try {
        const prevStats = JSON.parse(
          localStorage.getItem("vocaberry-quiz-stats") || "{}"
        );
        const updatedStats = {
          totalQuizzes: (prevStats.totalQuizzes || 0) + 1,
          totalQuestions: (prevStats.totalQuestions || 0) + questions.length,
          totalCorrect: (prevStats.totalCorrect || 0) + score,
          bestStreak: Math.max(prevStats.bestStreak || 0, maxStreak),
          lastQuizDate: new Date().toISOString(),
        };
        localStorage.setItem(
          "vocaberry-quiz-stats",
          JSON.stringify(updatedStats)
        );
      } catch (e) {
        console.warn("Could not save quiz stats:", e);
      }
      setGameState("result");
    }
  };

  // Distinct categories available in word pool
  const availableCategories = useMemo(() => {
    const set = new Set();
    allWords.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set).sort();
  }, [allWords]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070713] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
          <p className="mt-4 text-gray-400">Loading quiz words from database...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#070713] text-white">
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
          <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
            <h2 className="text-xl font-bold text-red-400">Failed to load quiz</h2>
            <p className="mt-2 text-sm text-gray-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-2.5 font-semibold text-white hover:bg-purple-500"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-[#070713] text-white selection:bg-purple-500/30">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        {/* =========================================================
            STATE 1: SETUP SCREEN
        ========================================================= */}
        {gameState === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-6 shadow-2xl md:p-10"
          >
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
                <Brain size={15} /> Vocuberry Quiz Challenge
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
                Test Your <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Vocabulary</span>
              </h1>
              <p className="mt-3 text-sm text-gray-400 md:text-base">
                Challenge yourself with dynamic questions powered by your 9,900+ real vocabulary database.
              </p>
            </div>

            {/* Config Options */}
            <div className="mt-10 space-y-7">
              {/* Category Picker */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Select Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#121224] px-4 py-3.5 text-sm text-white outline-none transition focus:border-purple-500"
                >
                  <option value="all">🌟 All Categories (Mixed from 9,900+ words)</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quiz Mode */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Quiz Mode
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { id: "mixed", label: "Mixed Challenge", desc: "Meanings, Hindi & Words" },
                    { id: "meaning", label: "English Meanings", desc: "Find the definition" },
                    { id: "hindi", label: "Hindi Translation", desc: "Find the Hindi meaning" },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setQuizMode(mode.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        quizMode === mode.id
                          ? "border-purple-500 bg-purple-500/15 shadow-lg shadow-purple-500/10"
                          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="font-semibold text-white">{mode.label}</div>
                      <div className="mt-1 text-xs text-gray-400">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Number of Questions
                </label>
                <div className="flex gap-3">
                  {[5, 10, 15, 20].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={`flex-1 rounded-2xl border py-3 text-sm font-bold transition ${
                        questionCount === count
                          ? "border-purple-500 bg-purple-500/20 text-purple-300"
                          : "border-white/10 bg-white/[0.02] text-gray-400 hover:text-white"
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="mt-10">
              <button
                onClick={startQuiz}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 py-4 text-base font-bold text-white shadow-xl shadow-purple-600/25 transition hover:scale-[1.01] hover:brightness-110"
              >
                <Sparkles size={20} /> Start Quiz Now
              </button>
            </div>
          </motion.div>
        )}

        {/* =========================================================
            STATE 2: ACTIVE QUIZ
        ========================================================= */}
        {gameState === "playing" && currentQ && (
          <div>
            {/* Top Bar */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setGameState("setup")}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={14} /> Quit
              </button>

              {/* Streak */}
              {streak > 1 && (
                <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-400">
                  <Flame size={15} /> {streak} Streak!
                </div>
              )}

              {/* Score counter */}
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3.5 py-1.5 text-xs font-bold text-purple-300">
                Score: {score} / {questions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-xs font-medium text-gray-400">
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-[#0c0c18] p-6 shadow-2xl md:p-8"
            >
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                  {currentQ.category || "Vocabulary"}
                </span>

                {currentQ.word && (
                  <button
                    onClick={() => speakWord(currentQ.word)}
                    title="Pronounce Word"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 transition hover:bg-purple-500/20"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>

              {/* Question Text */}
              <h2 className="mt-5 text-xl font-bold leading-relaxed text-white md:text-2xl">
                {currentQ.questionText}
              </h2>

              {/* Options */}
              <div className="mt-7 space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQ.correctAnswer;

                  let optionStyle =
                    "border-white/10 bg-white/[0.03] text-gray-200 hover:border-purple-500/50 hover:bg-white/[0.06]";

                  if (isAnswered) {
                    if (isCorrect) {
                      optionStyle =
                        "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        "border-red-500/60 bg-red-500/15 text-red-300";
                    } else {
                      optionStyle = "border-white/5 bg-white/[0.01] text-gray-500 opacity-60";
                    }
                  }

                  const letter = String.fromCharCode(65 + idx);

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(option)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition-all md:text-base ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-gray-400">
                          {letter}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswered && (
                        <div>
                          {isCorrect && (
                            <CheckCircle2 size={20} className="text-emerald-400" />
                          )}
                          {isSelected && !isCorrect && (
                            <XCircle size={20} className="text-red-400" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Word Details / Feedback after answer */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 rounded-2xl border border-white/10 bg-[#121224] p-4 text-sm"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-bold text-purple-400">
                        {currentQ.word}
                      </span>
                      {currentQ.hindiMeaning && (
                        <span className="text-xs text-pink-300">
                          {currentQ.hindiMeaning}
                        </span>
                      )}
                    </div>
                    {currentQ.sentence && (
                      <p className="mt-2 text-xs italic text-gray-400">
                        "{currentQ.sentence}"
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {isAnswered && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-500"
                  >
                    {currentIndex + 1 < questions.length ? (
                      <>
                        Next Question <ArrowRight size={16} />
                      </>
                    ) : (
                      <>
                        View Results <Trophy size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* =========================================================
            STATE 3: RESULTS SCREEN
        ========================================================= */}
        {gameState === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-white/10 bg-[#0c0c18] p-6 shadow-2xl md:p-10"
          >
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-xl shadow-purple-500/20">
                <Trophy size={40} />
              </div>

              <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
                Quiz Completed!
              </h1>

              {/* Performance message */}
              <p className="mt-2 text-base text-gray-400">
                {score === questions.length
                  ? "🎉 Flawless! You're a true Vocabulary Master!"
                  : score >= questions.length * 0.7
                  ? "🌟 Excellent score! Your vocabulary is strong!"
                  : score >= questions.length * 0.4
                  ? "👍 Good attempt! Keep practicing every day."
                  : "💪 Keep learning! Every mistake is a step forward."}
              </p>
            </div>

            {/* Score Cards */}
            <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <span className="text-xs uppercase tracking-wider text-gray-400">Score</span>
                <div className="mt-1 text-2xl font-black text-purple-400 md:text-3xl">
                  {score} / {questions.length}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <span className="text-xs uppercase tracking-wider text-gray-400">Accuracy</span>
                <div className="mt-1 text-2xl font-black text-emerald-400 md:text-3xl">
                  {Math.round((score / questions.length) * 100)}%
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-center">
                <span className="text-xs uppercase tracking-wider text-gray-400">Best Streak</span>
                <div className="mt-1 text-2xl font-black text-amber-400 md:text-3xl">
                  🔥 {maxStreak}
                </div>
              </div>
            </div>

            {/* Review of answers */}
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold text-white">Review Answers</h3>
              <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
                {answersHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-4 text-sm ${
                      item.isCorrect
                        ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                        : "border-red-500/20 bg-red-500/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-white">
                          {idx + 1}. {item.question.questionText}
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-2 text-xs">
                          <span className="text-gray-400">Your answer:</span>
                          <span
                            className={
                              item.isCorrect ? "font-bold text-emerald-400" : "font-bold text-red-400"
                            }
                          >
                            {item.selectedAnswer}
                          </span>
                          {!item.isCorrect && (
                            <>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-400">Correct:</span>
                              <span className="font-bold text-emerald-400">
                                {item.question.correctAnswer}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {item.isCorrect ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <XCircle size={18} className="text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setGameState("setup")}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3.5 font-bold text-white hover:bg-white/10"
              >
                <RotateCcw size={18} /> Play Again
              </button>
              <button
                onClick={() => navigate("/categories")}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-purple-600 py-3.5 font-bold text-white hover:bg-purple-500"
              >
                <BookOpen size={18} /> Explore Words
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Quiz;
