import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { photo } from '../data/images';
import { useI18n } from '../i18n/I18nProvider';
import { LogoMark } from './Logo';
import { EASE, Reveal, SectionTitle } from './ui';

const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '15:00', '17:00', '19:00', '20:00'];
const GUESTS = ['1', '2', '3', '4', '5', '6+'];

const today = () => new Date().toISOString().split('T')[0];

export const Reserve = () => {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="reserve" className="relative overflow-hidden py-28 sm:py-40">
      <img src={photo('goldenTray', 2000)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-noir/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-noir" />

      <div className="container-x relative grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
        <div className="flex flex-col justify-between gap-12">
          <SectionTitle eyebrow={t.reserve.eyebrow} title={t.reserve.title} accent={t.reserve.titleAccent} lead={t.reserve.lead} />
          <Reveal delay={0.2} className="flex items-center gap-5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Clock size={20} />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-smoke">{t.reserve.hours}</div>
              <div className="font-serif text-3xl text-cream">{t.reserve.hoursValue}</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative min-h-[520px] rounded-[2px] border border-cream/10 bg-noir/60 p-7 backdrop-blur-xl sm:p-12">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex min-h-[440px] flex-col items-center justify-center text-center"
                >
                  <div className="relative">
                    <LogoMark className="h-24 w-24" />
                    <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-noir">
                      <Check size={18} />
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-5xl italic text-gold-soft">{t.reserve.successTitle}</h3>
                  <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">{t.reserve.successText}</p>
                  <button type="button" onClick={() => setSent(false)} className="btn-ghost mt-10">
                    {t.reserve.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
                >
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.name}</span>
                    <input required name="name" autoComplete="name" className="field" placeholder="Amélie" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.phone}</span>
                    <input required name="phone" type="tel" autoComplete="tel" className="field" placeholder="+0 000 000 00 00" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.date}</span>
                    <input required name="date" type="date" min={today()} defaultValue={today()} className="field" />
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.time}</span>
                      <select name="time" defaultValue="10:00" className="field cursor-pointer appearance-none">
                        {TIMES.map((v) => (
                          <option key={v} value={v} className="bg-coal">
                            {v}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.guests}</span>
                      <select name="guests" defaultValue="2" className="field cursor-pointer appearance-none">
                        {GUESTS.map((v) => (
                          <option key={v} value={v} className="bg-coal">
                            {v}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block sm:col-span-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.reserve.note}</span>
                    <textarea name="note" rows={3} className="field resize-none" placeholder={t.reserve.notePlaceholder} />
                  </label>
                  <div className="sm:col-span-2">
                    <button type="submit" className="btn-gold group w-full">
                      {t.reserve.submit}
                      <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
