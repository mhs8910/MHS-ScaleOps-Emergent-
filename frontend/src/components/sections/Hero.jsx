import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { LINKS, STATS } from '../../lib/constants';

export default function Hero() {
  return (
    <section id="top" data-testid="hero-section" className="relative min-h-[100vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[160px]" />
        <div className="absolute inset-0 grain-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-teal-500/30 bg-teal-500/5 rounded-full mb-8">
            <Sparkles size={13} className="text-teal-400" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-teal-300 font-semibold">Zero Upfront · Pay on Results</span>
          </div>

          <h1 className="heading-tight text-white text-[clamp(2.5rem,7vw,5.5rem)] mb-8">
            I build expert-led <br />
            <span className="text-teal-400">online training</span> businesses<span className="text-amber-500">.</span>
          </h1>

          <p className="font-body text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Course, funnel, content, and marketing — built end-to-end at <span className="text-white font-semibold">zero upfront cost</span>.
            I only get paid when you make money. That's the deal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-calendly-cta"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-500 text-black font-bold text-base tracking-wide hover:bg-amber-400 hover:-translate-y-1 transition-all rounded-sm glow-amber"
            >
              Book Free Strategy Call
              <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="#apply"
              data-testid="hero-jotform-cta"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-teal-500/60 text-teal-300 hover:bg-teal-500/10 hover:border-teal-400 hover:text-white font-semibold text-base tracking-wide transition-all rounded-sm"
            >
              Apply to Build With Me
            </a>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-800/80 border border-slate-800 rounded-sm overflow-hidden">
            {STATS.map((s, i) => (
              <div key={i} data-testid={`hero-stat-${i}`} className="bg-[#0a0b0e] px-5 py-5">
                <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">{s.value}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-teal-400 font-semibold mt-1">{s.label}</div>
                <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] max-w-[460px] mx-auto">
            {/* Frame */}
            <div className="absolute inset-0 border border-teal-500/30 translate-x-3 translate-y-3 rounded-sm" />
            <div className="absolute inset-0 overflow-hidden border border-slate-700 rounded-sm">
              <img
                src="https://images.pexels.com/photos/18272053/pexels-photo-18272053.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=720"
                alt="Architecture"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-teal-500/10 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
            </div>

            {/* Floating chip */}
            <div className="absolute -left-6 top-10 bg-[#0f1115]/95 backdrop-blur-md border border-slate-800 px-5 py-4 rounded-sm shadow-2xl max-w-[230px]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-teal-400 font-semibold mb-1">Operator-led</div>
              <div className="text-white font-display font-bold text-base leading-snug">Built. Launched. Scaled.</div>
              <div className="text-xs text-slate-400 mt-1">In 30 days, not 30 weeks.</div>
            </div>

            <div className="absolute -right-4 bottom-12 bg-[#0f1115]/95 backdrop-blur-md border border-amber-500/30 px-5 py-4 rounded-sm shadow-2xl">
              <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">Commission</div>
              <div className="font-display font-black text-3xl text-white tracking-tight">25–30%</div>
              <div className="text-xs text-slate-400 mt-0.5">Until proof of revenue</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
