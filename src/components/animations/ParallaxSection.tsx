'use client';

import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  scale?: number;
}

/**
 * ParallaxImage - Image with scroll-driven parallax effect
 * 
 * Features:
 * - Container: overflow: hidden, fixed height
 * - Image: scale: 1.2, y tied to scroll progress
 * - Speed: 0.2x (subtle) to 0.5x (noticeable)
 * - Mobile: Disable or reduce to 0.1x
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  speed = 0.3,
  scale = 1.2,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(imageRef.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef, dependencies: [speed] });

  return (
    <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
      />
    </div>
  );
}

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

/**
 * ParallaxLayer - Generic parallax layer for depth effects
 */
export function ParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!layerRef.current) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.to(layerRef.current, {
      yPercent: speed * 100 * (direction === 'up' ? -1 : 1),
      ease: 'none',
      scrollTrigger: {
        trigger: layerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: layerRef, dependencies: [speed, direction] });

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
}

interface PinnedSectionProps {
  children: React.ReactNode;
  className?: string;
  duration?: string;
  scrub?: number | boolean;
  snap?: number | boolean;
}

/**
 * PinnedSection - Full-screen takeover with pinned scrolling
 */
export function PinnedSection({
  children,
  className = '',
  duration = '200%',
  scrub = 1,
  snap = false,
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${duration}`,
      pin: true,
      scrub,
      snap: snap ? (typeof snap === 'number' ? 1 / snap : 0.5) : undefined,
    });
  }, { scope: sectionRef, dependencies: [duration, scrub, snap] });

  return (
    <div ref={sectionRef} className={`section-pinned ${className}`}>
      {children}
    </div>
  );
}
