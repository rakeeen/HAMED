import React from 'react';
import { useSiteContext } from '../../context/SiteContext';

export const ExperienceTimeline = () => {
  const { timeline } = useSiteContext();

  return (
    <section className="gsap-reveal bg-surface-container-low py-24 mb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-sans font-bold tracking-tighter text-primary mb-2">EXPERIENCE</h2>
            <span className="font-label text-secondary uppercase tracking-widest text-[10px]">Professional Trajectory</span>
          </div>
          <div className="lg:col-span-8 space-y-16">
            {timeline.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 group">
                <div className="md:col-span-1 font-label text-secondary text-sm tracking-wider">{item.year}</div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-sans font-bold text-primary mb-1">{item.role}, {item.company}</h3>
                  <p className="text-secondary text-sm leading-relaxed max-w-lg mb-4">{item.description}</p>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-surface-container-highest rounded-full text-[10px] font-label text-secondary uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
