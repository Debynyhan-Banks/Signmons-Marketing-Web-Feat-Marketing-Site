export interface SiteLink {
  id: string;
  label: string;
  href: string;
}

export type SiteFooterLink = SiteLink;

export interface SiteFeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SiteChipItem {
  id: string;
  text: string;
}

export interface SiteStepItem {
  id: string;
  title: string;
  description: string;
}

export interface SiteStatItem {
  id: string;
  value: string;
  label: string;
}

export interface SitePlanItem {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaClassName: 'btn-primary' | 'btn-secondary';
  featured?: boolean;
  badge?: string;
}

export type SitePricingPlanId = 'starter' | 'growth' | 'pro' | 'enterprise';

export type SitePricingFeatureCategory =
  | 'intake'
  | 'recovery'
  | 'routing'
  | 'payment'
  | 'policy'
  | 'analytics'
  | 'integration'
  | 'handoff'
  | 'support'
  | 'operations';

export interface SitePricingFeature {
  id: string;
  label: string;
  category: SitePricingFeatureCategory;
  includedInTier: SitePricingPlanId;
}

export interface SitePricingPlan {
  id: SitePricingPlanId;
  name: string;
  description: string;
  bestFor: string;
  includedCallVolume?: number;
  includedUsageLabel?: string;
  setupFeeAmount: number;
  setupFeeLabel?: string;
  vehicleRange: string;
  overagePolicy: string;
  features: SitePricingFeature[];
  ctaLabel: string;
  ctaHref: string;
  ctaClassName: 'btn-primary' | 'btn-secondary';
  monthlyPrice?: number;
  annualMonthlyPrice?: number;
  customPriceLabel?: string;
  featured?: boolean;
  badge?: string;
}

export interface SitePricingAddOn {
  id: string;
  title: string;
  price: string;
  description: string;
}

export type SitePricingCompareValue = 'yes' | 'no' | string;

export interface SitePricingCompareRow {
  id: string;
  feature: string;
  starter: SitePricingCompareValue;
  growth: SitePricingCompareValue;
  pro: SitePricingCompareValue;
  enterprise: SitePricingCompareValue;
}

export interface SitePricingFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SitePricingContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  billingToggle: {
    monthlyLabel: string;
    annualLabel: string;
    saveBadge: string;
  };
  pricingNote: string;
  plans: SitePricingPlan[];
  addOns: {
    tag: string;
    title: string;
    subtitle: string;
    note?: string;
    items: SitePricingAddOn[];
  };
  compare: {
    tag: string;
    title: string;
    rows: SitePricingCompareRow[];
  };
  faq: {
    tag: string;
    title: string;
    items: SitePricingFaqItem[];
  };
  footerCopyright: string;
}

export interface SiteIndustryTag {
  id: string;
  label: string;
}

export interface SiteHomeContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    badge: string;
    title: string;
    accent: string;
    lead: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    trustLead: string;
    trustAccent: string;
  };
  phoneMock: {
    status: string;
    bubbles: string[];
    confirmation: string;
  };
  features: {
    tag: string;
    title: string;
    subtitle: string;
    items: SiteFeatureItem[];
  };
  demoSection: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
    videoLabel: string;
    videoUrl: string;
    chips: SiteChipItem[];
  };
  process: {
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    steps: SiteStepItem[];
  };
  proof: {
    tag: string;
    title: string;
    stats: SiteStatItem[];
    testimonial: {
      quote: string;
      initials: string;
      author: string;
      role: string;
    };
  };
  pricing: {
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    plans: SitePlanItem[];
  };
  earlyAccess: {
    id: string;
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
    inputPlaceholder: string;
    ctaLabel: string;
    ctaHref: string;
    note: string;
    industries: SiteIndustryTag[];
  };
  footerCopyright: string;
}

export interface SiteDemoContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  video: {
    frameLabel: string;
    label: string;
    url: string;
  };
  chips: SiteChipItem[];
  chat: {
    tag: string;
    title: string;
    subtitle: string;
    agentName: string;
    statusLabel: string;
    introMessage: string;
    responses: string[];
    successMessage: string;
    inputPlaceholder: string;
  };
  channels: {
    tag: string;
    title: string;
    items: SiteFeatureItem[];
  };
  liveFlow: {
    tag: string;
    title: string;
    subtitle: string;
    api: {
      submitEndpoint: string;
      statusEndpointBase: string;
      consentTextVersion: string;
      fallbackTimeZone: string;
      pollIntervalMs: number;
      pollMaxAttempts: number;
    };
    fields: {
      phoneLabel: string;
      phonePlaceholder: string;
      nameLabel: string;
      emailLabel: string;
      companyLabel: string;
      consentLabel: string;
    };
    submitLabel: string;
    submittingLabel: string;
    statusLabels: {
      queued: string;
      inProgress: string;
      success: string;
      failed: string;
    };
    errors: {
      invalidPhone: string;
      consentRequired: string;
      requestFailed: string;
      missingLeadId: string;
      statusPollFailed: string;
    };
  };
  footerCopyright: string;
}

export interface SiteContactCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface SiteContactContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  cards: SiteContactCard[];
  form: {
    api: {
      endpoint: string;
      consentTextVersion: string;
      fallbackTimeZone: string;
    };
    tag: string;
    title: string;
    subtitle: string;
    fields: {
      firstNamePlaceholder: string;
      lastNamePlaceholder: string;
      businessPlaceholder: string;
      phonePlaceholder: string;
      emailPlaceholder: string;
      notesPlaceholder: string;
      callsPerWeekOptions: string[];
      industries: string[];
    };
    submitLabel: string;
    submittingLabel: string;
    footnote: string;
    consentLabel: string;
    requiredFieldNote: string;
    emailRequiredError: string;
    emailInvalidError: string;
    consentRequiredError: string;
    requestFailedError: string;
    successTitle: string;
    successBody: string;
    successLinkLabel: string;
    successLinkHref: string;
  };
  footerCopyright: string;
}

export interface SiteDoneForYouPillar {
  id: string;
  title: string;
  description: string;
}

export interface SiteDoneForYouStep {
  id: string;
  title: string;
  description: string;
}

export interface SiteDoneForYouDeliverable {
  id: string;
  label: string;
}

export interface SiteDoneForYouContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  pillars: {
    tag: string;
    title: string;
    subtitle: string;
    items: SiteDoneForYouPillar[];
  };
  rollout: {
    tag: string;
    title: string;
    subtitle: string;
    steps: SiteDoneForYouStep[];
  };
  deliverables: {
    tag: string;
    title: string;
    items: SiteDoneForYouDeliverable[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}

export interface SiteBusinessRuleType {
  id: string;
  title: string;
  description: string;
}

export interface SiteBusinessRuleExample {
  id: string;
  condition: string;
  outcome: string;
}

export interface SiteBusinessRulesContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  ruleTypes: {
    tag: string;
    title: string;
    subtitle: string;
    items: SiteBusinessRuleType[];
  };
  examples: {
    tag: string;
    title: string;
    items: SiteBusinessRuleExample[];
  };
  governance: {
    tag: string;
    title: string;
    points: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}

export interface SiteBrandVoiceControl {
  id: string;
  title: string;
  description: string;
  example: string;
}

export interface SiteBrandVoiceFallbackTrigger {
  id: string;
  label: string;
}

export interface SiteBrandVoiceContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  controls: {
    tag: string;
    title: string;
    subtitle: string;
    items: SiteBrandVoiceControl[];
  };
  humanFallback: {
    tag: string;
    title: string;
    subtitle: string;
    triggers: SiteBrandVoiceFallbackTrigger[];
    note: string;
  };
  governance: {
    tag: string;
    title: string;
    points: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}

export interface SiteDispatchLane {
  id: string;
  title: string;
  description: string;
}

export interface SiteDispatchRoutingRule {
  id: string;
  condition: string;
  action: string;
}

export interface SiteDispatchStatusStep {
  id: string;
  title: string;
  description: string;
}

export interface SiteDispatchSchedulingContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  board: {
    tag: string;
    title: string;
    subtitle: string;
    lanes: SiteDispatchLane[];
  };
  routing: {
    tag: string;
    title: string;
    subtitle: string;
    rules: SiteDispatchRoutingRule[];
  };
  statusFlow: {
    tag: string;
    title: string;
    steps: SiteDispatchStatusStep[];
  };
  governance: {
    tag: string;
    title: string;
    points: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}

export interface SiteRevenueMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface SiteRevenueFunnelStep {
  id: string;
  stage: string;
  description: string;
}

export interface SiteRevenueDashboardContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  metrics: {
    tag: string;
    title: string;
    subtitle: string;
    items: SiteRevenueMetric[];
  };
  funnel: {
    tag: string;
    title: string;
    steps: SiteRevenueFunnelStep[];
  };
  quality: {
    tag: string;
    title: string;
    points: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}

export interface SiteRoiInputPreset {
  missedCallsPerWeek: number;
  averageTicketValue: number;
  closeRatePercent: number;
  emergencySharePercent: number;
  monthlyCallVolume: number;
  depositAmount: number;
}

export interface SiteRoiCalculatorContent {
  navCtaLabel: string;
  navCtaHref: string;
  hero: {
    tag: string;
    title: string;
    accent: string;
    subtitle: string;
  };
  calculator: {
    tag: string;
    title: string;
    subtitle: string;
    preset: SiteRoiInputPreset;
    fields: {
      missedCallsPerWeekLabel: string;
      averageTicketValueLabel: string;
      closeRatePercentLabel: string;
      emergencySharePercentLabel: string;
      monthlyCallVolumeLabel: string;
      depositAmountLabel: string;
    };
  };
  assumptions: {
    tag: string;
    title: string;
    points: string[];
  };
  cta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  footerCopyright: string;
}
