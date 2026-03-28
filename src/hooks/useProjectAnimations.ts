import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useProjectAnimations = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Basic block fade-ups
      const reveals = gsap.utils.toArray('.gsap-reveal');
      reveals.forEach((element: any) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });

      // Hero Parallax Scrubber
      const heroImage = document.querySelector('.gsap-parallax');
      if (heroImage) {
        gsap.fromTo(heroImage, 
          { scale: 1.1, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.8, 
            duration: 1.5,
            ease: 'power3.out'
          }
        );

        gsap.to(heroImage, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroImage.parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // Staggered Text Arrays
      const staggers = gsap.utils.toArray('.gsap-stagger-container');
      staggers.forEach((container: any) => {
        const chars = container.querySelectorAll('.gsap-stagger-item');
        if (chars.length) {
          gsap.from(chars, {
            opacity: 0,
            y: 30,
            stagger: 0.03,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
