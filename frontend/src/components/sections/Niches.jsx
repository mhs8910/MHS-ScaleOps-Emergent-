import { motion } from 'framer-motion';
import { NICHES } from '../../lib/constants';

export default function Niches() {
  return (
    <section id="niches" data-testid="niches-section" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="label-eyebrow mb-5">Who It's Built For</div>
            <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl">
              Real expertise<span className="text-teal-400">.</span> <br />
              Ready to be packaged<span className="text-amber-500">.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="font-body text-slate-400 text-base leading-relaxed">
              The model works in any field where someone has earned, teachable expertise — and the willingness
              to show up. Topic doesn't matter. Discipline does.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {NICHES.map((n, i) => (
            <motion.span
              key={n}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              data-testid={`niche-chip-${i}`}
              className="px-5 py-2.5 border border-slate-800 bg-[#0a0b0e] text-slate-300 text-sm font-medium tracking-wide rounded-full hover:border-teal-500/60 hover:text-white hover:bg-teal-500/5 transition-all cursor-default"
            >
              {n}
            </motion.span>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-px bg-slate-800/70 border border-slate-800">
          {[
            { label: 'Earned expertise', desc: 'You\'ve actually done the work — not just read about it.' },
            { label: 'Willing on camera', desc: 'You\'ll show up consistently for content and calls.' },
            { label: 'Long-game mindset', desc: 'You measure in months, not days. We build assets, not noise.' },
          ].map((c, i) => (
            <div key={i} data-testid={`niches-criteria-${i}`} className="bg-[#0a0b0e] p-7">
              <div className="font-display font-bold text-white text-xl tracking-tight mb-2">{c.label}</div>
              <div className="text-sm text-slate-400 leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
