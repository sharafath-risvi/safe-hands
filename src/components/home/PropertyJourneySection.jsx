import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROCESSES = [
  {
    id: "01",
    title: "PROPERTY",
    accent: "CARE.",
    desc: "Understanding the property, assessing its condition, identifying requirements and establishing the right care strategy.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "FACILITY",
    accent: "MANAGEMENT.",
    desc: "Coordinating facilities, vendors, maintenance, operations and day-to-day property requirements.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "EXECUTION &",
    accent: "CARE.",
    desc: "Executing planned work, maintaining quality, monitoring the property and ensuring standards are consistently maintained.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "CONTINUOUS",
    accent: "SUPPORT.",
    desc: "Ongoing communication, proactive support, monitoring and long-term property care.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop",
  }
];

const PropertyJourneySection = () => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // --- 1. ENTRANCE ANIMATION ---
        // Hide elements initially
        gsap.set(frameRef.current, { scale: 0.96, opacity: 0, borderColor: "rgba(255, 255, 255, 0)" });
        gsap.set(".step-content", { opacity: 0, y: 40 });
        gsap.set(".step-image", { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 });
        gsap.set(".step-indicator span", { opacity: 0.3 });
        gsap.set(".step-indicator-0", { opacity: 1, color: "#EAB308" }); // Yellow highlight for first step

        // Animate entrance on scroll into view
        gsap.to(frameRef.current, {
          scale: 1,
          opacity: 1,
          borderColor: "rgba(234, 179, 8, 0.4)", // Thin yellow accent border
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        });

        // Initial Reveal for Step 1
        gsap.to(".step-content-0", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        });
        gsap.to(".step-image-0", {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        });


        // --- 2. SCROLL-DRIVEN TRANSITIONS ---
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "center center",
            end: "+=2000", // Keep it relatively compact (4 steps)
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // We have 4 steps, so 3 transitions.
        for (let i = 0; i < 3; i++) {
          const current = i;
          const next = i + 1;
          const label = `transition-${current}`;

          // Add a tiny hold before starting transition
          tl.to({}, { duration: 0.2 });

          // OUT: Current Step
          tl.to(`.step-content-${current}`, {
            opacity: 0,
            y: -40,
            duration: 0.8,
            ease: "power2.inOut"
          }, label);

          // OUT: Current Image (Slide up effect)
          tl.to(`.step-image-${current}`, {
            clipPath: "inset(0% 0% 100% 0%)",
            yPercent: -20,
            duration: 1.2,
            ease: "power2.inOut"
          }, label);
          
          // IN: Next Image (Slide in from bottom)
          gsap.set(`.step-image-${next}`, { clipPath: "inset(100% 0% 0% 0%)", yPercent: 20, scale: 1.05 });
          tl.to(`.step-image-${next}`, {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut"
          }, label);

          // IN: Next Step Content
          gsap.set(`.step-content-${next}`, { opacity: 0, y: 40 });
          tl.to(`.step-content-${next}`, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.inOut"
          }, label + "+=0.2"); // Slight stagger

          // INDICATOR UPDATE
          tl.to(`.step-indicator-${current}`, {
            color: "#ffffff",
            opacity: 0.3,
            duration: 0.3
          }, label);
          tl.to(`.step-indicator-${next}`, {
            color: "#EAB308",
            opacity: 1,
            duration: 0.3
          }, label);
        }
        
        // Final hold so user can read step 4 before unpinning
        tl.to({}, { duration: 0.4 });
      });


      // --- MOBILE (STACKED, FADE IN) ---
      mm.add("(max-width: 767px)", () => {
         gsap.utils.toArray('.mobile-step').forEach(el => {
           gsap.fromTo(el, 
             { opacity: 0, y: 40 },
             { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 80%" } }
           );
         });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#030303] text-white relative">
      
      {/* SECTION INTRO */}
      <div className="w-full min-h-[40vh] flex flex-col justify-end px-6 md:px-12 pt-32 pb-8 max-w-[1600px] mx-auto">
         <span className="text-brand-yellow text-sm tracking-[0.4em] font-mono uppercase mb-6 block">
            HOW SAFE HANDS WORKS
         </span>
         <h2 className="text-4xl lg:text-7xl font-bold leading-[1.05] tracking-tight uppercase mb-8">
            FOUR STEPS.<br/>
            <span className="text-brand-yellow">ONE STANDARD OF CARE.</span>
         </h2>
      </div>

      {/* DESKTOP EXPERIENCE (Pinned Screen) */}
      <div ref={containerRef} className="hidden md:flex flex-col w-full h-screen items-center justify-center p-6 lg:p-12 relative">
         
         {/* The Cinematic Frame */}
         <div 
            ref={frameRef}
            className="w-full h-full max-w-[1600px] max-h-[900px] rounded-2xl border flex flex-col overflow-hidden shadow-2xl relative bg-[#0a0a0a]"
            style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255,255,255,0.05)",
                backgroundImage: "linear-gradient(to bottom right, rgba(25,25,25,0.8), rgba(10,10,10,1))"
            }}
         >
            {/* Top Metadata Bar */}
            <div className="w-full h-12 flex items-center justify-between px-8 border-b border-white/5 relative z-20">
                <span className="text-[10px] tracking-[0.3em] font-mono text-white/40 uppercase">Safe Hands Process</span>
                
                {/* Step Indicator */}
                <div className="flex items-center gap-3 text-[11px] font-mono font-medium tracking-widest step-indicator">
                    {PROCESSES.map((p, i) => (
                        <React.Fragment key={p.id}>
                            <span className={`step-indicator-${i} transition-colors duration-300`}>{p.id}</span>
                            {i < PROCESSES.length - 1 && <span className="text-white/20">—</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Main Screen Content */}
            <div className="flex-1 flex w-full relative z-10">
                
                {/* LEFT SIDE: Content */}
                <div className="w-[40%] h-full relative p-12 lg:p-20 flex flex-col justify-center border-r border-white/5 overflow-hidden">
                    {PROCESSES.map((process, i) => (
                        <div 
                            key={`content-${process.id}`}
                            className={`step-content step-content-${i} absolute inset-0 flex flex-col justify-center p-12 lg:p-20 pointer-events-none`}
                        >
                            <span className="text-brand-yellow font-mono text-5xl lg:text-7xl font-light tracking-tight mb-8 block opacity-80">
                                {process.id}
                            </span>
                            <h3 
                                className="text-4xl lg:text-6xl font-bold uppercase leading-[1.05] tracking-tight mb-6"
                                style={process.id === "02" ? { fontSize: "clamp(2rem, 4.5vw, 3.5rem)" } : {}}
                            >
                                {process.title} <br/>
                                <span className="text-brand-yellow">{process.accent}</span>
                            </h3>
                            <div className="w-12 h-[2px] bg-brand-yellow/50 mb-6" />
                            <p className="text-lg lg:text-xl text-white/60 font-light tracking-wide leading-relaxed max-w-md">
                                {process.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE: Cinematic Image */}
                <div className="w-[60%] h-full relative overflow-hidden bg-black">
                    {/* Subtle film grain/texture overlay */}
                    <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" style={{ backgroundSize: '4px' }}></div>
                    <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-[#0a0a0a] pointer-events-none w-1/4"></div>

                    {PROCESSES.map((process, i) => (
                        <div 
                            key={`image-${process.id}`}
                            className={`step-image step-image-${i} absolute inset-0 w-full h-full origin-bottom`}
                        >
                            <img 
                                src={process.img} 
                                alt={process.title} 
                                className="w-full h-full object-cover mix-blend-screen opacity-90" 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Corner Decorative Details */}
            <div className="absolute top-12 left-0 w-4 h-[1px] bg-white/20 z-20"></div>
            <div className="absolute top-12 right-0 w-4 h-[1px] bg-white/20 z-20"></div>
            <div className="absolute bottom-0 left-12 w-[1px] h-4 bg-white/20 z-20"></div>
            <div className="absolute bottom-0 right-12 w-[1px] h-4 bg-white/20 z-20"></div>
         </div>

      </div>

      {/* MOBILE EXPERIENCE */}
      <div className="md:hidden flex flex-col w-full px-6 py-12 gap-12 relative overflow-hidden">
         {PROCESSES.map((process, i) => (
            <div key={`mobile-${process.id}`} className="mobile-step relative w-full flex flex-col gap-6">
               
               <div className="w-full relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] bg-black">
                  <img src={process.img} alt={process.title} className="w-full h-full object-cover mix-blend-screen opacity-80" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Overlay Number */}
                  <span className="absolute bottom-4 left-4 z-20 text-brand-yellow font-mono text-4xl font-light opacity-90">
                     {process.id}
                  </span>
               </div>
               
               <div className="flex flex-col">
                  <h3 className="text-2xl font-bold uppercase leading-[1.05] tracking-tight mb-3">
                     {process.title} <span className="text-brand-yellow">{process.accent}</span>
                  </h3>
                  <p className="text-base text-white/60 font-light leading-relaxed">
                     {process.desc}
                  </p>
               </div>
            </div>
         ))}
      </div>

    </section>
  );
};

export default PropertyJourneySection;

