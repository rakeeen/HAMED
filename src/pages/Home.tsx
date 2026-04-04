import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import { MascotFace } from '../components/ui/MascotFace';
import { useNavigate } from 'react-router-dom';
import { PolaroidCard } from '../components/ui/PolaroidCard';
import { SketchyButton } from '../components/ui/SketchyButton';

export const Home = () => {
  const { siteConfig, projects } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `${resolveField(siteConfig.name)} | ${resolveField(siteConfig.role).split('|')[0]}`;
  }, [siteConfig, resolveField]);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <div className="page-container fade-in">
      {/* Hero */}
      <section style={{ padding: "4rem 0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="hero-grid">
        <div>
          <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1rem", color: "var(--ink-light)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "1rem" }}>
            {resolveField(siteConfig.role)}
          </p>
          <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 700, lineHeight: 1.2, color: "var(--ink)", marginBottom: "1.5rem" }}>
            {((siteConfig as any).heroGiantText && resolveField((siteConfig as any).heroGiantText)) ? (
                <div style={{ whiteSpace: 'pre-line' }}>{resolveField((siteConfig as any).heroGiantText)}</div>
            ) : (
                <>{t('bridgingLogic', { default: 'Bridging complex logic with' })}<br />
                <span style={{ color: "var(--sepia)", textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "rgba(139,105,20,0.4)" }}>
                    {t('humanCentered', { default: 'human-centered design.' })}
                </span></>
            )}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--ink-faded)", marginBottom: "2rem" }}>
            {resolveField(siteConfig.summary)}
          </p>
          <div className="hero-cta" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <SketchyButton filled onClick={() => navigate("/projects")}>
                {((siteConfig as any).button1Text && resolveField((siteConfig as any).button1Text)) || t('seeMyWork')}
            </SketchyButton>
            <SketchyButton onClick={() => navigate("/contact")}>
                {((siteConfig as any).button2Text && resolveField((siteConfig as any).button2Text)) || t('sayHello')}
            </SketchyButton>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", marginInlineStart: 'auto' }}>
          <div style={{ width: 220, height: 220, borderRadius: "50%", border: "3px solid var(--sepia)", overflow: "hidden", background: "var(--paper-dark)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "8px 10px 0 rgba(139,105,20,0.2)", position: "relative" }}>
            {siteConfig.siteImages?.aboutPortrait ? (
                <img src={siteConfig.siteImages.aboutPortrait} alt={resolveField(siteConfig.name)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
                <MascotFace size={140} />
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)" }}>{resolveField(siteConfig.name)}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--ink-light)" }}>{t('bio_tagline')}</p>
          </div>
        </div>
      </section>

      <hr className="sketch-divider" />

      {/* Featured Projects */}
      <section style={{ padding: "2rem 0" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: "2rem", flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", color: "var(--ink)", margin: 0 }}>
            {t('selectedWorks')} <span style={{ color: "var(--ink-light)", fontSize: "1.2rem" }}>{t('featured')}</span>
          </h2>
          <SketchyButton style={{ fontSize: '1rem', padding: '0.4rem 1.2rem' }} onClick={() => navigate('/projects')}>{t('viewAll')}</SketchyButton>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {featuredProjects.map((p, index) => (
              <PolaroidCard key={p.id} project={p} index={index} />
          ))}
        </div>
      </section>

      <hr className="sketch-divider" />

      {/* Quick stats / CTA */}
      <div style={{ background: "var(--cream)", border: "1.5px solid var(--ink-light)", borderRadius: "var(--radius-organic)", padding: "2rem 2.5rem", marginBottom: "4rem", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.4rem", color: "var(--ink-faded)", marginBottom: "1.5rem" }}>{t('curious')}</p>
        <SketchyButton filled onClick={() => navigate("/about")}>{t('moreAbout')}</SketchyButton>
      </div>
    </div>
  );
};
