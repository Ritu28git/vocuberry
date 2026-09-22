import {
  ArrowRight,
  Play,
  Sparkles,
  BookOpen,
  Trophy,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import vLogo from "../assets/images/Vocuberry.png";

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#05050d]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute right-[12%] top-[18%] h-[520px] w-[520px] rounded-full bg-violet-700/15 blur-[160px]" />

        <div className="absolute bottom-[-100px] left-[5%] h-[400px] w-[500px] rounded-full bg-fuchsia-700/10 blur-[150px]" />

        <div className="absolute left-[45%] top-[12%] h-1 w-1 rounded-full bg-purple-300 shadow-[0_0_12px_#a855f7]" />

        <div className="absolute right-[20%] top-[25%] h-1 w-1 rounded-full bg-fuchsia-300 shadow-[0_0_12px_#d946ef]" />

        <div className="absolute left-[55%] bottom-[18%] h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_12px_#8b5cf6]" />

      </div>


      {/* Main */}
    <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-start gap-8 px-6 pt-6 pb-10 lg:grid-cols-2 lg:px-10">


        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/5 px-4 py-2 text-xs text-violet-300 backdrop-blur-xl">

            <Sparkles size={13} />

            Learn
            <span className="text-white/30">•</span>
            Practice
            <span className="text-white/30">•</span>
            Master

          </div>


          {/* Heading */}
          <h1 className="max-w-[650px] text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[64px]">

            Words Build You.

            <span className="mt-2 block">

              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-300 bg-clip-text text-transparent">
                Vocuberry
              </span>{" "}

              Makes It Beautiful.

            </span>

          </h1>


          {/* Description */}
          <p className="mt-7 max-w-[540px] text-base leading-7 text-gray-400 sm:text-lg">
            A smarter way to build your vocabulary through meaningful
            practice, real-world examples and daily learning.
          </p>


          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-3.5 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(168,85,247,0.4)]">

              <Sparkles size={17} />

              Start Learning

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </button>


            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 font-semibold text-gray-200 backdrop-blur-xl transition hover:border-violet-400/30 hover:bg-white/[0.06]">

              <Play size={16} />

              See How It Works

            </button>

          </div>


          {/* Users */}
          <div className="mt-8 flex items-center gap-4">

            <div className="flex -space-x-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#05050d] bg-purple-500 text-xs font-bold">
                A
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#05050d] bg-cyan-500 text-xs font-bold text-black">
                R
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#05050d] bg-fuchsia-500 text-xs font-bold">
                S
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#05050d] bg-orange-400 text-xs font-bold">
                +
              </div>

            </div>

            <p className="text-sm text-gray-400">
              Trusted by{" "}
              <span className="font-semibold text-white">
                10,000+
              </span>{" "}
              learners worldwide
            </p>

          </div>

        </motion.div>


        {/* RIGHT */}
        <div className="relative flex min-h-[560px] items-center justify-center">


          {/* Glow */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-[420px] w-[420px] rounded-full bg-violet-600/25 blur-[100px]"
          />


          {/* Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[440px] w-[440px] rounded-full border border-violet-400/15"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute h-[510px] w-[510px] rounded-full border border-purple-400/10"
          />


          {/* V */}
          <motion.div
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.025, 1],
              rotateZ: [-1, 1, -1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
       className="relative z-10 -translate-y-16"
          >

            <img
              src={vLogo}
              alt="Vocuberry"
              className="w-[330px] object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.65)] sm:w-[410px] lg:w-[500px]"
            />

          </motion.div>


          {/* PRACTICE */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[2%] top-[17%] z-20"
          >

            <div className="flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-[#0d0b19]/70 px-4 py-3 backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <BookOpen size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-violet-300">
                  PRACTICE
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Build the habit
                </p>
              </div>

            </div>

          </motion.div>


          {/* GROW */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[0%] top-[22%] z-20"
          >

            <div className="flex items-center gap-3 rounded-2xl border border-fuchsia-400/15 bg-[#0d0b19]/70 px-4 py-3 backdrop-blur-xl">

              <div>
                <p className="text-right text-xs font-semibold tracking-widest text-fuchsia-300">
                  GROW
                </p>

                <p className="mt-1 text-right text-[11px] text-gray-500">
                  Become better
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
                <TrendingIcon />
              </div>

            </div>

          </motion.div>


          {/* ACHIEVE */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[19%] left-[3%] z-20"
          >

            <div className="flex items-center gap-3 rounded-2xl border border-purple-400/15 bg-[#0d0b19]/70 px-4 py-3 backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                <Trophy size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-widest text-purple-300">
                  ACHIEVE
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  Celebrate progress
                </p>
              </div>

            </div>

          </motion.div>


          {/* FOCUS */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[20%] right-[2%] z-20"
          >

            <div className="flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-[#0d0b19]/70 px-4 py-3 backdrop-blur-xl">

              <div>
                <p className="text-right text-xs font-semibold tracking-widest text-violet-300">
                  FOCUS
                </p>

                <p className="mt-1 text-right text-[11px] text-gray-500">
                  Learn every day
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                <Target size={18} />
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


/* Grow icon */
function TrendingIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  );
}

export default Hero;