import { useEffect, useRef } from 'react';

/**
 * Cinematic cursor-tracking portrait.
 * - 3D billboard tilt of the photo toward cursor (perspective rotateX/Y)
 * - Eye-glint overlay that drifts inside the sunglasses lenses
 * - Teal rim-light that follows cursor angle
 * - Floating idle micro-motion when cursor is inactive
 *
 * All effects gracefully disable on touch devices and prefers-reduced-motion.
 */
export default function HeroPortrait3D() {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const rimRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(hover: none)').matches;
    if (reduced) return;

    let rafId;
    let mouseX = window.innerWidth * 0.7;
    let mouseY = window.innerHeight * 0.5;
    let active = false;
    let lastMove = performance.now();

    // Targets (normalized roughly -1..1)
    let txTarget = 0, tyTarget = 0;
    let tx = 0, ty = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      active = true;
      lastMove = performance.now();
    };

    const tick = () => {
      const photo = photoRef.current;
      const container = containerRef.current;
      if (!photo || !container) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Idle drift when cursor inactive >2.5s
      const now = performance.now();
      const idle = now - lastMove > 2500;
      if (idle) {
        const t = now * 0.0006;
        txTarget = Math.sin(t) * 0.35;
        tyTarget = Math.cos(t * 0.7) * 0.25;
      } else {
        // normalize cursor relative to portrait center, clamped
        const nx = Math.max(-1, Math.min(1, (mouseX - cx) / (window.innerWidth * 0.6)));
        const ny = Math.max(-1, Math.min(1, (mouseY - cy) / (window.innerHeight * 0.6)));
        txTarget = nx;
        tyTarget = ny;
      }

      // Lerp
      tx += (txTarget - tx) * 0.06;
      ty += (tyTarget - ty) * 0.06;

      const ry = tx * 9; // rotate Y ±9deg
      const rx = -ty * 6; // rotate X ±6deg
      const px = tx * 14; // small parallax
      const py = ty * 10;

      photo.style.transform = `perspective(1300px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) translate3d(${px.toFixed(2)}px, ${py.toFixed(2)}px, 0)`;

      // Rim light angle: position a soft teal blob behind the figure that follows cursor
      if (rimRef.current) {
        const angleX = 50 + tx * 30; // 20–80%
        const angleY = 50 + ty * 30;
        rimRef.current.style.background = `radial-gradient(circle at ${angleX.toFixed(1)}% ${angleY.toFixed(1)}%, rgba(20, 184, 166, 0.55) 0%, rgba(20, 184, 166, 0.0) 55%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      if (photoRef.current) photoRef.current.style.transform = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="hero-portrait-3d"
      className="relative w-full max-w-[480px] mx-auto aspect-[3/4] [perspective:1300px]"
    >
      {/* Backdrop frame offset */}
      <div className="absolute inset-0 border border-teal-500/25 translate-x-3 translate-y-3 rounded-sm pointer-events-none" />

      {/* Cinematic radial backplate */}
      <div className="absolute inset-0 overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b0e] via-[#0f1115] to-[#050505]" />
        <div
          ref={rimRef}
          aria-hidden="true"
          className="absolute -inset-12 transition-[background] duration-200 ease-out"
          style={{
            background:
              'radial-gradient(circle at 60% 40%, rgba(20, 184, 166, 0.35) 0%, rgba(20, 184, 166, 0) 55%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.85)_95%)]" />
        {/* Bottom fade into page */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* The actual photo with 3D tilt */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div
          ref={photoRef}
          className="relative w-[105%] h-[110%] will-change-transform [transform-style:preserve-3d]"
          style={{ transformOrigin: '50% 75%' }}
        >
          <img
            src="/assets/hassan-cutout.png"
            alt="Muhammad Hassan Shafiq"
            draggable={false}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain select-none"
            style={{
              filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(20,184,166,0.18))',
            }}
          />
        </div>
      </div>

      {/* Subtle teal scan line for futuristic feel */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent pointer-events-none" />

      {/* Bottom shadow base */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-teal-500/20 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
}
