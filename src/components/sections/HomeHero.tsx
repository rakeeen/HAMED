import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const HomeHero = () => {
  const navigate = useNavigate();
  const { siteConfig } = useSiteContext();
  const heroRef = useRef<HTMLElement>(null);

  // Split title into words for stagger
  const words = siteConfig.name.toUpperCase().split(' ');

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8 })
      .from('.hero-word', {
        y: '110%',
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.4')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
      .from('.hero-cta', { y: 20, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.5')
      .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

    // floating orb parallax
    gsap.to('.hero-orb', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{ background: '#0e100f' }}
    >
      {/* Ambient orb */}
      <div
        className="hero-orb absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,228,72,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,252,225,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto z-10">
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em]"
          style={{
            border: '1px solid rgba(10,228,72,0.25)',
            color: '#0ae448',
            background: 'rgba(10,228,72,0.06)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ae448] animate-pulse" />
          Available for Projects
        </div>

        {/* Giant headline word-by-word */}
        <h1
          className="font-black tracking-tighter leading-[0.88] uppercase mb-8"
          style={{
            fontSize: 'clamp(3.5rem, 11vw, 9rem)',
            fontVariationSettings: '"wght" 900',
            color: '#fffce1',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.15em]"
              style={{ verticalAlign: 'bottom' }}
            >
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Role subtitle */}
        <p
          className="hero-subtitle text-lg md:text-2xl font-light mb-4 max-w-3xl mx-auto"
          style={{ color: 'rgba(255,252,225,0.55)', lineHeight: 1.5 }}
        >
          {siteConfig.role}
        </p>
        <p
          className="hero-subtitle text-sm mb-12 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,252,225,0.3)' }}
        >
          📍 {siteConfig.location}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="hero-cta btn-accent text-[14px] px-8 py-3"
            onClick={() => navigate('/projects')}
          >
            View My Work
          </button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hero-cta btn-ghost text-[14px] px-8 py-3"
          >
            Get in Touch
          </a>
        </div>

        {/* Tool pills */}
        <div className="hero-cta flex items-center justify-center gap-3 mt-10 flex-wrap">
          {(siteConfig.tools || []).map((tool: string) => (
            <span
              key={tool}
              className="text-[11px] font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full"
              style={{
                border: '1px solid rgba(255,252,225,0.10)',
                color: 'rgba(255,252,225,0.35)',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,252,225,0.25)' }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div
          className="w-px h-12 origin-top"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,252,225,0.25), transparent)',
            animation: 'scrollLine 1.8s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollLine {
            0%   { opacity: 0; transform: scaleY(0); }
            50%  { opacity: 1; transform: scaleY(1); }
            100% { opacity: 0; transform: scaleY(1) translateY(20px); }
          }
        `}</style>
      </div>
    </section>
  );
};
