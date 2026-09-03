import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    id: "01",
    nameHTML: <>EXPER<span className="text-brand-yellow">IENCE.</span></>,
    tagline: "PROVEN TRACK RECORD IN PREMIUM ASSET CARE.",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "02",
    nameHTML: <>PROACTIVE <span className="text-brand-yellow">CARE.</span></>,
    tagline: "WE TAKE COMPLETE RESPONSIBILITY FOR YOUR ASSET.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "03",
    nameHTML: <>EXPER<span className="text-brand-yellow">TISE.</span></>,
    tagline: "CONSISTENCY THAT ENSURES VALUE NEVER DEGRADES.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "04",
    nameHTML: <>TRANS<span className="text-brand-yellow">PARENCY.</span></>,
    tagline: "OPEN COMMUNICATION AT EVERY STEP.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "05",
    nameHTML: <>RESPONSIVE<span className="text-brand-yellow">NESS.</span></>,
    tagline: "AGILE SOLUTIONS FOR COMPLEX ASSETS.",
    img: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=2500&auto=format&fit=crop"
  },
  {
    id: "06",
    nameHTML: <>PARTNER<span className="text-brand-yellow">SHIP.</span></>,
    tagline: "BUILDING LONG-TERM ASSET VALUE TOGETHER.",
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2500&auto=format&fit=crop"
  }
];

const WhySafeHandsSection = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP: Cinematic 3-Column Assembled Stage
      // ==========================================
      mm.add("(min-width: 1024px)", () => {
        
        // --- INITIAL DOM STATES ---
        
        // I1 (Starts full screen, will shrink into Col 1 slot)
        gsap.set(".i-1", {
           width: "100vw",
           height: "100vh",
           left: "0vw",
           top: "0vh",
           borderRadius: "0px"
        });
        gsap.set(".i-1 img", { scale: 1.05 });

        // Hero Typography
        gsap.set(".why-hero-content", { opacity: 1, y: 0 });
        gsap.set(".why-hero-overlay", { opacity: 1 });

        // Set 1 initial states
        gsap.set(".c-1", { opacity: 0, y: 30 });
        gsap.set(".col-2", { opacity: 0, y: -150 });
        gsap.set(".col-3", { opacity: 0, y: 150 });

        // Set 2 initial states (Hidden extremely far offscreen)
        gsap.set(".col-4", { opacity: 0, y: "-120vh" });
        gsap.set(".col-5", { opacity: 0, y: "120vh" });
        gsap.set(".col-6", { opacity: 0, y: "-120vh" });

        // --- THE CHOREOGRAPHED TIMELINE ---
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2500", // Significantly compressed scroll distance
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // 1. Hero Transformation (Image shrinks, text fades out)
        tl.to(".why-hero-content", { opacity: 0, y: -50, duration: 0.8, ease: "power2.inOut" }, 0)
          .to(".why-hero-overlay", { opacity: 0, duration: 1, ease: "power2.inOut" }, 0)
          .to(".i-1", {
             width: "26vw",
             height: "55vh",
             left: "6vw",
             top: "5vh",
             borderRadius: "16px",
             duration: 1.2,
             ease: "power2.inOut"
          }, 0)
          .to(".i-1 img", { scale: 1, duration: 1.2, ease: "power2.inOut" }, 0);

        // 2. Assembling the First Set (01, 02, 03)
        tl.to(".c-1", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.0);
        tl.to(".col-2", { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 1.0);
        tl.to(".col-3", { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }, 1.0);

        // 3. The Hold (Set 1) - reduced so user doesn't have to scroll excessively
        tl.to({}, { duration: 0.8 }); 

        // 4 & 5. Chapter 1 Exits & Chapter 2 Enters (Smoothly Synchronized)
        const transDur = 1.6; // Slightly longer for premium smoothness
        
        // 01 ↑, 02 ↓, 03 ↑
        tl.to([".i-1", ".c-1"], { y: "-100vh", opacity: 0, duration: transDur, ease: "power2.inOut" }, "transition")
          .to(".col-2", { y: "100vh", opacity: 0, duration: transDur, ease: "power2.inOut" }, "transition")
          .to(".col-3", { y: "-100vh", opacity: 0, duration: transDur, ease: "power2.inOut" }, "transition")
        
        // 04 ↓, 05 ↑, 06 ↓ (Enter with a slight delay for a natural pause)
          .to(".col-4", { opacity: 1, y: 0, duration: transDur, ease: "power2.inOut" }, "transition+=1.2")
          .to(".col-5", { opacity: 1, y: 0, duration: transDur, ease: "power2.inOut" }, "transition+=1.2")
          .to(".col-6", { opacity: 1, y: 0, duration: transDur, ease: "power2.inOut" }, "transition+=1.2");

        // 6. The Hold (Set 2)
        tl.to({}, { duration: 0.8 });

        // 7. Final Exit
        // 04 ↑, 05 ↓, 06 ↑
        tl.to(".col-4", { y: "-100vh", opacity: 0, duration: 1.2, ease: "power2.inOut" }, "finalExit")
          .to(".col-5", { y: "100vh", opacity: 0, duration: 1.2, ease: "power2.inOut" }, "finalExit")
          .to(".col-6", { y: "-100vh", opacity: 0, duration: 1.2, ease: "power2.inOut" }, "finalExit");

        // Buffer to ensure exit completes strictly before unpinning
        tl.to({}, { duration: 0.2 });

      });

      // ==========================================
      // MOBILE: Stacked Fallback
      // ==========================================
      mm.add("(max-width: 1023px)", () => {
         gsap.utils.toArray('.mobile-why-fade').forEach(el => {
           gsap.fromTo(el, 
             { opacity: 0, y: 30 },
             { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } }
           );
         });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#030303] relative overflow-hidden z-10">
      
      {/* ==========================================
          DESKTOP EXPERIENCE (3-Column Assembly)
          ========================================== */}
      <div className="hidden lg:block w-full h-screen relative bg-[#030303] overflow-hidden">
        
        {/* INTRO HERO LAYER */}
        <div className="why-hero-content absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
           <div className="max-w-[900px]">
              <span className="text-brand-yellow text-xs tracking-[0.4em] font-semibold uppercase mb-6 block drop-shadow-md">
                Why Safe Hands
              </span>
              <h2 className="text-6xl lg:text-[72px] font-bold text-white leading-[1.05] tracking-tight mb-8 drop-shadow-2xl">
                MORE THAN <span className="text-brand-yellow">MAINTENANCE.</span>
              </h2>
              <p className="text-[22px] lg:text-[26px] text-white font-medium uppercase tracking-tight mb-6 drop-shadow-xl">
                IT DESERVES RESPONSIBILITY.
              </p>
              <p className="text-xl text-brand-light-gray font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                We bring a structured, accountable, and highly professional approach to the stewardship of your most valuable physical assets.
              </p>
           </div>
        </div>

        {/* IMAGE 1 (Begins Full Screen -> Transforms to Column 1) */}
        <div className="i-1 absolute z-40 bg-black overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] origin-center border border-white/5">
            <img 
              src={REASONS[0].img} 
              className="w-full h-full object-cover" 
              alt="Experience" 
            />
            <div className="why-hero-overlay absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        {/* CONTENT 1 (Fades in below I1 after transformation) */}
        {/* Positioned explicitly below I1 (5vh + 55vh + 2rem) */}
        <div className="c-1 absolute z-30 w-[26vw]" style={{ left: "6vw", top: "calc(60vh + 2rem)" }}>
            <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[0].id}</span>
            <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[0].nameHTML}</h3>
            <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
            <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[0].tagline}</p>
        </div>

        {/* COLUMN 2 (Enters from TOP, staggered down visually) */}
        <div className="col-2 absolute z-30 w-[26vw] flex flex-col justify-start" style={{ left: "37vw", top: "12vh" }}>
            <div className="c-2">
                <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[1].id}</span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[1].nameHTML}</h3>
                <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[1].tagline}</p>
            </div>
            <div className="h-8" />
            <div className="i-2 w-full h-[55vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 relative">
                <img src={REASONS[1].img} className="w-full h-full object-cover" alt="Proactive Care" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
        </div>

        {/* COLUMN 3 (Enters from BOTTOM, aligned with Col 1) */}
        <div className="col-3 absolute z-30 w-[26vw] flex flex-col justify-start" style={{ left: "68vw", top: "5vh" }}>
            <div className="i-3 w-full h-[55vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 relative">
                <img src={REASONS[2].img} className="w-full h-full object-cover" alt="Expertise" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="h-8" />
            <div className="c-3">
                <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[2].id}</span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[2].nameHTML}</h3>
                <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[2].tagline}</p>
            </div>
        </div>

        {/* ==================== SET 2 ==================== */}

        {/* COLUMN 4 (Enters from TOP, replaces Col 1) */}
        <div className="col-4 absolute z-30 w-[26vw] flex flex-col justify-start" style={{ left: "6vw", top: "5vh" }}>
            <div className="i-4 w-full h-[55vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 relative">
                <img src={REASONS[3].img} className="w-full h-full object-cover" alt="Transparency" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="h-8" />
            <div className="c-4">
                <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[3].id}</span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[3].nameHTML}</h3>
                <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[3].tagline}</p>
            </div>
        </div>

        {/* COLUMN 5 (Enters from BOTTOM, replaces Col 2, staggered down) */}
        <div className="col-5 absolute z-30 w-[26vw] flex flex-col justify-start" style={{ left: "37vw", top: "12vh" }}>
            <div className="c-5">
                <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[4].id}</span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[4].nameHTML}</h3>
                <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[4].tagline}</p>
            </div>
            <div className="h-8" />
            <div className="i-5 w-full h-[55vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 relative">
                <img src={REASONS[4].img} className="w-full h-full object-cover" alt="Responsiveness" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
        </div>

        {/* COLUMN 6 (Enters from TOP, replaces Col 3) */}
        <div className="col-6 absolute z-30 w-[26vw] flex flex-col justify-start" style={{ left: "68vw", top: "5vh" }}>
            <div className="i-6 w-full h-[55vh] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 relative">
                <img src={REASONS[5].img} className="w-full h-full object-cover" alt="Partnership" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="h-8" />
            <div className="c-6">
                <span className="text-brand-yellow font-mono text-xl xl:text-2xl tracking-widest block mb-2">{REASONS[5].id}</span>
                <h3 className="text-3xl xl:text-4xl font-bold text-white mb-4 tracking-tight leading-[1.1]">{REASONS[5].nameHTML}</h3>
                <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                <p className="text-lg xl:text-xl text-brand-light-gray font-light uppercase tracking-tight leading-snug">{REASONS[5].tagline}</p>
            </div>
        </div>

      </div>

      {/* ==========================================
          MOBILE EXPERIENCE
          ========================================== */}
      <div className="lg:hidden w-full bg-[#030303] text-white overflow-hidden pb-24">
        
        <div className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 mb-16 overflow-hidden">
           <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2500&auto=format&fit=crop" className="w-full h-full object-cover" alt="Intro" />
              <div className="absolute inset-0 bg-black/70" />
           </div>
           <div className="relative z-10 mobile-why-fade pt-24">
              <span className="text-brand-yellow text-xs tracking-[0.3em] font-semibold uppercase block mb-6">Why Safe Hands</span>
              <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] mb-6">
                MORE THAN<br/>
                <span className="text-brand-yellow">MAINTENANCE.</span>
              </h2>
              <p className="text-lg text-white font-medium uppercase tracking-tight mb-4">It deserves responsibility.</p>
           </div>
        </div>

        <div className="flex flex-col gap-24 px-6">
           {REASONS.map((reason, i) => {
             return (
               <div key={reason.id} className="mobile-why-fade flex flex-col">
                  <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
                     <img src={reason.img} className="w-full h-full object-cover" alt="Detail" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                  <div className="h-8" />
                  <div>
                     <span className="text-brand-yellow text-xl font-mono tracking-widest block mb-2">{reason.id}</span>
                     <h3 className="text-3xl font-bold mb-4 tracking-tight">{reason.nameHTML}</h3>
                     <div className="w-12 h-[2px] bg-brand-yellow mb-4" />
                     <p className="text-lg text-brand-light-gray font-light uppercase tracking-tight">{reason.tagline}</p>
                  </div>
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default WhySafeHandsSection;
