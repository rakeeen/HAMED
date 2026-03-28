import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const { siteConfig } = useSiteContext();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'About',    path: '/about' },
    { name: 'Contact',  path: '/contact' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(14, 16, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,252,225,0.06)' : '1px solid transparent',
      }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-[60px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-black tracking-tighter text-lg uppercase"
          style={{ color: '#fffce1', fontVariationSettings: '"wght" 900' }}
        >
          {siteConfig.name.split(' ')[0]}
          <span style={{ color: '#0ae448' }}>.</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium" style={{ color: 'rgba(255,252,225,0.55)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative group transition-colors duration-200 py-1"
              style={{ color: location.pathname === link.path ? '#fffce1' : undefined }}
            >
              {link.name}
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-300"
                style={{
                  backgroundColor: location.pathname === link.path ? '#0ae448' : 'rgba(255,252,225,0.3)',
                  transform: location.pathname === link.path ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: '#0ae448' }}
              />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-accent text-[13px] hidden md:inline-flex items-center gap-2"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#0e100f' }}
          />
          Hire Me
        </a>
      </div>
    </nav>
  );
};
