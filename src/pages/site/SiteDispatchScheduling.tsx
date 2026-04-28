import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteDispatchSchedulingContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const SiteDispatchScheduling = () => {
  useSiteEffects();

  return (
    <div className="site-dispatch-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteDispatchSchedulingContent.navCtaLabel}
        ctaHref={siteDispatchSchedulingContent.navCtaHref}
      />

      <SitePageHero
        tag={siteDispatchSchedulingContent.hero.tag}
        title={siteDispatchSchedulingContent.hero.title}
        accent={siteDispatchSchedulingContent.hero.accent}
        subtitle={siteDispatchSchedulingContent.hero.subtitle}
      />

      <div className="dispatch-shell">
        <section className="dispatch-board fade-in">
          <p className="section-tag">{siteDispatchSchedulingContent.board.tag}</p>
          <h2 className="section-title">{siteDispatchSchedulingContent.board.title}</h2>
          <p className="section-sub">{siteDispatchSchedulingContent.board.subtitle}</p>

          <div className="dispatch-board-grid">
            {siteDispatchSchedulingContent.board.lanes.map((lane) => (
              <article key={lane.id} className="dispatch-board-card">
                <h3>{lane.title}</h3>
                <p>{lane.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dispatch-routing fade-in">
          <p className="section-tag">{siteDispatchSchedulingContent.routing.tag}</p>
          <h2 className="section-title">{siteDispatchSchedulingContent.routing.title}</h2>
          <p className="section-sub">{siteDispatchSchedulingContent.routing.subtitle}</p>

          <div className="dispatch-routing-list">
            {siteDispatchSchedulingContent.routing.rules.map((rule) => (
              <article key={rule.id} className="dispatch-routing-item">
                <h3>{rule.condition}</h3>
                <p>{rule.action}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dispatch-status fade-in">
          <p className="section-tag">{siteDispatchSchedulingContent.statusFlow.tag}</p>
          <h2 className="section-title">{siteDispatchSchedulingContent.statusFlow.title}</h2>

          <div className="dispatch-status-grid">
            {siteDispatchSchedulingContent.statusFlow.steps.map((step) => (
              <article key={step.id} className="dispatch-status-card">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dispatch-governance fade-in">
          <p className="section-tag">{siteDispatchSchedulingContent.governance.tag}</p>
          <h2 className="section-title">{siteDispatchSchedulingContent.governance.title}</h2>
          <ul>
            {siteDispatchSchedulingContent.governance.points.map((point) => (
              <li key={point}>
                <span className="ck">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="dispatch-cta fade-in">
          <h2>{siteDispatchSchedulingContent.cta.title}</h2>
          <p>{siteDispatchSchedulingContent.cta.subtitle}</p>
          <div className="dispatch-cta-actions">
            <a href={siteDispatchSchedulingContent.cta.primaryHref} className="btn-primary">
              {siteDispatchSchedulingContent.cta.primaryLabel}
            </a>
            <a href={siteDispatchSchedulingContent.cta.secondaryHref} className="btn-secondary">
              {siteDispatchSchedulingContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteDispatchSchedulingContent.footerCopyright} />
    </div>
  );
};

export default SiteDispatchScheduling;
