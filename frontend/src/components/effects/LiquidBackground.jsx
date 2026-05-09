import { useEffect, useState } from 'react';

/**
 * Liquid animated background — 3 large blurred blobs orbiting on long CSS keyframes.
 * GPU-accelerated (transform only), reduced-motion safe.
 * Sits at -z-50 with pointer-events: none.
 */
export default function LiquidBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="liquid-bg"
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture opacity-[0.07]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_85%)]" />
      {/* Liquid blobs */}
      {!reduced && (
        <>
          <div className="liquid-blob liquid-blob-1" />
          <div className="liquid-blob liquid-blob-2" />
          <div className="liquid-blob liquid-blob-3" />
        </>
      )}
    </div>
  );
}
