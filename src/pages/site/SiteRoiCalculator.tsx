import { useMemo, useState } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import { sitePricingPlans } from '../../data/pricingContent';
import { siteFooterLinks, sitePrimaryLinks, siteRoiCalculatorContent } from '../../data/siteContent';
import useSiteEffects from '../../hooks/useSiteEffects';
import type { SitePricingPlanId } from '../../types/site';

type CalculatorPlanId = Exclude<SitePricingPlanId, 'enterprise'>;

const calculatorPlans = sitePricingPlans.filter(
  (plan): plan is (typeof sitePricingPlans)[number] & { id: CalculatorPlanId; monthlyPrice: number } =>
    plan.id !== 'enterprise' && typeof plan.monthlyPrice === 'number',
);

const roundCurrency = (value: number) => Math.max(0, Math.round(value));
const clampPercent = (value: number) => Math.min(100, Math.max(0, value));

const SiteRoiCalculator = () => {
  useSiteEffects();

  const preset = siteRoiCalculatorContent.calculator.preset;

  const [planId, setPlanId] = useState<CalculatorPlanId>(preset.planId);
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(preset.missedCallsPerWeek);
  const [recoveryRatePercent, setRecoveryRatePercent] = useState(preset.recoveryRatePercent);
  const [bookingRatePercent, setBookingRatePercent] = useState(preset.bookingRatePercent);
  const [completionRatePercent, setCompletionRatePercent] = useState(preset.completionRatePercent);
  const [averageCompletedJobValue, setAverageCompletedJobValue] = useState(preset.averageCompletedJobValue);
  const [monthlyCallVolume, setMonthlyCallVolume] = useState(preset.monthlyCallVolume);

  const model = useMemo(() => {
    const plan = calculatorPlans.find((item) => item.id === planId) ?? calculatorPlans[0];
    const recoveredLeadsPerMonth = missedCallsPerWeek * 4.33 * (recoveryRatePercent / 100);
    const bookedJobsPerMonth = recoveredLeadsPerMonth * (bookingRatePercent / 100);
    const completedJobsPerMonth = bookedJobsPerMonth * (completionRatePercent / 100);
    const grossRevenueOpportunity = completedJobsPerMonth * averageCompletedJobValue;

    const includedCalls = plan?.includedCallVolume ?? 0;
    const callsAboveGuidance = Math.max(0, monthlyCallVolume - includedCalls);
    const monthlyPlanCost = plan?.monthlyPrice ?? 0;

    return {
      plan,
      recoveredLeadsPerMonth,
      bookedJobsPerMonth,
      completedJobsPerMonth,
      grossRevenueOpportunity,
      includedCalls,
      callsAboveGuidance,
      monthlyPlanCost,
      netRevenueOpportunity: Math.max(0, grossRevenueOpportunity - monthlyPlanCost),
    };
  }, [
    planId,
    missedCallsPerWeek,
    recoveryRatePercent,
    bookingRatePercent,
    completionRatePercent,
    averageCompletedJobValue,
    monthlyCallVolume,
  ]);

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
              <span>{siteRoiCalculatorContent.calculator.fields.planLabel}</span>
              <select value={planId} onChange={(event) => setPlanId(event.target.value as CalculatorPlanId)}>
                {calculatorPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} — ${plan.monthlyPrice.toLocaleString()}/month
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.monthlyCallVolumeLabel}</span>
              <input
                type="number"
                min={0}
                value={monthlyCallVolume}
                onChange={(event) => setMonthlyCallVolume(Math.max(0, Number(event.target.value) || 0))}
              />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.missedCallsPerWeekLabel}</span>
              <input
                type="number"
                min={0}
                value={missedCallsPerWeek}
                onChange={(event) => setMissedCallsPerWeek(Math.max(0, Number(event.target.value) || 0))}
              />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.recoveryRatePercentLabel}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={recoveryRatePercent}
                onChange={(event) => setRecoveryRatePercent(clampPercent(Number(event.target.value) || 0))}
              />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.bookingRatePercentLabel}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={bookingRatePercent}
                onChange={(event) => setBookingRatePercent(clampPercent(Number(event.target.value) || 0))}
              />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.completionRatePercentLabel}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={completionRatePercent}
                onChange={(event) => setCompletionRatePercent(clampPercent(Number(event.target.value) || 0))}
              />
            </label>

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.averageCompletedJobValueLabel}</span>
              <input
                type="number"
                min={0}
                value={averageCompletedJobValue}
                onChange={(event) => setAverageCompletedJobValue(Math.max(0, Number(event.target.value) || 0))}
              />
            </label>

          </div>
        </section>

        <section className="roi-results fade-in" aria-live="polite" aria-describedby="roi-estimate-disclosure">
          <p className="section-tag">Planning Estimate</p>
          <h2 className="section-title">Projected Monthly Impact</h2>

          <div className="roi-result-grid">
            <article className="roi-result-card">
              <p className="roi-result-label">Recovered leads</p>
              <p className="roi-result-value">{model.recoveredLeadsPerMonth.toFixed(1)}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Booked jobs</p>
              <p className="roi-result-value">{model.bookedJobsPerMonth.toFixed(1)}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Completed jobs</p>
              <p className="roi-result-value">{model.completedJobsPerMonth.toFixed(1)}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Gross revenue opportunity</p>
              <p className="roi-result-value">${roundCurrency(model.grossRevenueOpportunity).toLocaleString()}</p>
            </article>
            <article className="roi-result-card">
              <p className="roi-result-label">Estimated monthly plan cost</p>
              <p className="roi-result-value">${roundCurrency(model.monthlyPlanCost).toLocaleString()}</p>
              <p className="roi-result-detail">
                {model.callsAboveGuidance > 0
                  ? `${model.callsAboveGuidance.toLocaleString()} calls above plan guidance; fixed price unchanged and a plan review is recommended.`
                  : `Within the plan's approximately ${model.includedCalls.toLocaleString()}-call monthly guidance.`}
              </p>
            </article>
            <article className="roi-result-card roi-result-card--total">
              <p className="roi-result-label">Net revenue opportunity</p>
              <p className="roi-result-value">${roundCurrency(model.netRevenueOpportunity).toLocaleString()}</p>
              <p className="roi-result-detail">
                No setup, metered overage, booked-job, emergency-capture, or revenue-share fees.
              </p>
            </article>
          </div>

          <p id="roi-estimate-disclosure" className="roi-disclosure">
            {siteRoiCalculatorContent.disclosure}
          </p>
        </section>

        <div className="roi-policy-grid">
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

          <section className="roi-billable fade-in">
            <p className="section-tag">{siteRoiCalculatorContent.subscription.tag}</p>
            <h2 className="section-title">{siteRoiCalculatorContent.subscription.title}</h2>
            <ul>
              {siteRoiCalculatorContent.subscription.points.map((point) => (
                <li key={point}>
                  <span className="ck">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="roi-cta fade-in">
          <h2>{siteRoiCalculatorContent.cta.title}</h2>
          <p>{siteRoiCalculatorContent.cta.subtitle}</p>
          <div className="roi-cta-actions">
            <a href={siteRoiCalculatorContent.cta.primaryHref} className="btn-primary">
              {siteRoiCalculatorContent.cta.primaryLabel}
            </a>
          </div>
        </section>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteRoiCalculatorContent.footerCopyright} />
    </div>
  );
};

export default SiteRoiCalculator;
