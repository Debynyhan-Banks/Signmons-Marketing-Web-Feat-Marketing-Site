import { useState } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';
import { sitePricingContent } from '../../data/pricingContent';
import useSiteEffects from '../../hooks/useSiteEffects';
import type { SitePricingCompareValue, SitePricingPlan } from '../../types/site';

const renderCompareValue = (value: SitePricingCompareValue) => {
  if (value === 'yes') {
    return <span className="yes">✓</span>;
  }

  if (value === 'no') {
    return <span className="no-icon">✕</span>;
  }

  return <span className="val">{value}</span>;
};

const SitePricing = () => {
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(sitePricingContent.faq.items[0]?.id ?? '');

  useSiteEffects();

  const formatIncludedUsage = (plan: SitePricingPlan) => {
    if (typeof plan.includedCallVolume === 'number') {
      return `Up to ${plan.includedCallVolume.toLocaleString()} AI-handled calls/month`;
    }

    return plan.includedUsageLabel ?? 'Custom volume';
  };

  const formatSetupFee = (plan: SitePricingPlan) => {
    if (plan.setupFeeLabel) {
      return plan.setupFeeLabel;
    }

    return `$${plan.setupFeeAmount.toLocaleString()} one-time setup`;
  };

  const getDisplayedPrice = (plan: SitePricingPlan) => {
    if (plan.customPriceLabel) {
      return {
        priceLabel: plan.customPriceLabel,
        originalLabel: '\u00A0',
        isCustom: true,
      };
    }

    const hasAnnualPrice =
      isAnnualBilling &&
      typeof plan.monthlyPrice === 'number' &&
      typeof plan.annualMonthlyPrice === 'number';

    const monthlyValue = hasAnnualPrice ? plan.annualMonthlyPrice : plan.monthlyPrice;
    const originalLabel =
      hasAnnualPrice && typeof plan.monthlyPrice === 'number'
        ? `$${plan.monthlyPrice}/mo billed annually`
        : '\u00A0';

    return {
      priceLabel: typeof monthlyValue === 'number' ? `$${monthlyValue}` : 'Custom',
      originalLabel,
      isCustom: false,
    };
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId((current) => (current === id ? '' : id));
  };

  return (
    <div className="site-pricing-page">
      <SiteNavigation
        activeLinkId="pricing"
        navLinks={sitePrimaryLinks}
        ctaLabel={sitePricingContent.navCtaLabel}
        ctaHref={sitePricingContent.navCtaHref}
      />

      <SitePageHero
        tag={sitePricingContent.hero.tag}
        title={sitePricingContent.hero.title}
        accent={sitePricingContent.hero.accent}
        subtitle={sitePricingContent.hero.subtitle}
      />

      <div className="pricing-shell">
        <div className="toggle-row fade-in">
          <span className={`toggle-label${!isAnnualBilling ? ' active' : ''}`}>
            {sitePricingContent.billingToggle.monthlyLabel}
          </span>
          <button
            className={`toggle${isAnnualBilling ? ' annual' : ''}`}
            id="billingToggle"
            type="button"
            aria-label="Toggle annual billing"
            aria-pressed={isAnnualBilling}
            onClick={() => setIsAnnualBilling((current) => !current)}
          >
            <div className="toggle-thumb"></div>
          </button>
          <span className={`toggle-label${isAnnualBilling ? ' active' : ''}`}>
            {sitePricingContent.billingToggle.annualLabel}
          </span>
          <span className="save-badge">{sitePricingContent.billingToggle.saveBadge}</span>
        </div>

        <p className="pricing-note fade-in">{sitePricingContent.pricingNote}</p>

        <div className="plans fade-in">
          {sitePricingContent.plans.map((plan) => {
            const displayedPrice = getDisplayedPrice(plan);

            return (
              <article key={plan.id} className={`plan-card${plan.featured ? ' featured' : ''}`}>
                {plan.badge ? <div className="plan-badge">{plan.badge}</div> : null}
                <div className="plan-name">{plan.name}</div>
                <div className="plan-best-for">{plan.bestFor}</div>
                <div className="plan-desc">{plan.description}</div>

                {displayedPrice.isCustom ? (
                  <div className="plan-price plan-price--custom">{displayedPrice.priceLabel}</div>
                ) : (
                  <div className="plan-price">
                    <sup>$</sup>
                    <span>{displayedPrice.priceLabel.replace('$', '')}</span>
                    <span className="per">/mo</span>
                  </div>
                )}

                <div className="plan-original">{displayedPrice.originalLabel}</div>
                <div className="plan-usage">{formatIncludedUsage(plan)}</div>
                <div className="plan-vehicle">{plan.vehicleRange}</div>
                <div className="plan-overage">Overage: {plan.overagePolicy}</div>
                <div className="plan-setup">{formatSetupFee(plan)}</div>

                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={`${plan.id}-${feature.id}`}>
                      <span className="ck">✓</span> {feature.label}
                    </li>
                  ))}
                </ul>

                <a href={plan.ctaHref} className={plan.ctaClassName}>
                  {plan.ctaLabel}
                </a>
              </article>
            );
          })}
        </div>

        <section className="compare-section fade-in">
          <p className="section-tag">{sitePricingContent.compare.tag}</p>
          <h2 className="section-title">{sitePricingContent.compare.title}</h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Growth</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {sitePricingContent.compare.rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.feature}</td>
                  <td>{renderCompareValue(row.starter)}</td>
                  <td>{renderCompareValue(row.growth)}</td>
                  <td>{renderCompareValue(row.pro)}</td>
                  <td>{renderCompareValue(row.enterprise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="addons-section fade-in">
          <p className="section-tag">{sitePricingContent.addOns.tag}</p>
          <h2 className="section-title">{sitePricingContent.addOns.title}</h2>
          <p className="section-sub">{sitePricingContent.addOns.subtitle}</p>
          <div className="addons-grid">
            {sitePricingContent.addOns.items.map((item) => (
              <article key={item.id} className="addon-card">
                <h3>{item.title}</h3>
                <p className="addon-price">{item.price}</p>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          {sitePricingContent.addOns.note ? <p className="addons-note">{sitePricingContent.addOns.note}</p> : null}
        </section>

        <section className="faq-section fade-in">
          <p className="section-tag">{sitePricingContent.faq.tag}</p>
          <h2 className="section-title">{sitePricingContent.faq.title}</h2>
          {sitePricingContent.faq.items.map((item) => {
            const isOpen = openFaqId === item.id;

            return (
              <article key={item.id} className={`faq-item${isOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                >
                  <span>{item.question}</span>
                  <span className="faq-arrow">▾</span>
                </button>
                <div id={`faq-panel-${item.id}`} className="faq-a" hidden={!isOpen}>
                  {item.answer}
                </div>
              </article>
            );
          })}
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={sitePricingContent.footerCopyright} />
    </div>
  );
};

export default SitePricing;
