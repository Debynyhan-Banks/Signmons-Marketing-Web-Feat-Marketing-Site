import type {
  SiteContactContent,
  SiteDemoContent,
  SiteFooterLink,
  SiteHomeContent,
  SiteLink,
  SitePlanItem,
  SitePricingPlan,
} from '../types/site';
import { sitePricingPlans } from './pricingContent';

export const sitePrimaryLinks: SiteLink[] = [
  { id: 'demo', label: 'Demo', href: '/demo' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const siteFooterLinks: SiteFooterLink[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'demo', label: 'Demo', href: '/demo' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'login', label: 'Login', href: '/login' },
  { id: 'terms', label: 'Terms', href: '/terms' },
  { id: 'privacy', label: 'Privacy', href: '/privacy' },
];

const toHomePricingPlan = (plan: SitePricingPlan): SitePlanItem => {
  const price =
    typeof plan.monthlyPrice === 'number'
      ? `$${plan.monthlyPrice}/mo`
      : plan.customPriceLabel ?? 'Custom';
  const usage = typeof plan.includedCallVolume === 'number'
    ? `Up to ${plan.includedCallVolume.toLocaleString()} AI-handled calls/month`
    : plan.includedUsageLabel ?? 'Custom usage';

  return {
    id: `plan-${plan.id}`,
    name: plan.name,
    price,
    description: plan.description,
    features: [`${usage} included`, ...plan.features.slice(0, 4).map((feature) => feature.label)],
    ctaLabel: plan.ctaLabel,
    ctaHref: '/pricing',
    ctaClassName: plan.ctaClassName,
    featured: plan.featured,
    badge: plan.badge,
  };
};

const homePricingPlans: SitePlanItem[] = sitePricingPlans
  .filter((plan) => plan.id !== 'enterprise')
  .map(toHomePricingPlan);

export const siteHomeContent: SiteHomeContent = {
  navCtaLabel: 'Join Early Access →',
  navCtaHref: '/contact',
  hero: {
    badge: 'NOW IN EARLY ACCESS',
    title: 'Get Paid Before You',
    accent: 'Ever Send a Truck.',
    lead:
      'Call, text, or chat — Signmons AI handles your intake and collects the deposit on the spot. 24/7, zero staff required.',
    primaryCtaLabel: '🚀 Experience the Demo',
    primaryCtaHref: '#early-access',
    secondaryCtaLabel: 'See How It Works',
    secondaryCtaHref: '#how-it-works',
    trustLead: 'Trusted by',
    trustAccent: 'HVAC · Plumbing · Electrical · Construction',
  },
  phoneMock: {
    status: 'Signmons AI • Active',
    bubbles: [
      '"Hi! I need my AC fixed ASAP, it\'s 95° in here 😰"',
      '"Got you! I can book a tech for today 3pm. Quick deposit to confirm your slot — $75?"',
      '"Yes! Card ending 4242"',
    ],
    confirmation: '✓ $75 deposit collected — Job booked!',
  },
  features: {
    tag: 'What You Get',
    title: 'Everything Your Business Needs to Scale',
    subtitle: 'Signmons runs your front office so you can focus on the work, not the phones.',
    items: [
      {
        id: 'feature-calls',
        icon: '📞',
        title: '24/7 Call Answering',
        description: 'Never miss a job. AI picks up every call, day or night.',
      },
      {
        id: 'feature-qualified',
        icon: '📅',
        title: 'Qualified Jobs',
        description: 'Filters tire-kickers before they waste your time.',
      },
      {
        id: 'feature-scheduling',
        icon: '🗓️',
        title: 'Books Appointments',
        description: 'Syncs directly to your calendar in real time.',
      },
      {
        id: 'feature-payment',
        icon: '💳',
        title: 'Get Paid Upfront',
        description: 'Collects deposits automatically on the call.',
      },
      {
        id: 'feature-updates',
        icon: '🔔',
        title: 'Instant Updates',
        description: 'Push alerts the moment a job is booked or paid.',
      },
      {
        id: 'feature-insights',
        icon: '📊',
        title: 'Revenue Insights',
        description: 'See your pipeline and earnings at a glance.',
      },
    ],
  },
  demoSection: {
    tag: 'See It Live',
    title: 'Watch Signmons Close a Job',
    accent: 'In Under 3 Minutes',
    subtitle:
      'A real inbound call — AI qualifies the customer, books the slot, and collects a deposit. No human needed.',
    videoLabel: 'Watch the 2:47 demo',
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1',
    chips: [
      { id: 'demo-chip-voice', text: 'Real AI voice call' },
      { id: 'demo-chip-deposit', text: 'Live deposit collected' },
      { id: 'demo-chip-staff', text: 'Zero staff involved' },
      { id: 'demo-chip-speed', text: 'Job booked in 3 min' },
    ],
  },
  process: {
    id: 'how-it-works',
    tag: 'The Process',
    title: 'Live in Minutes, Earning in Hours',
    subtitle:
      'No engineers needed. Plug in Signmons and let the AI start qualifying and booking.',
    steps: [
      {
        id: 'step-connect',
        title: 'Connect Your Number',
        description: 'Forward your business line or get a new Signmons number in under 2 minutes.',
      },
      {
        id: 'step-qualify',
        title: 'AI Answers & Qualifies',
        description: 'Signmons greets callers, asks the right questions, and filters for serious customers.',
      },
      {
        id: 'step-book',
        title: 'Books & Collects Deposit',
        description: 'Jobs get scheduled and a deposit is collected — before you roll a truck.',
      },
      {
        id: 'step-show-up',
        title: 'You Show Up to Work',
        description: 'You arrive to paid, confirmed, qualified jobs. That\'s it.',
      },
    ],
  },
  proof: {
    tag: 'Early Results',
    title: 'Numbers That Move the Needle',
    stats: [
      { id: 'stat-bookings', value: '3×', label: 'More jobs booked per week' },
      { id: 'stat-answer-rate', value: '98%', label: 'Call answer rate, 24/7' },
      { id: 'stat-noshow', value: '$0', label: 'No-shows with upfront deposits' },
      { id: 'stat-setup', value: '2min', label: 'Average setup time' },
    ],
    testimonial: {
      quote:
        'Before Signmons, I was losing jobs every weekend because no one picked up. Now the AI handles it all — I showed up Monday to four booked jobs and $300 in deposits already in my account.',
      initials: 'DM',
      author: 'Darius M.',
      role: 'HVAC Owner, Cleveland OH',
    },
  },
  pricing: {
    id: 'pricing',
    tag: 'Pricing',
    title: 'Capture More Calls. Book More Jobs.',
    subtitle: 'Choose the plan that matches your call volume, dispatch complexity, and revenue goals.',
    plans: homePricingPlans,
  },
  earlyAccess: {
    id: 'early-access',
    tag: 'Early Access',
    title: 'Your Competition is Still',
    accent: 'Missing Calls.',
    subtitle:
      'Be first. Join early access and lock in founding member pricing — rates that will never increase.',
    inputPlaceholder: 'Your business phone number',
    ctaLabel: 'Claim My Spot 🚀',
    ctaHref: 'https://signmons.com',
    note: 'No credit card required · Cancel anytime · 14-day free trial',
    industries: [
      { id: 'industry-hvac', label: '🔧 HVAC' },
      { id: 'industry-plumbing', label: '🚿 Plumbing' },
      { id: 'industry-electrical', label: '⚡ Electrical' },
      { id: 'industry-construction', label: '🏗️ Construction' },
      { id: 'industry-landscaping', label: '🌿 Landscaping' },
      { id: 'industry-roofing', label: '🏠 Roofing' },
    ],
  },
  footerCopyright: '© 2026 Signmons. All rights reserved.',
};

export const siteDemoContent: SiteDemoContent = {
  navCtaLabel: 'Get Early Access →',
  navCtaHref: '/contact',
  hero: {
    tag: 'See It Live',
    title: 'Watch Signmons Close a Job',
    accent: 'In Under 3 Minutes',
    subtitle:
      'A real inbound call — AI qualifies the customer, books the slot, and collects a deposit. Zero humans.',
  },
  video: {
    frameLabel: 'Play demo video',
    label: 'Watch the 2:47 live demo',
    url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1',
  },
  chips: [
    { id: 'chip-voice', text: 'Real AI voice call' },
    { id: 'chip-deposit', text: 'Live deposit collected' },
    { id: 'chip-staff', text: 'Zero staff involved' },
    { id: 'chip-booked', text: 'Job booked in 3 min' },
  ],
  chat: {
    tag: 'Try It Now',
    title: 'Chat With Signmons AI',
    subtitle: 'Type a message and see how the AI handles a real customer interaction.',
    agentName: 'Signmons AI',
    statusLabel: 'Online — Ready to book',
    introMessage: "Hey! 👋 I'm Signmons AI. Tell me what service you need and I'll get you booked right away.",
    responses: [
      'Got it! What\'s the service address?',
      'Perfect. Best phone number to confirm?',
      'I have today at 3 PM or tomorrow at 9 AM — which works?',
      'To lock in your slot there\'s a $75 deposit. Sending a secure link now 🔒',
      '✅ Deposit received! Confirmed for 3 PM. You\'ll get a reminder 30 min before. Anything else?',
    ],
    successMessage: '💳 $75 deposit collected — Job booked!',
    inputPlaceholder: 'E.g. My AC is out, need someone today…',
  },
  channels: {
    tag: 'All Channels',
    title: 'Meets Customers Wherever They Are',
    items: [
      {
        id: 'channel-call',
        icon: '📞',
        title: 'Voice Call',
        description: 'AI answers, qualifies & books over the phone in real time',
      },
      {
        id: 'channel-sms',
        icon: '💬',
        title: 'SMS Text',
        description: 'Handles inbound texts — books and collects payment by text',
      },
      {
        id: 'channel-chat',
        icon: '🌐',
        title: 'Web Chat',
        description: 'Embed on your site — converts visitors into booked jobs instantly',
      },
      {
        id: 'channel-email',
        icon: '📧',
        title: 'Email',
        description: 'AI reads inbound emails and responds with booking links',
      },
    ],
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteContactContent: SiteContactContent = {
  navCtaLabel: 'Get Early Access →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Get In Touch',
    title: "Let's Get Your",
    accent: 'Phone Working For You',
    subtitle:
      'Join early access, ask a question, or talk to our team — we reply within one business day.',
  },
  cards: [
    {
      id: 'contact-live-chat',
      icon: '💬',
      title: 'Live Chat',
      description: 'Usually under 5 min response',
      href: 'mailto:hello@signmons.com?subject=Signmons%20Live%20Chat%20Request',
      linkLabel: 'Start Chat →',
    },
    {
      id: 'contact-email',
      icon: '📧',
      title: 'Email Us',
      description: 'For detailed questions or partnerships',
      href: 'mailto:hello@signmons.com',
      linkLabel: 'hello@signmons.com',
    },
    {
      id: 'contact-call',
      icon: '📞',
      title: 'Call Us',
      description: 'Mon–Fri 9am–6pm EST',
      href: 'tel:+12165550100',
      linkLabel: '(216) 555-0100',
    },
    {
      id: 'contact-demo',
      icon: '🗓️',
      title: 'Book a Demo',
      description: '20-min live walkthrough',
      href: '/demo',
      linkLabel: 'Pick a Time →',
    },
  ],
  form: {
    api: {
      endpoint: '/api/marketing/lead-capture',
      consentTextVersion: 'lead-capture-v1',
      fallbackTimeZone: 'America/New_York',
    },
    tag: 'Early Access Application',
    title: 'Claim Your Spot',
    subtitle:
      "Founding members lock in rates that never increase. We'll reach out within 24 hours.",
    fields: {
      firstNamePlaceholder: 'Marcus',
      lastNamePlaceholder: 'Thompson',
      businessPlaceholder: 'Thompson HVAC LLC',
      phonePlaceholder: '(216) 555-0199',
      emailPlaceholder: 'marcus@thompsonhvac.com',
      notesPlaceholder: "Tell us what's giving you the most headaches right now…",
      callsPerWeekOptions: ['Under 10', '10–30', '30–60', '60–100', '100+'],
      industries: ['🔥 HVAC', '🚿 Plumbing', '⚡ Electrical', '🏗️ Construction', '🌿 Landscaping', '🏠 Roofing'],
    },
    submitLabel: 'Submit Application 🚀',
    submittingLabel: 'Submitting…',
    footnote: "No spam. No credit card. We'll reach out within 24 hours.",
    consentLabel: 'I agree Signmons may contact me about demo and onboarding via email, call, or SMS.',
    requiredFieldNote: '* Email and consent are required.',
    emailRequiredError: 'Email is required to submit this form.',
    emailInvalidError: 'Enter a valid email address.',
    consentRequiredError: 'Consent is required to submit.',
    requestFailedError: 'We could not submit right now. Please try again in a moment.',
    successTitle: "You're on the list!",
    successBody: 'We received your application and will be in touch within 24 hours. In the meantime, check out the',
    successLinkLabel: 'live demo →',
    successLinkHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};
