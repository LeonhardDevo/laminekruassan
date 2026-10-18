import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { photo, type PhotoKey } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { EASE, SectionTitle } from './ui';

const STEP_PHOTOS: PhotoKey[] = ['kneading', 'flourHands', 'doughBall', 'goldenTray'];

export const Craft = () => {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  return (
    <section id="craft" className="relative bg-ink py-28 sm:py-40">
      <div className="container-x">
        <SectionTitle eyebrow={t.craft.eyebrow} title={t.craft.title} accent={t.craft.titleAccent} lead={t.craft.lead} />

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2px]">
              <AnimatePresence mode="sync">
                <motion.img
                  key={active}
                  src={photo(STEP_PHOTOS[active], 1200, 1500)}
                  alt={t.craft.steps[active].title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.12 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/10 to-transparent" />
              <div className="absolute inset-x-8 bottom-8 flex items-end justify-between">
                <div>
                  <div className="font-serif text-sm italic text-gold">{t.craft.steps[active].k}</div>
                  <div className="font-serif text-4xl text-cream">{t.craft.steps[active].title}</div>
                </div>
                <div className="font-serif text-[120px] font-light leading-none text-cream/15">0{active + 1}</div>
              </div>
              <div className="absolute left-8 top-8 flex gap-2">
                {STEP_PHOTOS.map((_, i) => (
                  <span key={i} className={`h-px w-10 transition-colors duration-700 ${i <= active ? 'bg-gold' : 'bg-cream/20'}`} />
                ))}
              </div>
            </div>
          </div>

          <ol className="relative">
            <span className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold/60 via-cream/10 to-transparent sm:block" />
            {t.craft.steps.map((step, i) => (
              <motion.li
                key={step.k}
                className="relative pb-16 last:pb-0 sm:pl-16 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:pb-0"
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: '-45% 0px -45% 0px' }}
              >
                <span
                  className={`absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border font-serif text-sm transition-all duration-700 sm:flex lg:top-1/2 lg:-translate-y-1/2 ${
                    active === i ? 'border-gold bg-gold text-noir' : 'border-cream/20 bg-ink text-cream/60'
                  }`}
                >
                  0{i + 1}
                </span>
                <div className={`transition-opacity duration-700 ${active === i ? 'opacity-100' : 'opacity-100 lg:opacity-40'}`}>
                  <div className="mb-6 aspect-[16/10] overflow-hidden rounded-[2px] lg:hidden">
                    <img src={photo(STEP_PHOTOS[i], 1000, 625)} alt={step.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-lg italic text-gold">{step.k}</span>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-smoke">{step.time}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-4xl font-light text-cream sm:text-5xl">{step.title}</h3>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-smoke">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
