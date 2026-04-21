import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MarketingHeader from '../components/header/MarketingHeader';
import TryDemoModal from '../components/try-demo/TryDemoModal';
import EarlyAccessModal from '../components/early-access/EarlyAccessModal';
import SectionBlock from '../components/ui/SectionBlock';
import GlassCard from '../components/ui/GlassCard';
import { trustPageCopy } from '../data';
import MarketingLayout from '../layouts/MarketingLayout';
import { spacing } from '../design/tokens';
import { getCtaHref, triggerCtaAction } from '../utils/cta';

const Trust = () => {
  const [tryDemoOpen, setTryDemoOpen] = useState(false);
  const [earlyAccessOpen, setEarlyAccessOpen] = useState(false);
  const primaryHref = getCtaHref(trustPageCopy.primaryCta.action);
  const secondaryHref = getCtaHref(trustPageCopy.secondaryCta.action);

  return (
    <MarketingLayout
      headerSlot={<MarketingHeader onEarlyAccess={() => setEarlyAccessOpen(true)} />}
    >
      <main
        className="trust-screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing['4xl'],
        }}
      >
        <section className="section-panel trust-screen__hero" aria-labelledby="trust-hero-title">
          <Typography id="trust-hero-title" component="h1" className="trust-screen__hero-title">
            {trustPageCopy.heroTitle}
          </Typography>
          <Typography component="p" className="trust-screen__hero-lead">
            {trustPageCopy.heroLead}
          </Typography>
        </section>

        <SectionBlock
          id="trust-controls"
          variant="trust"
          title={trustPageCopy.controlsTitle}
          lead={trustPageCopy.controlsLead}
        >
          <div className="trust-screen__controls-grid">
            {trustPageCopy.controls.map((control) => (
              <GlassCard key={control.id} variant="trust" className="trust-screen__card">
                <Typography component="h3" className="trust-screen__card-title">
                  {control.title}
                </Typography>
                <Typography component="p" className="trust-screen__card-description">
                  {control.description}
                </Typography>
              </GlassCard>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="trust-compliance" variant="trust" title={trustPageCopy.complianceTitle}>
          <GlassCard variant="trust" className="trust-screen__card">
            <ul className="trust-screen__compliance-list">
              {trustPageCopy.complianceItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </GlassCard>
        </SectionBlock>

        <SectionBlock
          id="trust-faq"
          variant="trust"
          title={trustPageCopy.faqTitle}
          lead={trustPageCopy.faqLead}
        >
          <div className="trust-screen__faq-grid">
            {trustPageCopy.faq.map((entry) => (
              <GlassCard key={entry.id} variant="trust" className="trust-screen__card">
                <Typography component="h3" className="trust-screen__card-title">
                  {entry.question}
                </Typography>
                <Typography component="p" className="trust-screen__card-description">
                  {entry.answer}
                </Typography>
              </GlassCard>
            ))}
          </div>
        </SectionBlock>

        <section className="section-panel trust-screen__cta" aria-labelledby="trust-cta-title">
          <Typography component="h2" id="trust-cta-title" className="trust-screen__cta-title">
            See Signmons Behave Under Real Intake Constraints
          </Typography>
          <div className="trust-screen__cta-actions">
            <Button
              className="hero__primary-cta"
              disableRipple
              type={primaryHref ? undefined : 'button'}
              href={primaryHref}
              onClick={() =>
                triggerCtaAction(trustPageCopy.primaryCta, {
                  onTryDemo: () => setTryDemoOpen(true),
                  onEarlyAccess: () => setEarlyAccessOpen(true),
                })
              }
              data-intent={trustPageCopy.primaryCta.intent}
            >
              {trustPageCopy.primaryCta.label}
            </Button>
            <Button
              className="hero__secondary-cta"
              disableRipple
              type={secondaryHref ? undefined : 'button'}
              href={secondaryHref}
              onClick={() =>
                triggerCtaAction(trustPageCopy.secondaryCta, {
                  onTryDemo: () => setTryDemoOpen(true),
                  onEarlyAccess: () => setEarlyAccessOpen(true),
                })
              }
              data-intent={trustPageCopy.secondaryCta.intent}
            >
              {trustPageCopy.secondaryCta.label}
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

export default Trust;
