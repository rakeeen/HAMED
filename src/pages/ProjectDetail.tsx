import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSiteContext } from '../context/SiteContext';
import { ProjectInfo } from '../components/project/ProjectInfo';
import { ContentSections } from '../components/project/ContentSections';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContext();
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex] || projects[0];
  
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  React.useEffect(() => {
    document.title = `${project.title} | Hamed Walid`;
  }, [project]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[70vh] flex items-end px-6 md:px-12 pb-16 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/projects" className="inline-flex items-center gap-2 text-secondary hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none"
            style={{ fontFamily: '"Roboto Flex", sans-serif' }}
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* Dynamic Sections from User Provided Components */}
      <ProjectInfo />
      <ContentSections project={project} />

      {/* Project Navigation */}
      <section className="py-24 border-t border-white/5 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Previous Project */}
          <div className={`flex flex-col gap-4 ${!prevProject ? 'opacity-30 pointer-events-none' : ''}`}>
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Previous Case</span>
            <Link 
              to={prevProject ? `/project/${prevProject.id}` : '#'} 
              className="flex items-center gap-4 text-2xl md:text-4xl font-sans font-bold text-white hover:text-primary transition-colors group"
            >
              <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
              {prevProject?.title || 'No Previous'}
            </Link>
          </div>

          <div className="w-px h-12 bg-white/10 hidden md:block" />

          {/* Next Project */}
          <div className={`flex flex-col gap-4 text-right ${!nextProject ? 'opacity-30 pointer-events-none' : ''}`}>
            <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Next Story</span>
            <Link 
              to={nextProject ? `/project/${nextProject.id}` : '#'} 
              className="flex items-center gap-4 text-2xl md:text-4xl font-sans font-bold text-white hover:text-primary transition-colors group"
            >
              {nextProject?.title || 'No Next'}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
