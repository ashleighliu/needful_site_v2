import { Banner } from '../components/Banner/Banner';
import { Navbar } from '../components/Navbar/Navbar';
import { AppShell } from '@mantine/core';
import { IntroductionSection } from '@/components/IntroductionSection/IntroductionSection';
import { InformationSection } from '../components/InformationSection/InformationSection';
import { PricingSection } from '../components/PricingSection/PricingSection';
import { NewsletterSection } from '../components/NewsletterSection/NewsletterSection';
import { Footer } from '@/components/Footer/Footer';

export function LandingPage() {
  return (
    <AppShell>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Banner />
        <IntroductionSection />
        <InformationSection />
        <PricingSection />
        <NewsletterSection />
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
