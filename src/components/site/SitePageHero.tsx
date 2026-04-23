type SitePageHeroProps = {
  tag: string;
  title: string;
  accent: string;
  subtitle: string;
};

const SitePageHero = ({ tag, title, accent, subtitle }: SitePageHeroProps) => {
  return (
    <div className="page-hero fade-in">
      <div className="page-hero-glow"></div>
      <p className="section-tag">{tag}</p>
      <h1 className="page-title">
        {title}
        <br />
        <span className="grad-text">{accent}</span>
      </h1>
      <p className="page-sub">{subtitle}</p>
    </div>
  );
};

export default SitePageHero;
