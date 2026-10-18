import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import type { Lang } from '../i18n/dictionary';
import { Logo } from './Logo';
import { EASE } from './ui';

const LINKS = ['craft', 'anatomy', 'menu', 'coffee', 'salon'] as const;

const LangSwitch = ({ className = '' }: { className?: string }) => {
  const { lang, setLang } = useI18n();
  return (
    <div className={`flex items-center gap-1 rounded-full border border-cream/15 p-1 ${className}`}>
      {(['ru', 'en'] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
            lang === code ? 'bg-gold text-noir' : 'text-smoke hover:text-cream'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const { t } = useI18n();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled ? 'border-b border-cream/[0.06] bg-noir/75 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-700 ${scrolled ? 'h-[72px]' : 'h-[96px]'}`}>
          <a href="#top" aria-label="Laminé" className="shrink-0">
            <Logo size="sm" />
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative text-[11px] font-medium uppercase tracking-[0.26em] text-cream/75 transition-colors hover:text-cream"
              >
                {t.nav[id]}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch className="hidden sm:flex" />
            <a href="#reserve" className="btn-gold hidden !px-6 !py-3 md:inline-flex">
              {t.nav.reserve}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        <motion.div className="h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft" style={{ scaleX: progress }} />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-noir/95 backdrop-blur-xl"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="container-x flex h-[96px] items-center justify-between">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="container-x flex flex-1 flex-col justify-center gap-2">
              {[...LINKS, 'reserve' as const].map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-5 border-b border-cream/[0.07] py-4 font-serif text-5xl font-light text-cream"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}
                >
                  <span className="font-sans text-[11px] tracking-[0.3em] text-gold">0{i + 1}</span>
                  <span className="transition-colors group-hover:text-gold">{t.nav[id]}</span>
                </motion.a>
              ))}
            </nav>
            <div className="container-x pb-10">
              <LangSwitch className="inline-flex" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
