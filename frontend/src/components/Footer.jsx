import {
  Github,
  Instagram,
  Twitter,
  Linkedin,
  ArrowUp,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#04040b] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">

            <div className="flex items-center gap-3">

              {/* V Logo */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xl font-bold shadow-lg shadow-violet-600/20">
                V
              </div>

              <span className="text-xl font-bold tracking-tight">
                V<span className="text-violet-400">ocuberry</span>
              </span>

            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
              Build a stronger vocabulary, one word at a time.
              Learn smarter. Speak better. Grow every day.
            </p>

            {/* Social */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <Github size={17} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-fuchsia-400/30 hover:bg-fuchsia-500/10 hover:text-fuchsia-300"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <Twitter size={17} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
              >
                <Linkedin size={17} />
              </a>

            </div>

          </div>


          {/* Product */}
          <div>

            <h3 className="mb-5 text-sm font-semibold text-white">
              Product
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">

              <li>
                <a
                  href="#"
                  className="transition hover:text-violet-400"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-violet-400"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-violet-400"
                >
                  Quizzes
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-violet-400"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-violet-400"
                >
                  Progress
                </a>
              </li>

            </ul>

          </div>


          {/* Resources */}
          <div>

            <h3 className="mb-5 text-sm font-semibold text-white">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">

              <li>
                <a
                  href="#"
                  className="transition hover:text-fuchsia-400"
                >
                  Vocabulary Blog
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-fuchsia-400"
                >
                  Learning Guide
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-fuchsia-400"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-fuchsia-400"
                >
                  Community
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-fuchsia-400"
                >
                  Contact Us
                </a>
              </li>

            </ul>

          </div>


          {/* Newsletter */}
          <div>

            <h3 className="mb-5 text-sm font-semibold text-white">
              Stay in the Loop
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-500">
              Get useful words and learning tips delivered to your inbox.
            </p>

            <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">

              <div className="flex items-center pl-3 text-gray-500">
                <Mail size={16} />
              </div>

              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 text-sm font-semibold text-white transition hover:from-violet-500 hover:to-fuchsia-500">
                Join
              </button>

            </div>

          </div>

        </div>


        {/* Divider */}
        <div className="my-12 h-px bg-white/10" />


        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Vocuberry. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-gray-600">

            <a
              href="#"
              className="transition hover:text-gray-300"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-gray-300"
            >
              Terms of Service
            </a>

          </div>


          {/* Back To Top */}
          <motion.button
            whileHover={{ y: -3 }}
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <ArrowUp size={17} />
          </motion.button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;