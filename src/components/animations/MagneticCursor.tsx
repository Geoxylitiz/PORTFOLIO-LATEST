import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useCursor } from '../../contexts/CursorContext';

export const MagneticCursor: React.FC = () => {
  const { cursorState } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Is touch device
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: 'gray',
      mixBlendMode: 'difference' as any,
      borderRadius: '50%',
      x: '-50%',
      y: '-50%',
      scale: 1,
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: 'var(--color-accent-1)',
      mixBlendMode: 'difference' as any,
      borderRadius: '12px',
      x: '-50%',
      y: '-50%',
      scale: 1.2,
    },
    hidden: {
      opacity: 0,
      x: '-50%',
      y: '-50%',
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={isVisible ? cursorState : 'hidden'}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  );
};
