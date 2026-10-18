import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { EASE, Reveal, SectionTitle } from './ui';

const DOME = 'M40 230 C40 118 118 58 200 58 C282 58 360 118 360 230 Z';
const at = (s: number) => `translate(200 230) scale(${s}) translate(-200 -230)`;

const LAYER_RINGS = Array.from({ length: 12 }, (_, i) => 0.93 - i * 0.028);

const useHoneycomb = () =>
  useMemo(() => {
    const cells: Array<{ x: number; y: number; rx: number; ry: number; rot: number }> = [];
    const rand = (n: number) => {
      const v = Math.sin(n * 127.1) * 43758.5453;
      return v - Math.floor(v);
    };
    const rows = [0.58, 0.52, 0.46, 0.4, 0.34];
    rows.forEach((s, r) => {
      const count = Math.round(16 * s);
      for (let i = 0; i < count; i++) {
        const j = rand(r * 31 + i);
        const theta = Math.PI * (0.08 + (0.84 * (i + 0.5 + (j - 0.5) * 0.5)) / count);
        const x = 200 + 158 * s * Math.cos(theta);
        const y = 230 - 168 * s * Math.sin(theta) + (j - 0.5) * 4;
        const size = (4 + 9 * s) * (0.65 + 0.7 * rand(i * 7 + r));
        cells.push({ x, y, rx: size, ry: size * (0.45 + 0.2 * j), rot: (theta * 180) / Math.PI - 90 });
      }
    });
    return cells;
  }, []);

export const Anatomy = () => {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const cells = useHoneycomb();

  useEffect(() => {
    if (touched) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 3800);
    return () => clearInterval(id);
  }, [touched]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const dim = (i: number) => ({ opacity: active === i ? 1 : 0.22, transition: { duration: 0.6, ease: EASE } });

  return (
    <section id="anatomy" className="relative overflow-hidden bg-noir py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter/[0.07] blur-[160px]" />
      <div className="container-x relative">
        <SectionTitle eyebrow={t.anatomy.eyebrow} title={t.anatomy.title} accent={t.anatomy.titleAccent} lead={t.anatomy.lead} align="center" />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <svg viewBox="20 30 360 230" className="w-full drop-shadow-[0_40px_80px_rgba(233,184,114,0.18)]" role="img" aria-label={t.anatomy.eyebrow}>
              <defs>
                <linearGradient id="an-crust" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7A4318" />
                  <stop offset="0.5" stopColor="#B06F2C" />
                  <stop offset="1" stopColor="#D49A4E" />
                </linearGradient>
                <radialGradient id="an-dough" cx="0.5" cy="1" r="1">
                  <stop offset="0" stopColor="#FBEBC9" />
                  <stop offset="0.6" stopColor="#EFCF94" />
                  <stop offset="1" stopColor="#D9A75F" />
                </radialGradient>
              </defs>

              <motion.g animate={dim(0)} onMouseEnter={() => pick(0)} className="cursor-pointer">
                <path d={DOME} fill="url(#an-crust)" />
              </motion.g>

              <path d={DOME} transform={at(0.95)} fill="url(#an-dough)" />

              <motion.g animate={dim(1)} onMouseEnter={() => pick(1)} className="cursor-pointer" fill="none">
                <path d={DOME} transform={at(0.95)} fill="transparent" />
                {LAYER_RINGS.map((s, i) => (
                  <path key={s} d={DOME} transform={at(s)} stroke={i % 2 ? '#C8873C' : '#A9692A'} strokeWidth={1.4 / s} strokeOpacity={0.85} />
                ))}
              </motion.g>

              <motion.g animate={dim(2)} onMouseEnter={() => pick(2)} className="cursor-pointer">
                <path d={DOME} transform={at(0.6)} fill="#F4DCAA" />
                {cells.map((c, i) => (
                  <ellipse
                    key={i}
                    cx={c.x}
                    cy={c.y}
                    rx={c.rx}
                    ry={c.ry}
                    transform={`rotate(${c.rot} ${c.x} ${c.y})`}
                    fill="#A8692B"
                    fillOpacity={0.28}
                    stroke="#9A5E24"
                    strokeOpacity={0.7}
                    strokeWidth={0.7}
                  />
                ))}
              </motion.g>

              <motion.g animate={dim(3)} onMouseEnter={() => pick(3)} className="cursor-pointer">
                <path d={DOME} transform={at(0.26)} fill="#FFF3DA" />
                <path d={DOME} transform={at(0.18)} fill="#FCE7BC" />
              </motion.g>

              <line x1="30" y1="230" x2="370" y2="230" stroke="#C8A26B" strokeOpacity="0.4" strokeDasharray="2 5" />
            </svg>
            <div className="mt-6 flex justify-center gap-2">
              {t.anatomy.layers.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={t.anatomy.layers[i].name}
                  className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-10 bg-gold' : 'w-4 bg-cream/20'}`}
                />
              ))}
            </div>
          </Reveal>

          <div className="divide-y divide-cream/10 border-y border-cream/10">
            {t.anatomy.layers.map((layer, i) => (
              <button
                key={layer.name}
                type="button"
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                className="group block w-full py-6 text-left"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className={`font-serif text-3xl transition-colors duration-500 ${active === i ? 'text-cream' : 'text-cream/40'}`}>
                    <span className="mr-4 text-base italic text-gold">0{i + 1}</span>
                    {layer.name}
                  </span>
                  <span className={`shrink-0 text-[10px] uppercase tracking-[0.25em] transition-colors ${active === i ? 'text-gold' : 'text-smoke/50'}`}>
                    {layer.meta}
                  </span>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-md pt-3 text-[15px] leading-relaxed text-smoke">{layer.text}</p>
                </motion.div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
