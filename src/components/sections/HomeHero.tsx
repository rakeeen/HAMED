import React from 'react';
import { motion } from 'motion/react';
import { MoveDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';

export const HomeHero = () => {
  const navigate = useNavigate();
  const { siteConfig } = useSiteContext();

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      
      <div className="max-w-5xl mx-auto z-10 space-y-8">
        <div className="gsap-hero inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/15">
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Available for Projects</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        
        <h1 className="gsap-hero text-5xl md:text-8xl font-black tracking-tighter text-gradient leading-[0.9] uppercase" style={{ fontFamily: '"Roboto Flex", sans-serif' }}>
          {siteConfig.name}
        </h1>
        
        <p className="gsap-hero text-lg md:text-xl text-secondary max-w-2xl mx-auto font-light leading-relaxed">
          {siteConfig.role} <br/>
          <span className="text-xs opacity-60 mt-1 inline-block">📍 {siteConfig.location}</span><br/>
          <span className="text-primary text-base mt-2 inline-block">{siteConfig.detailed_summary}</span>
        </p>
        
        <div className="gsap-hero flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Button variant="primary" onClick={() => navigate('/projects')}>View Projects</Button>
          <div className="flex items-center gap-6">
            <span className="font-label text-[11px] uppercase tracking-[0.2em] text-outline">Tools</span>
            <div className="flex gap-4 items-center opacity-60 font-bold tracking-tighter text-sm">
              {siteConfig.tools.map(tool => <span key={tool}>{tool}</span>)}
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-outline"
      >
        <MoveDown size={24} />
      </motion.div>
    </section>
  );
};
