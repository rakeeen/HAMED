import { useSiteContext } from "../../context/SiteContext";
import { Project } from "../../types";

export const ContentSections = ({ project }: { project?: Project }) => {
  const { siteConfig } = useSiteContext();
  
  const sortedSections = project?.dynamicSections 
    ? [...project.dynamicSections].sort((a,b) => a.order - b.order) 
    : [];

  return (
    <article className="bg-background">
      {/* 1. The Challenge (Problem Statement) */}
      {project?.challenge && (
        <section className="py-24 md:py-32 px-6 max-w-5xl mx-auto">
          <div className="gsap-reveal w-full">
            <span className="font-label text-primary bg-primary/10 px-4 py-2 rounded-full uppercase text-[10px] tracking-[0.3em] inline-block mb-8 border border-primary/20">
              The Interface Problem
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight gsap-stagger-container">
              {project.challenge.split(/\s+/).map((word, i) => (
                <span key={i} className="inline-block mr-[0.5rem] gsap-stagger-item opacity-0">
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </section>
      )}

      {/* 2. Pain Points */}
      {project?.painPoints && (
        <section className="py-20 md:py-32 px-6 max-w-5xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="md:col-span-4 gsap-reveal">
              <span className="font-label text-red-400 uppercase text-[10px] tracking-[0.3em] block mb-6">Friction Areas</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">Pain<br />Points</h3>
            </div>
            <div className="md:col-span-8 gsap-stagger-container">
              <p className="text-xl md:text-2xl text-secondary leading-relaxed whitespace-pre-wrap font-light">
                {project.painPoints.split(/\s+/).map((word, i) => (
                   <span key={i} className="inline-block mr-[0.4rem] gsap-stagger-item opacity-0">{word}</span>
                ))}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 3. The Plan / Strategy */}
      {project?.strategy && (
        <section className="py-24 md:py-32 bg-surface">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-24 relative items-start">
            <div className="md:w-5/12 gsap-reveal">
              <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">The Plan</h3>
              <p className="text-secondary text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-light">
                {project.strategy}
              </p>
            </div>
            <figure className="md:w-7/12 w-full m-0 p-0 shadow-2xl rounded-[2.5rem] overflow-hidden gsap-reveal">
              {project?.detailImages?.[0] ? (
                <img 
                  alt="Strategy Visual" 
                  className="w-full h-auto object-cover block" 
                  src={project.detailImages[0]}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full aspect-square bg-surface-container-high" />
              )}
            </figure>
          </div>
        </section>
      )}

      {/* 4. The Solution */}
      {project?.solution && (
        <section className="py-32 px-6 bg-surface-container-low border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3" />
          <div className="max-w-5xl mx-auto relative z-10 text-center w-full gsap-reveal">
            <span className="font-label text-primary bg-primary/10 px-6 py-3 rounded-full uppercase text-[12px] tracking-[0.3em] inline-block mb-12">
              The Strategic Solution
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
              {project.solution}
            </h2>
          </div>
        </section>
      )}

      {/* 5. Dynamic Dribbble Sections */}
      {sortedSections.length > 0 && (
        <section className="w-full flex flex-col items-center bg-black">
          {sortedSections.map((section) => {
            if (section.type === 'image') {
              return (
                <figure key={section.id} className="w-full max-w-[1400px] mx-auto m-0 p-0 block gsap-reveal">
                  <img src={section.content} alt="Dribbble Slice" className="w-full h-auto block m-0 p-0" referrerPolicy="no-referrer" />
                </figure>
              );
            }
            if (section.type === 'video') {
              return (
                <div key={section.id} className="w-full max-w-[1400px] mx-auto p-4 md:p-12 gsap-reveal">
                   <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                     <iframe src={section.content} className="absolute inset-0 w-full h-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                   </div>
                </div>
              );
            }
            if (section.type === 'text') {
              return (
                <div key={section.id} className="w-full max-w-4xl mx-auto py-16 px-6 text-white text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-sans gsap-reveal">
                  {section.content}
                </div>
              );
            }
            return null;
          })}
        </section>
      )}

      {/* Fallback Legacy Images if no dynamic sections exist (for backwards compatibility) */}
      {sortedSections.length === 0 && project?.detailImages?.[1] && (
        <section className="w-full max-w-[1400px] mx-auto overflow-hidden bg-black pb-48">
          <figure className="w-full m-0 p-0 block gsap-reveal">
            <img 
              alt="Final Showcase" 
              className="w-full h-auto block m-0 p-0" 
              src={project.detailImages[1]}
              referrerPolicy="no-referrer"
            />
          </figure>
          {project?.detailImages?.[2] && (
            <figure className="w-full m-0 p-0 block gsap-reveal">
              <img 
                alt="Final Showcase 2" 
                className="w-full h-auto block m-0 p-0" 
                src={project.detailImages[2]}
                referrerPolicy="no-referrer"
              />
            </figure>
          )}
        </section>
      )}
    </article>
  );
};
