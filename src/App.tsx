import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ESGSection } from "./components/ESGSection";
import { ProblemSection } from "./components/ProblemSection";
import { ProductSection } from "./components/ProductSection";
import { CompetitiveSection } from "./components/CompetitiveSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { BusinessModelSection } from "./components/BusinessModelSection";
import { MarketingSection } from "./components/MarketingSection";
import { TeamSection } from "./components/TeamSection";
import { FinancialSection } from "./components/FinancialSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navigation />

      <main>
        <HeroSection />
        <ESGSection />
        <ProblemSection />
        <ProductSection />
        <CompetitiveSection />
        <TargetAudienceSection />
        <BusinessModelSection />
        <MarketingSection />
        <TeamSection />
        <FinancialSection />
        <RoadmapSection />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
