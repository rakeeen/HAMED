import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContext();
  const { resolveField } = useLang();
  const navigate = useNavigate();

  const projectIndex  = projects.findIndex(p => p.id === id);
  const project       = projectIndex !== -1 ? projects[projectIndex] : projects[0];
  const resolvedIndex = projectIndex === -1 ? 0 : projectIndex;

  useEffect(() => {
    if (project) {
      document.title = `${resolveField(project.title)} | Hamed Walid`;
      window.scrollTo(0, 0);
    }
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [project]);

  if (!project) return null;

  const gallery: { url: string; caption?: any }[] =
    (project as any).gallery?.length
      ? (project as any).gallery
      : (project.detailImages?.filter(Boolean).map(url => ({ url })) ?? []);

  const subtitle   = resolveField((project as any).subtitle);
  const challenge  = resolveField(project.challenge || project.painPoints);
  const solution   = resolveField(project.solution);
  const keyResult  = resolveField((project as any).keyResult);
  const conclusion = resolveField((project as any).conclusion);

  return (
    <div
      className="fade-in"
      style={{
        background: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >

      {/* ══ HERO — Full Viewport ══ */}
      <section style={{
        position: 'relative',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
        {project.image ? (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'brightness(0.45)',
          }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--paper-dark)' }} />
        )}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, var(--paper) 0%, rgba(0,0,0,0) 55%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(2.5rem,7vw,6rem)', paddingBottom: 'clamp(4rem,9vw,7rem)', maxWidth: '1000px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1.2rem' }}>
            {resolveField(project.category)}
          </p>
          <h1 style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2.5rem,7vw,6rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.4rem', letterSpacing: '-0.03em' }}>
            {resolveField(project.title)}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem,2vw,1.3rem)', color: 'var(--ink-faded)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {subtitle}
            </p>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="sketchy-btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none', fontSize: '0.9rem' }}>
              View Live →
            </a>
          )}
        </div>
      </section>

      {/* ══ STORY ══ */}
      {(challenge || solution) && (
        <section style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: '0', maxWidth: '1400px', margin: 'clamp(8rem, 14vw, 16rem) auto clamp(8rem, 14vw, 16rem)', padding: '0 clamp(1.5rem,5vw,6rem)' }}>
          <div style={{ position: 'sticky', top: '28vh', alignSelf: 'start' }}>
            <h2 style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
              The Story
            </h2>
          </div>

          <div style={{ padding: '0 0 0 clamp(3rem,6vw,7rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(4rem,8vw,9rem)' }}>
            {challenge && (
              <div>
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1rem' }}>The Challenge</p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontStyle: 'normal', fontSize: 'clamp(1.05rem,1.8vw,1.2rem)', lineHeight: 1.9, color: 'var(--ink-faded)' }}>{challenge}</p>
              </div>
            )}
            {solution && (
              <div>
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1rem' }}>The Approach</p>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontStyle: 'normal', fontSize: 'clamp(1.05rem,1.8vw,1.2rem)', lineHeight: 1.9, color: 'var(--ink-faded)' }}>{solution}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ GALLERY ══ */}
      {gallery.length > 0 && (
        <section style={{ padding: '0 clamp(1rem,3vw,3.5rem)', margin: 'clamp(8rem, 14vw, 16rem) 0' }}>
          <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: 'clamp(4rem,7vw,8rem)', textAlign: 'center' }}>
            Visual Showcase
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem,6vw,7rem)' }}>
            {gallery.map((item, i) => {
              const isOdd    = i % 2 === 1;
              const caption  = item.caption ? resolveField(item.caption) : null;
              const marginLeft  = isOdd ? 'clamp(5%,12vw,18%)' : '0';
              const marginRight = isOdd ? '0' : 'clamp(5%,12vw,18%)';

              return (
                <div key={i} style={{ marginLeft, marginRight }}>
                  <div style={{ overflow: 'hidden', borderRadius: 'clamp(12px,2vw,22px)', border: '1.5px solid var(--tape)', boxShadow: '6px 8px 0 rgba(42,32,24,0.1)' }}>
                    <img src={item.url} alt={`${resolveField(project.title)} — ${i + 1}`} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1.2rem', padding: '0 0.5rem' }}>
                    {caption && (
                      <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ink-light)', maxWidth: '60%' }}>{caption}</p>
                    )}
                    <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: 'var(--ink-light)', opacity: 0.12, marginLeft: 'auto', lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ IMPACT ══ */}
      {(keyResult || conclusion) && (
        <section style={{ maxWidth: '1400px', margin: 'clamp(8rem, 14vw, 16rem) auto', padding: '0 clamp(2rem,6vw,6rem) clamp(7rem,13vw,15rem)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: '0', alignItems: 'start' }}>
            <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sepia)', paddingTop: '0.8rem' }}>
              The Impact
            </p>
            <div style={{ paddingLeft: 'clamp(2rem,5vw,6rem)' }}>
              {keyResult && (
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(4rem,11vw,9rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: '2.5rem' }}>
                  {keyResult}
                </p>
              )}
              {conclusion && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,2vw,1.35rem)', lineHeight: 1.8, color: 'var(--ink-faded)', maxWidth: '580px' }}>
                  {conclusion}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ══ PROJECT METADATA ══ */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 8rem)', flexWrap: 'wrap', textAlign: 'center', margin: 'clamp(6rem, 10vw, 12rem) auto', padding: '0 2rem' }}>
          {([
            project.client   && ['Client',   resolveField(project.client)],
            project.role     && ['Role',     resolveField(project.role)],
            project.duration && ['Timeline', resolveField(project.duration)],
          ].filter(Boolean) as string[][]).map(([k, v]) => (
            <div key={k}>
              <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-light)', marginBottom: '0.6rem' }}>{k}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase' }}>{v}</p>
            </div>
          ))}
      </section>

      {/* ══ NEXT / PREV — Centered & Simple ══ */}
      <section style={{ borderTop: '2.5px solid var(--tape)', padding: '5rem 2rem', display: 'flex', justifyContent: 'center', gap: '4rem' }}>
        {resolvedIndex > 0 && (
          <button
            onClick={() => navigate(`/project/${projects[resolvedIndex - 1].id}`)}
            className="sketchy-btn"
            style={{ fontSize: '0.8rem', padding: '0.6rem 2rem' }}
          >
            ← Previous Project
          </button>
        )}
        {resolvedIndex < projects.length - 1 && (
          <button
            onClick={() => navigate(`/project/${projects[resolvedIndex + 1].id}`)}
            className="sketchy-btn"
            style={{ fontSize: '0.8rem', padding: '0.6rem 2rem' }}
          >
            Next Project →
          </button>
        )}
      </section>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .project-context-grid { display: flex !important; flex-direction: column !important; gap: 3rem !important; }
        }
      `}</style>

    </div>
  );
};
