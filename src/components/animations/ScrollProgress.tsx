'use client';

import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

/**
 * ScrollProgress - Reading progress bar
 * 
 * Features:
 * - Fixed at top of viewport
 * - Progress-linked to scroll position
 * - Smooth animation
 */
export function ScrollProgress({ color = '#FFEA00' }: { color?: string }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, { scope: progressRef });

  return (
    <div className="scroll-progress">
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{ 
          backgroundColor: color,
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}

/**
 * ScrollIndicator - Animated scroll down indicator
 */
export function ScrollIndicator({ className = '' }: { className?: string }) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, { scope: indicatorRef });

  return (
    <div
      ref={indicatorRef}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <span className="font-caption uppercase tracking-widest">Scroll</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </div>
  );
}

/**
 * SectionProgress - Progress indicator for multiple sections
 */
export function SectionProgress({
  sections,
  activeColor = '#FFEA00',
  inactiveColor = '#1A1A1A',
}: {
  sections: { id: string; label: string }[];
  activeColor?: string;
  inactiveColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const dot = document.querySelector(`[data-section="${section.id}"]`);
          if (dot) {
            gsap.to(dot, { backgroundColor: activeColor, scale: 1.2, duration: 0.3 });
          }
        },
        onLeave: () => {
          const dot = document.querySelector(`[data-section="${section.id}"]`);
          if (dot) {
            gsap.to(dot, { backgroundColor: inactiveColor, scale: 1, duration: 0.3 });
          }
        },
        onEnterBack: () => {
          const dot = document.querySelector(`[data-section="${section.id}"]`);
          if (dot) {
            gsap.to(dot, { backgroundColor: activeColor, scale: 1.2, duration: 0.3 });
          }
        },
        onLeaveBack: () => {
          const dot = document.querySelector(`[data-section="${section.id}"]`);
          if (dot) {
            gsap.to(dot, { backgroundColor: inactiveColor, scale: 1, duration: 0.3 });
          }
        },
      });
    });
  }, { dependencies: [sections, activeColor, inactiveColor] });

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          data-section={section.id}
          className="w-3 h-3 rounded-full border-2 border-black transition-all"
          style={{ backgroundColor: inactiveColor }}
          title={section.label}
        />
      ))}
    </div>
  );
}
