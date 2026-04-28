import type {
  SiteBrandVoiceContent,
  SiteBusinessRulesContent,
  SiteContactContent,
  SiteDispatchSchedulingContent,
  SiteDoneForYouContent,
  SiteDemoContent,
  SiteRevenueDashboardContent,
  SiteRoiCalculatorContent,
  SiteFooterLink,
  SiteHomeContent,
  SiteLink,
  SitePlanItem,
  SitePricingPlan,
} from '../types/site';
import { sitePricingPlans } from './pricingContent';

export const sitePrimaryLinks: SiteLink[] = [
  { id: 'setup', label: 'Setup', href: '/done-for-you-setup' },
  { id: 'rules', label: 'Business Rules', href: '/business-rules' },
  { id: 'voice', label: 'Brand Voice', href: '/brand-voice' },
  { id: 'demo', label: 'Demo', href: '/demo' },
  { id: 'pricing', label: 'Pricing', href: '/pricing' },
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
  { id: 'sms-terms', label: 'SMS Terms', href: '/sms-terms' },
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
    primaryCtaHref: '/demo',
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
    ctaHref: '/contact',
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
  liveFlow: {
    tag: 'Live Demo Flow',
    title: 'Start a Real Demo Request',
    subtitle:
      'Enter your phone and consent. Signmons creates a live demo request and updates status in real time.',
    api: {
      submitEndpoint: '/api/marketing/try-demo',
      statusEndpointBase: '/api/marketing/try-demo',
      consentTextVersion: 'try-demo-v1',
      fallbackTimeZone: 'America/New_York',
      pollIntervalMs: 3000,
      pollMaxAttempts: 12,
    },
    fields: {
      phoneLabel: 'Phone Number',
      phonePlaceholder: '(216) 555-0199',
      nameLabel: 'Full Name (optional)',
      emailLabel: 'Email (optional)',
      companyLabel: 'Business Name (optional)',
      consentLabel: 'I agree to receive an automated call/text for this demo request.',
    },
    submitLabel: 'Start Live Demo',
    submittingLabel: 'Starting…',
    statusLabels: {
      queued: 'Demo request queued. We are preparing your call.',
      inProgress: 'Demo request is in progress.',
      success: 'Demo flow completed successfully.',
      failed: 'Demo request failed. Please retry or contact support.',
    },
    errors: {
      invalidPhone: 'Enter a valid US phone number in E.164 format or a valid 10-digit number.',
      consentRequired: 'Consent is required to start the live demo.',
      requestFailed: 'We could not start the demo request. Please try again.',
      missingLeadId: 'Demo request did not return a lead ID.',
      statusPollFailed: 'Status check timed out. Please refresh or retry.',
    },
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

export const siteDoneForYouContent: SiteDoneForYouContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Done-For-You Setup',
    title: 'We Configure Signmons',
    accent: 'For Your Trade Team',
    subtitle:
      'You bring your service model. We configure intake policy, dispatch logic, payment gates, and customer updates so your team can launch without workflow drift.',
  },
  pillars: {
    tag: 'What We Configure',
    title: 'High-Ticket Setup, Not a DIY Wizard',
    subtitle:
      'Every setup is tenant-scoped and policy-locked: your voice, your rules, your service areas, and your escalation path.',
    items: [
      {
        id: 'pillar-brand',
        title: 'Brand Voice and Intake Policy',
        description:
          'We tune greetings, tone, service-fee disclosure language, and escalation phrasing so Signmons sounds like your office.',
      },
      {
        id: 'pillar-routing',
        title: 'Dispatch Rules and Scheduling Logic',
        description:
          'We set category routing, urgency thresholds, after-hours behavior, and technician assignment rules for your operating model.',
      },
      {
        id: 'pillar-payment',
        title: 'Payment Gate and Customer Updates',
        description:
          'We configure deposit/service-fee policies, booking gates, and message templates so customers and techs get consistent status updates.',
      },
    ],
  },
  rollout: {
    tag: 'Rollout Sequence',
    title: 'Go Live in Controlled Phases',
    subtitle: 'Launch starts with guided implementation, then a monitored cutover into live demand.',
    steps: [
      {
        id: 'step-policy',
        title: 'Policy Intake',
        description: 'Capture pricing rules, service areas, emergency policy, escalation contacts, and tech coverage windows.',
      },
      {
        id: 'step-config',
        title: 'Configuration and QA',
        description: 'Configure contracts and run scripted call/text/chat QA before any live customer traffic is accepted.',
      },
      {
        id: 'step-cutover',
        title: 'Live Cutover',
        description: 'Forward lines, enable payment links, and monitor lead-quality + booking conversion with rollback-safe controls.',
      },
    ],
  },
  deliverables: {
    tag: 'Implementation Outputs',
    title: 'What You Receive',
    items: [
      { id: 'output-rules', label: 'Tenant business-rules profile (versioned + auditable)' },
      { id: 'output-voice', label: 'Brand voice policy with approved call scripts' },
      { id: 'output-routing', label: 'Dispatch and after-hours routing map' },
      { id: 'output-payment', label: 'Payment-policy gate with webhook validation checks' },
      { id: 'output-messaging', label: 'Customer and technician message templates with trigger policies' },
      { id: 'output-dashboard', label: 'Baseline revenue dashboard configuration for launch metrics' },
    ],
  },
  cta: {
    title: 'Need Signmons Configured for Your Team?',
    subtitle: 'Book a revenue demo and we will map your setup scope before launch.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteBusinessRulesContent: SiteBusinessRulesContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Business Rules and Custom Logic',
    title: 'Your Rules',
    accent: 'Enforced Automatically',
    subtitle:
      'Signmons applies tenant-specific policies for intake, urgency, payment, scheduling, and escalation so every request follows the same operating standard.',
  },
  ruleTypes: {
    tag: 'Rule Categories',
    title: 'Configure Logic Across the Entire Booking Flow',
    subtitle:
      'Rules are trade-aware and tenant-scoped, so HVAC, plumbing, electrical, drains, and construction workflows stay consistent from first touch to dispatch.',
    items: [
      {
        id: 'rule-service',
        title: 'Service and Urgency Rules',
        description:
          'Classify requests into category and urgency tiers, then enforce emergency handling paths and response windows.',
      },
      {
        id: 'rule-payment',
        title: 'Payment and Booking Gate Rules',
        description:
          'Control when deposits or service fees are required and block scheduling until payment-policy conditions are met.',
      },
      {
        id: 'rule-dispatch',
        title: 'Routing and Escalation Rules',
        description:
          'Assign by service area, skill, shift, and after-hours policy with human fallback for unclear or high-risk requests.',
      },
    ],
  },
  examples: {
    tag: 'Examples',
    title: 'How Rules Execute in Practice',
    items: [
      {
        id: 'example-emergency',
        condition: 'No heat + winter hours',
        outcome: 'Classify emergency, notify owner and on-call tech, and prioritize immediate scheduling.',
      },
      {
        id: 'example-payment',
        condition: 'Deposit required and unpaid',
        outcome: 'Hold booking in review state and send payment link follow-up until policy gate clears.',
      },
      {
        id: 'example-area',
        condition: 'Electrical panel issue in West service zone',
        outcome: 'Route to qualified West-zone technician and send customer confirmation once accepted.',
      },
    ],
  },
  governance: {
    tag: 'Policy Integrity',
    title: 'Built for Auditable Operations',
    points: [
      'All rule changes are tenant-scoped and versioned.',
      'Dispatch and payment decisions are policy-driven, not arbitrary AI behavior.',
      'Escalation and fallback events are logged for operational review.',
    ],
  },
  cta: {
    title: 'Ready to Model Your Rule Flow?',
    subtitle: 'Book a revenue demo and we will map your business rules into a launch-ready policy design.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteBrandVoiceContent: SiteBrandVoiceContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Brand Voice and AI Personality',
    title: 'Your Brand,',
    accent: 'On Every Call.',
    subtitle:
      'Signmons gives every tenant policy-driven control over how the AI greets, escalates, prices, and closes — so callers hear your business, not a generic bot.',
  },
  controls: {
    tag: 'Voice Controls',
    title: 'Six Tenant-Scoped Controls That Shape Every Conversation',
    subtitle:
      'Each control is stored on the tenant brand profile, versioned, and applied server-side so voice, SMS, and chat stay aligned without hand-tuning.',
    items: [
      {
        id: 'control-greeting',
        title: 'Greeting',
        description:
          'Set the opening line your AI uses on every inbound call, text, and chat so customers hear your business name, market, and intent from the first second.',
        example:
          'Example: "Thanks for calling Northwind HVAC — we keep Denver homes comfortable. How can I help today?"',
      },
      {
        id: 'control-tone',
        title: 'Tone',
        description:
          'Choose the persona register — warm, direct, technical, or premium concierge — that matches your brand. The AI adapts pacing and word choice to fit.',
        example:
          'Example: "Direct and reassuring" pairs short sentences with confident next-step language for emergency trades.',
      },
      {
        id: 'control-prohibited',
        title: 'Prohibited Phrases',
        description:
          'Block words and phrases your team will never say to customers. The AI rewrites in real time and the policy engine refuses to ship a response that violates the list.',
        example:
          'Example: Block "no problem", "guarantee", or specific competitor names so they never reach a caller.',
      },
      {
        id: 'control-fee',
        title: 'Fee Language',
        description:
          'Define the exact wording for diagnostic, after-hours, dispatch, and trip fees. Pricing copy stays consistent across voice, SMS, and chat without per-rep variation.',
        example:
          'Example: "There is a $89 diagnostic fee that is waived if you approve the repair today."',
      },
      {
        id: 'control-escalation',
        title: 'Escalation Language',
        description:
          'Set the precise script the AI uses when handing off to a human, including reason, expected wait, and callback option. Escalation never feels like a dead end.',
        example:
          'Example: "Let me get our dispatcher on the line — should be under two minutes, or I can have them call you back."',
      },
      {
        id: 'control-closeout',
        title: 'Closeout Messaging',
        description:
          'Lock the closing line and confirmation summary the AI uses after a booking, deposit, or callback is set, so the last touch reinforces your brand promise.',
        example:
          'Example: "You are confirmed for Thursday 9 to 11 AM. Your deposit is on file — we will text you a tech bio 30 minutes before arrival."',
      },
    ],
  },
  humanFallback: {
    tag: 'Human Fallback',
    title: 'Always a Human Path for Urgent or Unclear Cases',
    subtitle:
      'Voice is persuasive intake, not the final authority. Whenever the AI hits a policy-sensitive, unclear, or urgent moment, it routes to a person under your escalation script.',
    triggers: [
      { id: 'fallback-urgent', label: 'Stated emergency or safety risk (gas, water, no heat in winter, electrical hazard).' },
      { id: 'fallback-unclear', label: 'Caller intent is unclear after two clarification attempts.' },
      { id: 'fallback-policy', label: 'Request falls outside the tenant policy gate or pricing rules.' },
      { id: 'fallback-failed', label: 'Payment, scheduling, or verification step fails and cannot self-recover.' },
      { id: 'fallback-vip', label: 'Caller matches a VIP, dispute, or do-not-engage record on the tenant profile.' },
    ],
    note:
      'Every fallback uses your configured escalation language and is logged with the trigger reason for audit and coaching.',
  },
  governance: {
    tag: 'Policy Integrity',
    title: 'Tenant-Scoped, Versioned, Auditable',
    points: [
      'Brand voice profiles are tenant-isolated — no cross-tenant prompts, phrases, or escalation scripts.',
      'Every change to greeting, tone, prohibited phrases, fee, escalation, or closeout copy is versioned.',
      'Server-side policy enforcement rejects responses that violate prohibited phrases or fee language rules.',
      'SMS confirmation remains the canonical channel for required customer fields, regardless of voice tone.',
    ],
  },
  cta: {
    title: 'Ready to Hear Your Brand on Every Call?',
    subtitle: 'Book a revenue demo and we will draft your greeting, escalation, fee, and closeout language with you.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteDispatchSchedulingContent: SiteDispatchSchedulingContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Dispatch and Scheduling',
    title: 'Route Work',
    accent: 'Without Dispatch Chaos',
    subtitle:
      'Signmons moves qualified jobs from intake to assignment with policy-driven scheduling, technician routing, and customer-safe status updates.',
  },
  board: {
    tag: 'Dispatch Board',
    title: 'One Queue Across New, Ready, Assigned, and Escalated Work',
    subtitle:
      'Every job card carries category, urgency, payment-gate state, preferred window, and recommended assignee so dispatch decisions are consistent.',
    lanes: [
      {
        id: 'lane-new',
        title: 'New Requests',
        description: 'Fresh intake records with booking-ready summaries and required-field completeness indicators.',
      },
      {
        id: 'lane-ready',
        title: 'Ready to Assign',
        description: 'Jobs that cleared policy + payment gates and are waiting for dispatcher approval or routing execution.',
      },
      {
        id: 'lane-assigned',
        title: 'Assigned / Accepted',
        description: 'Technician ownership and acceptance state tracked in real time with fallback on no-response.',
      },
      {
        id: 'lane-escalated',
        title: 'Escalated',
        description: 'Urgent, unclear, or policy-sensitive cases with human handoff and escalation timeline.',
      },
    ],
  },
  routing: {
    tag: 'Routing Logic',
    title: 'Rule-Based Assignment, Not Freeform AI Guessing',
    subtitle:
      'Routing follows tenant policy using trade, service area, urgency, business hours, availability, and payment state before assignment.',
    rules: [
      {
        id: 'route-emergency',
        condition: 'Emergency HVAC no-heat call after hours',
        action: 'Notify owner + on-call tech, elevate priority, and hold customer on human escalation path.',
      },
      {
        id: 'route-skill',
        condition: 'Electrical panel issue in West service zone',
        action: 'Recommend West-zone certified electrical tech with reason attached on assignment detail.',
      },
      {
        id: 'route-payment',
        condition: 'Deposit policy required but unpaid',
        action: 'Block scheduling transition and send payment follow-up until booking gate clears.',
      },
    ],
  },
  statusFlow: {
    tag: 'Scheduling Lifecycle',
    title: 'Structured Status Updates for Owners, Techs, and Customers',
    steps: [
      {
        id: 'status-ready',
        title: 'Ready',
        description: 'Intake complete, urgency classified, payment policy checked, and dispatcher review available.',
      },
      {
        id: 'status-assigned',
        title: 'Assigned',
        description: 'Recommended or selected technician notified with secure job link and acceptance timer.',
      },
      {
        id: 'status-on-way',
        title: 'On My Way',
        description: 'Technician status triggers outbound customer update and owner dashboard timeline event.',
      },
      {
        id: 'status-complete',
        title: 'Completed',
        description: 'Job completion closes workflow and publishes conversion + revenue telemetry for reporting.',
      },
    ],
  },
  governance: {
    tag: 'Policy Integrity',
    title: 'Scheduling Decisions Stay Policy-Locked',
    points: [
      'Scheduling windows respect technician availability, service-area coverage, and urgency class.',
      'Dispatch routing follows tenant-defined rules and logs assignment reasons for auditability.',
      'Human fallback remains active for urgent, unclear, failed, or policy-sensitive dispatch states.',
    ],
  },
  cta: {
    title: 'Want to See Your Dispatch Workflow in Action?',
    subtitle: 'Book a revenue demo to map your scheduling and routing policy before launch.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteRevenueDashboardContent: SiteRevenueDashboardContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'Revenue Recovery Dashboard',
    title: 'See Exactly',
    accent: 'What Signmons Recovered',
    subtitle:
      'Track captured demand, booking conversion, payment completion, and dispatch outcomes in one tenant-scoped revenue view.',
  },
  metrics: {
    tag: 'Core Metrics',
    title: 'Operational Proof, Not Vanity Charts',
    subtitle:
      'Every metric ties to the same intake-to-completion chain so owners can see recovered revenue and conversion health.',
    items: [
      {
        id: 'metric-calls',
        label: 'Calls Captured',
        value: '1,248',
        detail: 'Inbound voice/SMS/chat requests handled with required-field confirmation.',
      },
      {
        id: 'metric-recovery',
        label: 'Missed Calls Recovered',
        value: '312',
        detail: 'Leads recovered through follow-up workflow and converted back into active job flow.',
      },
      {
        id: 'metric-booked',
        label: 'Jobs Booked',
        value: '486',
        detail: 'Requests that cleared policy + payment gates and reached scheduled or completed status.',
      },
      {
        id: 'metric-revenue',
        label: 'Estimated Revenue Recovered',
        value: '$182,400',
        detail: 'Modeled from booked outcomes and ticket assumptions for planning visibility.',
      },
    ],
  },
  funnel: {
    tag: 'Conversion Funnel',
    title: 'From Inbound Demand to Completed Work',
    steps: [
      {
        id: 'funnel-1',
        stage: 'Call -> Qualified Lead',
        description: 'Intake captures required fields and urgency classification.',
      },
      {
        id: 'funnel-2',
        stage: 'Qualified Lead -> Payment Link Sent',
        description: 'Policy engine triggers deposit/service-fee request where required.',
      },
      {
        id: 'funnel-3',
        stage: 'Payment -> Booked Job',
        description: 'Booking gate clears after successful payment or approved policy exception.',
      },
      {
        id: 'funnel-4',
        stage: 'Booked Job -> Completed',
        description: 'Dispatch assignment, technician updates, and completion events close the loop.',
      },
    ],
  },
  quality: {
    tag: 'AI Quality Signals',
    title: 'Quality Indicators That Protect Conversion',
    points: [
      'Repeat-question rate by trade and urgency class.',
      'First-response latency and escalation handoff time.',
      'Failed-intake and policy-block rates for operational coaching.',
    ],
  },
  cta: {
    title: 'Want a Revenue Recovery Baseline for Your Team?',
    subtitle: 'Book a revenue demo and we will map your current call-to-booked-job conversion path.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};

export const siteRoiCalculatorContent: SiteRoiCalculatorContent = {
  navCtaLabel: 'Book Revenue Demo →',
  navCtaHref: '/contact',
  hero: {
    tag: 'ROI Calculator',
    title: 'Estimate Your',
    accent: 'Recovered Revenue',
    subtitle:
      'Model missed-call loss, conversion improvement, and deposit capture to compare projected upside against plan cost.',
  },
  calculator: {
    tag: 'ROI Inputs',
    title: 'Use Your Current Operating Numbers',
    subtitle:
      'Inputs stay local to this page for planning. Production ROI reporting is sourced from tenant revenue events.',
    preset: {
      missedCallsPerWeek: 25,
      averageTicketValue: 650,
      closeRatePercent: 42,
      emergencySharePercent: 18,
      monthlyCallVolume: 420,
      depositAmount: 89,
    },
    fields: {
      missedCallsPerWeekLabel: 'Missed calls per week',
      averageTicketValueLabel: 'Average ticket value ($)',
      closeRatePercentLabel: 'Close rate on recovered calls (%)',
      emergencySharePercentLabel: 'Emergency share of recovered jobs (%)',
      monthlyCallVolumeLabel: 'Monthly inbound call volume',
      depositAmountLabel: 'Average deposit/service fee ($)',
    },
  },
  assumptions: {
    tag: 'Model Assumptions',
    title: 'How This Estimate Is Calculated',
    points: [
      'Recovered jobs per month = missed calls per week x 4.33 x close rate.',
      'Revenue recovered = recovered jobs x average ticket value.',
      'Emergency uplift applies a 15% premium on emergency share of recovered jobs.',
      'Deposit capture estimate = monthly call volume x 35% policy-trigger rate x deposit amount.',
    ],
  },
  cta: {
    title: 'Ready to Validate This With Real Intake Data?',
    subtitle: 'Book a revenue demo and we will compare this model against your live call flow.',
    primaryLabel: 'Book Revenue Demo',
    primaryHref: '/contact',
    secondaryLabel: 'See Live Demo',
    secondaryHref: '/demo',
  },
  footerCopyright: '© 2026 Signmons Inc. All rights reserved.',
};
