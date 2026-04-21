import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EarlyAccessModal from '../components/early-access/EarlyAccessModal';
import MarketingHeader from '../components/header/MarketingHeader';
import TryDemoModal from '../components/try-demo/TryDemoModal';
import GlassCard from '../components/ui/GlassCard';
import SectionBlock from '../components/ui/SectionBlock';
import { spacing } from '../design/tokens';
import { legalPageCopy } from '../data';
import MarketingLayout from '../layouts/MarketingLayout';
import { getCtaHref, triggerCtaAction } from '../utils/cta';

const Legal = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const primaryHref = getCtaHref(legalPageCopy.primaryCta.action);
  const secondaryHref = getCtaHref(legalPageCopy.secondaryCta.action);

  return (
    <MarketingLayout
      headerSlot={<MarketingHeader onEarlyAccess={() => setEarlyAccessOpen(true)} />}
    >
      <main
        className="legal-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <section className="section-panel legal-screen__hero" aria-labelledby="legal-hero-title">
          <Typography id="legal-hero-title" component="h1" className="legal-screen__hero-title">
            {legalPageCopy.heroTitle}
          </Typography>
          <Typography component="p" className="legal-screen__hero-lead">
            {legalPageCopy.heroLead}
          </Typography>
        </section>

        <SectionBlock id="legal-sections" variant="trust" title="Legal Documentation">
          <div className="legal-screen__grid">
            {legalPageCopy.sections.map((section) => (
              <GlassCard key={section.id} variant="trust" className="legal-screen__card">
                <Typography component="h2" className="legal-screen__card-title">
                  {section.title}
                </Typography>
                <div className="legal-screen__copy">
                  {section.body.map((paragraph) => (
                    <Typography key={paragraph} component="p" className="legal-screen__paragraph">
                      {paragraph}
                    </Typography>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </SectionBlock>

        <section className="section-panel legal-screen__cta" aria-labelledby="legal-cta-title">
          <Typography component="h2" id="legal-cta-title" className="legal-screen__cta-title">
            Need a Live Walkthrough of Signmons Controls?
          </Typography>
          <div className="legal-screen__cta-actions">
            <Button
              className="hero__primary-cta"
              disableRipple
              type={primaryHref ? undefined : 'button'}
              href={primaryHref}
              onClick={() =>
                triggerCtaAction(legalPageCopy.primaryCta, {
                  onTryDemo: () => setTryDemoOpen(true),
                  onEarlyAccess: () => setEarlyAccessOpen(true),
                })
              }
              data-intent={legalPageCopy.primaryCta.intent}
            >
              {legalPageCopy.primaryCta.label}
            </Button>
            <Button
              className="hero__secondary-cta"
              disableRipple
              type={secondaryHref ? undefined : 'button'}
              href={secondaryHref}
              onClick={() =>
                triggerCtaAction(legalPageCopy.secondaryCta, {
                  onTryDemo: () => setTryDemoOpen(true),
                  onEarlyAccess: () => setEarlyAccessOpen(true),
                })
              }
              data-intent={legalPageCopy.secondaryCta.intent}
            >
              {legalPageCopy.secondaryCta.label}
            </Button>
          </div>
        </section>
      </main>

      <TryDemoModal open={tryDemoOpen} onClose={() => setTryDemoOpen(false)} />
      <EarlyAccessModal
        open={earlyAccessOpen}
        onClose={() => setEarlyAccessOpen(false)}
      />
    </MarketingLayout>
  );
};

export default Legal;
