import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Animated Line Divider ─── */
const LineDivider: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      }
    );
  }, []);
  return (
    <div ref={ref} style={{
      height: '1.5px',
      background: 'var(--tape)',
      margin: 'clamp(4rem,8vw,9rem) 0',
      transformOrigin: 'left center',
    }} />
  );
};

/* ─── Reveal wrapper ─── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.0, delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    );
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  return <div ref={ref} style={style}>{children}</div>;
};

/* ─── Parallax + Hover Image ─── */
const ParallaxImage: React.FC<{ src: string; alt: string; style?: React.CSSProperties }> = ({ src, alt, style }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const img  = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;
    const tl = gsap.to(img, {
      yPercent: -10, ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
    });
    return () => { tl.scrollTrigger?.kill(); };
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: 'hidden',
        borderRadius: 'clamp(12px,2vw,22px)',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.6s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered
          ? '8px 14px 0 rgba(42,32,24,0.2)'
          : '4px 8px 0 rgba(42,32,24,0.1)',
        cursor: 'zoom-in',
        ...style,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: '100%', display: 'block', objectFit: 'cover', transform: 'scale(1.14)', transformOrigin: 'center' }}
      />
    </div>
  );
};

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export const ProjectDetail = () => {
  const { id } = useParams();
  const { projects } = useSiteContext();
  const { resolveField } = useLang();
  const navigate = useNavigate();

  /* Smart Back button — hide on scroll-down */
  const [backVisible, setBackVisible] = useState(true);
  const lastScroll = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setBackVisible(y < lastScroll.current || y < 80);
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    /* ← Site primary colour + site fade-in animation */
    <div
      className="fade-in"
      style={{
        background: 'var(--paper)',
        color: 'var(--ink)',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >

      {/* ══ SMART BACK BUTTON — sketchy style ══ */}
      <button
        onClick={() => navigate('/projects')}
        className="sketchy-btn"
        style={{
          position: 'fixed',
          top: '1.6rem',
          left: '2rem',
          zIndex: 999,
          fontSize: '0.95rem',
          padding: '0.4rem 1.4rem',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: backVisible ? 1 : 0,
          transform: backVisible ? 'translateY(0)' : 'translateY(-14px)',
          pointerEvents: backVisible ? 'auto' : 'none',
        }}
      >
        ← Back
      </button>

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
        {/* Gradient just at bottom for text legibility */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, var(--paper) 0%, rgba(0,0,0,0) 55%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(2.5rem,7vw,6rem)', paddingBottom: 'clamp(4rem,9vw,7rem)', maxWidth: '1000px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1.2rem' }}>
            {resolveField(project.category)}
          </p>
          <h1 style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(3.5rem,9vw,8rem)', fontWeight: 800, color: 'var(--ink)', lineHeight: 1.0, marginBottom: '1.4rem', letterSpacing: '-0.03em' }}>
            {resolveField(project.title)}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem,2vw,1.3rem)', color: 'var(--ink-faded)', maxWidth: '560px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {subtitle}
            </p>
          )}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            {([
              project.client   && ['Client',   resolveField(project.client)],
              project.role     && ['Role',     resolveField(project.role)],
              project.duration && ['Timeline', resolveField(project.duration)],
            ].filter(Boolean) as string[][]).map(([k, v]) => (
              <div key={k}>
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-light)', marginBottom: '0.35rem' }}>{k}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink-faded)' }}>{v}</p>
              </div>
            ))}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="sketchy-btn" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'none', fontSize: '0.9rem' }}>
              View Live →
            </a>
          )}
        </div>
      </section>

      {/* ══ CONTEXT — 12 col grid, Sticky Left ══ */}
      {(challenge || solution) && (
        <>
          <section style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: '0', maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,6rem)', marginBottom: 'clamp(5rem,10vw,12rem)' }}>
            {/* Sticky Left */}
            <div style={{ position: 'sticky', top: '28vh', alignSelf: 'start' }}>
              <Reveal>
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1.3rem' }}>
                  The Context
                </p>
                <h2 style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
                  Why this<br />project?
                </h2>
              </Reveal>
            </div>

            {/* Scrolling Right */}
            <div style={{ padding: '0 0 0 clamp(3rem,6vw,7rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(4rem,8vw,9rem)' }}>
              {challenge && (
                <Reveal>
                  <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1rem' }}>The Challenge</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,1.8vw,1.2rem)', lineHeight: 1.9, color: 'var(--ink-faded)' }}>{challenge}</p>
                </Reveal>
              )}
              {solution && (
                <Reveal delay={0.1}>
                  <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: '1rem' }}>The Approach</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,1.8vw,1.2rem)', lineHeight: 1.9, color: 'var(--ink-faded)' }}>{solution}</p>
                </Reveal>
              )}
            </div>
          </section>
        </>
      )}

      {/* ══ GALLERY — Staggered Large Cards ══ */}
      {gallery.length > 0 && (
        <>
          <section style={{ padding: '0 clamp(1rem,3vw,3.5rem)', marginBottom: 'clamp(7rem,13vw,16rem)' }}>
            <Reveal>
              <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sepia)', marginBottom: 'clamp(4rem,7vw,8rem)', textAlign: 'center' }}>
                Visual Showcase
              </p>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem,6vw,7rem)' }}>
              {gallery.map((item, i) => {
                const isOdd    = i % 2 === 1;
                const caption  = item.caption ? resolveField(item.caption) : null;
                const marginLeft  = isOdd ? 'clamp(5%,12vw,18%)' : '0';
                const marginRight = isOdd ? '0' : 'clamp(5%,12vw,18%)';

                return (
                  <Reveal key={i} delay={i * 0.07}>
                    <div style={{ marginLeft, marginRight }}>
                      <ParallaxImage
                        src={item.url}
                        alt={`${resolveField(project.title)} — ${i + 1}`}
                        style={{ aspectRatio: '16/10' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1.2rem', padding: '0 0.5rem' }}>
                        {caption && (
                          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--ink-light)', maxWidth: '60%' }}>{caption}</p>
                        )}
                        <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, color: 'var(--ink-light)', opacity: 0.12, marginLeft: 'auto', lineHeight: 1 }}>
                          {String(i + 1).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* ══ IMPACT ══ */}
      {(keyResult || conclusion) && (
        <>
          <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(2rem,6vw,6rem) clamp(7rem,13vw,15rem)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr', gap: '0', alignItems: 'start' }}>
              <Reveal>
                <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--sepia)', paddingTop: '0.8rem' }}>
                  The Impact
                </p>
              </Reveal>
              <div style={{ paddingLeft: 'clamp(2rem,5vw,6rem)' }}>
                {keyResult && (
                  <Reveal>
                    <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(4rem,11vw,9rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: '2.5rem' }}>
                      {keyResult}
                    </p>
                  </Reveal>
                )}
                {conclusion && (
                  <Reveal delay={0.15}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,2vw,1.35rem)', lineHeight: 1.8, color: 'var(--ink-faded)', maxWidth: '580px' }}>
                      {conclusion}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══ NEXT / PREV ══ */}
      <div style={{ borderTop: '1.5px solid var(--tape)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {resolvedIndex > 0 ? (
          <div
            onClick={() => navigate(`/project/${projects[resolvedIndex - 1].id}`)}
            style={{ padding: 'clamp(2.5rem,5vw,5rem)', cursor: 'pointer', borderRight: '1.5px solid var(--tape)', transition: 'background 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-light)', marginBottom: '0.8rem' }}>← Previous</p>
            <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', fontWeight: 700, color: 'var(--ink)' }}>{resolveField(projects[resolvedIndex - 1].title)}</p>
          </div>
        ) : <div />}

        {resolvedIndex < projects.length - 1 ? (
          <div
            onClick={() => navigate(`/project/${projects[resolvedIndex + 1].id}`)}
            style={{ padding: 'clamp(2.5rem,5vw,5rem)', cursor: 'pointer', textAlign: 'right', transition: 'background 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--paper-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <p style={{ fontFamily: 'var(--font-sketch)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-light)', marginBottom: '0.8rem' }}>Next →</p>
            <p style={{ fontFamily: 'var(--font-sketch)', fontSize: 'clamp(1.1rem,2.5vw,1.8rem)', fontWeight: 700, color: 'var(--ink)' }}>{resolveField(projects[resolvedIndex + 1].title)}</p>
          </div>
        ) : <div />}
      </div>

      {/* Mobile grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .project-context-grid { display: flex !important; flex-direction: column !important; gap: 3rem !important; }
        }
      `}</style>

    </div>
  );
};
