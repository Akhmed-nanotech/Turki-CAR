import { ContactCTA } from "@/components/ContactCTA";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { WorkshopVisual } from "@/components/WorkshopVisual";
import { PrePurchaseInspection } from "@/components/PrePurchaseInspection";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Trust } from "@/components/Trust";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WorkshopVisual />
        <PrePurchaseInspection />
        <Experience />
        <Trust />
        <Process />
        <Location />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
