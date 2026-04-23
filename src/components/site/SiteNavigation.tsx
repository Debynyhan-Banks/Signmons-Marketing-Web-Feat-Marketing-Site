import type { SiteLink } from '../../types/site';

type SiteNavigationProps = {
  activeLinkId?: string;
  navLinks: SiteLink[];
  ctaLabel: string;
  ctaHref: string;
  ctaClassName?: string;
};

const SiteNavigation = ({
  activeLinkId,
  navLinks,
  ctaLabel,
  ctaHref,
  ctaClassName,
}: SiteNavigationProps) => {
  const navCtaClassName = ctaClassName ?? 'nav-cta';

  return (
    <nav>
      <a href="/" className="logo">
        SIGNMONS
      </a>
      <div className="nav-inner">
        <ul className="nav-links">
          {navLinks.map((link) => {
            const isActive = link.id === activeLinkId;
            return (
              <li key={link.id}>
                <a href={link.href} className={isActive ? 'active' : undefined} aria-current={isActive ? 'page' : undefined}>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a href={ctaHref} className={navCtaClassName}>
          {ctaLabel}
        </a>
      </div>
    </nav>
  );
};

export default SiteNavigation;
