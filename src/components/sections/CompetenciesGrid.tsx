import React from 'react';
import { useSiteContext } from '../../context/SiteContext';

export const CompetenciesGrid = () => {
  const { competencies } = useSiteContext();
  
  return (
    <section className="gsap-reveal max-w-7xl mx-auto px-6 mb-32">
      <div className="mb-12">
        <h2 className="text-4xl font-sans font-bold tracking-tighter text-primary">SKILLS</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-outline-variant/10">
        {competencies.map((comp, index) => (
          <div key={index} className="bg-surface-container p-10 flex flex-col justify-between min-h-[250px]">
            <div className="text-4xl text-primary mb-8">
              <div className="w-12 h-12 border border-primary/20 flex items-center justify-center font-bold">
                {index + 1}
              </div>
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg mb-2 uppercase tracking-tight">{comp.title}</h4>
              <p className="text-secondary text-sm leading-relaxed">{comp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
