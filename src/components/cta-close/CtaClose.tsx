import Button from '@mui/material/Button';
import { homePageCopy } from '../../data';
import { getCtaHref, triggerCtaAction } from '../../utils/cta';
import SectionBlock from '../ui/SectionBlock';

type CtaCloseProps = {
  onTryDemo?: () => void;
  onEarlyAccess?: () => void;
};

const CtaClose = ({ onTryDemo, onEarlyAccess }: CtaCloseProps) => {
  const { ctaClose } = homePageCopy;
  const primaryHref = getCtaHref(ctaClose.primaryCta.action);
  const secondaryHref = getCtaHref(ctaClose.secondaryCta.action);

  return (
    <SectionBlock
      id={ctaClose.sectionId}
      variant="methods"
      title={ctaClose.title}
      lead={ctaClose.lead}
    >
      <div className="cta-close__actions">
        <Button
          className="hero__primary-cta"
          disableRipple
          type={primaryHref ? undefined : 'button'}
          href={primaryHref}
          onClick={() =>
            triggerCtaAction(ctaClose.primaryCta, { onTryDemo, onEarlyAccess })
          }
          data-intent={ctaClose.primaryCta.intent}
        >
          {ctaClose.primaryCta.label}
        </Button>
        <Button
          className="hero__secondary-cta"
          disableRipple
          type={secondaryHref ? undefined : 'button'}
          href={secondaryHref}
          onClick={() =>
            triggerCtaAction(ctaClose.secondaryCta, { onTryDemo, onEarlyAccess })
          }
          data-intent={ctaClose.secondaryCta.intent}
        >
          {ctaClose.secondaryCta.label}
        </Button>
      </div>
    </SectionBlock>
  );
};

export default CtaClose;
