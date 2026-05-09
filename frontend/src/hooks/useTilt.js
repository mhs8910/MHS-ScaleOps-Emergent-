import { useEffect, useRef } from 'react';

/**
 * 3D tilt hook — subtle perspective rotate on hover.
 * Performance: pure CSS transform, RAF-throttled, reduced-motion safe.
 *
 * @param {object} opts
 * @param {number} opts.max — max rotation degrees (default 6)
 * @param {number} opts.scale — scale on hover (default 1.0)
 * @param {number} opts.damping — lerp factor (default 0.12)
 */
export function useTilt({ max = 6, scale = 1, damping = 0.12 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let target = { rx: 0, ry: 0, s: 1 };
    let current = { rx: 0, ry: 0, s: 1 };
    let active = false;

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      target.ry = (px - 0.5) * max * 2;
      target.rx = -(py - 0.5) * max * 2;
      target.s = scale;
    };
    const onEnter = () => { active = true; loop(); };
    const onLeave = () => {
      active = false;
      target.rx = 0;
      target.ry = 0;
      target.s = 1;
      loop();
    };

    const loop = () => {
      current.rx += (target.rx - current.rx) * damping;
      current.ry += (target.ry - current.ry) * damping;
      current.s += (target.s - current.s) * damping;
      el.style.transform = `perspective(900px) rotateX(${current.rx.toFixed(2)}deg) rotateY(${current.ry.toFixed(2)}deg) scale(${current.s.toFixed(3)})`;
      const moving =
        Math.abs(target.rx - current.rx) > 0.05 ||
        Math.abs(target.ry - current.ry) > 0.05 ||
        Math.abs(target.s - current.s) > 0.001;
      if (active || moving) {
        rafId = requestAnimationFrame(loop);
      } else {
        el.style.transform = '';
      }
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseenter', onEnter, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }, [max, scale, damping]);

  return ref;
}
