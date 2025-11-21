import Hero from "../components/Hero";
import WhyCards from "../components/WhyCards";
import CTA from "../components/CTA";
import Testimonials from "../components/Testimonials"; // ⬅️ جديد

export default function Home() {
  return (
    <>
      <Hero />
      <WhyCards />

      <CTA />

      <Testimonials />
    </>
  );
}