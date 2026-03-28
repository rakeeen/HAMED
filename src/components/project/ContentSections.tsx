import { motion } from "motion/react";
import { useSiteContext } from "../../context/SiteContext";
import { Project } from "../../types";

const cinematicEase = [0.16, 1, 0.3, 1];

export const ContentSections = ({ project }: { project?: Project }) => {
  const { siteConfig } = useSiteContext();
  return (
    <article className="bg-background">
      {/* 1. The Challenge (Problem Statement) */}
      {project?.challenge && (
        <section className="py-24 md:py-48 px-6 max-w-[1400px] mx-auto min-h-screen flex items-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="w-full"
          >
            <motion.span variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: cinematicEase } } }} className="font-label text-primary bg-primary/10 px-4 py-2 rounded-full uppercase text-[10px] tracking-[0.3em] inline-block mb-8 border border-primary/20">
              The Interface Problem
            </motion.span>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tighter">
              {project.challenge.split(/\s+/).map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 40, rotate: 2 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 1.2, ease: cinematicEase } } }} className="inline-block mr-[0.5rem] md:mr-4">
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
        </section>
      )}

      {/* 2. First Detail Visual (Zero Padding Full Bleed) */}
      {(project?.detailImages?.[0] || siteConfig.siteImages?.projectDetail1) && (
        <motion.figure 
          initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: cinematicEase }}
          className="w-full h-auto m-0 p-0 relative"
        >
          <img 
            alt="Project Overview Screen" 
            className="w-full h-auto block" 
            src={project?.detailImages?.[0] || siteConfig.siteImages?.projectDetail1 || ''}
            referrerPolicy="no-referrer"
          />
        </motion.figure>
      )}

      {/* 3. The Strategy / Approach (Sticky Scroll Layout) */}
      {project?.strategy && (
        <section className="py-24 md:py-48 bg-surface">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-24 relative items-start">
            <motion.div 
               initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: cinematicEase }}
               className="md:w-5/12 md:sticky md:top-32"
            >
              <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Strategic<br />Approach</h3>
              <p className="text-secondary text-lg md:text-2xl leading-relaxed whitespace-pre-wrap font-light">
                {project.strategy}
              </p>
            </motion.div>
            <motion.figure 
               initial={{ opacity: 0, scale: 0.95, y: 100 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: cinematicEase }}
               className="md:w-7/12 w-full m-0 p-0 shadow-2xl rounded-[2.5rem] overflow-hidden"
            >
              <img 
                alt="Strategy Visual" 
                className="w-full h-auto object-cover block" 
                src={project?.detailImages?.[1] || siteConfig.siteImages?.projectDetail2 || ''}
                referrerPolicy="no-referrer"
              />
            </motion.figure>
          </div>
        </section>
      )}

      {/* 4. Architecture Highlights */}
      {project?.architecture && (
        <section className="py-32 md:py-48 px-6 max-w-[1400px] mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="md:col-span-5">
              <span className="font-label text-secondary uppercase text-[10px] tracking-[0.3em] block mb-8">System Mapping</span>
              <h3 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">Information<br />Architecture</h3>
            </div>
            <div className="md:col-span-7">
              <p className="text-xl md:text-2xl text-secondary leading-relaxed whitespace-pre-wrap font-light">
                {project.architecture}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 5. The Solution (Massive Impact Render) */}
      {project?.solution && (
        <section className="py-48 px-6 bg-surface-container-low border-y border-white/5 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
          <div className="absolute top-0 right-0 w-[80wv] h-[80vw] bg-primary/20 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-500/20 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/4" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 100 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: cinematicEase }}
            className="max-w-[1400px] mx-auto relative z-10 text-center w-full"
          >
            <span className="font-label text-primary bg-primary/10 px-6 py-3 rounded-full uppercase text-[12px] tracking-[0.3em] inline-block mb-12 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
              The Strategic Solution
            </span>
            <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-white leading-[1.05] tracking-tighter">
              {project.solution}
            </h2>
          </motion.div>
        </section>
      )}

      {/* 6. Final High-Fidelity Showcase (ZERO GAPS/PADDING) */}
      {(project?.detailImages?.[2] || siteConfig.siteImages?.projectDetail3) && (
        <section className="w-full mx-auto overflow-hidden bg-black pb-48">
          <motion.figure 
            initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 2, ease: cinematicEase }}
            className="w-full m-0 p-0 block"
          >
            <img 
              alt="Final Showcase" 
              className="w-full h-auto block m-0 p-0" 
              src={project?.detailImages?.[2] || siteConfig.siteImages?.projectDetail3 || ''}
              referrerPolicy="no-referrer"
            />
          </motion.figure>
        </section>
      )}
    </article>
  );
};
