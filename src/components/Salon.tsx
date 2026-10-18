import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { photo, type PhotoKey } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal, SectionTitle } from './ui';

interface Tile {
  key: PhotoKey;
  alt: string;
  className: string;
  speed: number;
}

const COLUMNS: Tile[][] = [
  [
    { key: 'salonInterior', alt: 'Bakery interior lined with pastries', className: 'aspect-[3/4]', speed: -60 },
    { key: 'lattePour', alt: 'Barista pouring latte art', className: 'aspect-square', speed: -60 },
  ],
  [
    { key: 'cafeTable', alt: 'Croissant and latte on a café table', className: 'aspect-[4/5]', speed: 60 },
    { key: 'pastryShowcase', alt: 'Display of fresh pastries', className: 'aspect-[4/3]', speed: 60 },
    { key: 'croissantBowl', alt: 'Croissant served with coffee', className: 'aspect-square', speed: 60 },
  ],
  [
    { key: 'vitrine', alt: 'Bakery vitrine full of viennoiserie', className: 'aspect-square', speed: -110 },
    { key: 'croissantCoffee', alt: 'Croissant beside a cup of coffee', className: 'aspect-[3/4]', speed: -110 },
  ],
];

const Column = ({ tiles, progress, className = '' }: { tiles: Tile[]; progress: MotionValue<number>; className?: string }) => {
  const y = useTransform(progress, [0, 1], [0, tiles[0].speed]);
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-4 sm:gap-6 ${className}`}>
      {tiles.map((tile) => (
        <div key={tile.key} className={`group relative overflow-hidden rounded-[2px] ${tile.className}`}>
          <img
            src={photo(tile.key, 900)}
            alt={tile.alt}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[30%] transition-all duration-[1600ms] group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-noir/20 transition-colors duration-700 group-hover:bg-transparent" />
        </div>
      ))}
    </motion.div>
  );
};

export const Salon = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section id="salon" className="relative overflow-hidden bg-ink py-28 sm:py-40">
      <div className="container-x">
        <SectionTitle eyebrow={t.salon.eyebrow} title={t.salon.title} accent={t.salon.titleAccent} lead={t.salon.lead} align="center" />

        <div ref={ref} className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          <Column tiles={COLUMNS[0]} progress={scrollYProgress} />
          <Column tiles={COLUMNS[1]} progress={scrollYProgress} className="md:mt-24" />
          <Column tiles={COLUMNS[2]} progress={scrollYProgress} className="hidden md:flex" />
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-[2px] border border-cream/10 bg-cream/10 md:grid-cols-3">
          {t.ritual.items.map((r, i) => (
            <Reveal key={r.time} delay={i * 0.1} className="group bg-ink p-8 transition-colors duration-700 hover:bg-coal sm:p-10">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.ritual.eyebrow}</span>
                <span className="font-serif text-lg italic text-smoke">{r.time}</span>
              </div>
              <h3 className="mt-10 font-serif text-4xl font-light text-cream transition-colors duration-500 group-hover:text-gold-soft">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-smoke">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
