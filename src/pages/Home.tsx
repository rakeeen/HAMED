import React, { useRef } from 'react';
import { useHomeAnimations } from '../hooks/useHomeAnimations';
import { HomeHero } from '../components/sections/HomeHero';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { ExpertiseCerts } from '../components/sections/ExpertiseCerts';
import { HomeCTA } from '../components/sections/HomeCTA';

export const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useHomeAnimations(containerRef);

  React.useEffect(() => {
    document.title = "Hamed Walid | Product-Focused UI/UX Designer";
  }, []);

  return (
    <div className="flex flex-col" ref={containerRef}>
      <HomeHero />
      <FeaturedWork />
      <ExpertiseCerts />
      <HomeCTA />
    </div>
  );
};
