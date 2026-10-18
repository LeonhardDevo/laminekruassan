import { ArrowUpRight, Mail, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { Logo } from './Logo';

const NAV = ['craft', 'anatomy', 'menu', 'coffee', 'salon', 'reserve'] as const;

const Instagram = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const SOCIALS = [
  { name: 'Instagram', Icon: Instagram },
  { name: 'Telegram', Icon: Send },
  { name: 'E-mail', Icon: Mail },
];

export const Footer = () => {
  const { t } = useI18n();
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-cream/[0.07] bg-noir pt-24">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo size="md" />
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-smoke">{t.footer.tagline}</p>
            <div className="mt-8 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href="#top"
                  aria-label={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-noir"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-gold">{t.footer.explore}</h4>
            <ul className="mt-6 space-y-3">
              {NAV.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="group inline-flex items-center gap-1 text-[15px] text-cream/75 transition-colors hover:text-cream">
                    {t.nav[id]}
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-gold">{t.footer.visit}</h4>
            <p className="mt-6 font-serif text-2xl text-cream">{t.footer.daily}</p>
            <p className="mt-2 text-[14px] text-smoke">{t.footer.bakery}</p>
          </div>

          <div>
            <h4 className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-gold">{t.footer.follow}</h4>
            <p className="mt-6 text-[14px] leading-relaxed text-smoke">{t.footer.newsletter}</p>
            {subscribed ? (
              <p className="mt-5 font-serif text-xl italic text-gold-soft">{t.footer.subscribed}</p>
            ) : (
              <form onSubmit={subscribe} className="mt-5 flex items-center border-b border-cream/20 focus-within:border-gold">
                <input required type="email" placeholder={t.footer.email} aria-label={t.footer.email} className="w-full bg-transparent py-3 text-[14px] text-cream placeholder:text-smoke/60 focus:outline-none" />
                <button type="submit" className="shrink-0 py-3 pl-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-soft">
                  {t.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-24 select-none overflow-hidden" aria-hidden="true">
        <div className="text-gold-gradient text-center font-serif text-[21vw] font-light leading-[0.78] tracking-[0.04em]">LAMINÉ</div>
      </div>

      <div className="border-t border-cream/[0.07]">
        <div className="container-x flex flex-col gap-3 py-7 text-[11px] uppercase tracking-[0.2em] text-smoke/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Laminé · {t.footer.rights}</span>
          <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-gold">
            {t.footer.credits}
          </a>
        </div>
      </div>
    </footer>
  );
};
