import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { homePageCopy } from '../../data';
import { sectionContainerVariants } from '../motion/presets';
import SectionBlock from '../ui/SectionBlock';
import GlassCard from '../ui/GlassCard';

const ValuePillars = () => {
  const { valuePillars } = homePageCopy;

  return (
    <SectionBlock
      id={valuePillars.sectionId}
      variant="methods"
      title={valuePillars.title}
      lead={valuePillars.lead}
    >
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="show"
        className="value-pillars__grid"
      >
        {valuePillars.pillars.map((pillar) => (
          <GlassCard key={pillar.id} variant="methods" className="value-pillars__card">
            <Typography variant="subtitle1" className="value-pillars__title">
              {pillar.title}
            </Typography>
            <Typography variant="body1" className="value-pillars__description">
              {pillar.description}
            </Typography>
          </GlassCard>
        ))}
      </motion.div>
    </SectionBlock>
  );
};

export default ValuePillars;
