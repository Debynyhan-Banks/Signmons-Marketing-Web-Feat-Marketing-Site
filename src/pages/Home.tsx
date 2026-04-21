import { useState } from 'react';
import Hero from '../components/hero/Hero';
import MarketingHeader from '../components/header/MarketingHeader';
import HowItWorks from '../components/how-it-works/HowItWorks';
import WhyOwnersTrust from '../components/why-owners-trust/WhyOwnersTrust';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';
import TryDemoModal from '../components/try-demo/TryDemoModal';
import EarlyAccessModal from '../components/early-access/EarlyAccessModal';
import ValuePillars from '../components/value-pillars/ValuePillars';
import CtaClose from '../components/cta-close/CtaClose';

const Home = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);

  return (
    <MarketingLayout
      headerSlot={<MarketingHeader onEarlyAccess={() => setEarlyAccessOpen(true)} />}
    >
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <Hero
          onTryDemo={() => {
            setTryDemoOpen(true);
          }}
          onEarlyAccess={() => {
            setEarlyAccessOpen(true);
          }}
        />
        <ValuePillars />
        <HowItWorks />
        <WhyOwnersTrust />
        <CtaClose
          onTryDemo={() => {
            setTryDemoOpen(true);
          }}
          onEarlyAccess={() => {
            setEarlyAccessOpen(true);
          }}
        />
      </main>
      <TryDemoModal open={tryDemoOpen} onClose={() => setTryDemoOpen(false)} />
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />
    </MarketingLayout>
  );
};

export default Home;
