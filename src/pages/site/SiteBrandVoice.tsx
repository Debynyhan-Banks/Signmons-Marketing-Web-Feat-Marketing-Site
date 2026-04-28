import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteBrandVoiceContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const SiteBrandVoice = () => {
  useSiteEffects();

  return (
    <div className="site-brand-voice-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteBrandVoiceContent.navCtaLabel}
        ctaHref={siteBrandVoiceContent.navCtaHref}
      />

      <SitePageHero
        tag={siteBrandVoiceContent.hero.tag}
        title={siteBrandVoiceContent.hero.title}
        accent={siteBrandVoiceContent.hero.accent}
        subtitle={siteBrandVoiceContent.hero.subtitle}
      />

      <div className="brand-voice-shell">
        <section className="brand-voice-controls fade-in">
          <p className="section-tag">{siteBrandVoiceContent.controls.tag}</p>
          <h2 className="section-title">{siteBrandVoiceContent.controls.title}</h2>
          <p className="section-sub">{siteBrandVoiceContent.controls.subtitle}</p>

          <div className="brand-voice-control-grid">
            {siteBrandVoiceContent.controls.items.map((item) => (
              <article key={item.id} className="brand-voice-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="brand-voice-card-example">{item.example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="brand-voice-fallback fade-in">
          <p className="section-tag">{siteBrandVoiceContent.humanFallback.tag}</p>
          <h2 className="section-title">{siteBrandVoiceContent.humanFallback.title}</h2>
          <p className="section-sub">{siteBrandVoiceContent.humanFallback.subtitle}</p>

          <ul className="brand-voice-fallback-list">
            {siteBrandVoiceContent.humanFallback.triggers.map((trigger) => (
              <li key={trigger.id}>
                <span className="ck">→</span>
                {trigger.label}
              </li>
            ))}
          </ul>

          <p className="brand-voice-fallback-note">{siteBrandVoiceContent.humanFallback.note}</p>
        </section>

        <section className="brand-voice-governance fade-in">
          <p className="section-tag">{siteBrandVoiceContent.governance.tag}</p>
          <h2 className="section-title">{siteBrandVoiceContent.governance.title}</h2>
          <ul>
            {siteBrandVoiceContent.governance.points.map((point) => (
              <li key={point}>
                <span className="ck">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="brand-voice-cta fade-in">
          <h2>{siteBrandVoiceContent.cta.title}</h2>
          <p>{siteBrandVoiceContent.cta.subtitle}</p>
          <div className="brand-voice-cta-actions">
            <a href={siteBrandVoiceContent.cta.primaryHref} className="btn-primary">
              {siteBrandVoiceContent.cta.primaryLabel}
            </a>
            <a href={siteBrandVoiceContent.cta.secondaryHref} className="btn-secondary">
              {siteBrandVoiceContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteBrandVoiceContent.footerCopyright} />
    </div>
  );
};

export default SiteBrandVoice;
