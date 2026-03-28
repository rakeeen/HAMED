import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProjectCard = ({ project, large = false, index = 0 }: { project: Project; large?: boolean; index?: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay: index * 0.07,
    });
  });

  return (
    <Link to={`/project/${project.id}`} className="block w-full h-full group">
      <div
        ref={cardRef}
        className="relative overflow-hidden w-full h-full"
        style={{
          borderRadius: '14px',
          border: '1px solid rgba(255,252,225,0.07)',
          background: '#141614',
          transition: 'border-color 0.3s ease, transform 0.4s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(10,228,72,0.25)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,252,225,0.07)';
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        <div className={`w-full overflow-hidden ${large ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: 0.75, filter: 'grayscale(20%)' }}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(14,16,15,0.95) 0%, rgba(14,16,15,0.3) 60%, transparent 100%)',
          }}
        />

        {/* Text */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-0.5 rounded-full"
                style={{
                  border: '1px solid rgba(10,228,72,0.3)',
                  color: '#0ae448',
                  background: 'rgba(10,228,72,0.08)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h3
                className="font-bold tracking-tight mb-1"
                style={{ color: '#fffce1', fontSize: large ? '1.5rem' : '1.125rem' }}
              >
                {project.title}
              </h3>
              <p className="text-[13px] line-clamp-2" style={{ color: 'rgba(255,252,225,0.45)' }}>
                {project.description}
              </p>
            </div>
            <div
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#0ae448] group-hover:text-[#0e100f]"
              style={{ border: '1px solid rgba(255,252,225,0.15)', color: 'rgba(255,252,225,0.4)' }}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
