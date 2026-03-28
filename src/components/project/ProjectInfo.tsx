import { ArrowUpRight } from "lucide-react";
import { Project } from "../../types";

export const ProjectInfo = ({ project }: { project?: Project }) => {
  return (
    <article className="bg-background py-24 md:py-32">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Left: Overview */}
          <div className="lg:col-span-7 gsap-stagger-container">
            <h2 className="font-headline text-white text-3xl md:text-5xl font-bold mb-10 tracking-tight gsap-reveal">Overview</h2>
            <div className="space-y-6 text-secondary text-lg md:text-xl leading-relaxed max-w-2xl font-sans overflow-hidden">
              {(project?.description || "A detailed case study is not available for this project yet. Please check back later.")
                .split(/\s+/)
                .map((word, i) => (
                  <span 
                    key={i} 
                    className="inline-block mr-1.5 gsap-stagger-item opacity-0"
                  >
                    {word}
                  </span>
                ))}
            </div>
          </div>

          {/* Right: Metadata */}
          <div className="lg:col-span-5 gsap-reveal">
            <div className="bg-surface-container-low p-10 md:p-12 space-y-10 border border-white/5">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="font-label text-secondary uppercase text-[10px] tracking-widest block mb-2">Role</span>
                  <span className="text-white font-medium">{project?.role || 'Lead Designer'}</span>
                </div>
                <div>
                  <span className="font-label text-secondary uppercase text-[10px] tracking-widest block mb-2">Timeline</span>
                  <span className="text-white font-medium">{project?.duration || 'N/A'}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-label text-secondary uppercase text-[10px] tracking-widest block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(project?.tags || ['Conceptual']).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-label text-white uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="font-label text-secondary uppercase text-[10px] tracking-widest block mb-2">Client</span>
                  <span className="text-white font-medium">{project?.client || 'Confidential'}</span>
                </div>
              </div>
              <div className="pt-6">
                {project?.link && (
                  <a 
                    className="inline-flex items-center gap-3 bg-white text-[#131313] px-8 py-4 font-headline font-bold text-sm tracking-tight hover:bg-neutral-200 transition-colors group rounded-full" 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW LIVE SITE
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
