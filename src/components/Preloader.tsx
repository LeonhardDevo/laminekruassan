import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { LogoMark } from './Logo';
import { EASE } from './ui';

const LAYERS = 27;

export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const { t } = useI18n();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(LAYERS * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
      else setTimeout(onDone, 350);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <LogoMark className="h-24 w-24" />
        </motion.div>
        <motion.div
          className="mt-8 font-serif text-3xl tracking-[0.4em] text-cream"
          initial={{ opacity: 0, letterSpacing: '0.8em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        >
          LAMIN<span className="text-gold">É</span>
        </motion.div>
        <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-smoke">
          <span className="w-16 text-right font-serif text-2xl tabular-nums tracking-normal text-gold">{String(count).padStart(2, '0')}</span>
          <span className="h-px w-20 overflow-hidden bg-cream/10">
            <span className="block h-full bg-gold transition-[width] duration-100" style={{ width: `${(count / LAYERS) * 100}%` }} />
          </span>
          <span className="w-40">{t.preloader}</span>
        </div>
      </div>
    </motion.div>
  );
};
