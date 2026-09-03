import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: "01",
    label: "WHERE IT STARTED",
    headline: <>BUILT ON <span className="text-brand-yellow">TRUST.</span></>,
    desc: "Safe Hands was born from a simple realization: premium properties deserve stewards, not just managers. People who treat every blueprint, brick, and tenant as if it were their own.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "02",
    label: "WHAT WE BELIEVE",
    headline: <>DEFINED BY <span className="text-brand-yellow">CARE.</span></>,
    desc: "A property is a living ecosystem. We believe that true value preservation requires an architectural understanding, uncompromising attention to detail, and immense responsibility.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop"
  }
];

const OurStory = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Shorter scroll distance for 2 panels
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Horizontal Scroll to Chapter 2
      tl.to(trackRef.current, { x: "-100vw", ease: "none" });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#050505] overflow-hidden flex">
      
      <div ref={trackRef} className="flex w-[200vw] h-full will-change-transform">
         
         {CHAPTERS.map((chapter, i) => (
           <div key={chapter.id} className="w-[100vw] h-full flex flex-col lg:flex-row shrink-0">
             
             {/* LEFT: 40% Text Content */}
             <div className="w-full lg:w-[40%] h-full relative flex items-center justify-center px-8 lg:px-16 xl:px-24 bg-[#030303] border-r border-white/10 z-20">
                {i === 0 && (
                  <span className="absolute top-12 left-8 lg:left-16 xl:left-24 text-brand-yellow text-xs font-mono tracking-[0.3em] uppercase">
                    OUR STORY
                  </span>
                )}
                
                <div className="flex flex-col w-full max-w-lg">
                   <span className="text-white/60 text-sm font-mono tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                      <span className="text-brand-yellow font-bold">CHAPTER {chapter.id}</span>
                      <div className="w-6 h-[1px] bg-white/30" />
                      {chapter.label}
                   </span>
                   
                   <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-[1.05] tracking-tight mb-8 text-white">
                      {chapter.headline}
                   </h2>
                   
                   <p className="text-lg lg:text-xl text-brand-light-gray font-light leading-relaxed">
                      {chapter.desc}
                   </p>
                </div>
             </div>

             {/* RIGHT: 60% Cinematic Imagery */}
             <div className="w-full lg:w-[60%] h-[50vh] lg:h-full relative z-10 overflow-hidden">
                <img 
                  src={chapter.img} 
                  alt={chapter.label} 
                  className="w-full h-full object-cover"
                />
                {/* Lighter cinematic overlay */}
                <div className="absolute inset-0 bg-black/10" />
             </div>
           </div>
         ))}

      </div>

    </section>
  );
};

export default OurStory;

