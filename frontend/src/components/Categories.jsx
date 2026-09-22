import React from "react";
import {
  MessageCircle,
  ChefHat,
  Plane,
  Briefcase,
  Heart,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

// Images
import business from "../assets/images/business.png";
import daily from "../assets/images/daily.png";
import cooking from "../assets/images/cooking.png";
import travel from "../assets/images/travel.png";
import emotion from "../assets/images/emotion.png";
import twisters from "../assets/images/twisters.png";
import thinking from "../assets/images/thinking.png";
import social from "../assets/images/social.png";
import power from "../assets/images/power.png";
import beautiful from "../assets/images/beautiful.png";
import cool from "../assets/images/cool.png";
import personality from "../assets/images/personality.png";
import emoji from "../assets/images/emoji.png";
import real from "../assets/images/real.png";
import kitchen from "../assets/images/kitchen.png";
import spices from "../assets/images/spices.png";
import food from "../assets/images/food.png";
import restaurant from "../assets/images/restaurant.png";
import shopping from "../assets/images/shopping.png";
import clothes from "../assets/images/clothes.png";
import style from "../assets/images/style.png";
import cleaning from "../assets/images/cleaning.png";
import movement from "../assets/images/movement.png";
import seeing from "../assets/images/seeing.png";
import sound from "../assets/images/sound.png";
import touch from "../assets/images/touch.png";
import speack from "../assets/images/speack.png";
import reaction from "../assets/images/reaction.png";
import love from "../assets/images/love.png";
import study from "../assets/images/study.png";

// ===============================
// CATEGORY IMAGES
// ===============================

const imageMap = {
  "daily-use": daily,
  "say-it-better": daily,

  "tongue-twister": twisters,
  "think-express": thinking,
  "social-situations": social,

  business: business,
  "power-words": power,
  "beautiful-words": beautiful,
  "cool-slang": cool,
  "people-personality": personality,

  emotions: emotion,
  travel: travel,

  "emoji-words": emoji,
  idioms: real,

  "cooking-actions": cooking,

  // MongoDB slug
  "cooking-tools": kitchen,

  // In case old slug exists
  "kitchen-tools": kitchen,

  "spices-seasonings": spices,
  "food-ingredients": food,
  "restaurant-talk": restaurant,

  "shopping-talk": shopping,
  "clothing-actions": clothes,
  "style-appearance": style,
  "beauty-personal-care": beautiful,

  "cleaning-actions": cleaning,
  "movement-words": movement,
  "seeing-looking": seeing,
  "sounds-listening": sound,
  "touch-handling": touch,
  "speaking-actions": speack,
  "reaction-words": reaction,
  "relationship-actions": love,
  "creative-actions": style,
  "study-actions": study,
};

// ===============================
// CATEGORY ICONS
// ===============================

const iconMap = {
  "daily-use": MessageCircle,
  "say-it-better": MessageCircle,

  "tongue-twister": Sparkles,
  "think-express": Sparkles,
  "social-situations": MessageCircle,

  business: Briefcase,
  "power-words": Sparkles,
  "beautiful-words": Heart,
  "cool-slang": MessageCircle,
  "people-personality": Heart,

  emotions: Heart,
  travel: Plane,

  "emoji-words": Sparkles,
  idioms: MessageCircle,

  "cooking-actions": ChefHat,
  "cooking-tools": ChefHat,
  "kitchen-tools": ChefHat,

  "spices-seasonings": ChefHat,
  "food-ingredients": ChefHat,
  "restaurant-talk": ChefHat,

  "shopping-talk": Briefcase,
  "clothing-actions": Sparkles,
  "style-appearance": Sparkles,
  "beauty-personal-care": Heart,

  "cleaning-actions": Sparkles,
  "movement-words": Sparkles,
  "seeing-looking": Sparkles,
  "sounds-listening": MessageCircle,
  "touch-handling": Sparkles,
  "speaking-actions": MessageCircle,
  "reaction-words": Heart,
  "relationship-actions": Heart,
  "creative-actions": Sparkles,
  "study-actions": Sparkles,
};

// ===============================
// COMPONENT
// ===============================

function Categories() {
  const [categories, setCategories] = React.useState([]);

  // ===============================
  // GET CATEGORIES FROM MONGODB
  // ===============================

  React.useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories from MongoDB:", data);

        setCategories(data.categories || []);
      })
      .catch((error) => {
        console.error("Category fetch error:", error);
      });
  }, []);

  return (
    <section className="relative bg-[#070713] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* ===============================
            SECTION HEADER
        =============================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-end justify-between"
        >

          <div>

            <p className="mb-2 text-sm font-medium tracking-wider text-violet-400">
              ✦ EXPLORE
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Top Categories
            </h2>

          </div>

          <button
            className="
              hidden
              text-sm
              text-violet-400
              transition
              hover:text-violet-300
              sm:block
            "
          >
            View all categories →
          </button>

        </motion.div>

        {/* ===============================
            CATEGORY CARDS
        =============================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

          {categories.map((category) => {

            const Icon =
              iconMap[category.slug] || Sparkles;

            return (
              <CategoryCard
                key={category._id}
                category={{
                  ...category,

                  icon: Icon,

                  color: "text-violet-400",

                  image:
                    imageMap[category.slug] || daily,

                  words: "0+",
                }}
              />
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Categories;