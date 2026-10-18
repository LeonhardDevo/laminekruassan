import { AnimatePresence, motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { useState } from 'react';
import { photo } from '../data/images';
import { MENU, MENU_CATEGORIES, type MenuCategory } from '../data/menu';
import { useI18n } from '../i18n/I18nProvider';
import { EASE, Reveal, SectionTitle } from './ui';

export const MenuSection = () => {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<'all' | MenuCategory>('all');
  const items = filter === 'all' ? MENU : MENU.filter((m) => m.category === filter);

  return (
    <section id="menu" className="relative bg-ink py-28 sm:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow={t.menu.eyebrow} title={t.menu.title} accent={t.menu.titleAccent} lead={t.menu.lead} />
          <Reveal delay={0.2}>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
              {MENU_CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${
                    filter === c ? 'border-gold text-noir' : 'border-cream/15 text-cream/70 hover:border-cream/40 hover:text-cream'
                  }`}
                >
                  {filter === c && (
                    <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ duration: 0.5, ease: EASE }} />
                  )}
                  <span className="relative">{t.menu.categories[c]}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-coal">
                  <img
                    src={photo(item.photo, 800, 1000)}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                  {item.signature && (
                    <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-noir/50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md">
                      {t.menu.signature}
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-noir">{item.price[lang]}</span>
                  <div className="absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[13px] leading-relaxed text-cream/85">{item.description[lang]}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[28px] leading-tight text-cream">{item.name}</h3>
                    {item.pairing && (
                      <p className="mt-1.5 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-smoke">
                        <Coffee size={12} className="text-gold" />
                        {t.menu.pairing}: {item.pairing[lang]}
                      </p>
                    )}
                  </div>
                  <span className="mt-2 shrink-0 text-[11px] uppercase tracking-[0.2em] text-smoke">{item.meta[lang]}</span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-smoke lg:hidden">{item.description[lang]}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
