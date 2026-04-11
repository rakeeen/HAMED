import React, { useRef, useEffect } from 'react';

interface InteractiveGlowProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

export const InteractiveGlow: React.FC<InteractiveGlowProps> = ({ 
  color = 'var(--sepia)', 
  size = 500, 
  blur = 80, 
  opacity = 0.12 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    // Ensure parent can contain the absolute positioned glow
    if (getComputedStyle(parent).position === 'static') {
      parent.style.position = 'relative';
    }
    // Prevent glow from bleeding out
    parent.style.overflow = 'hidden';

    let currentX = parent.offsetWidth / 2;
    let currentY = parent.offsetHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    // Smooth easing
    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${currentX}px`);
        containerRef.current.style.setProperty('--y', `${currentY}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    parent.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      parent.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: `var(--y, 50%)`,
          left: `var(--x, 50%)`,
          width: `${size}px`,
          height: `${size}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
          filter: `blur(${blur}px)`,
          opacity: opacity,
          transition: 'opacity 0.3s ease',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
