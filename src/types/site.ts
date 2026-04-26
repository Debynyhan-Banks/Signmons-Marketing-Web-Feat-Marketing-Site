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

export interface SitePricingPlan {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  includedUsage: string;
  setupFee: string;
  features: string[];
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
    footnote: string;
    successTitle: string;
    successBody: string;
    successLinkLabel: string;
    successLinkHref: string;
  };
  footerCopyright: string;
}
