import { motion } from "motion/react";
import { useSiteContext } from "../../context/SiteContext";
import { Project } from "../../types";

export const ContentSections = ({ project }: { project?: Project }) => {
  const { siteConfig } = useSiteContext();
  return (
    <section className="bg-surface">
      {/* Full Width Visual */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full h-[60vh] md:h-[80vh] bg-surface-container-low overflow-hidden"
      >
        <img 
          alt="Architecture Detail" 
          className="w-full h-full object-cover" 
          src={project?.detailImages?.[0] || siteConfig.siteImages?.projectDetail1 || ''}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Asymmetric Grid */}
      <div className="max-w-screen-2xl mx-auto px-8 py-24 md:py-48 grid grid-cols-1 md:grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:col-span-5 self-center"
        >
          <h3 className="font-headline text-white text-4xl font-bold mb-6 tracking-tight">The Strategy</h3>
          <p className="text-secondary leading-relaxed font-sans whitespace-pre-wrap">
            {project?.strategy || "This project required a complete rethinking of structural norms to meet the client's aggressive baseline metrics while remaining highly elegant."}
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:col-span-7"
        >
          <div className="bg-surface-container-low aspect-[4/5] overflow-hidden">
            <img 
              alt="Interior Detail" 
              className="w-full h-full object-cover" 
              src={project?.detailImages?.[1] || siteConfig.siteImages?.projectDetail2 || ''}
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {project?.challenge && project?.solution && (
      <div className="max-w-screen-2xl mx-auto px-8 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          <div className="bg-surface-container-low p-10 lg:p-16 rounded-[2.5rem] border border-white/5">
            <span className="font-label text-xs uppercase tracking-widest text-primary mb-6 block">The Challenge</span>
            <p className="text-white text-xl leading-relaxed font-sans whitespace-pre-wrap">
              {project.challenge}
            </p>
          </div>
          <div className="bg-primary/5 p-10 lg:p-16 rounded-[2.5rem] border border-primary/20 backdrop-blur-sm">
            <span className="font-label text-xs uppercase tracking-widest text-primary mb-6 block">The Solution</span>
            <p className="text-white text-xl leading-relaxed font-sans whitespace-pre-wrap">
              {project.solution}
            </p>
          </div>
        </div>
      </div>
      )}

      {/* Immersive Image or Architecture details */}
      <div className="max-w-screen-xl mx-auto px-8 pb-48">
        {project?.architecture ? (
          <div className="bg-surface-container-low p-10 lg:p-16 rounded-3xl border border-white/10 text-white font-sans whitespace-pre-wrap leading-relaxed">
             <span className="font-label text-xs uppercase tracking-widest text-primary mb-6 block">Architecture Highlights</span>
             {project.architecture}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-surface-container-low aspect-video overflow-hidden rounded-3xl"
          >
            <img 
              alt="Architecture View" 
              className="w-full h-full object-cover" 
              src={project?.detailImages?.[2] || siteConfig.siteImages?.projectDetail3 || ''}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
