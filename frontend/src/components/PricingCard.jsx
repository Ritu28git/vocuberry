import { Check, Crown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    subtitle: "Start your vocabulary journey",
    price: "$0",
    period: "/month",
    features: [
      "Daily 10 new words",
      "Basic quizzes",
      "Progress tracking",
      "Community access",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    subtitle: "Accelerate your learning",
    price: "$4.99",
    period: "/month",
    features: [
      "Daily 50 new words",
      "Advanced quizzes",
      "Detailed analytics",
      "Offline access",
      "Priority support",
    ],
    button: "Start Premium",
    popular: true,
  },
  {
    name: "Pro",
    subtitle: "For serious learners",
    price: "$9.99",
    period: "/month",
    features: [
      "Unlimited words",
      "AI premium features",
      "Personalized learning",
      "1-on-1 support",
      "All future features",
    ],
    button: "Start Pro",
    popular: false,
  },
];

function PricingCard() {
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
            Simple Pricing
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Choose Your
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              Plan
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Start for free and upgrade whenever you're ready
            to take your vocabulary to the next level.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3">

          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
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
              className={`relative rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 ${
                plan.popular
                  ? "border-violet-500/60 bg-gradient-to-b from-violet-500/15 to-white/[0.035] shadow-[0_0_50px_rgba(139,92,246,0.18)]"
                  : "border-white/10 bg-white/[0.035] hover:border-violet-400/30"
              }`}
            >

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-xs font-semibold shadow-lg shadow-violet-600/30">
                  <Crown size={13} />
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-2xl font-bold">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {plan.subtitle}
                  </p>
                </div>

                {plan.popular && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Sparkles size={19} />
                  </div>
                )}

              </div>

              {/* Price */}
              <div className="mt-8 flex items-end gap-1">

                <span
                  className={`text-5xl font-bold ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {plan.price}
                </span>

                <span className="mb-2 text-sm text-gray-500">
                  {plan.period}
                </span>

              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-white/10" />

              {/* Features */}
              <div className="space-y-4">

                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                      <Check size={13} />
                    </div>

                    <span className="text-sm text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              {/* Button */}
              <button
                className={`mt-9 w-full rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20 hover:-translate-y-1 hover:shadow-violet-500/40"
                    : "border border-white/10 bg-white/[0.04] text-gray-200 hover:border-violet-400/30 hover:bg-white/[0.08]"
                }`}
              >
                {plan.button}
              </button>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default PricingCard;