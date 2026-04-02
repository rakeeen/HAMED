import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const useHomeAnimations = (containerRef: React.RefObject<HTMLElement>) => {
  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero Stagger
    gsap.from(".gsap-hero", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: "power4.out",
    });

    // Scroll Reveal
    gsap.utils.toArray('.gsap-reveal').forEach((elem: any) => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, { scope: containerRef });
};
