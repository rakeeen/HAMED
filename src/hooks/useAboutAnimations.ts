import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const useAboutAnimations = (containerRef: React.RefObject<HTMLElement>) => {
  useGSAP(() => {
    if (!containerRef.current) return;

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
