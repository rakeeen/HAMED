import React from 'react';
import { useSiteContext } from '../../context/SiteContext';

export const AboutHero = () => {
  const { siteConfig } = useSiteContext();

  return (
    <section className="gsap-reveal max-w-7xl mx-auto px-6 mb-24 lg:mb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <span className="font-label text-secondary uppercase tracking-widest text-xs mb-4 block">{siteConfig.role}</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary leading-[0.9] uppercase" style={{ fontFamily: '"Roboto Flex", sans-serif' }}>
            {siteConfig.name.split(' ')[0]} <br /> {siteConfig.name.split(' ').slice(1).join(' ')}.
          </h1>
        </div>
        <div className="lg:col-span-4">
          <div className="aspect-[3/4] bg-surface-container-low overflow-hidden relative">
            <img 
              src={siteConfig.siteImages?.aboutPortrait || '/hamed_portrait.jpg'} 
              alt="Professional Portrait" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale opacity-95 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
