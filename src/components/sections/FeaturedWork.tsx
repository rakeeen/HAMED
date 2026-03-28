import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { ProjectCard } from '../ui/ProjectCard';

export const FeaturedWork = () => {
  const { projects } = useSiteContext();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <section className="gsap-reveal bg-surface-container-low py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary">Portfolio</span>
            <h2 className="text-4xl font-bold tracking-tight text-white font-sans">Featured Work</h2>
          </div>
          <p className="text-outline max-w-sm text-sm font-light">
            A curated selection of projects focusing on performance, accessibility, and minimalist aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featuredProjects.map((project, index) => (
            <div key={project.id} className={index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'}>
              <ProjectCard project={project} large={index % 3 === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
