import { useEffect, useRef, useState } from 'react';

/**
 * Glowing custom cursor — dot + lagging ring.
 * - Hidden on touch devices and prefers-reduced-motion.
 * - Expands + shifts amber on hovering interactive elements.
 * - Contracts on mousedown.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setSupported(true);

    document.documentElement.classList.add('cursor-custom-on');

    let rafId;
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let rx = mx, ry = my;
    let scaleTarget = 1;
    let scale = 1;
    let amberTarget = 0;
    let amber = 0;
    let pressed = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onDown = () => { pressed = true; };
    const onUp = () => { pressed = false; };

    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true;
      if (el.getAttribute && el.getAttribute('role') === 'button') return true;
      if (el.dataset && el.dataset.cursor === 'hover') return true;
      return false;
    };
    const onOver = (e) => {
      const t = e.target.closest('a, button, input, select, textarea, [role="button"], [data-cursor="hover"]');
      if (t) {
        scaleTarget = 2.4;
        amberTarget = isInteractive(t) && (t.classList.contains('bg-amber-500') || t.dataset.cursor === 'amber') ? 1 : 0;
      } else {
        scaleTarget = 1;
        amberTarget = 0;
      }
    };

    const loop = () => {
      // Dot: instant follow
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      // Ring: lagging
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      // Scale + color
      scale += (scaleTarget * (pressed ? 0.7 : 1) - scale) * 0.18;
      amber += (amberTarget - amber) * 0.18;

      if (dot) dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      if (ring) {
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        const teal = 'rgba(20, 184, 166, ';
        const am = 'rgba(245, 158, 11, ';
        const a = amber.toFixed(3);
        const inv = (1 - amber).toFixed(3);
        ring.style.borderColor = `rgba(${Math.round(20 + (245 - 20) * amber)}, ${Math.round(184 + (158 - 184) * amber)}, ${Math.round(166 + (11 - 166) * amber)}, 0.7)`;
        ring.style.boxShadow = `0 0 22px ${teal}${0.35 * (1 - amber)}), 0 0 26px ${am}${0.45 * amber})`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('cursor-custom-on');
    };
  }, []);

  if (!supported) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        data-testid="custom-cursor-ring"
        className="custom-cursor-ring"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        data-testid="custom-cursor-dot"
        className="custom-cursor-dot"
      />
    </>
  );
}
