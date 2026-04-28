import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteBusinessRulesContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const SiteBusinessRules = () => {
  useSiteEffects();

  return (
    <div className="site-business-rules-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteBusinessRulesContent.navCtaLabel}
        ctaHref={siteBusinessRulesContent.navCtaHref}
      />

      <SitePageHero
        tag={siteBusinessRulesContent.hero.tag}
        title={siteBusinessRulesContent.hero.title}
        accent={siteBusinessRulesContent.hero.accent}
        subtitle={siteBusinessRulesContent.hero.subtitle}
      />

      <div className="rules-shell">
        <section className="rules-types fade-in">
          <p className="section-tag">{siteBusinessRulesContent.ruleTypes.tag}</p>
          <h2 className="section-title">{siteBusinessRulesContent.ruleTypes.title}</h2>
          <p className="section-sub">{siteBusinessRulesContent.ruleTypes.subtitle}</p>

          <div className="rules-type-grid">
            {siteBusinessRulesContent.ruleTypes.items.map((item) => (
              <article key={item.id} className="rules-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rules-examples fade-in">
          <p className="section-tag">{siteBusinessRulesContent.examples.tag}</p>
          <h2 className="section-title">{siteBusinessRulesContent.examples.title}</h2>

          <div className="rules-example-list">
            {siteBusinessRulesContent.examples.items.map((item) => (
              <article key={item.id} className="rules-example-item">
                <h3>{item.condition}</h3>
                <p>{item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rules-governance fade-in">
          <p className="section-tag">{siteBusinessRulesContent.governance.tag}</p>
          <h2 className="section-title">{siteBusinessRulesContent.governance.title}</h2>
          <ul>
            {siteBusinessRulesContent.governance.points.map((point) => (
              <li key={point}>
                <span className="ck">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="rules-cta fade-in">
          <h2>{siteBusinessRulesContent.cta.title}</h2>
          <p>{siteBusinessRulesContent.cta.subtitle}</p>
          <div className="rules-cta-actions">
            <a href={siteBusinessRulesContent.cta.primaryHref} className="btn-primary">
              {siteBusinessRulesContent.cta.primaryLabel}
            </a>
            <a href={siteBusinessRulesContent.cta.secondaryHref} className="btn-secondary">
              {siteBusinessRulesContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteBusinessRulesContent.footerCopyright} />
    </div>
  );
};

export default SiteBusinessRules;
