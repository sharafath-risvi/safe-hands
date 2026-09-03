import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurStorySection = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const mobileTrackRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP: 200vw Horizontal Cinematic Storytelling
      mm.add("(min-width: 1024px)", () => {
        
        // --- ENTRY ANIMATION (Triggered on enter, independent of pin) ---
        gsap.set(".story-left-panel", { yPercent: 100 });
        gsap.set(".story-content-item", { opacity: 0, y: 30 });
        gsap.set(".grid-img", { scale: 0.95, opacity: 0, filter: "blur(10px)" });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%", // Triggers when section is comfortably in view
          onEnter: () => {
            const entryTl = gsap.timeline();
            
            entryTl.to(".story-left-panel", { 
              yPercent: 0, 
              duration: 1.6, 
              ease: "power3.inOut" 
            })
            .to(".story-content-item", { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              duration: 1.2, 
              ease: "power3.out" 
            }, "-=0.6")
            .to(".grid-img", { 
              scale: 1, 
              opacity: 1, 
              filter: "blur(0px)",
              stagger: 0.15, 
              duration: 1.5, 
              ease: "power2.out" 
            }, "-=1.4");
          },
          once: true
        });

        // --- PINNED HORIZONTAL SCRUB ---
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=1600", // Reduced from 2500 for shorter scroll requirement
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Brief transition/breathing moment before horizontal scroll activates
        scrubTl.to({}, { duration: 0.5 });
        scrubTl.addLabel("horizontal");

        // Move the entire 200vw track left by 100vw
        scrubTl.to(trackRef.current, { 
          x: "-100vw", 
          ease: "none" 
        }, "horizontal");

        // Add subtle parallax to the image grid during horizontal travel
        scrubTl.to(".story-grid", { 
          x: "-15vw", 
          ease: "none" 
        }, "horizontal");

        // Scene 2 image subtle zoom while coming into view
        scrubTl.fromTo(".scene-2-img", 
          { scale: 1.15, transformOrigin: "right center" },
          { scale: 1, ease: "none" },
          "horizontal"
        );
        
        // Scene 2 text reveal parallax
        scrubTl.fromTo(".scene-2-content",
          { x: "15vw" },
          { x: "0vw", ease: "none" },
          "horizontal"
        );

      });

      // MOBILE: Horizontal Cinematic Storytelling
      mm.add("(max-width: 1023px)", () => {
         gsap.set(".mobile-story-left", { opacity: 0, y: 30 });
         
         ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 75%",
            onEnter: () => {
               gsap.to(".mobile-story-left", { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
            },
            once: true
         });

         const mobileScrubTl = gsap.timeline({
            scrollTrigger: {
               trigger: containerRef.current,
               start: "top top",
               end: "+=1600", // Reduced from 2500
               pin: true,
               scrub: 1,
               anticipatePin: 1
            }
         });

         mobileScrubTl.to({}, { duration: 0.3 });
         
         mobileScrubTl.to(mobileTrackRef.current, {
            x: "-200vw",
            ease: "none"
         });
         
         mobileScrubTl.to({}, { duration: 0.3 });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-black z-10 h-screen">
      
      {/* =========================================
          DESKTOP HORIZONTAL TRACK
          ========================================= */}
      <div 
        ref={trackRef} 
        className="hidden lg:flex w-[200vw] h-screen relative will-change-transform"
      >
        
        {/* -----------------------------------------
            SCENE 1 (100vw) - 60/40 Split
            ----------------------------------------- */}
        <div className="w-[100vw] h-full flex shrink-0">
            
            {/* Left White Panel (60%) */}
            <div className="story-left-panel w-[60%] h-full bg-white flex flex-col justify-center pl-[8vw] pr-[6vw] relative z-20 shadow-2xl">
                <div className="max-w-[700px]">
                    <span className="story-content-item inline-block text-black text-xs tracking-[0.4em] font-semibold uppercase mb-8">
                      Our Story
                    </span>

                    <h2 className="story-content-item text-[50px] xl:text-[72px] font-bold leading-[1.05] tracking-tighter mb-8 text-black">
                      WE TAKE CARE<br/>
                      OF <span className="text-brand-yellow">WHAT MATTERS.</span>
                    </h2>

                    <p className="story-content-item text-xl xl:text-2xl font-bold text-black tracking-tight leading-snug mb-8 uppercase">
                      Property is more than a place.
                    </p>

                    <p className="story-content-item text-gray-600 text-lg xl:text-xl font-light leading-relaxed mb-16 max-w-[500px]">
                      It is something people trust us to protect, maintain and move forward. When you hand over the keys, you are handing over responsibility, and we treat that trust as our absolute highest priority.
                    </p>

                    <div className="story-content-item flex items-center gap-4 cursor-pointer group">
                       <span className="text-sm font-bold tracking-widest uppercase text-black">Explore Our Story</span>
                       <div className="w-12 h-[2px] bg-brand-yellow group-hover:w-24 transition-all duration-500" />
                    </div>
                </div>
            </div>

            {/* Right Black Panel (40%) - Image Grid */}
            <div className="w-[40%] h-full bg-black relative flex items-center justify-center py-[10vh] px-[4vw] z-10">
                <div className="story-grid w-full h-full relative">
                    
                    {/* Tall left image */}
                    <div className="grid-img absolute top-[2%] left-[0%] w-[55%] h-[65%] border-[3px] border-black overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-90" alt="Architecture" />
                    </div>
                    
                    {/* Wide top right image */}
                    <div className="grid-img absolute top-[5%] right-[-5%] w-[55%] h-[40%] border-[3px] border-black overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Interior" />
                    </div>
                    
                    {/* Square bottom right image */}
                    <div className="grid-img absolute bottom-[10%] right-[0%] w-[50%] h-[45%] border-[3px] border-black overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-70" alt="Property" />
                    </div>
                    
                    {/* Floating overlap image (Hero of the grid) */}
                    <div className="grid-img absolute top-[35%] left-[15%] w-[65%] h-[50%] z-20 border-[6px] border-black overflow-hidden shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Safe Hands Team" />
                    </div>


                </div>
            </div>

        </div>

        {/* -----------------------------------------
            SCENE 2 (100vw) - Approach Reveal
            ----------------------------------------- */}
        <div className="w-[100vw] h-full bg-black relative shrink-0 flex items-center overflow-hidden">
            
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop" 
                 className="scene-2-img w-full h-full object-cover opacity-60" 
                 alt="Our Approach" 
               />
               {/* Vignette / Dark gradient to ensure text readability */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
            
            <div className="scene-2-content relative z-10 pl-[12vw] max-w-[80vw]">
               <span className="text-brand-yellow tracking-[0.4em] font-semibold uppercase mb-6 block text-sm">
                  Our Approach
               </span>
               <h2 className="text-6xl xl:text-[90px] font-bold text-white leading-[1.05] tracking-tighter mb-8">
                 PROPERTY CARE,<br/><span className="text-brand-yellow">WITH PURPOSE.</span>
               </h2>
               <p className="text-xl xl:text-2xl text-white/80 font-light max-w-2xl leading-relaxed mb-12">
                 Every structure has a lifecycle. We ensure it's a long, prosperous, and impeccably maintained one, executed with absolute precision.
               </p>
               
               <div className="flex items-center gap-4 cursor-pointer group">
                  <span className="text-sm font-bold tracking-widest uppercase text-white">View Our Methodology</span>
                  <div className="w-12 h-[2px] bg-brand-yellow group-hover:w-24 transition-all duration-500" />
               </div>
            </div>

        </div>

      </div>

      {/* =========================================
          MOBILE HORIZONTAL EXPERIENCE
          ========================================= */}
      <div 
        ref={mobileTrackRef}
        className="lg:hidden flex w-[300vw] h-screen relative will-change-transform bg-black"
      >
         
         {/* Panel 1: White Content Area (100vw) */}
         <div className="w-[100vw] h-full bg-white flex flex-col justify-center px-6 relative z-20 shrink-0 mobile-story-left shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
            <span className="inline-block text-black text-xs tracking-[0.4em] font-semibold uppercase mb-6">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-8 text-black">
              WE TAKE CARE<br/>
              OF <span className="text-brand-yellow">WHAT MATTERS.</span>
            </h2>
            <p className="text-lg font-bold text-black tracking-tight leading-snug mb-6 uppercase">
              Property is more than a place.
            </p>
            <p className="text-gray-600 text-base font-light leading-relaxed mb-10 max-w-[500px]">
              It is something people trust us to protect, maintain and move forward. When you hand over the keys, you are handing over responsibility.
            </p>
         </div>

         {/* Panel 2: Black Grid Area (100vw) */}
         <div className="w-[100vw] h-full bg-black flex items-center justify-center px-6 shrink-0 relative z-10 shadow-[20px_0_40px_rgba(0,0,0,0.5)]">
            <div className="w-full relative h-[450px]">
               <div className="absolute top-[0%] left-[0%] w-[60%] h-[60%] border-[2px] border-black overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Architecture" />
               </div>
               <div className="absolute bottom-[0%] right-[0%] w-[55%] h-[55%] border-[2px] border-black overflow-hidden z-10 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1577493340887-b7bfff550145?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Safe Hands Team" />
               </div>
               <div className="absolute top-[15%] right-[5%] w-[35%] h-[35%] border-[2px] border-black overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Interior" />
               </div>
            </div>
         </div>

         {/* Panel 3: Scene 2 Area (100vw) */}
         <div className="w-[100vw] h-full bg-black flex flex-col justify-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-50" 
                 alt="Our Approach" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>
            
            <div className="relative z-10 px-6">
               <span className="text-brand-yellow tracking-[0.4em] font-semibold uppercase mb-4 block text-xs">
                  Our Approach
               </span>
               <h2 className="text-4xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                 PROPERTY CARE,<br/><span className="text-brand-yellow">WITH PURPOSE.</span>
               </h2>
               <p className="text-lg text-white/80 font-light leading-relaxed mb-8 max-w-sm">
                 Every structure has a lifecycle. We ensure it's a long, prosperous, and impeccably maintained one.
               </p>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-bold tracking-widest uppercase text-white">Methodology</span>
                  <div className="w-12 h-[2px] bg-brand-yellow" />
               </div>
            </div>
         </div>

      </div>

    </section>
  );
};

export default OurStorySection;
