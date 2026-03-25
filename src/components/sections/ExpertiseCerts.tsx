import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { ArrowRight } from 'lucide-react';

export const ExpertiseCerts = () => {
  const { siteConfig, competencies } = useSiteContext();

  return (
    <section className="gsap-reveal bg-surface py-24 px-6 md:px-12 border-t border-outline-variant/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans uppercase">Expertise & Certs</h2>
          <p className="text-secondary font-light leading-relaxed">
            {siteConfig.detailed_summary}
          </p>
          <div className="pt-4 space-y-2">
            <span className="text-sm font-medium text-primary flex items-center gap-2">
              📍 Based in {siteConfig.location}
            </span>
          </div>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant/10">
          {competencies.slice(0, 4).map((comp, idx) => (
            <div key={idx} className="bg-surface p-10 space-y-4">
              <div className="text-primary"><ArrowRight size={24} /></div>
              <h4 className="font-bold text-white tracking-tight uppercase">{comp.title}</h4>
              <p className="text-secondary text-sm font-light leading-relaxed">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
