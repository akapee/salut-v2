import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Benefits from "../components/Benefits";
import Faculties from "../components/Faculties";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-1">
        <Hero />
        <Stats />
        <Faculties />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
