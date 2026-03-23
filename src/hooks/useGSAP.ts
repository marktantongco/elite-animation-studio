'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface UseGSAPOptions {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
  revertOnUnmount?: boolean;
}

/**
 * Custom hook for GSAP animations with automatic cleanup
 * Similar to @gsap/react's useGSAP but with better TypeScript support
 */
export function useGSAP(
  callback: (context: gsap.Context, gsapInstance: typeof gsap) => void | (() => void),
  options: UseGSAPOptions = {}
) {
  const { scope, dependencies = [], revertOnUnmount = true } = options;
  const contextRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | void>(null);

  useIsomorphicLayoutEffect(() => {
    // Create GSAP context
    contextRef.current = gsap.context(() => {
      cleanupRef.current = callback(contextRef.current!, gsap);
    }, scope?.current || undefined);

    // Cleanup function
    return () => {
      if (revertOnUnmount && contextRef.current) {
        contextRef.current.revert();
      }
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, dependencies);

  return contextRef;
}

/**
 * Hook for ScrollTrigger animations
 */
export function useScrollTrigger(
  setup: (trigger: typeof ScrollTrigger) => void,
  dependencies: unknown[] = []
) {
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setup(ScrollTrigger);
    });

    return () => ctx.revert();
  }, dependencies);
}

/**
 * Check for reduced motion preference
 */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
