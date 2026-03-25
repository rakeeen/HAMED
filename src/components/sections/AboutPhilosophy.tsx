import React from 'react';
import { useSiteContext } from '../../context/SiteContext';

export const AboutPhilosophy = () => {
  const { siteConfig } = useSiteContext();

  return (
    <section className="gsap-reveal max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-4 font-label text-secondary uppercase tracking-widest text-xs py-2">
        Summary
      </div>
      <div className="lg:col-span-8">
        <p className="text-2xl md:text-2xl font-sans font-medium text-primary leading-tight max-w-2xl">
          {siteConfig.summary}
        </p>
      </div>
    </section>
  );
};
