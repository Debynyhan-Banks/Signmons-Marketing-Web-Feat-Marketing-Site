import { useState, type FormEvent } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import useSiteEffects from '../../hooks/useSiteEffects';
import { siteContactContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';

type LeadCaptureResponse = {
  leadId: string;
  status: 'accepted' | 'queued';
  createdAt: string;
};

const stripControlChars = (value: string) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');

const sanitizeText = (value: string) => stripControlChars(value).trim();

const normalizeEmail = (value: string) => sanitizeText(value).toLowerCase();

const normalizePhone = (value: string) => {
  const trimmed = sanitizeText(value);
  if (!trimmed) return '';
  if (trimmed.startsWith('+')) return trimmed;
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return trimmed;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const getTimeZone = (fallbackTimeZone: string) =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || fallbackTimeZone;

const getUtmParams = () => {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const source = params.get('utm_source') || undefined;
  const medium = params.get('utm_medium') || undefined;
  const campaign = params.get('utm_campaign') || undefined;
  if (!source && !medium && !campaign) return undefined;
  return { source, medium, campaign };
};

const SiteContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [callsPerWeek, setCallsPerWeek] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [consentToContact, setConsentToContact] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadCaptureResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useSiteEffects();

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((current) =>
      current.includes(industry)
        ? current.filter((item) => item !== industry)
        : [...current, industry],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const safeEmail = normalizeEmail(email);

    if (!safeEmail) {
      setErrorMessage(siteContactContent.form.emailRequiredError);
      return;
    }

    if (!isValidEmail(safeEmail)) {
      setErrorMessage(siteContactContent.form.emailInvalidError);
      return;
    }

    if (!consentToContact) {
      setErrorMessage(siteContactContent.form.consentRequiredError);
      return;
    }

    const safeFirstName = sanitizeText(firstName);
    const safeLastName = sanitizeText(lastName);
    const safeBusinessName = sanitizeText(businessName);
    const safePhone = normalizePhone(phone);
    const safeNotes = sanitizeText(notes);
    const safeCallsPerWeek = sanitizeText(callsPerWeek);
    const safeIndustries = selectedIndustries.map(sanitizeText).filter(Boolean);
    const utm = getUtmParams();

    const payload: Record<string, unknown> = {
      email: safeEmail,
      consentToContact: true,
      consentTextVersion: siteContactContent.form.api.consentTextVersion,
      timezone: getTimeZone(siteContactContent.form.api.fallbackTimeZone),
    };

    if (safeFirstName) payload.firstName = safeFirstName;
    if (safeLastName) payload.lastName = safeLastName;
    if (safeBusinessName) payload.businessName = safeBusinessName;
    if (safePhone) payload.phone = safePhone;
    if (safeCallsPerWeek) payload.callsPerWeek = safeCallsPerWeek;
    if (safeNotes) payload.notes = safeNotes;
    if (safeIndustries.length > 0) payload.industries = safeIndustries;
    if (utm) payload.utm = utm;
    if (typeof window !== 'undefined') payload.referrerUrl = window.location.href;

    setSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(siteContactContent.form.api.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = (await response.json()) as
        | LeadCaptureResponse
        | { message?: string };

      if (!response.ok) {
        const errorPayload = responseData as { message?: string };
        throw new Error(errorPayload.message || siteContactContent.form.requestFailedError);
      }

      if (!('leadId' in responseData) || !('status' in responseData) || !('createdAt' in responseData)) {
        throw new Error(siteContactContent.form.requestFailedError);
      }

      setSubmittedLead(responseData);
    } catch (error) {
      const message = error instanceof Error ? error.message : siteContactContent.form.requestFailedError;
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SiteNavigation
        activeLinkId="contact"
        navLinks={sitePrimaryLinks}
        ctaLabel={siteContactContent.navCtaLabel}
        ctaHref={siteContactContent.navCtaHref}
      />

      <SitePageHero
        tag={siteContactContent.hero.tag}
        title={siteContactContent.hero.title}
        accent={siteContactContent.hero.accent}
        subtitle={siteContactContent.hero.subtitle}
      />

      <div className="contact-body">
        <div className="contact-grid fade-in">
          {siteContactContent.cards.map((card) => (
            <div key={card.id} className="contact-card">
              <span className="icon">{card.icon}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.href}>{card.linkLabel}</a>
            </div>
          ))}
        </div>

        <div className="form-card fade-in" id="contact-form">
          <p className="section-tag contact-form-tag">{siteContactContent.form.tag}</p>
          <h2 className="section-title contact-form-title">{siteContactContent.form.title}</h2>
          <p className="section-sub">{siteContactContent.form.subtitle}</p>

          {submittedLead ? (
            <div className="success-msg success-msg--visible">
              <div className="check-circle">✓</div>
              <h3>{siteContactContent.form.successTitle}</h3>
              <p>
                {siteContactContent.form.successBody}{' '}
                <a href={siteContactContent.form.successLinkHref}>{siteContactContent.form.successLinkLabel}</a>
              </p>
              <p className="contact-form-meta">
                Lead ID: <strong>{submittedLead.leadId}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-first-name">First Name</label>
                  <input
                    id="contact-first-name"
                    type="text"
                    placeholder={siteContactContent.form.fields.firstNamePlaceholder}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-last-name">Last Name</label>
                  <input
                    id="contact-last-name"
                    type="text"
                    placeholder={siteContactContent.form.fields.lastNamePlaceholder}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-business-name">Business Name</label>
                <input
                  id="contact-business-name"
                  type="text"
                  placeholder={siteContactContent.form.fields.businessPlaceholder}
                  value={businessName}
                  onChange={(event) => setBusinessName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder={siteContactContent.form.fields.phonePlaceholder}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder={siteContactContent.form.fields.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Industry</label>
                <div className="industry-grid">
                  {siteContactContent.form.fields.industries.map((industry) => (
                    <label key={industry} className="check-opt">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(industry)}
                        onChange={() => toggleIndustry(industry)}
                      />{' '}
                      {industry}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-calls-per-week">Calls Per Week?</label>
                <select
                  id="contact-calls-per-week"
                  value={callsPerWeek}
                  onChange={(event) => setCallsPerWeek(event.target.value)}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {siteContactContent.form.fields.callsPerWeekOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contact-notes">Anything Else? (Optional)</label>
                <textarea
                  id="contact-notes"
                  placeholder={siteContactContent.form.fields.notesPlaceholder}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="check-opt" htmlFor="contact-consent">
                  <input
                    id="contact-consent"
                    type="checkbox"
                    checked={consentToContact}
                    onChange={(event) => setConsentToContact(event.target.checked)}
                    required
                  />{' '}
                  {siteContactContent.form.consentLabel}
                </label>
              </div>

              {errorMessage ? <p className="contact-form-error">{errorMessage}</p> : null}

              <button className="btn-primary" type="submit">
                {submitting ? siteContactContent.form.submittingLabel : siteContactContent.form.submitLabel}
              </button>
              <p className="contact-form-required">{siteContactContent.form.requiredFieldNote}</p>
              <p className="contact-form-note">{siteContactContent.form.footnote}</p>
            </form>
          )}
        </div>
      </div>

      <SiteFooter links={siteFooterLinks} copyright={siteContactContent.footerCopyright} />
    </>
  );
};

export default SiteContact;
