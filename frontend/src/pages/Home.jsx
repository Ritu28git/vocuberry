import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Categories from "../components/Categories";

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#070713] text-white">
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Categories
         
         
        />
      </main>
    </div>
  );
}

export default Home;