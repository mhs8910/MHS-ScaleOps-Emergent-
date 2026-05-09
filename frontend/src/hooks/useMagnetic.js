import { useEffect, useRef } from 'react';

/**
 * Magnetic hover hook — pulls element toward cursor on hover.
 * Performance: RAF-driven, transform-only, disabled on touch + reduced motion.
 *
 * @param {object} opts
 * @param {number} opts.strength — 0–1, how much element follows cursor (default 0.35)
 * @param {number} opts.damping — 0–1, lerp factor (default 0.18)
 */
export function useMagnetic({ strength = 0.35, damping = 0.18 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let active = false;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
    };
    const onEnter = () => { active = true; loop(); };
    const onLeave = () => {
      active = false;
      target.x = 0;
      target.y = 0;
      loop();
    };
    const loop = () => {
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (active || Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
        rafId = requestAnimationFrame(loop);
      } else {
        el.style.transform = '';
      }
    };

    el.addEventListener('mouseenter', onEnter, { passive: true });
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [strength, damping]);

  return ref;
}
