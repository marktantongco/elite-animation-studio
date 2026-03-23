'use client';

import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}

/**
 * ScrollReveal - Reveal elements on scroll with staggered animations
 * 
 * Features:
 * - Entrance: y: 60, opacity: 0 with power2.out
 * - Stagger: Configurable between siblings
 * - Trigger: 85% viewport entry
 * - Exit: Reverse animation on scroll up (optional)
 */
export function ScrollReveal({
  children,
  className = '',
  animation = 'fadeUp',
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  start = 'top 85%',
  once = false,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation presets
  const animations: Record<string, gsap.TweenVars> = {
    fadeUp: { y: 60, opacity: 0 },
    fadeDown: { y: -60, opacity: 0 },
    fadeLeft: { x: 60, opacity: 0 },
    fadeRight: { x: -60, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    rotate: { rotation: 10, opacity: 0, scale: 0.9 },
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.children;
    
    gsap.from(elements, {
      ...animations[animation],
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });
  }, { scope: containerRef, dependencies: [animation, duration, delay, stagger, start, once] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
