'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: 'load' | 'hover' | 'inView';
  duration?: number;
  chars?: string;
}

/**
 * TextScramble - Characters cycle through random symbols before settling
 * 
 * Features:
 * - Characters cycle through random symbols before settling
 * - Duration: Configurable per word
 * - Easing: steps() for mechanical feel
 * - Trigger: Load, hover, or inView
 */
export function TextScramble({
  text,
  className = '',
  trigger = 'load',
  duration = 0.8,
  chars = '!@#$%^&*()_+-=[]{}|;:,.<>?',
}: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text); // Always start with text to avoid hydration mismatch
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scramble animation
  const scrambleText = () => {
    if (isAnimating || !textRef.current) return;
    setIsAnimating(true);

    const originalText = text;
    let iteration = 0;
    const maxIterations = Math.floor(duration * 60); // ~60fps

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (iteration > index * 3) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    }, 1000 / 60);
  };

  // Trigger on load (only on client)
  useEffect(() => {
    if (!isClient) return;
    if (trigger === 'load') {
      // Start with scrambled text
      setDisplayText(
        text
          .split('')
          .map((char) => {
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      const timer = setTimeout(scrambleText, 500);
      return () => clearTimeout(timer);
    }
  }, [trigger, isClient]);

  // Hover handlers
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      scrambleText();
    }
  };

  return (
    <span
      ref={textRef}
      className={`${className} ${trigger === 'hover' ? 'cursor-pointer' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      {displayText || text}
    </span>
  );
}

/**
 * SplitText - Animate text character by character
 */
export function SplitText({
  text,
  className = '',
  charClassName = '',
  animation = 'fadeUp',
  stagger = 0.02,
  duration = 0.8,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  animation?: 'fadeUp' | 'fadeDown' | 'rotateX' | 'blur';
  stagger?: number;
  duration?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const animations: Record<string, gsap.TweenVars> = {
    fadeUp: { y: 100, opacity: 0 },
    fadeDown: { y: -100, opacity: 0 },
    rotateX: { y: 100, opacity: 0, rotationX: -90, transformOrigin: 'center bottom' },
    blur: { opacity: 0, filter: 'blur(10px)' },
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.from(chars, {
      ...animations[animation],
      duration,
      stagger,
      ease: 'back.out(1.7)',
    });
  }, { scope: containerRef, dependencies: [animation, stagger, duration] });

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`char inline-block ${charClassName}`}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
