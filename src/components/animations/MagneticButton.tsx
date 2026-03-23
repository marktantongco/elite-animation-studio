'use client';

import { useRef, useCallback } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  onClick?: () => void;
}

/**
 * MagneticButton - Button that follows cursor with elastic physics
 * 
 * Features:
 * - Hover: Follows cursor within radius (elastic physics)
 * - Click: Scale 0.95 → 1.05 → 1 with elastic.out
 * - Idle: Subtle yoyo float (2px, 3s duration)
 */
export function MagneticButton({
  children,
  className = '',
  style,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isHovered = useRef(false);

  // Handle mouse move for magnetic effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [strength]);

  // Handle mouse leave - return to original position
  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return;
    isHovered.current = false;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  // Handle click with elastic animation
  const handleClick = useCallback(() => {
    if (!buttonRef.current) return;

    gsap.timeline()
      .to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.in',
      })
      .to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)',
      });

    onClick?.();
  }, [onClick]);

  // Idle floating animation
  useGSAP(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      y: '+=2',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: buttonRef });

  return (
    <button
      ref={buttonRef}
      className={`magnetic-btn ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
