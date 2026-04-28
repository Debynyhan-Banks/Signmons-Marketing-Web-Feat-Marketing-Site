import { useMemo, useState } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { siteFooterLinks, sitePrimaryLinks, siteRoiCalculatorContent } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';

const roundCurrency = (value: number) => Math.max(0, Math.round(value));

const SiteRoiCalculator = () => {
  useSiteEffects();

  const preset = siteRoiCalculatorContent.calculator.preset;

  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(preset.missedCallsPerWeek);
  const [averageTicketValue, setAverageTicketValue] = useState(preset.averageTicketValue);
  const [closeRatePercent, setCloseRatePercent] = useState(preset.closeRatePercent);
  const [emergencySharePercent, setEmergencySharePercent] = useState(preset.emergencySharePercent);
  const [monthlyCallVolume, setMonthlyCallVolume] = useState(preset.monthlyCallVolume);
  const [depositAmount, setDepositAmount] = useState(preset.depositAmount);

  const model = useMemo(() => {
    const closeRate = closeRatePercent / 100;
    const emergencyShare = emergencySharePercent / 100;

    const recoveredJobsPerMonth = missedCallsPerWeek * 4.33 * closeRate;
    const baseRevenueRecovered = recoveredJobsPerMonth * averageTicketValue;
    const emergencyUplift = baseRevenueRecovered * emergencyShare * 0.15;
    const depositCapture = monthlyCallVolume * 0.35 * depositAmount;
    const totalProjectedValue = baseRevenueRecovered + emergencyUplift + depositCapture;

    return {
      recoveredJobsPerMonth,
      baseRevenueRecovered,
      emergencyUplift,
      depositCapture,
      totalProjectedValue,
    };
  }, [missedCallsPerWeek, averageTicketValue, closeRatePercent, emergencySharePercent, monthlyCallVolume, depositAmount]);

  return (
    <div className="site-roi-page">
      <SiteNavigation
        navLinks={sitePrimaryLinks}
        ctaLabel={siteRoiCalculatorContent.navCtaLabel}
        ctaHref={siteRoiCalculatorContent.navCtaHref}
      />

      <SitePageHero
        tag={siteRoiCalculatorContent.hero.tag}
        title={siteRoiCalculatorContent.hero.title}
        accent={siteRoiCalculatorContent.hero.accent}
        subtitle={siteRoiCalculatorContent.hero.subtitle}
      />

      <div className="roi-shell">
        <section className="roi-calculator fade-in">
          <p className="section-tag">{siteRoiCalculatorContent.calculator.tag}</p>
          <h2 className="section-title">{siteRoiCalculatorContent.calculator.title}</h2>
          <p className="section-sub">{siteRoiCalculatorContent.calculator.subtitle}</p>

          <div className="roi-grid">
            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.missedCallsPerWeekLabel}</span>
              <input type="number" min={0} value={missedCallsPerWeek} onChange={(event) => setMissedCallsPerWeek(Number(event.target.value) || 0)} />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.averageTicketValueLabel}</span>
              <input type="number" min={0} value={averageTicketValue} onChange={(event) => setAverageTicketValue(Number(event.target.value) || 0)} />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.closeRatePercentLabel}</span>
              <input type="number" min={0} max={100} value={closeRatePercent} onChange={(event) => setCloseRatePercent(Number(event.target.value) || 0)} />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.emergencySharePercentLabel}</span>
              <input type="number" min={0} max={100} value={emergencySharePercent} onChange={(event) => setEmergencySharePercent(Number(event.target.value) || 0)} />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.monthlyCallVolumeLabel}</span>
              <input type="number" min={0} value={monthlyCallVolume} onChange={(event) => setMonthlyCallVolume(Number(event.target.value) || 0)} />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.depositAmountLabel}</span>
              <input type="number" min={0} value={depositAmount} onChange={(event) => setDepositAmount(Number(event.target.value) || 0)} />
            </label>
          </div>
        </section>

        <section className="roi-results fade-in" aria-live="polite">
          <h2 className="section-title">Projected Monthly Impact</h2>

          <div className="roi-result-grid">
            <article className="roi-result-card">
              <p className="roi-result-label">Recovered jobs/month</p>
              <p className="roi-result-value">{model.recoveredJobsPerMonth.toFixed(1)}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Revenue recovered</p>
              <p className="roi-result-value">${roundCurrency(model.baseRevenueRecovered).toLocaleString()}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Emergency uplift</p>
              <p className="roi-result-value">${roundCurrency(model.emergencyUplift).toLocaleString()}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Deposit capture</p>
              <p className="roi-result-value">${roundCurrency(model.depositCapture).toLocaleString()}</p>
            </article>
            <article className="roi-result-card roi-result-card--total">
              <p className="roi-result-label">Total projected value</p>
              <p className="roi-result-value">${roundCurrency(model.totalProjectedValue).toLocaleString()}</p>
            </article>
          </div>
        </section>

        <section className="roi-assumptions fade-in">
          <p className="section-tag">{siteRoiCalculatorContent.assumptions.tag}</p>
          <h2 className="section-title">{siteRoiCalculatorContent.assumptions.title}</h2>
          <ul>
            {siteRoiCalculatorContent.assumptions.points.map((point) => (
              <li key={point}>
                <span className="ck">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="roi-cta fade-in">
          <h2>{siteRoiCalculatorContent.cta.title}</h2>
          <p>{siteRoiCalculatorContent.cta.subtitle}</p>
          <div className="roi-cta-actions">
            <a href={siteRoiCalculatorContent.cta.primaryHref} className="btn-primary">
              {siteRoiCalculatorContent.cta.primaryLabel}
            </a>
            <a href={siteRoiCalculatorContent.cta.secondaryHref} className="btn-secondary">
              {siteRoiCalculatorContent.cta.secondaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteRoiCalculatorContent.footerCopyright} />
    </div>
  );
};

export default SiteRoiCalculator;
