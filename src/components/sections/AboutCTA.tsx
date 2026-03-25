import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="gsap-reveal max-w-7xl mx-auto px-6">
      <div className="bg-surface-container-low p-12 md:p-24 text-center">
        <h2 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tighter text-primary mb-8 uppercase">HAVE A PROJECT IN MIND?</h2>
        <Button variant="metallic" className="uppercase text-sm tracking-tighter" onClick={() => navigate('/contact')}>Get in Touch</Button>
      </div>
    </section>
  );
};
