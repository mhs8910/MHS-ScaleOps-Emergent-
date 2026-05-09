import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { LINKS } from '../../lib/constants';

export default function CaseStudy() {
  return (
    <section id="proof" data-testid="case-study-section" className="relative py-28 sm:py-36 bg-[#070709] border-y border-slate-900 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[140px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <div className="label-eyebrow mb-5">Featured Case Study</div>
        <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-12 max-w-3xl">
          The <span className="text-teal-400">Naixol International</span> story<span className="text-amber-500">.</span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-video border border-slate-800 overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1607799632518-da91dd151b38?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
                alt="Naixol case study"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/90 via-[#050505]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-500/20 border border-teal-500/40 rounded-sm flex items-center justify-center">
                    <Instagram size={18} className="text-teal-400" />
                  </div>
                  <div>
                    <div className="text-white font-display font-bold text-lg tracking-tight">Naixol International</div>
                    <div className="text-xs text-teal-400 uppercase tracking-[0.18em] font-semibold">Tech Education · Pakistan → Global</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="font-body text-slate-300 text-lg leading-relaxed mb-7">
              Naixol came in with strong technical authority but no online training infrastructure.
              We built the entire system from zero — positioning, course architecture, funnel,
              content engine, and a student acquisition channel — and ran it as a true revenue partner.
            </p>

            <div className="grid grid-cols-3 gap-px bg-slate-800/70 border border-slate-800 mb-7">
              {[
                { v: '0→Live', l: 'Build to launch' },
                { v: 'Multi-cohort', l: 'Programs running' },
                { v: 'Global', l: 'Student base' },
              ].map((s, i) => (
                <div key={i} data-testid={`case-stat-${i}`} className="bg-[#0a0b0e] px-5 py-5">
                  <div className="font-display font-black text-2xl text-white tracking-tight">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-teal-400 font-semibold mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Full course architecture + curriculum design',
                'Branded landing experience + funnel',
                'Content engine across YouTube, Instagram, LinkedIn',
                'Acquisition system for qualified, paying students',
              ].map((b) => (
                <li key={b} className="flex gap-3 items-start text-slate-300 text-sm">
                  <span className="mt-2 w-1.5 h-1.5 bg-teal-400 shrink-0 rounded-full" />
                  {b}
                </li>
              ))}
            </ul>

            <a
              href={LINKS.naixol}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="naixol-instagram-link"
              className="group inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm tracking-wide transition-colors"
            >
              View Naixol on Instagram
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
