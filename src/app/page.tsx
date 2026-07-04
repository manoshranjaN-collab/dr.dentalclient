import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedTreatments } from "@/components/FeaturedTreatments";
import { About } from "@/components/About";
import { Team } from "@/components/Team";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { GsapReveal } from "@/components/GsapReveal";

export default function Home() {
  return (
    <>
      <GsapReveal />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedTreatments />
        <About />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
