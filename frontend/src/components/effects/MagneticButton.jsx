import { forwardRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

/**
 * Magnetic wrapper — applies subtle magnetic-pull on hover to its inline-block child.
 * Pass `as="a"` or `as="button"` to render as anchor or button.
 */
const MagneticButton = forwardRef(function MagneticButton(
  { as: Tag = 'a', strength = 0.3, damping = 0.18, children, className = '', ...rest },
  forwardedRef
) {
  const magneticRef = useMagnetic({ strength, damping });
  const setRefs = (node) => {
    magneticRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
  return (
    <Tag ref={setRefs} className={`inline-flex will-change-transform ${className}`} {...rest}>
      {children}
    </Tag>
  );
});

export default MagneticButton;
