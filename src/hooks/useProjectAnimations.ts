import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide GSAP scroll engine.
 * Apply classes to elements: .gsap-reveal, .gsap-parallax, .gsap-stagger-container / .gsap-stagger-item
 */
export const useProjectAnimations = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Batch fade-up for all .gsap-reveal elements
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

      // Initial state for reveals
      gsap.set('.gsap-reveal', { opacity: 0, y: 40 });

      // Hero parallax scrub
      const heroImg = document.querySelector('.gsap-parallax');
      if (heroImg) {
        gsap.fromTo(
          heroImg,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 0.8, duration: 1.8, ease: 'power3.out' }
        );
        gsap.to(heroImg, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: (heroImg as HTMLElement).parentElement,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Stagger containers
      const staggers = gsap.utils.toArray<HTMLElement>('.gsap-stagger-container');
      staggers.forEach(container => {
        const items = container.querySelectorAll('.gsap-stagger-item');
        if (!items.length) return;
        gsap.from(items, {
          opacity: 0,
          y: 25,
          stagger: 0.04,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
};
