import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LINKS, NAV_ITEMS } from '../../lib/constants';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navCalRef = useMagnetic({ strength: 0.28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[#050505]/80 border-b border-slate-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" data-testid="navbar-logo" className="flex items-center gap-3 group">
          <img src="/assets/mhs-logo.png" alt="MHS-ScaleOps" className="h-9 w-9 sm:h-10 sm:w-10 object-contain" />
          <div className="leading-tight">
            <div className="font-display font-black text-white text-base sm:text-lg tracking-tight">MHS-ScaleOps</div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-teal-500 font-medium">Operator · Pakistan → Global</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-slate-300 hover:text-white tracking-wide font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            ref={navCalRef}
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-calendly-cta"
            data-cursor="amber"
            className="inline-flex items-center px-5 py-2.5 bg-amber-500 text-black font-semibold text-sm tracking-wide hover:bg-amber-400 transition-colors rounded-sm will-change-transform"
          >
            Book Free Call
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="toggle menu"
          data-testid="navbar-mobile-toggle"
          className="lg:hidden p-2 text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-800/80 bg-[#050505]/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-slate-300 hover:text-teal-400 text-base font-medium"
              >
                {item.label}
              </a>
            ))}
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="mobile-calendly-cta"
              className="mt-2 inline-flex justify-center items-center px-5 py-3 bg-amber-500 text-black font-semibold text-sm tracking-wide rounded-sm"
            >
              Book Free Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
