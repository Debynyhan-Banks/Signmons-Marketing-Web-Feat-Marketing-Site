import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteFooterLinks, sitePrimaryLinks, siteRevenueDashboardContent } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const SiteRevenueDashboard = () => {
  useSiteEffects();

  return (
    <div className="site-revenue-dashboard-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteRevenueDashboardContent.navCtaLabel}
        ctaHref={siteRevenueDashboardContent.navCtaHref}
      />

      <SitePageHero
        tag={siteRevenueDashboardContent.hero.tag}
        title={siteRevenueDashboardContent.hero.title}
        accent={siteRevenueDashboardContent.hero.accent}
        subtitle={siteRevenueDashboardContent.hero.subtitle}
      />

      <div className="revenue-dashboard-shell">
        <section className="revenue-metrics fade-in">
          <p className="section-tag">{siteRevenueDashboardContent.metrics.tag}</p>
          <h2 className="section-title">{siteRevenueDashboardContent.metrics.title}</h2>
          <p className="section-sub">{siteRevenueDashboardContent.metrics.subtitle}</p>

          <div className="revenue-metric-grid">
            {siteRevenueDashboardContent.metrics.items.map((item) => (
              <article key={item.id} className="revenue-metric-card">
                <p className="revenue-metric-label">{item.label}</p>
                <p className="revenue-metric-value">{item.value}</p>
                <p className="revenue-metric-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="revenue-funnel fade-in">
          <p className="section-tag">{siteRevenueDashboardContent.funnel.tag}</p>
          <h2 className="section-title">{siteRevenueDashboardContent.funnel.title}</h2>

          <div className="revenue-funnel-grid">
            {siteRevenueDashboardContent.funnel.steps.map((step) => (
              <article key={step.id} className="revenue-funnel-card">
                <h3>{step.stage}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="revenue-quality fade-in">
          <p className="section-tag">{siteRevenueDashboardContent.quality.tag}</p>
          <h2 className="section-title">{siteRevenueDashboardContent.quality.title}</h2>
          <ul>
            {siteRevenueDashboardContent.quality.points.map((point) => (
              <li key={point}>
                <span className="ck">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="revenue-cta fade-in">
          <h2>{siteRevenueDashboardContent.cta.title}</h2>
          <p>{siteRevenueDashboardContent.cta.subtitle}</p>
          <div className="revenue-cta-actions">
            <a href={siteRevenueDashboardContent.cta.primaryHref} className="btn-primary">
              {siteRevenueDashboardContent.cta.primaryLabel}
            </a>
            <a href={siteRevenueDashboardContent.cta.secondaryHref} className="btn-secondary">
              {siteRevenueDashboardContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteRevenueDashboardContent.footerCopyright} />
    </div>
  );
};

export default SiteRevenueDashboard;
