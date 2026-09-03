import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { 
     year: "2010", 
     title: "FOUNDATION", 
     desc: "The idea of a responsible property management firm was born.",
     img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop"
  },
  { 
     year: "2015", 
     title: "STRUCTURE", 
     desc: "Safe Hands established its first operational framework and secured key properties.",
     img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2500&auto=format&fit=crop"
  },
  { 
     year: "2019", 
     title: "GROWTH", 
     desc: "Expanded into commercial real estate, managing high-rise developments.",
     img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop"
  },
  { 
     year: "2024", 
     title: "TODAY", 
     desc: "A premier property management agency trusted by hundreds of owners.",
     img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop"
  }
];

const TimelineSection = () => {
  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const introRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Intro animation
      gsap.from(".tl-intro-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 80%",
        }
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${milestones.length * 1000}`, // Reduced from 2000 per milestone
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // The global animated measuring line (finishes naturally as the final year enters)
      tl.to(".tl-measuring-line", { scaleX: 1, ease: "none", duration: (milestones.length * 4) - 2.5 }, 0);

      milestones.forEach((milestone, i) => {
         const start = i * 4;
         const isLast = i === milestones.length - 1;

         // Entrance
         tl.fromTo(`.tl-step-${i} .tl-year`, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, start)
           .fromTo(`.tl-step-${i} .tl-img`, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.2 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power3.inOut" }, start + 0.2)
           .fromTo(`.tl-step-${i} .tl-content`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, start + 0.5)
           .fromTo(`.tl-step-${i} .tl-marker`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, start);

         // Exit (except for the last one)
         if (!isLast) {
            // Hold
            tl.to({}, { duration: 1.5 });
            
            tl.to(`.tl-step-${i} .tl-year`, { opacity: 0, y: -100, duration: 1, ease: "power2.inOut" }, start + 3)
              .to(`.tl-step-${i} .tl-img`, { clipPath: "inset(0% 0% 0% 100%)", scale: 0.8, duration: 1.5, ease: "power3.inOut" }, start + 3)
              .to(`.tl-step-${i} .tl-content`, { opacity: 0, x: 50, duration: 1, ease: "power2.inOut" }, start + 3)
              .to(`.tl-step-${i} .tl-marker`, { scale: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" }, start + 3);
         } else {
            // Tiny hold for the last item so the scroll naturally flows into the CTA
            tl.to({}, { duration: 0.2 });
         }
      });

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full bg-[#050505]">
      
      {/* SECTION INTRO */}
      <div ref={introRef} className="w-full pt-20 md:pt-28 pb-16 px-6 md:px-12 flex flex-col items-center justify-center text-center">
         <span className="tl-intro-anim text-brand-yellow text-sm md:text-base font-mono tracking-[0.4em] uppercase font-bold mb-6 block">
            OUR JOURNEY
         </span>
         <h2 className="tl-intro-anim text-4xl sm:text-5xl lg:text-[64px] font-bold text-white tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            FROM FOUNDATION<br/>
            TO THE <span className="text-brand-yellow">FUTURE.</span>
         </h2>
      </div>

      <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      


      {/* The Master Blueprint Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-10 -translate-y-1/2 hidden md:block" />
      <div className="tl-measuring-line absolute top-1/2 left-0 w-full h-[2px] bg-brand-yellow z-10 origin-left scale-x-0 -translate-y-1/2 hidden md:block" />

      {/* Milestone Container */}
      <div className="relative w-full h-full max-w-7xl mx-auto z-20">
         
         {milestones.map((milestone, i) => (
            <div key={i} className={`tl-step-${i} absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-24 pointer-events-none`}>
               
               {/* Marker (desktop only, attached to line) */}
               <div className="tl-marker absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-yellow z-30 hidden md:block shadow-[0_0_20px_rgba(248,189,22,0.5)]" />

               {/* Left Side: Large Year & Content */}
               <div className="w-full md:w-1/2 h-auto md:h-full flex flex-col justify-center pb-6 md:pb-0 relative z-30 pt-12 md:pt-0">
                  <h2 className="tl-year text-8xl md:text-[150px] lg:text-[200px] font-bold text-white tracking-tighter leading-none mb-4 md:mb-8 text-center md:text-left drop-shadow-2xl">
                     {milestone.year}
                  </h2>
                  <div className="tl-content text-center md:text-left">
                     <span className="text-brand-yellow text-sm md:text-base font-mono tracking-[0.3em] uppercase block mb-4">
                        {milestone.title}
                     </span>
                     <p className="text-lg md:text-2xl text-white/80 font-light max-w-md mx-auto md:mx-0">
                        {milestone.desc}
                     </p>
                  </div>
               </div>

               {/* Right Side: Visual Moment */}
               <div className="w-full md:w-[40%] h-[30vh] md:h-[60vh] flex items-center justify-center relative z-20">
                  <div className="w-full h-full relative overflow-hidden border border-white/5">
                     <img 
                        src={milestone.img} 
                        className="tl-img w-full h-full object-cover origin-center" 
                        alt={milestone.title}
                     />
                  </div>
               </div>
               
            </div>
         ))}

      </div>

    </section>
    </div>
  );
};

export default TimelineSection;
