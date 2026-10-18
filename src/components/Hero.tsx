import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { photo, photoSrcSet } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { GoldDust } from './GoldDust';
import { EASE } from './ui';

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.3, ease: EASE, delay: 0.15 + i * 0.12 } }),
};

export const Hero = ({ ready }: { ready: boolean }) => {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const state = ready ? 'show' : 'hidden';

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-noir">
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <motion.img
          src={photo('heroSugarDust', 2000)}
          srcSet={photoSrcSet('heroSugarDust', [800, 1200, 1800, 2400])}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover object-[70%_center] sm:object-center"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.4, ease: EASE }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-noir/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(233,184,114,0.18),transparent_55%)]" />
      <GoldDust density={110} />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative z-10 flex h-full flex-col justify-center pt-24 md:pb-28">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          {t.hero.eyebrow}
        </motion.span>

        <h1 className="mt-6 font-serif font-light leading-[0.88] tracking-[-0.02em] text-cream">
          {[t.hero.titleA, t.hero.titleB].map((txt, i) => (
            <span key={i} className="block overflow-hidden pb-2">
              <motion.span className="block text-[15vw] sm:text-[min(11vw,12vh)]" variants={line} custom={i} initial="hidden" animate={state}>
                {txt}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-4">
            <motion.em
              className="text-gold-gradient block text-[13vw] font-normal italic sm:text-[min(10vw,11vh)]"
              variants={line}
              custom={2}
              initial="hidden"
              animate={state}
            >
              {t.hero.titleC}
            </motion.em>
          </span>
        </h1>

        <motion.p
          className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        >
          {t.hero.lead}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <a href="#menu" className="btn-gold group">
            {t.hero.ctaMenu}
            <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a href="#reserve" className="btn-ghost">
            {t.hero.ctaReserve}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-cream/10 bg-noir/40 backdrop-blur-md md:block"
        initial={{ opacity: 0, y: 40 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 1.1 }}
      >
        <div className="container-x grid grid-cols-4 divide-x divide-cream/10">
          {t.hero.stats.map((s) => (
            <div key={s.label} className="px-6 py-6 first:pl-0">
              <div className="font-serif text-4xl font-light text-cream lg:text-5xl">
                {s.value}
                <span className="text-gold">{s.unit}</span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-smoke">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <a
        href="#manifesto"
        className="absolute bottom-8 right-5 z-10 hidden flex-col items-center gap-3 md:flex text-[10px] uppercase tracking-[0.3em] text-cream/60 transition-colors hover:text-gold sm:right-8 md:bottom-36 lg:right-12"
      >
        <span className="[writing-mode:vertical-rl]">{t.hero.scroll}</span>
        <ArrowDown size={14} className="animate-float-slow" />
      </a>
    </section>
  );
};
