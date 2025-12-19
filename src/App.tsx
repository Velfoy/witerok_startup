import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ESGSection } from "./components/ESGSection";
import { ProblemSection } from "./components/ProblemSection";
import { ProductSection } from "./components/ProductSection";
import { CompetitiveSection } from "./components/CompetitiveSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { BusinessModelSection } from "./components/BusinessModelSection";
import { MarketingSection } from "./components/MarketingSection";
import { TeamSection } from "./components/TeamSection";
import { AdvisorsSection } from "./components/AdvisorsSection";
import { FinancialSection } from "./components/FinancialSection";
import { RoadmapSection } from "./components/RoadmapSection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth">
        <Navigation />

        <main>
          <HeroSection />
          <AboutSection />
          <ESGSection />
          <ProblemSection />
          <ProductSection />
          <CompetitiveSection />
          <ComparisonSection />
          <TargetAudienceSection />
          <BusinessModelSection />
          <MarketingSection />
          <TeamSection />
          <AdvisorsSection />
          <FinancialSection />
          <RoadmapSection />
          <FAQSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
