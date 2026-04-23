import type { SiteFooterLink } from '../../types/site';

type SiteFooterProps = {
  links: SiteFooterLink[];
  copyright: string;
};

const SiteFooter = ({ links, copyright }: SiteFooterProps) => {
  return (
    <footer>
      <div className="footer-logo">SIGNMONS</div>
      <div className="footer-sub">AI-powered front office for trades</div>
      <div className="footer-links">
        {links.map((link) => (
          <a key={link.id} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="footer-copy">{copyright}</div>
    </footer>
  );
};

export default SiteFooter;
