import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';

export const Footer = () => {
  const { siteConfig } = useSiteContext();

  return (
    <footer
      style={{
        background: '#0a0b0a',
        borderTop: '1px solid rgba(255,252,225,0.06)',
      }}
    >
      {/* Big CTA block */}
      <div
        className="py-24 px-6 text-center"
        style={{ borderBottom: '1px solid rgba(255,252,225,0.06)' }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.3em] font-medium block mb-4"
          style={{ color: '#0ae448' }}
        >
          {"{ Let's Work Together }"}
        </span>
        <h2
          className="font-black tracking-tighter uppercase mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            color: '#fffce1',
            lineHeight: 1,
            fontVariationSettings: '"wght" 900',
          }}
        >
          Start a Project
        </h2>
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-accent text-[14px] px-10 py-3.5 inline-block"
        >
          {siteConfig.email}
        </a>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-black text-base uppercase tracking-tighter"
            style={{ color: '#fffce1', fontVariationSettings: '"wght" 900' }}
          >
            {siteConfig.name.split(' ')[0]}
            <span style={{ color: '#0ae448' }}>.</span>
          </Link>
          <span className="text-[11px] font-medium" style={{ color: 'rgba(255,252,225,0.25)' }}>
            © {new Date().getFullYear()} — All rights reserved
          </span>
        </div>

        <div className="flex items-center gap-6">
          {[
            { label: 'X', href: siteConfig.socials.x },
            { label: 'LinkedIn', href: siteConfig.socials.linkedin },
            { label: 'Behance', href: siteConfig.socials.behance },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200"
              style={{ color: 'rgba(255,252,225,0.3)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0ae448'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,252,225,0.3)'; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
