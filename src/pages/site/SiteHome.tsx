import { useState, type KeyboardEvent } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import useSiteEffects from '../../hooks/useSiteEffects';
import { siteFooterLinks, siteHomeContent, sitePrimaryLinks } from '../../data/siteContent';

const SiteHome = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { hero, phoneMock, features, demoSection, process, proof, pricing, earlyAccess } = siteHomeContent;

  useSiteEffects({ smoothAnchors: true });

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleVideoPlay();
    }
  };

  return (
    <>
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteHomeContent.navCtaLabel}
        ctaHref={siteHomeContent.navCtaHref}
      />

      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-badge">
          <span className="badge-dot"></span>
          {hero.badge}
        </div>

        <h1>
          {hero.title}
          <br />
          <span className="accent">{hero.accent}</span>
        </h1>

        <p>{hero.lead}</p>

        <div className="hero-actions">
          <a href={hero.primaryCtaHref} className="btn-primary">
            {hero.primaryCtaLabel}
          </a>
          <a href={hero.secondaryCtaHref} className="btn-secondary">
            {hero.secondaryCtaLabel}
          </a>
        </div>

        <p className="trust-line">
          {hero.trustLead} <span>{hero.trustAccent}</span>
        </p>

        <div className="phone-mockup">
          <div className="phone-notch"></div>
          <div className="phone-screen">
            <div className="phone-status">{phoneMock.status}</div>
            {phoneMock.bubbles.map((bubble, index) => (
              <div key={bubble} className={`chat-bubble${index === 1 ? ' right' : ''}`}>
                {bubble}
              </div>
            ))}
            <div className="chat-bubble system">{phoneMock.confirmation}</div>
          </div>
        </div>

        <div className="orbit-wrap orbit-wrap--hero" aria-hidden="true">
          <div className="orbit-ring orbit-ring-1"></div>
          <div className="orbit-ring orbit-ring-2"></div>
          <div className="orbit-core">🤖</div>
        </div>
      </section>

      <section className="features fade-in">
        <p className="section-tag">{features.tag}</p>
        <h2 className="section-title">
          Everything Your Business
          <br />
          Needs to Scale
        </h2>
        <p className="section-sub">{features.subtitle}</p>

        <div className="features-grid">
          {features.items.map((item) => (
            <div key={item.id} className="feat-card">
              <div className="feat-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="demo-section fade-in" id="demo">
        <p className="section-tag">{demoSection.tag}</p>
        <h2 className="section-title">
          {demoSection.title}
          <br />
          <span className="demo-title-accent">{demoSection.accent}</span>
        </h2>
        <p className="section-sub demo-sub-center">{demoSection.subtitle}</p>

        <div className="video-outer">
          <div className="video-glow"></div>
          <div
            className={`video-frame${isVideoPlaying ? ' playing' : ''}`}
            role="button"
            tabIndex={0}
            aria-label="Play demo video"
            onClick={handleVideoPlay}
            onKeyDown={handleVideoKeyDown}
          >
            <div className="video-placeholder">
              <div className="video-placeholder-grid"></div>
              <div className="play-ring">
                <span className="play-icon">▶</span>
              </div>
              <p className="video-label">
                Watch the <strong>2:47 demo</strong>
              </p>
            </div>
            <iframe
              title="Signmons demo video"
              src={isVideoPlaying ? demoSection.videoUrl : ''}
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="demo-chips">
          {demoSection.chips.map((chip) => (
            <div key={chip.id} className="demo-chip">
              <span>✓</span> {chip.text}
            </div>
          ))}
        </div>
      </section>

      <section className="how fade-in" id={process.id}>
        <p className="section-tag">{process.tag}</p>
        <h2 className="section-title">
          Live in Minutes,
          <br />
          Earning in Hours
        </h2>
        <p className="section-sub">{process.subtitle}</p>

        <div className="steps">
          {process.steps.map((step, index) => (
            <div key={step.id} className="step">
              <div className="step-num">{index + 1}</div>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="proof fade-in">
        <p className="section-tag">{proof.tag}</p>
        <h2 className="section-title">
          Numbers That Move
          <br />
          the Needle
        </h2>

        <div className="stat-row">
          {proof.stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="testimonial">
          <p>{proof.testimonial.quote}</p>
          <div className="testimonial-author">
            <div className="avatar">{proof.testimonial.initials}</div>
            <div className="author-info">
              <strong>{proof.testimonial.author}</strong>
              <span>{proof.testimonial.role}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing fade-in" id={pricing.id}>
        <p className="section-tag">{pricing.tag}</p>
        <h2 className="section-title">{pricing.title}</h2>
        <p className="section-sub">{pricing.subtitle}</p>

        {pricing.plans.map((plan) => (
          <div key={plan.id} className={`plan-card${plan.featured ? ' featured' : ''}`}>
            {plan.badge ? <div className="plan-badge">{plan.badge}</div> : null}
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.price}</div>
            <div className="plan-desc">{plan.description}</div>
            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={`${plan.id}-${feature}`}>
                  <span className="check">✓</span> {feature}
                </li>
              ))}
            </ul>
            <a href={plan.ctaHref} className={`${plan.ctaClassName} plan-cta`}>
              {plan.ctaLabel}
            </a>
          </div>
        ))}
      </section>

      <section className="cta-section fade-in" id={earlyAccess.id}>
        <div className="cta-box">
          <p className="section-tag">{earlyAccess.tag}</p>
          <h2>
            {earlyAccess.title}
            <br />
            <span className="cta-title-accent">{earlyAccess.accent}</span>
          </h2>
          <p>{earlyAccess.subtitle}</p>

          <div className="cta-input-wrap">
            <input type="tel" placeholder={earlyAccess.inputPlaceholder} className="cta-input" />
            <a href={earlyAccess.ctaHref} className="btn-primary">
              {earlyAccess.ctaLabel}
            </a>
          </div>

          <p className="cta-note">{earlyAccess.note}</p>
        </div>

        <div className="industries industries--cta">
          {earlyAccess.industries.map((industry) => (
            <span key={industry.id} className="industry-tag">
              {industry.label}
            </span>
          ))}
        </div>
      </section>

      <SiteFooter links={siteFooterLinks} copyright={siteHomeContent.footerCopyright} />
    </>
  );
};

export default SiteHome;
