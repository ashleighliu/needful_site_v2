import { Banner } from "../components/Banner/Banner";
import { Navbar } from "../components/Navbar/Navbar";
import { AppShell } from "@mantine/core";
import { IntroductionSection } from "@/components/IntroductionSection/IntroductionSection";
import { InformationSection } from "../components/InformationSection/InformationSection";
import { PricingSection } from "../components/PricingSection/PricingSection";
import { NewsletterSection } from "../components/NewsletterSection/NewsletterSection";
import { Footer } from "@/components/Footer/Footer";
import { useScrollIntoView } from "@mantine/hooks";

export function LandingPage() {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 1000,
  });
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar scrollIntoView={scrollIntoView} />
      </AppShell.Header>
      <AppShell.Main>
        <Banner />
        <IntroductionSection targetRef={targetRef} />
        <InformationSection />
        <PricingSection />
        <NewsletterSection />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
