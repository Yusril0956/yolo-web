import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbf8ff] font-sans text-[#000767]">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
