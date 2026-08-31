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
  const [emergencySharePercent, setEmergencySharePercent] = useState(preset.emergencySharePercent);
  const [monthlyCallVolume, setMonthlyCallVolume] = useState(preset.monthlyCallVolume);
  const [performanceFeesEnabled, setPerformanceFeesEnabled] = useState(preset.performanceFeesEnabled);
  const [qualifiedBookedJobFee, setQualifiedBookedJobFee] = useState(preset.qualifiedBookedJobFee);
  const [emergencyCapturedJobFee, setEmergencyCapturedJobFee] = useState(preset.emergencyCapturedJobFee);

  const model = useMemo(() => {
    const plan = calculatorPlans.find((item) => item.id === planId) ?? calculatorPlans[0];
    const recoveredLeadsPerMonth = missedCallsPerWeek * 4.33 * (recoveryRatePercent / 100);
    const bookedJobsPerMonth = recoveredLeadsPerMonth * (bookingRatePercent / 100);
    const completedJobsPerMonth = bookedJobsPerMonth * (completionRatePercent / 100);
    const grossRevenueOpportunity = completedJobsPerMonth * averageCompletedJobValue;
    const emergencyCapturedJobs = bookedJobsPerMonth * (emergencySharePercent / 100);

    const includedCalls = plan?.includedCallVolume ?? 0;
    const overageCalls = Math.max(0, monthlyCallVolume - includedCalls);
    const overageBlockSize = plan?.overageBlockSizeCalls ?? 1;
    const overageBlocks = Math.ceil(overageCalls / overageBlockSize);
    const overageCost = overageBlocks * (plan?.overageBlockPrice ?? 0);
    const performanceFeeCost = performanceFeesEnabled
      ? bookedJobsPerMonth * qualifiedBookedJobFee + emergencyCapturedJobs * emergencyCapturedJobFee
      : 0;
    const monthlyPlanCost = (plan?.monthlyPrice ?? 0) + overageCost + performanceFeeCost;

    return {
      plan,
      recoveredLeadsPerMonth,
      bookedJobsPerMonth,
      completedJobsPerMonth,
      grossRevenueOpportunity,
      overageCalls,
      overageCost,
      performanceFeeCost,
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
    emergencySharePercent,
    monthlyCallVolume,
    performanceFeesEnabled,
    qualifiedBookedJobFee,
    emergencyCapturedJobFee,
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

            <label>
              <span>{siteRoiCalculatorContent.calculator.fields.emergencySharePercentLabel}</span>
              <input
                type="number"
                min={0}
                max={100}
                value={emergencySharePercent}
                onChange={(event) => setEmergencySharePercent(clampPercent(Number(event.target.value) || 0))}
              />
            </label>
          </div>

          <fieldset className="roi-performance-policy">
            <label className="roi-policy-toggle">
              <input
                type="checkbox"
                checked={performanceFeesEnabled}
                onChange={(event) => setPerformanceFeesEnabled(event.target.checked)}
              />
              <span>{siteRoiCalculatorContent.calculator.fields.performanceFeesEnabledLabel}</span>
            </label>

            {performanceFeesEnabled ? (
              <div className="roi-grid roi-grid--policy">
                <label>
                  <span>{siteRoiCalculatorContent.calculator.fields.qualifiedBookedJobFeeLabel}</span>
                  <input
                    type="number"
                    min={0}
                    value={qualifiedBookedJobFee}
                    onChange={(event) => setQualifiedBookedJobFee(Math.max(0, Number(event.target.value) || 0))}
                  />
                </label>
                <label>
                  <span>{siteRoiCalculatorContent.calculator.fields.emergencyCapturedJobFeeLabel}</span>
                  <input
                    type="number"
                    min={0}
                    value={emergencyCapturedJobFee}
                    onChange={(event) => setEmergencyCapturedJobFee(Math.max(0, Number(event.target.value) || 0))}
                  />
                </label>
              </div>
            ) : (
              <p>Disabled by default. No booked-job or emergency-capture fees are included in this estimate.</p>
            )}
          </fieldset>
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
                ${roundCurrency(model.overageCost).toLocaleString()} overage for {model.overageCalls.toLocaleString()} calls
                {performanceFeesEnabled
                  ? ` + $${roundCurrency(model.performanceFeeCost).toLocaleString()} estimated performance fees`
                  : ' · performance fees excluded'}
              </p>
            </article>
            <article className="roi-result-card roi-result-card--total">
              <p className="roi-result-label">Net revenue opportunity</p>
              <p className="roi-result-value">${roundCurrency(model.netRevenueOpportunity).toLocaleString()}</p>
              <p className="roi-result-detail">
                Before the one-time ${roundCurrency(model.plan?.setupFeeAmount ?? 0).toLocaleString()} setup fee, add-ons, and provider fees.
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
            <p className="section-tag">{siteRoiCalculatorContent.billable.tag}</p>
            <h2 className="section-title">{siteRoiCalculatorContent.billable.title}</h2>
            <ul>
              {siteRoiCalculatorContent.billable.points.map((point) => (
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
