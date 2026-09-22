import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Volume2, Search } from "lucide-react";

function WordLearning() {
  const { category: slug } = useParams();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [voices, setVoices] = useState([]);
  // ========================================
  // CATEGORY SLUG -> DATABASE CATEGORY NAME
  // ========================================

  const categoryMap = {
    "daily-use": "Daily Use Words",
    "say-it-better": "Say It Better",
   "tongue-twister": "Tongue Twisters",
    "think-express": "Think & Express",
    "social-situations": "Social Situations",
    "emoji-words": "Emoji Words",
    "cooking-actions": "Cooking Actions",
    "cooking-tools": "Cooking Tools",
    "kitchen-tools": "Kitchen Tools",
    "spices-seasonings": "Spices & Seasonings",
    "food-ingredients": "Food & Ingredients",
    "restaurant-talk": "Restaurant Talk",
    "shopping-talk": "Shopping Talk",
    "clothing-actions": "Clothing Actions",
    "style-appearance": "Style & Appearance",
    "beauty-personal-care": "Beauty & Personal Care",
    "cleaning-actions": "Cleaning Actions",
    "movement-words": "Movement Words",
    "seeing-looking": "Seeing & Looking",
    "sounds-listening": "Sounds & Listening",
    "touch-handling": "Touch & Handling",
    "speaking-actions": "Speaking Actions",
    "reaction-words": "Reaction Words",
    "relationship-actions": "Relationship Actions",
    "creative-actions": "Creative Actions",
    "study-actions": "Study Actions",
     "business": "Business",
     "travel": "Travel",
    "emotions": "Emotion Words",
   "power-words": "Power Words",
   "beautiful-words": "Beautiful Words",
   "cool-slang": "Cool Slang",
   "people-personality": "People & Personality",
    "idioms": "Idioms",
  };

  // ========================================
  // FETCH WORDS
  // ========================================

  // ========================================
// FETCH ALL WORDS FROM MONGODB
// ========================================

useEffect(() => {
  const fetchWords = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/words"
      );

      const data = await response.json();

      console.log("ALL WORDS FROM MONGODB:", data);

      if (!response.ok) {
        console.error("Failed to fetch words:", data);
        setWords([]);
        return;
      }

      // All words from MongoDB
     const allWords = data.words || [];

console.log(
  "ALL CATEGORY NAMES IN DATABASE:",
  [...new Set(allWords.map((item) => item.category))]
);

      // Current category name
      const categoryName = categoryMap[slug] || slug;

      console.log("Current slug:", slug);
      console.log("Looking for category:", categoryName);

 
// FILTER WORDS BY CATEGORY
const normalizeCategory = (value) => {
  if (!value) return "";

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const targetCategory = normalizeCategory(categoryName);

console.log("=================================");
console.log("SLUG:", slug);
console.log("TARGET CATEGORY:", categoryName);
console.log("TARGET CATEGORY NORMALIZED:", targetCategory);

const categoryWords = allWords.filter((item) => {
  let itemCategory = "";

  if (typeof item.category === "string") {
    itemCategory = item.category;
  } else if (item.category?.name) {
    itemCategory = item.category.name;
  } else if (item.category?.title) {
    itemCategory = item.category.title;
  } else if (item.category?.categoryName) {
    itemCategory = item.category.categoryName;
  }

  const normalizedItemCategory =
    normalizeCategory(itemCategory);

  return (
    normalizedItemCategory === targetCategory
  );
});

console.log(
  `FOUND ${categoryWords.length} WORDS FOR:`,
  categoryName
);

console.log(
  "MATCHED CATEGORIES:",
  [...new Set(
    categoryWords.map((item) => item.category)
  )]
);
console.log("=================================");

      console.log(
        `Words found for ${categoryName}:`,
        categoryWords.length
      );

      setWords(categoryWords);

    } catch (error) {
      console.error("FETCH WORDS ERROR:", error);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    fetchWords();
  }
}, [slug]);

  // ========================================
  // LOAD FAVOURITES
  // ========================================

  useEffect(() => {
    const saved = localStorage.getItem("vocaberry-favourites");

    if (saved) {
      try {
        setFavourites(JSON.parse(saved));
      } catch {
        setFavourites([]);
      }
    }
  }, []);

  // ========================================
  // LOAD VOICES
  // ========================================

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices =
        window.speechSynthesis.getVoices();

      setVoices(availableVoices);
    };

    loadVoices();

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadVoices
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadVoices
      );
    };
  }, []);

  // ========================================
  // STOP SPEECH
  // ========================================

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  // ========================================
  // ENGLISH VOICE
  // ========================================

  const speakEnglish = (text) => {
    if (!text) return;

    stopSpeech();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.8;
    speech.pitch = 1.12;
    speech.volume = 0.7;

    const femaleVoice =
      voices.find((voice) =>
        /aria|jenny|zira|samantha|female/i.test(
          voice.name
        )
      ) ||
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith("en")
      );

    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  // ========================================
  // HINDI VOICE
  // ========================================
const speakHindi = (text) => {
  if (!text) return;

  window.speechSynthesis.cancel();

  const voices = window.speechSynthesis.getVoices();

  const hindiVoices = voices.filter((voice) =>
    voice.lang.toLowerCase().startsWith("hi")
  );

  console.table(
    hindiVoices.map((voice) => ({
      name: voice.name,
      language: voice.lang,
      local: voice.localService,
    }))
  );

  // Female voice ke likely names ko priority
  const femaleVoice =
    hindiVoices.find((voice) =>
      /female|girl|woman|heera|kalpana|google/i.test(
        voice.name
      )
    ) || hindiVoices[0];

  if (!femaleVoice) {
    alert("Hindi voice available nahi hai.");
    return;
  }

  console.log("Selected Hindi voice:", femaleVoice.name);

  const speech = new SpeechSynthesisUtterance(text);

  speech.voice = femaleVoice;
  speech.lang = "hi-IN";
  speech.rate = 0.78;
  speech.pitch = 1.15;
  speech.volume = 0.7;

  window.speechSynthesis.speak(speech);
};
  // ========================================
  // SENTENCE VOICE
  // ========================================

  const speakSentence = (text) => {
    if (!text) return;

    stopSpeech();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.8;
    speech.pitch = 1.08;
    speech.volume = 0.7;

    const englishVoice =
      voices.find((voice) =>
        /aria|jenny|zira|samantha|female/i.test(
          voice.name
        )
      ) ||
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith("en")
      );

    if (englishVoice) {
      speech.voice = englishVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  // ========================================
  // FAVOURITE
  // ========================================

  const toggleFavourite = (word) => {
    const wordId = word._id;

    let updated;

    if (favourites.includes(wordId)) {
      updated = favourites.filter(
        (id) => id !== wordId
      );
    } else {
      updated = [...favourites, wordId];
    }

    setFavourites(updated);

    localStorage.setItem(
      "vocaberry-favourites",
      JSON.stringify(updated)
    );
  };

  // ========================================
  // CATEGORY TITLE
  // ========================================

  const categoryTitle =
  categoryMap[slug] ||
  (slug
    ? slug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ")
    : "Vocabulary");
    const isTongueTwister = slug === "tongue-twister";
    const isSayItBetter = slug === "say-it-better";
    const isThinkExpress = slug === "think-express";

  // ========================================
  // SEARCH FILTER
  // ========================================

  const filteredWords = useMemo(() => {
    const search = searchTerm
      .trim()
      .toLowerCase();

    if (!search) {
      return words;
    }

    return words.filter((item) => {

      const word =
       (item.word || item.text || "").toLowerCase();

      const meaning =
        item.meaning?.toLowerCase() || "";

      const hindi =
        item.hindiMeaning?.toLowerCase() || "";

      return (
        word.includes(search) ||
        meaning.includes(search) ||
        hindi.includes(search)
      );
    });
  }, [words, searchTerm]);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080814] text-white">
        <div className="text-purple-400">
          Loading vocabulary...
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="min-h-screen bg-[#080814] px-4 py-6 text-white md:px-8 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* TOP BAR */}

        <div className="mb-8 flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="
              flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-2.5
              text-sm text-gray-300
              transition
              hover:bg-white/[0.07]
              hover:text-white
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="text-center">

          <h1 className="
              text-4xl
              font-bold
              tracking-tight
              text-purple-400
            ">
               {categoryTitle}            
                 </h1>

            <p className="mt-1 text-1.3xl text-gray-500">
              Explore useful English vocabulary
            </p>

          </div>

          <div className="w-[60px]" />

        </div>

        {/* TITLE */}

        <div className="mb-7">

          <h1 className="
            text-3xl
            font-semibold
            tracking-tight
            md:text-4xl
          ">
            Build Your{" "}
            <span className="text-purple-400">
               Vocabulary
            </span>
          </h1>

          <p className="mt-2 text-1.3xl text-gray-500">
            Learn useful words with meanings,
            examples and pronunciation.
          </p>

        </div>

        {/* SEARCH */}

        <div className="
          mb-7
          flex
          flex-col
          gap-3
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <div className="relative w-full md:max-w-xl">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder={`Search ${categoryTitle.toLowerCase()} words...`}
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-white/[0.04]
                py-3
                pl-11
                pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-gray-500
                transition
                focus:border-purple-500/40
              "
            />

          </div>

          <div className="
            rounded-xl
            border border-white/10
            bg-white/[0.04]
            px-4
            py-2.5
            text-sm
            text-gray-400
          ">
            <span className="font-semibold text-purple-400">
              {filteredWords.length}
            </span>{" "}
            Words
          </div>

        </div>

        {/* WORD CARDS */}
{/* <div className="grid gap-5 md:grid-cols-3"> */}
 
<div
  className={`grid grid-cols-1 gap-5 ${
    slug === "people-personality" || slug === "kitchen-tools" || slug === "restaurant-talk"
      ? "md:grid-cols-2"
      : "md:grid-cols-3"
  }`}
  style={{
    direction: "ltr",
  }}
>

          {filteredWords.length === 0 ? (

            <div className="
              col-span-full
              rounded-2xl
              border border-white/10
              bg-white/[0.02]
              py-16
              text-center
              text-gray-500
            ">
              No words found.
            </div>

          ) : (
filteredWords.map((item, index) => {
  const isFavourite = favourites.includes(item._id);
// =====================================
// SAY IT BETTER CARD
// =====================================

if (isSayItBetter) {
  return (
    <div
      key={item._id || index}
      className="
        rounded-2xl
        border border-purple-500/15
        bg-[#0c0c18]
        p-6
        transition
        hover:-translate-y-1
        hover:border-purple-500/40
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <div className="mb-4 flex items-center gap-2">
            <span className="
              text-[10px]
              font-semibold
              tracking-[0.2em]
              text-purple-400
            ">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-gray-700">•</span>

            <span className="
              text-[10px]
              uppercase
              tracking-wider
              text-gray-600
            ">
              Say It Better
            </span>
          </div>

          {/* NORMAL */}
          <div className="
            rounded-xl
            border border-white/[0.07]
            bg-[#10101b]
            p-5
          ">

            <p className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-gray-500
            ">
              Normal
            </p>

            <div className="mt-2 flex items-center gap-3">

              <p className="
                text-lg
                leading-7
                text-gray-200
              ">
                {item.normal}
              </p>

              <button
                onClick={() => speakEnglish(item.normal)}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500/10
                  text-purple-400
                  hover:bg-purple-500/20
                "
                title="Listen"
              >
                <Volume2 size={16} />
              </button>

            </div>
          </div>

          {/* BETTER */}
          <div className="
            mt-3
            rounded-xl
            border border-purple-500/20
            bg-purple-500/[0.05]
            p-5
          ">

            <p className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-purple-400
            ">
              Say It Better
            </p>

            <div className="mt-2 flex items-center gap-3">

              <p className="
                text-lg
                font-medium
                leading-7
                text-white
              ">
                {item.better}
              </p>

              <button
                onClick={() => speakEnglish(item.better)}
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500/10
                  text-purple-400
                  hover:bg-purple-500/20
                "
                title="Listen"
              >
                <Volume2 size={16} />
              </button>

            </div>
          </div>

        </div>

        {/* FAVOURITE */}
        <button
          onClick={() => toggleFavourite(item)}
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            transition
            ${
              isFavourite
                ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-white"
            }
          `}
        >
          <Heart
            size={17}
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>

      </div>

    </div>
  );
}


// =====================================
// IDIOMS CARD
// =====================================

if (slug === "idioms") {
  return (
    <div
      key={item._id || index}
      className="
        rounded-2xl
        border border-purple-500/15
        bg-[#0c0c18]
        p-6
        transition
        hover:-translate-y-1
        hover:border-purple-500/40
      "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-2">

        <div className="flex-1">

          {/* NUMBER + CATEGORY */}
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-400">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-gray-700">•</span>

            <span className="text-[10px] uppercase tracking-wider text-gray-600">
              Idioms
            </span>
          </div>

          {/* IDIOM */}
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold leading-tight text-white">
              {item.word}
            </h2>

            <button
              onClick={() => speakEnglish(item.word)}
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full
                bg-purple-500/10
                text-purple-400
                hover:bg-purple-500/20
              "
              title="Listen"
            >
              <Volume2 size={17} />
            </button>
          </div>

          {/* MEANINGS */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-1">

            {/* ENGLISH MEANING */}
            <div className="
              rounded-xl
              border border-white/[0.07]
              bg-[#10101b]
              p-5
            ">
              <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-purple-400
              ">
                English Meaning
              </p>

              <p className="
                mt-3
                text-base
                leading-7
                text-gray-200
              ">
                {item.meaning}
              </p>
            </div>

            {/* HINDI MEANING */}
            <div className="
              rounded-xl
              border border-purple-500/20
              bg-purple-500/[0.05]
              p-5
            ">
              <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-pink-400
              ">
                Hindi Meaning
              </p>

              <p className="
                mt-3
                text-base
                leading-7
                text-gray-200
              ">
                {item.hindiMeaning}
              </p>
            </div>

          </div>

        </div>

        {/* FAVOURITE */}
        <button
          onClick={() => toggleFavourite(item)}
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            transition
            ${
              isFavourite
                ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-white"
            }
          `}
        >
          <Heart
            size={17}
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>

      </div>
    </div>
  );
}
  // =====================================
  // TONGUE TWISTER CARD
  // =====================================*

  if (isTongueTwister) {
    return (
      <div
        key={item._id || index}
        className="
          rounded-2xl
          border border-purple-500/15
          bg-[#0c0c18]
          p-6
          transition
          hover:-translate-y-1
          hover:border-purple-500/40
        "
      >

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex-1">

            <div className="mb-3 flex items-center gap-2">

              <span className="
                text-[10px]
                font-semibold
                tracking-[0.2em]
                text-purple-400
              ">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-gray-700">
                •
              </span>

              <span className="
                text-[10px]
                uppercase
                tracking-wider
                text-gray-600
              ">
                Tongue Twister
              </span>

            </div>

            {/* TONGUE TWISTER */}
            <h2 className="
              text-xl
              font-bold
              leading-relaxed
              text-white
              md:text-2xl
            ">
              {item.text}
            </h2>

          </div>

          {/* FAVOURITE */}
          <button
            onClick={() => toggleFavourite(item)}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition
              ${
                isFavourite
                  ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                  : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-white"
              }
            `}
          >
            <Heart
              size={17}
              fill={
                isFavourite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>

        {/* BOTTOM */}
        <div className="
          mt-6
          flex
          items-center
          justify-between
        ">

          {/* DIFFICULTY */}
          <span className="
            rounded-full
            border
            border-purple-500/20
            bg-purple-500/10
            px-3
            py-1.5
            text-[10px]
            font-semibold
            uppercase
            tracking-wider
            text-purple-400
          ">
            {item.difficulty}
          </span>

          {/* SPEAKER */}
          <button
            onClick={() => speakEnglish(item.text)}
            title="Listen"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-purple-500/10
              text-purple-400
              transition
              hover:bg-purple-500/20
            "
          >
            <Volume2 size={18} />
          </button>

        </div>

      </div>
    );
  }

    // =====================================
  // THINK & EXPRESS CARD
  // =====================================

  if (isThinkExpress) {
    return (
      <div
        key={item._id || index}
        className="
          rounded-2xl
          border border-purple-500/15
          bg-[#0c0c18]
          p-6
          transition
          hover:-translate-y-1
          hover:border-purple-500/40
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">

          <div className="flex-1">

            <div className="mb-4 flex items-center gap-2">

              <span className="
                text-[10px]
                font-semibold
                tracking-[0.2em]
                text-purple-400
              ">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-gray-700">•</span>

              <span className="
                text-[10px]
                uppercase
                tracking-wider
                text-gray-600
              ">
                Think & Express
              </span>

            </div>

            {/* NORMAL SENTENCE */}
            <div className="
              rounded-xl
              border border-white/[0.07]
              bg-[#10101b]
              p-5
            ">

              <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-gray-500
              ">
                Normal
              </p>

              <div className="mt-2 flex items-center gap-3">

                <p className="
                  text-lg
                  leading-7
                  text-gray-200
                ">
                  {item.normal}
                </p>

                <button
                  onClick={() => speakEnglish(item.normal)}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-500/10
                    text-purple-400
                    hover:bg-purple-500/20
                  "
                  title="Listen"
                >
                  <Volume2 size={16} />
                </button>

              </div>

            </div>

            {/* BETTER SENTENCE */}
            <div className="
              mt-3
              rounded-xl
              border border-purple-500/20
              bg-purple-500/[0.05]
              p-5
            ">

              <p className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-purple-400
              ">
                Better Expression
              </p>

              <div className="mt-2 flex items-center gap-3">

                <p className="
                  text-lg
                  font-medium
                  leading-7
                  text-white
                ">
                  {item.better}
                </p>

                <button
                  onClick={() => speakEnglish(item.better)}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-purple-500/10
                    text-purple-400
                    hover:bg-purple-500/20
                  "
                  title="Listen"
                >
                  <Volume2 size={16} />
                </button>

              </div>

            </div>

          </div>

          {/* FAVOURITE */}
          <button
            onClick={() => toggleFavourite(item)}
            className={`
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              transition
              ${
                isFavourite
                  ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                  : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-white"
              }
            `}
          >
            <Heart
              size={17}
              fill={isFavourite ? "currentColor" : "none"}
            />
          </button>

        </div>

      </div>
    );
  }
   // =====================================
  // Emoji CARD
  // =====================================
if (slug === "emoji-words") {
  return (
    <div
      key={item._id || index}
      className="
        rounded-2xl
        border border-white/[0.08]
        bg-[#0c0c18]
        p-5
        transition
        hover:border-purple-500/20
        md:p-6
      "
    >
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <div className="mb-3 flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-400">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-gray-700">•</span>

            <span className="text-[10px] uppercase tracking-wider text-gray-600">
              Emoji Words
            </span>
          </div>

          {/* EMOJI */}
          <div className="flex items-center gap-3">
            <h2 className="text-4xl">
              {item.word}
            </h2>

            <button
              onClick={() => speakEnglish(item.meaning)}
              className="
                flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full bg-purple-500/10 text-purple-400
                hover:bg-purple-500/20
              "
              title="Listen"
            >
              <Volume2 size={16} />
            </button>
          </div>

          {/* MEANING */}
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#10101b] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-400">
              Meaning
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              {item.meaning}
            </p>
          </div>

          {/* USE IT WHEN */}
          <div className="mt-3 rounded-xl border border-purple-500/15 bg-purple-500/[0.035] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-pink-400">
              Use It When
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              {item.useItWhen}
            </p>
          </div>

        </div>

        {/* FAVOURITE */}
        <button
          onClick={() => toggleFavourite(item)}
          className={`
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-xl border transition
            ${
              isFavourite
                ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                : "border-white/10 bg-white/[0.02] text-gray-500 hover:text-white"
            }
          `}
        >
          <Heart
            size={17}
            fill={isFavourite ? "currentColor" : "none"}
          />
        </button>

      </div>
    </div>
  );
}

  // =====================================
  // NORMAL VOCABULARY CARD
  // =====================================

  return (
    <div
      key={item._id || index}
      className="
        rounded-2xl
        border border-white/[0.08]
        bg-[#0c0c18]
        p-5
        transition
        hover:border-purple-500/20
        md:p-6
      "
    >

      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div>

          <div className="
            mb-1
            flex
            items-center
            gap-2
          ">

            <span className="
              text-[10px]
              font-semibold
              tracking-[0.2em]
              text-purple-400
            ">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-gray-700">
              •
            </span>

            <span className="
              text-[10px]
              uppercase
              tracking-wider
              text-gray-600
            ">
              Vocabulary
            </span>

          </div>

          <div className="
            flex
            items-center
            gap-3
          ">

            <h2 className="
              text-2xl
              font-bold
              md:text-3xl
            ">
              {item.word}
            </h2>

            <button
              onClick={() =>
                speakEnglish(item.word)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border border-purple-500/20
                bg-purple-500/10
                text-purple-400
              "
            >
              <Volume2 size={16} />
            </button>

          </div>

        </div>

        <button
          onClick={() =>
            toggleFavourite(item)
          }
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            ${
              isFavourite
                ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                : "border-white/10 text-gray-500"
            }
          `}
        >
          <Heart
            size={17}
            fill={
              isFavourite
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>

      {/* ENGLISH + HINDI */}
      <div className="
        mt-4
        grid
        gap-3
        md:grid-cols-2
      ">

        <div className="
          rounded-xl
          border border-white/[0.07]
          bg-[#10101b]
          px-4
          py-4
        ">
          <p className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-purple-400
          ">
            English Meaning
          </p>

          <p className="
            mt-2
            text-sm
            leading-6
            text-gray-300
          ">
            {item.meaning}
          </p>
        </div>

        <div className="
          rounded-xl
          border border-purple-500/15
          bg-purple-500/[0.035]
          px-4
          py-4
        ">
          <p className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-pink-400
          ">
            Hindi Meaning
          </p>

          <p className="
            mt-2
            text-base
            text-gray-300
          ">
            {item.hindiMeaning ||
              "Hindi meaning not available"}
          </p>
        </div>

      </div>

      {/* SENTENCE */}
      <div className="
        mt-3
        rounded-xl
        border border-cyan-500/10
        bg-[#0d1420]
        px-4
        py-4
      ">

        <p className="
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-cyan-400
        ">
          Example
        </p>

        <p className="
          mt-2
          text-sm
          italic
          leading-6
          text-gray-300
        ">
          "{item.sentence}"
        </p>

      </div>

    </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}



export default WordLearning;