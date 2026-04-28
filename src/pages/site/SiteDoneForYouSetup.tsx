import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteDoneForYouContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const SiteDoneForYouSetup = () => {
  useSiteEffects();

  return (
    <div className="site-setup-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteDoneForYouContent.navCtaLabel}
        ctaHref={siteDoneForYouContent.navCtaHref}
      />

      <SitePageHero
        tag={siteDoneForYouContent.hero.tag}
        title={siteDoneForYouContent.hero.title}
        accent={siteDoneForYouContent.hero.accent}
        subtitle={siteDoneForYouContent.hero.subtitle}
      />

      <div className="setup-shell">
        <section className="setup-pillars fade-in">
          <p className="section-tag">{siteDoneForYouContent.pillars.tag}</p>
          <h2 className="section-title">{siteDoneForYouContent.pillars.title}</h2>
          <p className="section-sub">{siteDoneForYouContent.pillars.subtitle}</p>

          <div className="setup-card-grid">
            {siteDoneForYouContent.pillars.items.map((item) => (
              <article key={item.id} className="setup-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="setup-rollout fade-in">
          <p className="section-tag">{siteDoneForYouContent.rollout.tag}</p>
          <h2 className="section-title">{siteDoneForYouContent.rollout.title}</h2>
          <p className="section-sub">{siteDoneForYouContent.rollout.subtitle}</p>

          <div className="setup-rollout-list">
            {siteDoneForYouContent.rollout.steps.map((step) => (
              <article key={step.id} className="setup-rollout-item">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="setup-deliverables fade-in">
          <p className="section-tag">{siteDoneForYouContent.deliverables.tag}</p>
          <h2 className="section-title">{siteDoneForYouContent.deliverables.title}</h2>
          <ul>
            {siteDoneForYouContent.deliverables.items.map((item) => (
              <li key={item.id}>
                <span className="ck">✓</span>
                {item.label}
              </li>
            ))}
          </ul>
        </section>

        <section className="setup-cta fade-in">
          <h2>{siteDoneForYouContent.cta.title}</h2>
          <p>{siteDoneForYouContent.cta.subtitle}</p>
          <div className="setup-cta-actions">
            <a href={siteDoneForYouContent.cta.primaryHref} className="btn-primary">
              {siteDoneForYouContent.cta.primaryLabel}
            </a>
            <a href={siteDoneForYouContent.cta.secondaryHref} className="btn-secondary">
              {siteDoneForYouContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteDoneForYouContent.footerCopyright} />
    </div>
  );
};

export default SiteDoneForYouSetup;
