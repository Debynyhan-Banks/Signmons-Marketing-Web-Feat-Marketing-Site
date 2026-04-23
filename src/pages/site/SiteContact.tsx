import { useState, type FormEvent } from 'react';
import SiteFooter from '../../components/site/SiteFooter';
import SiteNavigation from '../../components/site/SiteNavigation';
import SitePageHero from '../../components/site/SitePageHero';
import useSiteEffects from '../../hooks/useSiteEffects';
import { siteContactContent, siteFooterLinks, sitePrimaryLinks } from '../../data/siteContent';

const SiteContact = () => {
  const [submitted, setSubmitted] = useState(false);

  useSiteEffects();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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

          {submitted ? (
            <div className="success-msg success-msg--visible">
              <div className="check-circle">✓</div>
              <h3>{siteContactContent.form.successTitle}</h3>
              <p>
                {siteContactContent.form.successBody}{' '}
                <a href={siteContactContent.form.successLinkHref}>{siteContactContent.form.successLinkLabel}</a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder={siteContactContent.form.fields.firstNamePlaceholder} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder={siteContactContent.form.fields.lastNamePlaceholder} />
                </div>
              </div>

              <div className="form-group">
                <label>Business Name</label>
                <input type="text" placeholder={siteContactContent.form.fields.businessPlaceholder} />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder={siteContactContent.form.fields.phonePlaceholder} />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder={siteContactContent.form.fields.emailPlaceholder} />
              </div>

              <div className="form-group">
                <label>Your Industry</label>
                <div className="industry-grid">
                  {siteContactContent.form.fields.industries.map((industry) => (
                    <label key={industry} className="check-opt">
                      <input type="checkbox" /> {industry}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Calls Per Week?</label>
                <select defaultValue="">
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
                <label>Anything Else? (Optional)</label>
                <textarea placeholder={siteContactContent.form.fields.notesPlaceholder}></textarea>
              </div>

              <button className="btn-primary" type="submit">
                {siteContactContent.form.submitLabel}
              </button>
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
