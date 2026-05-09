import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PHASES } from '../../lib/constants';

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="relative py-28 sm:py-36 bg-[#070709] border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl mb-16">
          <div className="label-eyebrow mb-5">How It Works</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            Commission first<span className="text-teal-400">.</span> <br />
            Retainer when proven<span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg leading-relaxed">
            A three-phase model engineered to remove every objection. You pay nothing until your training
            business pays you. As revenue stabilizes, we transition to a flat retainer.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-slate-800" />

          <div className="space-y-14 sm:space-y-24">
            {PHASES.map((p, i) => (
              <motion.div
                key={p.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`phase-${i + 1}`}
                className={`relative grid sm:grid-cols-2 gap-8 sm:gap-16 items-start ${
                  i % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Node */}
                <div className="absolute left-0 sm:left-1/2 top-2 -translate-x-[8px] sm:-translate-x-1/2 w-[18px] h-[18px] rounded-full bg-teal-500 ring-[6px] ring-[#070709] z-10" />

                {/* Content side */}
                <div className={`pl-12 sm:pl-0 ${i % 2 === 1 ? 'sm:pr-20 sm:text-right' : 'sm:pl-20'}`}>
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 === 1 ? 'sm:justify-end' : ''}`}>
                    <span className="font-display font-light text-teal-400 text-sm tracking-[0.25em] uppercase">{p.phase}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">{p.period}</span>
                  </div>
                  <h3 className="heading-tight text-white text-4xl sm:text-5xl mb-4">{p.title}</h3>
                  <div className={`flex items-baseline gap-3 mb-5 ${i % 2 === 1 ? 'sm:justify-end' : ''}`}>
                    <span className="font-display font-black text-amber-500 text-3xl sm:text-4xl tracking-tight">{p.rate}</span>
                    <span className="text-sm text-slate-400 uppercase tracking-[0.18em]">{p.rate_label}</span>
                  </div>
                  <p className="font-body text-slate-400 leading-relaxed mb-6">{p.desc}</p>
                  <ul className={`space-y-2 ${i % 2 === 1 ? 'sm:items-end sm:flex sm:flex-col' : ''}`}>
                    {p.points.map((pt) => (
                      <li key={pt} className={`flex items-center gap-2 text-sm text-slate-300 ${i % 2 === 1 ? 'sm:flex-row-reverse' : ''}`}>
                        <Check size={14} className="text-teal-400 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer side (empty visual) */}
                <div className="hidden sm:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
