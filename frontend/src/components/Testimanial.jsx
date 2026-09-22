import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Student",
    initials: "SJ",
    color: "from-violet-500 to-fuchsia-500",
    text: "Vocaberry has completely changed the way I learn new words. The daily goals keep me consistent and motivated.",
  },
  {
    name: "Michael Chen",
    role: "Professional",
    initials: "MC",
    color: "from-cyan-500 to-blue-500",
    text: "The real-world examples and beautiful interface make learning vocabulary actually enjoyable.",
  },
  {
    name: "Priya Sharma",
    role: "Teacher",
    initials: "PS",
    color: "from-pink-500 to-purple-500",
    text: "I've improved my English vocabulary more in 2 months than in years of traditional learning.",
  },
];

function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#070713] px-6 py-24 text-white lg:px-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
            Loved by Learners
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Real People.
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Real Progress.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            See how learners are building better vocabulary and
            becoming more confident every day.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
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
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.055]"
            >

              {/* Quote Icon */}
              <div className="absolute right-6 top-6 text-violet-500/20">
                <Quote size={42} />
              </div>

              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="min-h-[120px] text-sm leading-7 text-gray-300">
                “{item.text}”
              </p>

              {/* User */}
              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold shadow-lg`}
                >
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {item.role}
                  </p>
                </div>

              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 group-hover:w-2/3" />

            </motion.div>
          ))}

        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
        >

          <div>
            <p className="text-2xl font-bold text-white">
              10K+
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Happy Learners
            </p>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div>
            <p className="text-2xl font-bold text-white">
              4.9/5
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Average Rating
            </p>
          </div>

          <div className="h-10 w-px bg-white/10" />

          <div>
            <p className="text-2xl font-bold text-white">
              95%
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Retention Rate
            </p>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Testimonials;