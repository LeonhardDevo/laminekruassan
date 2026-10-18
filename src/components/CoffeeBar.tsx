import { motion, useScroll, useTransform } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { photo } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { Reveal, SectionTitle } from './ui';

export const CoffeeBar = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);

  return (
    <section id="coffee" ref={ref} className="relative overflow-hidden bg-noir py-28 sm:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <motion.img
              src={photo('espressoPour', 1400, 1800)}
              alt="Espresso pouring from a portafilter"
              loading="lazy"
              style={{ y, scale: 1.25 }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
          </div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-10 -right-4 hidden aspect-square w-48 overflow-hidden rounded-full border-[6px] border-noir shadow-2xl sm:block lg:-right-12 lg:w-60"
          >
            <img src={photo('latteArt', 600, 600)} alt="Latte art" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute -left-3 top-10 hidden rotate-180 text-[10px] uppercase tracking-[0.4em] text-smoke/60 [writing-mode:vertical-rl] lg:block">
            Specialty · Single origin · Slow bar
          </div>
        </div>

        <div>
          <SectionTitle eyebrow={t.coffee.eyebrow} title={t.coffee.title} accent={t.coffee.titleAccent} lead={t.coffee.lead} />

          <div className="mt-12 grid grid-cols-3 gap-4 border-y border-cream/10 py-8">
            {t.coffee.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <div className="font-serif text-4xl font-light text-gold-soft sm:text-5xl">{f.value}</div>
                <div className="mt-2 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-smoke sm:text-[11px]">{f.label}</div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <h3 className="mt-12 font-serif text-2xl italic text-cream">{t.coffee.pairingsTitle}</h3>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {t.coffee.pairings.map((p, i) => (
              <Reveal key={p.a} delay={0.15 + i * 0.08}>
                <li className="group flex flex-col gap-2 rounded-[2px] border border-cream/[0.08] bg-cream/[0.02] p-5 transition-colors duration-500 hover:border-gold/40 hover:bg-gold/[0.04] sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex flex-wrap items-center gap-3 font-serif text-xl text-cream">
                    {p.a}
                    <Plus size={14} className="text-gold transition-transform duration-500 group-hover:rotate-90" />
                    {p.b}
                  </span>
                  <span className="text-[13px] text-smoke sm:max-w-[230px] sm:text-right">{p.note}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
