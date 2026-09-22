import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

function CategoryCard({ category }) {
  if (!category) return null;

  const Icon = category.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative h-[335px] overflow-hidden rounded-2xl border border-white/10 bg-[#11111c] cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070713] via-[#070713]/60 to-transparent" />

      {/* Glow */}
      <div className="absolute inset-0 bg-violet-600/5 opacity-0 transition group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">

        {/* Icon */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
            {Icon && (
              <Icon
                size={23}
                className={category.color || "text-violet-400"}
              />
            )}
          </div>
        </div>

        {/* Bottom Content */}
        <div>
          <h3 className="text-xl font-bold text-white">
            {category.name}
          </h3>

          <p className="mt-2 text-sm leading-5 text-gray-300">
            {category.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-medium text-white">
              {category.words || "0+"} Words
            </span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition group-hover:bg-violet-600">
              <ArrowUpRight
                size={18}
                className="text-white transition group-hover:rotate-45"
              />
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default CategoryCard;