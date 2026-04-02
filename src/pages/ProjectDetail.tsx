import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import { MascotFace } from '../components/ui/MascotFace';

export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();
  
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projectIndex !== -1 ? projects[projectIndex] : projects[0];

  React.useEffect(() => {
    if (project) {
        document.title = `${resolveField(project.title)} | Hamed Walid`;
        window.scrollTo(0,0);
    }
  }, [project]);

  if (!project) return null;

  const resolvedIndex = projectIndex === -1 ? 0 : projectIndex;
  const colorIndex = (resolvedIndex % 4) + 1;
  const color = `var(--card-bg-${colorIndex})`;

  return (
    <div className="page-container fade-in" style={{ padding: "2rem 1rem 4rem" }}>
      <button onClick={() => navigate("/projects")} className="sketchy-btn" style={{ marginBottom: "2rem", fontSize: "1rem" }}>
        {t('backToProjects')}
      </button>

      {/* Hero */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ background: color, borderRadius: "12px", padding: "3rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>{resolveField(project.category)}</p>
            <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "white", fontWeight: 700 }}>{resolveField(project.title)}</h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.75)", marginTop: "0.4rem", maxWidth: '600px' }}>{resolveField(project.description)}</p>
            
            {(project.link || project.github) && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink)", background: "var(--cream)", padding: "0.4rem 1rem", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>
                    {t('liveProject')}
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--cream)", border: "1.5px solid var(--cream)", padding: "0.4rem 1rem", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>
                    {t('sourceCode')}
                  </a>
                )}
              </div>
            )}
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <MascotFace size={80} color="rgba(255,255,255,0.5)" />
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "2rem", marginTop: "1.2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          {[
              project.client ? [t('client'), resolveField(project.client)] : null,
              [t('role_label'), resolveField(project.role) || t('role_fallback')], 
              [t('duration'), resolveField(project.duration) || t('duration_fallback')], 
              [t('tools_label'), project.tags?.map(tag => resolveField(tag)).join(", ") || "Figma"]
          ].filter(Boolean).map((item: any) => {
            const [k, v] = item;
            return (
            <div key={k}>
              <p style={{ fontFamily: "var(--font-sketch)", fontSize: "0.9rem", color: "var(--ink-light)", textTransform: "uppercase", letterSpacing: "1px" }}>{k}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink-faded)", fontWeight: 600 }}>{v}</p>
            </div>
            );
          })}
        </div>
      </div>

      {/* Problem */}
      {(project.challenge || project.painPoints) && (
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--rust)" }}>{t('theProblem')}</h2>
            <div style={{ background: "var(--cream)", border: "1.5px solid var(--sepia)", borderRadius: "4px 20px 4px 20px", padding: "1.5rem 2rem", position: "relative", transform: "rotate(-0.3deg)", marginInlineStart: '0' }}>
              <div style={{ position: "absolute", top: -8, insetInlineStart: 16, width: 40, height: 16, background: "var(--tape)", transform: "rotate(-1deg)", borderRadius: 2 }} />
              <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.2rem", lineHeight: 1.6, color: "var(--ink)" }}>{resolveField(project.challenge || project.painPoints)}</p>
            </div>
          </section>
      )}

      {/* Process & Flow */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--forest)" }}>{t('processFlow')}</h2>
        <div style={{ background: "var(--paper-dark)", border: "1.5px dashed var(--ink-light)", borderRadius: 8, padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { key: 'step_research' },
            { key: 'step_define', active: true },
            { key: 'step_wireframe' },
            { key: 'step_prototype', active: true },
            { key: 'step_test' },
            { key: 'step_ship' }
          ].map((step, i) => (
            <div key={step.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div className={`process-step ${step.active ? 'active' : ''}`}>{t(step.key)}</div>
              {i < 5 && <span style={{ color: "var(--ink-light)", fontFamily: "var(--font-sketch)", fontSize: "1.3rem" }}>→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Strategy or Extra detail */}
      {(project.strategy || project.architecture) && (
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--ink)" }}>{t('strategy')}</h2>
        <div style={{ background: "var(--paper-dark)", border: "1.5px solid var(--ink-light)", borderRadius: "var(--radius-organic)", padding: "1.5rem 2rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-faded)" }}>{resolveField(project.strategy || project.architecture)}</p>
        </div>
      </section>
      )}

      {/* Solution */}
      {project.solution && (
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1rem", color: "var(--ink)" }}>{t('theSolution')}</h2>
        <div style={{ background: "var(--paper-dark)", border: "1.5px solid var(--ink-light)", borderRadius: "var(--radius-organic)", padding: "1.5rem 2rem" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-faded)" }}>{resolveField(project.solution)}</p>
        </div>
      </section>
      )}

      {/* Dynamic Sections from Dashboard */}
      {project.dynamicSections && project.dynamicSections.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
             <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1.5rem", color: "var(--rust)" }}>{t('deepDive')}</h2>
             <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                 {project.dynamicSections.sort((a: any, b: any) => a.order - b.order).map((section: any, i: number) => {
                     if (section.type === 'text') {
                         return (
                            <div key={i} style={{ background: "var(--paper-dark)", border: "1.5px dashed var(--ink-light)", borderRadius: "var(--radius-organic)", padding: "1.5rem 2rem" }}>
                                <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-faded)" }}>{resolveField(section.content)}</p>
                            </div>
                         );
                     } else if (section.type === 'image') {
                         return (
                             <img key={i} src={section.content} alt={`Project Detail ${i}`} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--tape)' }} />
                         );
                     } else if (section.type === 'video') {
                         return (
                             <video key={i} src={section.content} controls style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--tape)' }} />
                         );
                     }
                     return null;
                 })}
             </div>
          </section>
      )}

      {/* Detail Images Fallback */}
      {!project.dynamicSections && project.detailImages && project.detailImages.length > 0 && (
          <section style={{ marginBottom: "3rem" }}>
             <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", marginBottom: "1.5rem", color: "var(--sepia)" }}>{t('visualDetails')}</h2>
             <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                 {project.detailImages.map((img: string, i: number) => (
                     <img key={i} src={img} alt={`${resolveField(project.title)} detail ${i}`} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--tape)' }} />
                 ))}
             </div>
          </section>
      )}
      
      {/* Next / Previous Project Navigation */}
      <hr className="sketch-divider" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
        {projectIndex > 0 ? (
          <div onClick={() => navigate(`/project/${projects[projectIndex - 1].id}`)} style={{cursor: 'pointer'}}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.1rem", color: "var(--ink-light)", textTransform: "uppercase" }}>{t('previous')}</p>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", color: "var(--ink)", fontWeight: 700 }}>{resolveField(projects[projectIndex - 1].title)}</p>
          </div>
        ) : <div />}
        
        {projectIndex < projects.length - 1 ? (
          <div style={{ textAlign: document.dir === 'rtl' ? 'left' : 'right', cursor: 'pointer' }} onClick={() => navigate(`/project/${projects[projectIndex + 1].id}`)}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.1rem", color: "var(--ink-light)", textTransform: "uppercase" }}>{t('upNext')}</p>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.8rem", color: "var(--ink)", fontWeight: 700 }}>{resolveField(projects[projectIndex + 1].title)}</p>
          </div>
        ) : <div />}
      </div>
      
    </div>
  );
};
