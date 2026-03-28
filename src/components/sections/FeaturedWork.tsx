import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';
import { ProjectCard } from '../ui/ProjectCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWork = () => {
  const { projects } = useSiteContext();
  const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.fw-heading', {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.fw-heading',
        start: 'top 88%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 px-6 md:px-12"
      style={{ background: '#0e100f' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header — GSAP curly brace motif */}
        <div className="fw-heading flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span
              className="text-[11px] uppercase tracking-[0.3em] font-medium block mb-3"
              style={{ color: '#0ae448' }}
            >
              {'{ Portfolio }'}
            </span>
            <h2
              className="font-black tracking-tighter leading-[1] uppercase"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                color: '#fffce1',
                fontVariationSettings: '"wght" 900',
              }}
            >
              Featured<br />Work
            </h2>
          </div>

          <div className="flex items-end gap-8">
            <p
              className="text-[14px] font-light max-w-xs"
              style={{ color: 'rgba(255,252,225,0.45)', lineHeight: 1.7 }}
            >
              A curated selection of projects focusing on human-centered design and measurable impact.
            </p>
            <Link
              to="/projects"
              className="flex-shrink-0 flex items-center gap-2 group"
              style={{ color: '#fffce1', fontSize: '13px', fontWeight: 600 }}
            >
              All Projects
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: '#0ae448' }}
              />
            </Link>
          </div>
        </div>

        {/* Grid — GSAP Showcase 4-col style */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={
                index === 0 ? 'md:col-span-7' :
                index === 1 ? 'md:col-span-5' :
                index === 2 ? 'md:col-span-5' :
                              'md:col-span-7'
              }
            >
              <ProjectCard
                project={project}
                large={index === 0 || index === 3}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
