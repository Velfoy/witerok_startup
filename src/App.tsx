import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { Suspense, lazy } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import WindCursorGlobal from "./components/WindCursorGlobal";

const AboutSection = lazy(() =>
  import("./components/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const ESGSection = lazy(() =>
  import("./components/ESGSection").then((m) => ({ default: m.ESGSection }))
);
const ProblemSection = lazy(() =>
  import("./components/ProblemSection").then((m) => ({
    default: m.ProblemSection,
  }))
);
const ProductSection = lazy(() =>
  import("./components/ProductSection").then((m) => ({
    default: m.ProductSection,
  }))
);
const CompetitiveSection = lazy(() =>
  import("./components/CompetitiveSection").then((m) => ({
    default: m.CompetitiveSection,
  }))
);
const ComparisonSection = lazy(() =>
  import("./components/ComparisonSection").then((m) => ({
    default: m.ComparisonSection,
  }))
);
const TargetAudienceSection = lazy(() =>
  import("./components/TargetAudienceSection").then((m) => ({
    default: m.TargetAudienceSection,
  }))
);
const BusinessModelSection = lazy(() =>
  import("./components/BusinessModelSection").then((m) => ({
    default: m.BusinessModelSection,
  }))
);
const MarketingSection = lazy(() =>
  import("./components/MarketingSection").then((m) => ({
    default: m.MarketingSection,
  }))
);
const TeamSection = lazy(() =>
  import("./components/TeamSection").then((m) => ({ default: m.TeamSection }))
);
const AdvisorsSection = lazy(() =>
  import("./components/AdvisorsSection").then((m) => ({
    default: m.AdvisorsSection,
  }))
);
const FinancialSection = lazy(() =>
  import("./components/FinancialSection").then((m) => ({
    default: m.FinancialSection,
  }))
);
const RoadmapSection = lazy(() =>
  import("./components/RoadmapSection").then((m) => ({
    default: m.RoadmapSection,
  }))
);
const FAQSection = lazy(() =>
  import("./components/FAQSection").then((m) => ({ default: m.FAQSection }))
);
const EfficiencyCalculator = lazy(() =>
  import("./components/EfficiencyCalculator").then((m) => ({
    default: m.EfficiencyCalculator,
  }))
);
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((m) => ({
    default: m.ContactSection,
  }))
);

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background scroll-smooth hide-cursor">
        <WindCursorGlobal />
        <Navigation />

        <main>
          <HeroSection />
          <Suspense
            fallback={
              <div className="py-12 text-center text-foreground/70">
                Loading…
              </div>
            }
          >
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
            <EfficiencyCalculator />
            <ContactSection />
          </Suspense>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
