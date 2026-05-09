import { motion } from 'framer-motion';
import { DELIVERABLES } from '../../lib/constants';

export default function Offer() {
  return (
    <section id="offer" data-testid="offer-section" className="relative py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <div className="label-eyebrow mb-5">The Offer</div>
            <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-0">
              What I build <br />for you<span className="text-amber-500">.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <p className="font-body text-slate-300 text-lg leading-relaxed mb-4">
              Twelve deliverables. One online training business. Zero upfront cost.
            </p>
            <p className="font-body text-slate-400 text-base leading-relaxed">
              I'm not a consultant who hands you a deck. I build the entire engine — course, funnel,
              content, traffic — and run it until your students start paying. Then we talk about retainer.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/70 border border-slate-800">
          {DELIVERABLES.map((d, i) => (
            <motion.div
              key={d.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              data-testid={`deliverable-${d.num}`}
              className="group bg-[#0a0b0e] p-7 sm:p-8 hover:bg-[#0f1115] transition-colors duration-300 cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-display font-light text-3xl text-slate-700 group-hover:text-teal-500 tracking-tight transition-colors">{d.num}</span>
                <span className="w-8 h-px bg-slate-800 group-hover:bg-teal-500 transition-colors mt-4" />
              </div>
              <h3 className="font-display font-bold text-white text-xl tracking-tight mb-2">{d.title}</h3>
              <p className="font-body text-sm text-slate-400 leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
