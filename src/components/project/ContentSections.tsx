import { motion } from "motion/react";
import { useSiteContext } from "../../context/SiteContext";
import { Project } from "../../types";

export const ContentSections = ({ project }: { project?: Project }) => {
  const { siteConfig } = useSiteContext();
  return (
    <div className="bg-background">
      {/* 1. The Challenge (Problem Statement) */}
      {project?.challenge && (
        <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-4xl"
          >
            <span className="font-label text-secondary uppercase text-[10px] tracking-[0.3em] block mb-6">The Problem</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
              {project.challenge}
            </h2>
          </motion.div>
        </section>
      )}

      {/* 2. First Detail Visual (Architecture/Flow or wireframes) */}
      {(project?.detailImages?.[0] || siteConfig.siteImages?.projectDetail1) && (
        <motion.section 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="w-full bg-surface-container-low"
        >
          <img 
            alt="Project Overview Screen" 
            className="w-full h-auto object-cover max-h-[90vh]" 
            src={project?.detailImages?.[0] || siteConfig.siteImages?.projectDetail1 || ''}
            referrerPolicy="no-referrer"
          />
        </motion.section>
      )}

      {/* 3. The Strategy / Approach */}
      {project?.strategy && (
        <section className="py-24 md:py-40 bg-surface">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
               initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
               className="md:col-span-5"
            >
              <span className="font-label text-primary uppercase text-[10px] tracking-[0.3em] block mb-6">Strategy & Approach</span>
              <p className="text-secondary text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                {project.strategy}
              </p>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
               className="md:col-span-7 rounded-[2.5rem] overflow-hidden border border-white/5"
            >
              <img 
                alt="Strategy Visual" 
                className="w-full h-full object-cover aspect-square md:aspect-[4/3]" 
                src={project?.detailImages?.[1] || siteConfig.siteImages?.projectDetail2 || ''}
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. Architecture Highlights */}
      {project?.architecture && (
        <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Information<br />Architecture</h3>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg text-secondary leading-relaxed whitespace-pre-wrap">
                {project.architecture}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 5. The Solution */}
      {project?.solution && (
        <section className="py-32 md:py-48 px-6 bg-primary/5 border-y border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto relative z-10 text-center"
          >
            <span className="font-label text-primary uppercase text-[10px] tracking-[0.3em] block mb-8">The Solution & Goals</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
              {project.solution}
            </h2>
          </motion.div>
        </section>
      )}

      {/* 6. Final High-Fidelity Showcase */}
      {(project?.detailImages?.[2] || siteConfig.siteImages?.projectDetail3) && (
        <section className="py-24 pb-48 w-full max-w-[2000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img 
              alt="Final Showcase" 
              className="w-full h-auto" 
              src={project?.detailImages?.[2] || siteConfig.siteImages?.projectDetail3 || ''}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </section>
      )}
    </div>
  );
};
