import { useEffect, useMemo, useState } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import useSiteEffects from '../../hooks/useSiteEffects';
import { siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';

const painItems = [
  'Missed calls after hours -> lost jobs',
  'Free estimates -> wasted time',
  'No-shows -> dead revenue',
  'Dispatching unpaid work -> negative margin',
];

const flowSteps = [
  {
    title: 'We Answer Instantly',
    detail: 'Every call, text, or chat - 24/7, under your brand.',
  },
  {
    title: 'We Qualify the Job',
    detail: 'Correct service, urgency, location - no bad bookings.',
  },
  {
    title: 'We Collect the Deposit',
    detail: 'Customer pays before anything is scheduled.',
  },
  {
    title: 'We Dispatch Automatically',
    detail: 'Right tech, right zone, right time.',
  },
  {
    title: 'We Notify Everyone',
    detail: 'Customer and tech get confirmations, ETA, and updates.',
  },
];

const metrics = [
  { value: '93%', label: 'Leads converted into booked jobs', note: 'More revenue from the same calls' },
  { value: '78%', label: 'Customers pay before dispatch', note: 'Fewer no-shows, better cash flow' },
  { value: '64%', label: 'Missed calls recovered automatically', note: 'Nights, weekends, after-hours' },
  { value: '3s', label: 'Average response time', note: 'Faster than any human team' },
];

const HERO_FRAME_MS = 740;
const HERO_FRAME_COUNT = 7;

const SiteHome = () => {
  useSiteEffects({ smoothAnchors: true });

  const [heroFrame, setHeroFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setMotionPreference = () => {
      setIsReducedMotion(media.matches);
      if (media.matches) {
        setIsPlaying(false);
      }
    };

    setMotionPreference();
    media.addEventListener('change', setMotionPreference);

    return () => {
      media.removeEventListener('change', setMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || isReducedMotion) return;

    const timer = window.setInterval(() => {
      setHeroFrame((prev) => (prev + 1) % HERO_FRAME_COUNT);
    }, HERO_FRAME_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying, isReducedMotion]);

  const heroState = useMemo(() => {
    const frame = heroFrame;
    return {
      frame,
      incoming: frame >= 0,
      answering: frame >= 1,
      decisionQualify: frame >= 2,
      decisionPrice: frame >= 2,
      decisionPayment: frame >= 2,
      lockVisible: frame >= 3,
      lockOpen: frame >= 5,
      dispatch: frame >= 5,
      techCard: frame >= 5,
      resetting: frame === 6,
    };
  }, [heroFrame]);

  return (
    <>
      <SiteNavigation navLinks={sitePrimaryLinks} ctaLabel="Get Your Revenue Breakdown →" ctaHref="/contact" />

      <section className="homex-hero">
        <div className="homex-grid"></div>
        <div className="homex-hero-copy">
          <p className="homex-kicker">Front-Office Revenue System for Trades</p>
          <h1>
            Stop Sending Trucks to
            <span> Unpaid Jobs.</span>
          </h1>
          <p className="homex-sub">
            Signmons answers every call, qualifies the job, collects the deposit, and dispatches the right tech.
            If the job is not paid, it does not get booked.
          </p>
          <div className="homex-actions">
            <a className="btn-primary" href="/contact">
              See How Much Revenue You&apos;re Losing →
            </a>
            <a className="btn-secondary" href="/demo">
              Watch a Real Call →
            </a>
          </div>
          <p className="homex-trust">Used by HVAC, Plumbing, and Electrical teams running 3 to 25 trucks</p>
        </div>

        <div className={`homex-hero-art ${heroState.resetting ? 'is-resetting' : ''}`} aria-label="Revenue system simulation">
          <div className="homex-hero-art-glow"></div>
          <button
            type="button"
            className="homex-hero-play-toggle"
            onClick={() => setIsPlaying((prev) => !prev)}
            disabled={isReducedMotion}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isReducedMotion ? 'Reduced Motion' : isPlaying ? 'Pause' : 'Play'}
          </button>

          <div className="homex-sim">
            <div className={`homex-chip ${heroState.incoming ? 'is-on' : ''}`}>
              Incoming Call: Emergency - No Heat
            </div>
            <div className={`homex-chat ${heroState.answering ? 'is-on' : ''}`}>
              I can get a technician out today. Let me lock this in.
            </div>

            <div className="homex-decision" role="list" aria-label="Decision engine">
              <span className={`homex-node ${heroState.decisionQualify ? 'is-on' : ''}`}>Qualify</span>
              <span className={`homex-node ${heroState.decisionPrice ? 'is-on' : ''}`}>Price &amp; Policy</span>
              <span className={`homex-node ${heroState.decisionPayment ? 'is-on' : ''}`}>Payment</span>
              <span className={`homex-node ${heroState.dispatch ? 'is-on' : ''}`}>Dispatch</span>
            </div>

            <div className={`homex-gate ${heroState.lockVisible ? 'is-on' : ''} ${heroState.lockOpen ? 'is-open' : ''}`}>
              <span className="homex-lock">{heroState.lockOpen ? 'Unlocked' : 'Locked'}</span>
              <span>Deposit Required: $89</span>
            </div>

            <div className={`homex-tech ${heroState.techCard ? 'is-on' : ''}`}>
              Tech Assigned - Today 9:00 AM to 11:00 AM
            </div>
          </div>
        </div>
      </section>

      <section className="homex-pain fade-in">
        <p className="section-tag">Reality Check</p>
        <h2 className="section-title">You&apos;re Not Short on Calls. You&apos;re Losing Money on Them.</h2>
        <div className="homex-pain-grid">
          {painItems.map((item) => (
            <article key={item} className="homex-pain-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
        <p className="homex-close">Every one of these is preventable.</p>
      </section>

      <section className="homex-solution fade-in">
        <p className="section-tag">Core Value</p>
        <h2 className="section-title">We Turn Every Call Into a Paid Job — Or Filter It Out.</h2>
        <p className="section-sub">Signmons sits between your phone and your dispatch board, enforcing one rule:</p>
        <p className="homex-rule">No payment. No dispatch.</p>
      </section>

      <section className="homex-flow fade-in" id="how-it-works">
        <p className="section-tag">How It Works</p>
        <h2 className="section-title">From Incoming Call to Paid Job in Seconds</h2>
        <div className="homex-flow-grid">
          {flowSteps.map((step, index) => (
            <article key={step.title} className="homex-step">
              <div className="homex-step-num">{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
        <p className="homex-close">Average time: around 4 seconds from call to decision.</p>
      </section>

      <section className="homex-proof fade-in">
        <p className="section-tag">Proof</p>
        <h2 className="section-title">What Happens When You Control the Call</h2>
        <div className="homex-metrics-grid">
          {metrics.map((metric) => (
            <article key={metric.label} className="homex-metric">
              <p className="homex-metric-value">{metric.value}</p>
              <p className="homex-metric-label">{metric.label}</p>
              <p className="homex-metric-note">{metric.note}</p>
            </article>
          ))}
        </div>
        <p className="homex-footnote">Based on early-access contractors (3 to 12 trucks, Midwest markets).</p>
      </section>

      <section className="homex-compare fade-in">
        <p className="section-tag">Revenue Gate</p>
        <h2 className="section-title">This Is Where Most Companies Lose Money</h2>
        <div className="homex-compare-grid">
          <article>
            <h3>Typical Flow</h3>
            <p>Call -&gt; Estimate -&gt; Dispatch -&gt; Hope they pay</p>
          </article>
          <article>
            <h3>Signmons Flow</h3>
            <p>Call -&gt; Payment -&gt; Dispatch -&gt; Guaranteed revenue</p>
          </article>
        </div>
        <p className="homex-rule">We make sure every job is worth running.</p>
      </section>

      <section className="homex-cta-final fade-in">
        <h2>See Exactly How Much Revenue You&apos;re Losing</h2>
        <p>In one call, we map your workflow and show you what is slipping through.</p>
        <div className="homex-actions homex-actions-center">
          <a className="btn-primary" href="/contact">
            Get Your Revenue Breakdown →
          </a>
          <a className="btn-secondary" href="/demo">
            Watch Real Calls →
          </a>
        </div>
        <p className="homex-footnote">30-day fit check. If we do not hit agreed targets, walk away.</p>
      </section>

      <SiteFooter links={siteFooterLinks} copyright="© 2026 Signmons. All rights reserved." />
    </>
  );
};

export default SiteHome;
