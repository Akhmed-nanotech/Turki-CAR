import { ContactCTA } from "@/components/ContactCTA";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { PrePurchaseInspection } from "@/components/PrePurchaseInspection";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <PrePurchaseInspection />
        <Experience />
        <Process />
        <ContactCTA />
        <Location />
      </main>
      <Footer />
    </>
  );
}
