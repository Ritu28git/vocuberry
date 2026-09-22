import {
  Sparkles,
  Brain,
  TrendingUp,
  BookOpen,
  Bell,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "Personalized Learning",
    description:
      "Content tailored to your level and learning goals.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Brain,
    title: "Smart Quizzes",
    description:
      "Adaptive quizzes that challenge you at the right level.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Visualize your growth and stay motivated.",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: BookOpen,
    title: "Real-world Examples",
    description:
      "Learn how words are actually used in real life.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Bell,
    title: "Daily Reminders",
    description:
      "Build consistency with daily vocabulary goals.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Trophy,
    title: "Leaderboard & Rewards",
    description:
      "Compete with others and earn exclusive badges.",
    color: "from-pink-500 to-violet-500",
  },
];

function FeatureCards() {
  return (
    <section className="relative overflow-hidden bg-[#070713] px-6 py-24 text-white lg:px-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Why Choose Vocaberry?
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Smart Features.
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              Smarter You.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Everything you need to build a stronger vocabulary,
            practice consistently and make real progress.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.06]"
              >

                {/* Card Glow */}
                <div
                  className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${feature.color} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-30`}
                />

                {/* Icon */}
                <div
                  className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                >
                  <Icon size={25} className="text-white" />
                </div>

                {/* Text */}
                <h3 className="relative text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-gray-400">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <div className="mt-7 h-px w-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default FeatureCards;