'use client';

import { useRef, useEffect } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TextScramble, SplitText } from '@/components/animations/TextScramble';
import { ParallaxImage, ParallaxLayer, PinnedSection } from '@/components/animations/ParallaxSection';
import { CustomCursor } from '@/components/animations/CustomCursor';
import { ScrollProgress, ScrollIndicator, SectionProgress } from '@/components/animations/ScrollProgress';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Section data for navigation
const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useGSAP(() => {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-bg', { scale: 1.2, opacity: 0, duration: 1.2 })
      .from('.hero-title', { y: 100, opacity: 0, duration: 0.8 }, '-=0.8')
      .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.6 }, '-=0.6')
      .from('.hero-cta', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out' }, '-=0.4')
      .from('.hero-scroll', { y: -20, opacity: 0, duration: 0.4 }, '-=0.2');
  }, { scope: heroRef });

  // Parallax depth system
  useGSAP(() => {
    // Background layer (slowest)
    gsap.to('.parallax-bg', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { scrub: true },
    });

    // Midground layer
    gsap.to('.parallax-mid', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: { scrub: true },
    });

    // Foreground layer (fastest)
    gsap.to('.parallax-fg', {
      yPercent: 80,
      ease: 'none',
      scrollTrigger: { scrub: true },
    });
  }, { scope: mainRef });

  // Counter animation
  const CounterSection = () => {
    const counterRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
      if (!counterRef.current) return;

      const counters = counterRef.current.querySelectorAll('.counter-value');
      
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-value') || '0');
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              ease: 'rough({strength: 0.5})',
              snap: { innerText: 1 },
            });
          },
        });
      });
    }, { scope: counterRef });

    return (
      <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: 500, label: 'Projects Delivered' },
          { value: 98, label: 'Client Satisfaction %' },
          { value: 12, label: 'Years Experience' },
          { value: 60, label: 'FPS Guaranteed' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-4xl md:text-6xl font-black">
              <span className="counter-value" data-value={stat.value}>0</span>
            </div>
            <div className="font-caption uppercase tracking-widest mt-2">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main ref={mainRef} className="min-h-screen flex flex-col">
      {/* Custom Cursor */}
      <CustomCursor size={16} color="#FFEA00" />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Section Navigation */}
      <SectionProgress sections={sections} />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section
        id="hero"
        ref={heroRef}
        className="section-full relative flex items-center justify-center overflow-hidden"
        style={{ background: '#000000' }}
      >
        {/* Background */}
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Animated grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(#FFEA00 1px, transparent 1px),
                linear-gradient(90deg, #FFEA00 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="parallax-bg absolute w-96 h-96 bg-yellow-400 opacity-20"
            style={{ top: '10%', left: '10%', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          />
          <div
            className="parallax-mid absolute w-64 h-64 border-4 border-yellow-400 opacity-30"
            style={{ top: '60%', right: '15%', transform: 'rotate(45deg)' }}
          />
          <div
            className="parallax-fg absolute w-32 h-32 bg-red-500 opacity-20"
            style={{ bottom: '20%', left: '20%' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="hero-title">
            <h1 className="font-display text-white mb-4" style={{ lineHeight: 0.9 }}>
              <SplitText text="ELITE" animation="fadeUp" stagger={0.05} />
              <br />
              <span className="text-stroke-thick" style={{ WebkitTextStrokeColor: '#FFEA00' }}>
                <SplitText text="ANIMATION" animation="fadeUp" stagger={0.05} />
              </span>
            </h1>
          </div>

          <div className="hero-subtitle">
            <TextScramble
              text="Cinematic Web Experiences with GSAP"
              className="font-h2 text-gray-300 block mt-6"
              trigger="load"
              duration={1}
            />
          </div>

          <div className="hero-cta mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              className="bg-yellow-400 text-black px-8 py-4 text-lg"
              strength={0.4}
            >
              Explore Work
            </MagneticButton>
            <MagneticButton
              className="bg-transparent text-white border-4 border-white px-8 py-4 text-lg"
              strength={0.4}
            >
              Get in Touch
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator className="text-yellow-400" />
        </div>
      </section>

      {/* ============================================ */}
      {/* PHILOSOPHY SECTION */}
      {/* ============================================ */}
      <section id="philosophy" className="section-full relative bg-white">
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="font-h1 mb-4">Design Philosophy</h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              Motion-first design where every animation serves function first, delight second.
              Performance is non-negotiable: 60fps or nothing.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Brutalist Aesthetic',
                description: 'Exposed structure, thick borders, hard shadows. Intentional imperfections that demand attention.',
                icon: '◈',
              },
              {
                title: 'Motion Psychology',
                description: 'Timing and easing chosen for emotional resonance. Every transition tells a story.',
                icon: '◉',
              },
              {
                title: 'Performance First',
                description: 'GPU-accelerated properties only. Transform, opacity, nothing that causes layout thrashing.',
                icon: '◎',
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} animation="fadeUp" delay={index * 0.1}>
                <div className="brutal-card p-8 h-full">
                  <div className="text-5xl mb-4" style={{ color: '#FFEA00' }}>
                    {item.icon}
                  </div>
                  <h3 className="font-h3 mb-4">{item.title}</h3>
                  <p className="font-body text-gray-600">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Counter Section */}
          <div className="mt-24 pt-24 border-t-4 border-black">
            <ScrollReveal animation="fadeUp">
              <CounterSection />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="section-full relative" style={{ background: '#FFEA00' }}>
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="font-h1 mb-4">Services</h2>
            <p className="font-body text-black/70 max-w-2xl mx-auto">
              From micro-interactions to complex choreographed sequences. 
              Full-stack animation engineering for the modern web.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Scroll-Driven Narratives',
                description: 'Transform scrolling into storytelling with parallax, pinning, and progress-linked animations.',
                tags: ['ScrollTrigger', 'Parallax', 'Pinning'],
              },
              {
                title: 'Micro-Interactions',
                description: 'Magnetic buttons, cursor effects, elastic physics. Every touchpoint feels alive.',
                tags: ['Hover', 'Click', 'Focus'],
              },
              {
                title: 'Entrance Sequences',
                description: 'Hero reveals, staggered grids, text animations. First impressions that last.',
                tags: ['Timeline', 'Stagger', 'SplitText'],
              },
              {
                title: 'Performance Optimization',
                description: '60fps guarantee. GPU acceleration, layout thrashing prevention, memory management.',
                tags: ['GPU', 'FPS', 'Optimization'],
              },
            ].map((service, index) => (
              <ScrollReveal
                key={service.title}
                animation={index % 2 === 0 ? 'fadeLeft' : 'fadeRight'}
                delay={index * 0.1}
              >
                <div
                  className="p-8 h-full"
                  style={{
                    background: '#000000',
                    color: '#FFEA00',
                    border: '4px solid #000',
                    boxShadow: '8px 8px 0px #000',
                  }}
                >
                  <h3 className="font-h3 mb-4">{service.title}</h3>
                  <p className="font-body text-gray-300 mb-6">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm font-mono"
                        style={{
                          background: '#1A1A1A',
                          border: '2px solid #FFEA00',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WORK SECTION - PINNED SHOWCASE */}
      {/* ============================================ */}
      <section id="work" className="relative" style={{ background: '#1A1A1A' }}>
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal animation="fadeUp" className="text-center mb-16">
            <h2 className="font-h1 text-white mb-4">Featured Work</h2>
            <p className="font-body text-gray-400 max-w-2xl mx-auto">
              A selection of projects showcasing scroll-driven narratives, 
              micro-interactions, and performance-optimized animations.
            </p>
          </ScrollReveal>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Cinematic Landing',
                category: 'Web Experience',
                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
              },
              {
                title: 'Interactive Dashboard',
                category: 'Data Visualization',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
              },
              {
                title: 'E-Commerce Redesign',
                category: 'UI/UX Design',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
              },
              {
                title: 'Brand Animation',
                category: 'Motion Design',
                image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop',
              },
            ].map((project, index) => (
              <ScrollReveal key={project.title} animation="scale" delay={index * 0.1}>
                <div
                  className="group relative overflow-hidden cursor-pointer"
                  style={{
                    border: '4px solid #FFEA00',
                    boxShadow: '8px 8px 0px #FFEA00',
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                    }}
                  >
                    <span className="font-caption text-yellow-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="font-h3 text-white mt-2">{project.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================ */}
      <section
        id="contact"
        className="section-full relative flex items-center"
        style={{ background: '#000000' }}
      >
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fadeUp">
              <h2 className="font-h1 text-white mb-6">
                <TextScramble
                  text="Let's Create Something"
                  className="block"
                  trigger="inView"
                  duration={0.6}
                />
                <span style={{ color: '#FFEA00' }}>Extraordinary</span>
              </h2>
              <p className="font-body text-gray-400 max-w-2xl mx-auto mb-12">
                Ready to transform your digital presence with cinematic animations? 
                Let&apos;s discuss your project and push the boundaries of web experience.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="scale" delay={0.2}>
              <MagneticButton
                className="text-xl px-12 py-6"
                style={{
                  background: '#FFEA00',
                  color: '#000000',
                  border: '4px solid #FFEA00',
                  boxShadow: '8px 8px 0px #FFEA00',
                }}
                strength={0.5}
              >
                Start a Project
              </MagneticButton>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal animation="fadeUp" delay={0.4}>
              <div className="mt-16 flex justify-center gap-8">
                {['Twitter', 'LinkedIn', 'Dribbble', 'CodePen'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-caption text-gray-500 hover:text-yellow-400 transition-colors uppercase tracking-widest"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer
        className="py-8 border-t-4"
        style={{ background: '#000000', borderColor: '#FFEA00' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-caption text-gray-500">
              © 2024 Elite Animation Studio. All rights reserved.
            </div>
            <div className="font-mono text-sm" style={{ color: '#FFEA00' }}>
              60 FPS GUARANTEED
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
