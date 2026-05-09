import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LINKS } from '../../lib/constants';

export default function FinalCTA() {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoaded(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <section id="book" data-testid="final-cta-section" ref={ref} className="relative py-28 sm:py-36 bg-[#070709] border-t border-slate-900 overflow-hidden">
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/8 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/6 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="label-eyebrow mb-5 mx-auto inline-block">Final Step</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            Let's launch your <br />
            <span className="text-teal-400">training business</span><span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 text-lg leading-relaxed mb-8">
            One 30-minute call. We map your expertise into a sellable training business and decide if
            we're a fit. Zero pressure. Zero pitch deck. Just a clear next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="final-calendly-cta"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-amber-500 text-black font-bold text-base tracking-wide hover:bg-amber-400 hover:-translate-y-1 transition-all rounded-sm glow-amber"
            >
              Book Free Strategy Call
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#apply"
              data-testid="final-jotform-cta"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-teal-500/60 text-teal-300 hover:bg-teal-500/10 hover:text-white font-semibold text-base tracking-wide transition-all rounded-sm"
            >
              Apply via Form
            </a>
          </div>
        </div>

        <div className="border border-slate-800 rounded-sm bg-[#050505] p-1.5 max-w-5xl mx-auto">
          <div className="border border-slate-900 bg-[#0a0b0e]" data-testid="calendly-embed">
            {loaded ? (
              <iframe
                title="Book a Call"
                src={`${LINKS.calendly}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0b0e&text_color=ffffff&primary_color=14b8a6`}
                className="w-full h-[720px] sm:h-[760px] border-0"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-[720px] sm:h-[760px] flex items-center justify-center text-slate-500 text-sm">
                Loading calendar...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
