import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MascotFace } from '../ui/MascotFace';
import { useSiteContext } from '../../context/SiteContext';
import { useLang } from '../../context/LangContext';
import { SketchyButton } from '../ui/SketchyButton';

export const Navbar = () => {
  const { siteConfig } = useSiteContext();
  const { lang, setLang, t, resolveField } = useLang();
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark'));
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navLinks = [
    { name: t('home'),     path: '/' },
    { name: t('projects'), path: '/projects' },
    { name: t('about'),    path: '/about' },
    { name: t('contact'),  path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setIsDark(document.body.classList.contains('dark'));
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--paper)',
      borderBottom: '1.5px solid var(--tape)',
      padding: '0.8rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
      transition: 'background 0.4s ease'
    }}>
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
        }}
      >
        <MascotFace size={32} />
        <span style={{
          fontFamily: 'var(--font-sketch)',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: 'var(--ink)',
        }}>
          {resolveField(siteConfig.name)}
        </span>
      </Link>

      {/* Nav Links & Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${isActive(path) ? 'active' : ''}`}
            >
              {name}
            </Link>
          ))}
        </div>
        
        {/* Hide Lang for now - per user request */}
        {/*
        <div className={`custom-select-container ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
          <div className="custom-select-trigger">
            {lang.toUpperCase()}
          </div>
          <div className="custom-select-options">
            {['en', 'ar', 'it'].map((l) => (
              <div 
                key={l} 
                className={`custom-select-option ${lang === l ? 'selected' : ''}`}
                onClick={() => {
                  setLang(l as any);
                  setIsLangOpen(false);
                }}
              >
                {l.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Theme Toggle SVG Icon */}
        <button 
            onClick={toggleTheme} 
            style={{ 
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0.2rem'
            }}
            title="Toggle Theme"
        >
            {isDark ? (
                /* Sketched Moon Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
                    <path d="M17 4l.5 1.5M19 6l1.5.5M15 8l-1-2" opacity="0.6" />
                </svg>
            ) : (
                /* Sketched Sun Icon */
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    <path d="M9 9l-1-1M15 15l1 1" opacity="0.4" />
                </svg>
            )}
        </button>
      </div>
    </nav>
  );
};
