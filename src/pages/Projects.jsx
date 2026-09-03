import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FinalCTASection from '../components/home/FinalCTASection';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".proj-hero-elem", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      // Parallax image
      gsap.to(".proj-hero-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".proj-hero-container",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade in sections
      gsap.utils.toArray(".proj-fade-section").forEach(sec => {
        gsap.from(sec, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: sec,
            start: "top 80%"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#f8f8f8] text-black pt-32">
      
      {/* 1. HERO */}
      <section className="proj-hero-container relative w-full px-6 lg:px-16 max-w-[1600px] mx-auto pb-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <h1 className="proj-hero-elem text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tighter leading-none mb-4 uppercase">
              PROJECT<br/>
              <span className="text-brand-yellow">01</span>
            </h1>
            <span className="proj-hero-elem text-sm font-mono tracking-widest uppercase text-gray-500">
              Luxury Residential Development
            </span>
          </div>
          <div className="max-w-md">
            <p className="proj-hero-elem text-xl lg:text-2xl font-light leading-relaxed text-gray-700">
              A beacon of modern residential living designed with precision, featuring panoramic views and zero-carbon infrastructure.
            </p>
          </div>
        </div>
        
        <div className="proj-hero-elem w-full h-[60vh] lg:h-[80vh] overflow-hidden rounded-2xl relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop" 
            alt="Project Hero" 
            className="proj-hero-img w-full h-[120%] object-cover origin-top"
          />
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW & DETAILS GRID */}
      <section className="proj-fade-section w-full px-6 lg:px-16 max-w-[1600px] mx-auto py-24 border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div>
              <span className="text-xs font-mono tracking-[0.3em] text-brand-yellow font-bold block mb-4 uppercase">Project Overview</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 uppercase">The Lumina</h2>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                An integrated urban development seamlessly blending high-end retail, office spaces, and boutique residences into a single, cohesive architectural triumph. 
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              <div className="border-b border-black/10 pb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 block mb-2 uppercase">Location</span>
                <span className="text-lg font-bold">Chennai, India</span>
              </div>
              <div className="border-b border-black/10 pb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 block mb-2 uppercase">Category</span>
                <span className="text-lg font-bold">Residential</span>
              </div>
              <div className="border-b border-black/10 pb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 block mb-2 uppercase">Year</span>
                <span className="text-lg font-bold">2024</span>
              </div>
              <div className="border-b border-black/10 pb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 block mb-2 uppercase">Status</span>
                <span className="text-lg font-bold">Completed</span>
              </div>
              <div className="border-b border-black/10 pb-6 sm:col-span-2">
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 block mb-2 uppercase">Services Rendered</span>
                <span className="text-lg font-bold leading-snug">Property Management, Facility Maintenance, Technical Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT STORY */}
      <section className="proj-fade-section w-full bg-[#050505] text-white py-32 px-6 lg:px-16">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <span className="text-brand-yellow font-mono text-xs tracking-[0.3em] uppercase block mb-8 font-bold">The Story</span>
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-8">
              UNCOMPROMISING<br/>STANDARDS FROM<br/>DAY ONE.
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed mb-8 max-w-lg">
              We took over the stewardship of this development with a clear mandate: elevate every aspect of its operation. From the structural maintenance to the day-to-day resident experience, we implemented a zero-tolerance policy for inefficiency.
            </p>
          </div>
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] overflow-hidden rounded-xl border border-white/10">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-80" alt="Project Story" />
          </div>
        </div>
      </section>

      {/* 4. GALLERY */}
      <section className="proj-fade-section w-full py-32 px-6 lg:px-16 max-w-[1600px] mx-auto">
        <div className="mb-16 text-center">
          <span className="text-xs font-mono tracking-[0.3em] text-brand-yellow font-bold block mb-4 uppercase">Visual Documentation</span>
          <h2 className="text-4xl font-bold uppercase tracking-tight">Project Gallery</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="aspect-square bg-gray-200 overflow-hidden rounded-xl">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery 1" />
          </div>
          <div className="aspect-[3/4] md:aspect-square bg-gray-200 overflow-hidden rounded-xl md:translate-y-12">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale" alt="Gallery 2" />
          </div>
          <div className="aspect-square bg-gray-200 overflow-hidden rounded-xl md:col-span-2 lg:col-span-1">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Gallery 3" />
          </div>
        </div>
      </section>

      {/* 5. IMPACT / METRICS */}
      <section className="proj-fade-section w-full bg-[#050505] text-white py-32 px-6 lg:px-16 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-brand-yellow font-mono text-xs tracking-[0.3em] uppercase block mb-16 font-bold text-center lg:text-left">Project Impact</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/20 pt-16">
            
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-brand-yellow mb-6">01</span>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Planning</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Strategic asset evaluation and complete technical auditing prior to operational handover.
              </p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-brand-yellow mb-6">02</span>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Execution</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Implementation of rigorous maintenance protocols and sustainable energy management systems.
              </p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-brand-yellow mb-6">03</span>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4">Management</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Ongoing absolute stewardship, tenant relations, and proactive facility optimization.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA (Original Approved CTA) */}
      <FinalCTASection />

    </main>
  );
};

export default Projects;
