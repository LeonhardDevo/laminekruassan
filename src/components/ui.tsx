import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
}

export const Reveal = ({ delay = 0, y = 28, children, ...rest }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 1, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  accent: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
  extra?: ReactNode;
}

export const SectionTitle = ({ eyebrow, title, accent, lead, align = 'left', className = '', extra }: SectionTitleProps) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal>
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.98] tracking-[-0.01em] text-cream sm:text-6xl lg:text-7xl">
          {title}{' '}
          <em className="text-gold-gradient font-normal italic">{accent}</em>
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className={`mt-6 max-w-xl text-[15px] leading-relaxed text-smoke sm:text-base ${centered ? 'mx-auto' : ''}`}>{lead}</p>
        </Reveal>
      )}
      {extra}
    </div>
  );
};
