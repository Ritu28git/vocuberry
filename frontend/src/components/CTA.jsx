import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#070713] px-6 py-28 text-white lg:px-10">

      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute left-[-100px] bottom-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-5xl">

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.035] to-fuchsia-500/[0.08] px-6 py-16 text-center backdrop-blur-xl sm:px-12"
        >

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full border border-violet-400/10" />

          <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full border border-fuchsia-400/10" />

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />


          {/* Badge */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300"
          >
            <Sparkles size={14} />

            Your vocabulary journey starts here
          </motion.div>


          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">

            Ready to Build a

            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Better Vocabulary?
            </span>

          </h2>


          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Start learning smarter, discover powerful new words and
            become more confident with every conversation.
          </p>


          {/* Button */}
          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,0.3)] transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]"
          >

            <Sparkles size={18} />

            Start Learning Free

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </motion.button>


          {/* Small Text */}
          <p className="mt-5 text-xs text-gray-600">
            No credit card required • Start for free • Learn at your pace
          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default CTA;