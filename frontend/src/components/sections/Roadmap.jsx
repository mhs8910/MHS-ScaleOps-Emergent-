import { motion } from 'framer-motion';
import { ROADMAP } from '../../lib/constants';

export default function Roadmap() {
  return (
    <section data-testid="roadmap-section" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl mb-14">
          <div className="label-eyebrow mb-5">The 30-Day Build</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            From silence to <br />students in 30 days<span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg leading-relaxed">
            A clean four-week production sprint. Each week ends with deliverables you can see, click, and share.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/70 border border-slate-800">
          {ROADMAP.map((r, i) => (
            <motion.div
              key={r.week}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`roadmap-week-${i + 1}`}
              className="bg-[#0a0b0e] p-7 group hover:bg-[#0f1115] transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-display font-black text-5xl text-slate-800 group-hover:text-teal-500 tracking-tighter transition-colors">0{i + 1}</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-teal-400 font-semibold">{r.week}</span>
                  <span className="font-display font-bold text-white text-2xl tracking-tight">{r.title}</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {r.items.map((it) => (
                  <li key={it} className="flex gap-2 items-start text-sm text-slate-400">
                    <span className="mt-2 w-1 h-1 bg-amber-500 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
