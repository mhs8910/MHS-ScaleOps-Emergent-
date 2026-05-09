import { motion } from 'framer-motion';
import { LINKS } from '../../lib/constants';

const PRINCIPLES = [
  'I don\'t take retainer until I\'ve earned your trust with revenue.',
  'I build operating systems, not slide decks.',
  'I refuse work where the expert won\'t show up.',
  'I optimize for compounding outcomes, not vanity metrics.',
];

export default function Founder() {
  return (
    <section data-testid="founder-section" className="relative py-28 sm:py-36 bg-[#070709] border-y border-slate-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[140px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] max-w-[420px]">
            <div className="absolute inset-0 border border-amber-500/30 translate-x-3 translate-y-3" />
            <div className="absolute inset-0 overflow-hidden border border-slate-700">
              <img
                src="/assets/hassan-cutout.png"
                alt="Muhammad Hassan Shafiq"
                className="w-full h-full object-contain object-bottom"
                style={{ background: 'linear-gradient(180deg, #0a0b0e 0%, #0f1115 100%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,184,166,0.12),transparent_55%)] pointer-events-none" />
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="font-display font-black text-white text-2xl tracking-tight">Muhammad Hassan Shafiq</div>
              <div className="text-xs text-teal-400 uppercase tracking-[0.22em] font-semibold mt-1">Founder · MHS-ScaleOps</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="label-eyebrow mb-5">The Operator</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-7">
            I don't sell decks<span className="text-amber-500">.</span> <br />
            I build <span className="text-teal-400">businesses</span>.
          </h2>

          <p className="font-body text-slate-300 text-lg leading-relaxed mb-5">
            I'm Hassan. I build online training businesses for experts who are great at their craft
            but tired of the noise around how to "monetize" it.
          </p>
          <p className="font-body text-slate-400 text-base leading-relaxed mb-9">
            My model is simple: you bring expertise, I bring execution. I take zero upfront and only earn
            when paying students show up. That alignment is what makes this actually work — not a sales pitch,
            an operating principle.
          </p>

          <div className="space-y-3 mb-10 border-l border-teal-500/40 pl-5">
            {PRINCIPLES.map((p, i) => (
              <p key={i} data-testid={`principle-${i}`} className="font-body text-slate-300 text-base leading-relaxed">
                <span className="text-teal-400 mr-2 font-semibold">·</span>{p}
              </p>
            ))}
          </div>

          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="founder-calendly-cta"
            className="inline-flex items-center gap-2 px-7 py-4 bg-amber-500 text-black font-bold text-base tracking-wide hover:bg-amber-400 hover:-translate-y-1 transition-all rounded-sm"
          >
            Talk to me directly →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
