// src/app/components/Hooks/index.js (or .ts)
'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Duration of the scroll animation
      easing: (t) => t, // Easing function
      smooth: true, // Enable smooth scrolling
    });

    const update = (time) => {
      lenis.raf(time); // Update Lenis on each animation frame
      requestAnimationFrame(update); // Request the next frame
    };

    requestAnimationFrame(update); // Start the animation loop

    // Cleanup on unmount
    return () => {
      lenis.destroy(); // Properly destroy Lenis instance
    };
  }, []);
};

export default useLenis;
