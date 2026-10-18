import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { photo } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { LogoMark } from './Logo';
import { Reveal } from './ui';

export const Marquee = () => {
  const { t } = useI18n();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div className="relative overflow-hidden border-y border-cream/[0.07] bg-ink py-7" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-3xl font-light italic text-cream/80 sm:text-4xl">
            {item}
            <LogoMark className="h-6 w-6 opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
};

export const Manifesto = () => {
  const { t } = useI18n();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = t.manifesto.text.split(' ');

  return (
    <section id="manifesto" className="relative overflow-hidden bg-noir py-28 sm:py-40">
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow">{t.manifesto.eyebrow}</span>
        </Reveal>
        <p ref={ref} className="mt-10 max-w-5xl font-serif text-[34px] font-light leading-[1.15] text-cream sm:text-5xl lg:text-[64px]">
          {words.map((w, i) => (
            <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-24 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2px] sm:aspect-[16/11] lg:aspect-auto">
            <img
              src={photo('layersMacro', 1400)}
              alt="Laminated croissant layers, close-up"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[2500ms] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <span className="font-serif text-6xl font-light text-cream">27</span>
              <span className="text-[11px] uppercase leading-relaxed tracking-[0.25em] text-cream/70">
                couches
                <br />
                de beurre
              </span>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center divide-y divide-cream/10">
            {t.manifesto.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="group py-8 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-6">
                  <span className="font-serif text-lg italic text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-3xl font-normal text-cream transition-colors duration-500 group-hover:text-gold-soft sm:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-smoke">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
