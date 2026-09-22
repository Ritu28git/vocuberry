import {
  BookOpen,
  CheckCircle2,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

function PhonePreview() {
  return (
    <section className="relative overflow-hidden bg-[#070713] px-6 py-24 text-white lg:px-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[160px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Learn Anytime, Anywhere
          </p>

          <h2 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
            Your Vocabulary
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Companion
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-400 sm:text-lg">
            Learn new words, practice every day and track your progress
            with a beautiful vocabulary experience designed for you.
          </p>

          {/* Small Features */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <BookOpen size={21} />
              </div>

              <div>
                <p className="font-medium text-white">
                  Learn New Words
                </p>
                <p className="text-sm text-gray-500">
                  Discover useful words every day.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400">
                <Target size={21} />
              </div>

              <div>
                <p className="font-medium text-white">
                  Practice Smart
                </p>
                <p className="text-sm text-gray-500">
                  Improve through interactive quizzes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <TrendingUp size={21} />
              </div>

              <div>
                <p className="font-medium text-white">
                  Track Progress
                </p>
                <p className="text-sm text-gray-500">
                  See how your vocabulary grows.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT PHONE MOCKUP */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative flex min-h-[600px] items-center justify-center"
        >

          {/* Glow */}
          <div className="absolute h-[420px] w-[300px] rounded-full bg-violet-600/20 blur-[100px]" />

          {/* PHONE */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 w-[290px] rounded-[42px] border-[7px] border-[#252039] bg-[#0d0b1c] p-3 shadow-[0_0_80px_rgba(139,92,246,0.35)]"
          >

            {/* Speaker */}
            <div className="absolute left-1/2 top-2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-black" />

            {/* Screen */}
            <div className="overflow-hidden rounded-[32px] bg-gradient-to-b from-[#18112d] to-[#090817]">

              {/* App Header */}
              <div className="flex items-center justify-between px-5 pb-4 pt-8">
                <div>
                  <p className="text-xs text-gray-500">
                    Good Morning 👋
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    Let's Learn
                  </h3>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
                  <Flame size={18} />
                </div>
              </div>

              {/* Progress */}
              <div className="mx-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">

                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-400">
                    Today's Progress
                  </p>

                  <p className="text-xs font-semibold text-violet-400">
                    75%
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-gray-500">
                  <span>15 Words</span>
                  <span>20 Goal</span>
                </div>

              </div>

              {/* Continue Learning */}
              <div className="px-4 pt-5">

                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    Continue Learning
                  </p>

                  <span className="text-xs text-violet-400">
                    View all
                  </span>
                </div>

                <div className="rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/5 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                      <BookOpen size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Daily Use Words
                      </p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        15 / 20 words completed
                      </p>
                    </div>

                  </div>

                  <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2 text-xs font-semibold">
                    Continue Learning
                  </button>

                </div>

              </div>

              {/* Today's Word */}
              <div className="px-4 pb-5 pt-5">

                <p className="mb-3 text-sm font-semibold">
                  Word of the Day
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xl font-bold text-violet-300">
                        Eloquence
                      </p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        /ˈɛləkwəns/
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                      <CheckCircle2 size={16} />
                    </div>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-gray-400">
                    Fluent or persuasive speaking or writing.
                  </p>

                </div>

              </div>

              {/* Bottom Navigation */}
              <div className="flex items-center justify-around border-t border-white/10 px-3 py-4">

                <div className="text-center text-violet-400">
                  <BookOpen size={17} className="mx-auto" />
                  <p className="mt-1 text-[9px]">
                    Learn
                  </p>
                </div>

                <div className="text-center text-gray-600">
                  <Target size={17} className="mx-auto" />
                  <p className="mt-1 text-[9px]">
                    Practice
                  </p>
                </div>

                <div className="text-center text-gray-600">
                  <TrendingUp size={17} className="mx-auto" />
                  <p className="mt-1 text-[9px]">
                    Progress
                  </p>
                </div>

              </div>

            </div>
          </motion.div>

          {/* FLOATING CARD — LEFT */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute left-[0%] top-[25%] z-20 hidden rounded-2xl border border-white/10 bg-[#111020]/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                <BookOpen size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold">
                  15 Words
                </p>
                <p className="text-[10px] text-gray-500">
                  Learned today
                </p>
              </div>

            </div>
          </motion.div>

          {/* FLOATING CARD — RIGHT */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
            }}
            className="absolute bottom-[23%] right-[0%] z-20 hidden rounded-2xl border border-white/10 bg-[#111020]/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:block"
          >
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300">
                <Flame size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold">
                  7 Day Streak
                </p>
                <p className="text-[10px] text-gray-500">
                  Keep going!
                </p>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default PhonePreview;