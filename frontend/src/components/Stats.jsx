import { BookOpen, Grid3X3, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "1500+",
    label: "Words",
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    value: "30+",
    label: "Categories",
    icon: Grid3X3,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
  },
  {
    value: "10K+",
    label: "Learners",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    value: "95%",
    label: "Retention Rate",
    icon: TrendingUp,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

function Stats() {
  return (
    <section className="relative z-20 px-6 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl md:grid-cols-4">

        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className={`group flex items-center gap-4 px-6 py-6 ${
                index !== 0
                  ? "border-t border-white/10 md:border-l md:border-t-0"
                  : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color} transition duration-300 group-hover:scale-110`}
              >
                <Icon size={23} />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;