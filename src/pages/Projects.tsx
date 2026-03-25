import React, { useRef } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { ProjectCard } from '../components/ui/ProjectCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Projects = () => {
  const { projects } = useSiteContext();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto" ref={containerRef}>
      <section className="gsap-reveal mb-24">
        <div className="inline-block mb-4">
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary px-3 py-1 bg-surface-container-high rounded-full">Selected Works</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-sans font-extrabold tracking-tighter text-primary mb-6 leading-tight max-w-4xl">
          Designing impactful <br />web & mobile products.
        </h1>
        <p className="text-secondary text-lg max-w-2xl font-light leading-relaxed">
          Focused on building user-centered solutions that improve usability and deliver scalable digital experiences.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <div key={project.id} className={`gsap-reveal ${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'}`}>
            <ProjectCard 
              project={project} 
              large={index % 3 === 0} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
