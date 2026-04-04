import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { useLang } from '../context/LangContext';
import { useNavigate } from 'react-router-dom';
import { MascotFace } from '../components/ui/MascotFace';
import { SkillTag } from '../components/ui/SkillTag';
import { TimelineItem } from '../components/ui/TimelineItem';
import { SketchyButton } from '../components/ui/SketchyButton';

export const About = () => {
  const { siteConfig, timeline, competencies } = useSiteContext();
  const { t, resolveField } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = `${t('about')} | ${resolveField(siteConfig.name)}`;
  }, [siteConfig, t, resolveField]);

  return (
    <div className="page-container fade-in">
      {/* About Hero */}
      <section style={{ padding: "4rem 0 2rem" }}>
        <h1 style={{ fontFamily: "var(--font-sketch)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          {t('behindPixels')}
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.8, color: "var(--ink-faded)", maxWidth: "800px" }}>
          {resolveField(siteConfig.summary)}
        </p>
      </section>

      <hr className="sketch-divider" />

      {/* Experience Timeline */}
      <section style={{ padding: "2rem 0" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", marginBottom: "2rem", color: "var(--ink)" }}>
          {t('myJourney')} <span style={{ color: "var(--ink-light)", fontSize: "1.2rem" }}>{t('experience')}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingInlineStart: "1rem" }}>
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} isLast={i === timeline.length - 1} />
          ))}
        </div>
      </section>

      <hr className="sketch-divider" />

      {/* Skills */}
      <section style={{ padding: "2rem 0 3rem" }}>
        <h2 style={{ fontFamily: "var(--font-sketch)", fontSize: "2rem", marginBottom: "1.5rem", color: "var(--ink)" }}>
          {t('myToolkit')} <span style={{ color: "var(--ink-light)", fontSize: "1.2rem" }}>{t('skills')}</span>
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
          {competencies.map((skill, index) => (
             <SkillTag key={skill.title} title={skill.title} description={skill.description} index={index} />
          ))}
        </div>
      </section>

      {/* Philosophy / CTA */}
      <div style={{ background: "var(--cream)", border: "1.5px solid var(--ink-light)", borderRadius: "var(--radius-organic)", padding: "2.5rem", marginBottom: "4rem", display: "flex", alignItems: "center", gap: "2.5rem", flexDirection: "row", flexWrap: "wrap", justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: '280px', textAlign: 'inherit' }}>
            <h3 style={{ fontFamily: "var(--font-sketch)", fontSize: "2.2rem", color: "var(--ink)", marginBottom: "0.5rem" }}>{t('getInTouch')}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--ink-faded)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              {t('alwaysLooking')}
            </p>
            <SketchyButton filled onClick={() => navigate("/contact")}>{t('reachOut')}</SketchyButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <MascotFace size={100} color="var(--ink)" />
        </div>
      </div>
    </div>
  );
};
