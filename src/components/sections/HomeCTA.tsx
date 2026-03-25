import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const HomeCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="gsap-reveal py-32 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-sans">Ready to build something monumental?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button variant="primary" className="w-full md:w-auto" onClick={() => navigate('/contact')}>Start a Conversation</Button>
          <Button variant="secondary" className="w-full md:w-auto" onClick={() => window.open('https://www.behance.net/rakeeen', '_blank')}>View Portfolio</Button>
        </div>
      </div>
    </section>
  );
};
