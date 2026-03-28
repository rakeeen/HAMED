import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = (containerRef: React.RefObject<HTMLElement>) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    // Scroll batch reveals
    ScrollTrigger.batch('.gsap-reveal', {
      start: 'top 88%',
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
        });
      },
      once: true,
    });
    gsap.set('.gsap-reveal', { opacity: 0, y: 40 });

  }, { scope: containerRef });
};
