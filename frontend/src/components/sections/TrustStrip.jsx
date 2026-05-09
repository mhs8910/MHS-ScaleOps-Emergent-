import { NICHES } from '../../lib/constants';

export default function TrustStrip() {
  const items = [...NICHES, ...NICHES];
  return (
    <section data-testid="trust-strip" className="border-y border-slate-800/80 bg-[#070709] py-6 overflow-hidden">
      <div className="flex items-center gap-10 max-w-7xl mx-auto px-6 sm:px-10 mb-4">
        <span className="label-eyebrow whitespace-nowrap">Built for experts in</span>
        <span className="flex-1 divider-glow" />
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {items.map((n, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-display font-light text-2xl sm:text-3xl text-slate-500 tracking-tight">{n}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
