/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('.hover-trigger') ||
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: isHovering ? 80 : 16,
            height: isHovering ? 80 : 16,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
      
      {/* Text appearing inside cursor when hovering */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center mix-blend-difference"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.span 
          className="text-black text-[10px] font-bold uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
        >
          OPEN
        </motion.span>
      </motion.div>
    </>
  );
};

export default CustomCursor;