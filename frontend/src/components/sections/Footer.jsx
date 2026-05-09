import { Mail, Calendar, Instagram } from 'lucide-react';
import { LINKS, NAV_ITEMS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#050505] border-t border-slate-900 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src="/assets/mhs-logo.png" alt="MHS-ScaleOps" className="h-10 w-10 object-contain" />
              <div>
                <div className="font-display font-black text-white text-lg tracking-tight">MHS-ScaleOps</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-teal-500 font-medium">Operator · Pakistan → Global</div>
              </div>
            </div>
            <p className="font-body text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              I build expert-led online training businesses — course, funnel, content, and marketing —
              at zero upfront cost. I only get paid when you make money.
            </p>
            <div className="flex gap-3">
              <a
                href={`mailto:${LINKS.email}`}
                data-testid="footer-email-link"
                aria-label="Email"
                className="w-10 h-10 border border-slate-800 hover:border-teal-500/60 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors rounded-sm"
              >
                <Mail size={16} />
              </a>
              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-calendly-link"
                aria-label="Calendly"
                className="w-10 h-10 border border-slate-800 hover:border-teal-500/60 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors rounded-sm"
              >
                <Calendar size={16} />
              </a>
              <a
                href={LINKS.naixol}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-instagram-link"
                aria-label="Naixol Instagram"
                className="w-10 h-10 border border-slate-800 hover:border-teal-500/60 flex items-center justify-center text-slate-400 hover:text-teal-400 transition-colors rounded-sm"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="label-eyebrow mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    data-testid={`footer-nav-${n.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="label-eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${LINKS.email}`} className="text-sm text-slate-400 hover:text-white transition-colors break-all">{LINKS.email}</a>
              </li>
              <li>
                <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors break-all">{LINKS.calendly.replace('https://', '')}</a>
              </li>
              <li>
                <a href="#apply" className="text-sm text-slate-400 hover:text-white transition-colors">Apply Form →</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-slate-900 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} MHS-ScaleOps. Built and operated by Muhammad Hassan Shafiq.</div>
          <div className="flex gap-5">
            <span>Zero upfront · Pay on results</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
