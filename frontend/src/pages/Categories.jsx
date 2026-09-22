import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Daily Use",
    slug: "daily-use",
    description: "Everyday words you can use in real life",
    image: "/src/assets/images/daily.png",
  },
  {
    name: "Say It Better",
    slug: "say-it-better",
    description: "Better and more natural ways to express yourself",
    image: "/src/assets/images/saybetter.png",
  },
  {
    name: "Tongue Twister",
    slug: "tongue-twister",
    description: "Fun words and phrases to improve pronunciation",
    image: "/src/assets/images/twisters.png",
  },
  {
    name: "Think & Express",
    slug: "think-express",
    description: "Words that help you explain your thoughts",
    image: "/src/assets/images/thinking.png",
  },
  {
    name: "Social Situations",
    slug: "social-situations",
    description: "Useful vocabulary for everyday social situations",
    image: "/src/assets/images/social.png",
  },
  {
    name: "Power Words",
    slug: "power-words",
    description: "Strong and impressive words to express yourself",
    image: "/src/assets/images/power.png",
  },
  {
    name: "Beautiful Words",
    slug: "beautiful-words",
    description: "Elegant and expressive English words",
    image: "/src/assets/images/beautiful.png",
  },
  {
    name: "Cool Slang",
    slug: "cool-slang",
    description: "Modern and casual words people actually use",
    image: "/src/assets/images/cool.png",
  },
  {
    name: "People & Personality",
    slug: "people-personality",
    description: "Words to describe people and personality",
    image: "/src/assets/images/personality.png",
  },
  {
    name: "Emotions",
    slug: "emotions",
    description: "Powerful words for different emotions",
    image: "/src/assets/images/emotion.png",
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Useful vocabulary for travelling",
    image: "/src/assets/images/travel.png",
  },
  {
    name: "Emoji Words",
    slug: "emoji-words",
    description: "Learn the words behind everyday emojis",
    image: "/src/assets/images/emoji.png",
  },
  {
    name: "Idioms",
    slug: "idioms",
    description: "Common expressions with interesting meanings",
    image: "/src/assets/images/real.png",
  },
  {
    name: "Cooking Actions",
    slug: "cooking-actions",
    description: "Useful verbs and actions used while cooking",
    image: "/src/assets/images/cooking.png",
  },
  {
    name: "Kitchen Tools",
    slug: "kitchen-tools",
    description: "Utensils and equipment used in the kitchen",
    image: "/src/assets/images/kitchen.png",
  },
  {
    name: "Spices & Seasonings",
    slug: "spices-seasonings",
    description: "Words for spices, herbs and seasonings",
    image: "/src/assets/images/spices.png",
  },
  {
    name: "Food & Ingredients",
    slug: "food-ingredients",
    description: "Food, dishes, ingredients and flavors",
    image: "/src/assets/images/food.png",
  },
  {
    name: "Restaurant Talk",
    slug: "restaurant-talk",
    description: "Useful vocabulary for restaurants and dining",
    image: "/src/assets/images/restaurant.png",
  },
  {
    name: "Shopping Talk",
    slug: "shopping-talk",
    description: "Words and phrases you need while shopping",
    image: "/src/assets/images/shopping.png",
  },
  {
    name: "Clothing Actions",
    slug: "clothing-actions",
    description: "Useful words for wearing, changing and handling clothes",
    image: "/src/assets/images/clothes.png",
  },
  {
    name: "Style & Appearance",
    slug: "style-appearance",
    description: "Vocabulary for fashion, style and appearance",
    image: "/src/assets/images/style.png",
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    description: "Words for beauty, grooming and personal care",
    image: "/src/assets/images/beautiful.png",
  },
  {
    name: "Cleaning Actions",
    slug: "cleaning-actions",
    description: "Words for cleaning and household activities",
    image: "/src/assets/images/cleaning.png",
  },
  {
    name: "Movement Words",
    slug: "movement-words",
    description: "Walk, run, crawl, sprint and more",
    image: "/src/assets/images/movement.png",
  },
  {
    name: "Seeing & Looking",
    slug: "seeing-looking",
    description: "Glance, stare, gaze, peek and more",
    image: "/src/assets/images/seeing.png",
  },
  {
    name: "Sounds & Listening",
    slug: "sounds-listening",
    description: "Words for sounds, voices and listening",
    image: "/src/assets/images/sound.png",
  },
  {
    name: "Touch & Handling",
    slug: "touch-handling",
    description: "Words for touching, holding and handling things",
    image: "/src/assets/images/touch.png",
  },
  {
    name: "Speaking Actions",
    slug: "speaking-actions",
    description: "Words for talking, arguing, explaining and persuading",
    image: "/src/assets/images/speack.png",
  },
  {
    name: "Reaction Words",
    slug: "reaction-words",
    description: "Words for natural reactions and expressions",
    image: "/src/assets/images/reaction.png",
  },
  {
    name: "Relationship Actions",
    slug: "relationship-actions",
    description: "Words for caring, supporting, teasing and connecting",
    image: "/src/assets/images/love.png",
  },
  {
    name: "Creative Actions",
    slug: "creative-actions",
    description: "Words for creating, designing, drawing and decorating",
    image: "/src/assets/images/style.png",
  },

  // Sirf 30 categories dikhani hain,
  // isliye Study Actions ko abhi niche se hata diya gaya hai.
];

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080714] px-6 py-10 text-white">

      {/* ================= HEADER ================= */}
      <div className="mx-auto mb-12 max-w-7xl text-center">

        <h1 className="text-4xl font-black md:text-6xl">
          Explore{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Vocabulary
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Don't just memorize words. Discover words you can actually use in
          real life.
        </p>

        {/* ================= STATS ================= */}
        <div className="mx-auto mt-7 grid max-w-3xl grid-cols-3 gap-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <strong className="text-2xl font-black text-purple-400">
              30+
            </strong>

            <p className="mt-1 text-xs text-gray-400">
              Categories
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <strong className="text-2xl font-black text-cyan-400">
              1500+
            </strong>

            <p className="mt-1 text-xs text-gray-400">
              Words
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
            <strong className="text-2xl font-black text-pink-400">
              ∞
            </strong>

            <p className="mt-1 text-xs text-gray-400">
              Ways to Learn
            </p>
          </div>

        </div>
      </div>


      {/* ================= SECTION TITLE ================= */}
      <div className="mx-auto mb-6 flex max-w-7xl items-end justify-between">

        <div>
          <p className="text-xs font-bold tracking-[4px] text-purple-400">
            DISCOVER
          </p>

          <h2 className="mt-1 text-2xl font-black md:text-3xl">
            Choose your word
          </h2>
        </div>

        <span className="text-sm text-gray-500">
          30 categories
        </span>

      </div>


      {/* ================= CATEGORY CARDS ================= */}
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {categories.map((category, index) => (

          <div
            key={category.slug}
            onClick={() => navigate(`/learn/${category.slug}`)}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-purple-500/40 hover:bg-white/[0.07] hover:shadow-purple-900/20"
          >

            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">

              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080714] via-transparent to-transparent opacity-90" />

              {/* NUMBER */}
              <div className="absolute left-4 top-4 rounded-lg bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
                {String(index + 1).padStart(2, "0")}
              </div>

            </div>


            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-xl font-bold transition duration-300 group-hover:text-purple-400">
                {category.name}
              </h2>

              <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-400">
                {category.description}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="text-xs font-semibold uppercase tracking-[2px] text-violet-500">
                  Start Learning
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-purple-400 transition-all duration-300 group-hover:translate-x-1 group-hover:border-purple-400/40 group-hover:bg-purple-500/10">
                  →
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Categories;