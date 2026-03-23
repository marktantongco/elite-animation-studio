'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface CustomCursorProps {
  size?: number;
  color?: string;
  mixBlendMode?: string;
  showDefault?: boolean;
}

/**
 * CustomCursor - Custom cursor with magnetic effect
 * 
 * Features:
 * - Smooth follow with delay
 * - Magnetic effect on interactive elements
 * - Scale on hover
 * - Client-side only rendering to prevent hydration mismatch
 */
export function CustomCursor({
  size = 20,
  color = '#FFEA00',
  mixBlendMode = 'difference',
  showDefault = false,
}: CustomCursorProps) {
  // Start with false to ensure server renders nothing (prevents hydration mismatch)
  // This is a valid pattern for client-side only features
  const [shouldRender, setShouldRender] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  // Check device capabilities after mount - this is the recommended pattern
  // for client-side only features that depend on browser APIs
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only render cursor on non-touch devices without reduced motion preference
    if (!isTouchDevice && !prefersReducedMotion) {
      setShouldRender(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisibleRef.current && cursorRef.current) {
        isVisibleRef.current = true;
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        isVisibleRef.current = false;
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth follow animation
    const tickerCallback = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.15;

      if (cursorRef.current) {
        gsap.set(cursorRef.current, {
          x: posRef.current.x - size / 2,
          y: posRef.current.y - size / 2,
        });
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.remove(tickerCallback);
    };
  }, [shouldRender, size]);

  // Handle hover effects on interactive elements
  useGSAP(() => {
    if (!shouldRender) return;

    const interactives = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleEnter = () => {
      gsap.to(cursor, {
        scale: 2,
        backgroundColor: 'transparent',
        border: '2px solid currentColor',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: color,
        border: 'none',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, { dependencies: [color, shouldRender] });

  // Don't render on server or touch devices
  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {!showDefault && (
        <style jsx global>{`
          * {
            cursor: none !important;
          }
        `}</style>
      )}
      <div
        ref={cursorRef}
        className="custom-cursor fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          mixBlendMode,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  );
}
