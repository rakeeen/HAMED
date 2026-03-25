import React, { useRef } from 'react';
import { useAboutAnimations } from '../hooks/useAboutAnimations';
import { AboutHero } from '../components/sections/AboutHero';
import { AboutPhilosophy } from '../components/sections/AboutPhilosophy';
import { ExperienceTimeline } from '../components/sections/ExperienceTimeline';
import { CompetenciesGrid } from '../components/sections/CompetenciesGrid';
import { AboutCTA } from '../components/sections/AboutCTA';

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useAboutAnimations(containerRef);

  return (
    <div className="pt-32 pb-24" ref={containerRef}>
      <AboutHero />
      <AboutPhilosophy />
      <ExperienceTimeline />
      <CompetenciesGrid />
      <AboutCTA />
    </div>
  );
};
