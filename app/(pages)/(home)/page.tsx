// app/page.tsx
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Versions from "@/components/home/Versions";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#0F0F0F] text-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <Features />
        <Versions />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
