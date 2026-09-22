import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080814] text-white">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;