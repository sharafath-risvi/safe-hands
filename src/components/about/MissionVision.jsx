import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionVision = () => {
  const containerRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Initial States for asymmetric reveal
      gsap.set(".mv-line-h", { scaleX: 0, transformOrigin: "left" });
      gsap.set(".mv-line-v", { scaleY: 0, transformOrigin: "top" });
      gsap.set(".mv-mission-block", { y: 100, opacity: 0 });
      gsap.set(".mv-vision-block", { y: 150, opacity: 0 });

      // Phase 1: Lines and Mission Entrance
      tl.to(".mv-line-h", { scaleX: 1, duration: 1, ease: "power2.out" }, 0)
        .to(".mv-line-v", { scaleY: 1, duration: 1, ease: "power2.out" }, 0)
        .to(".mv-mission-block", { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2);

      // Phase 2: Vision scrolls up while Mission stays
      tl.to(".mv-vision-block", { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, 1);

      // Phase 3: Hold
      tl.to({}, { duration: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white flex overflow-hidden">
      
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row pt-16 lg:pt-0">
         
         {/* LEFT: MISSION (60%) */}
         <div className="w-full lg:w-[60%] h-full flex flex-col justify-center relative pr-0 lg:pr-24">
            
            <div className="mv-mission-block">
               <span className="text-black/30 text-sm font-mono tracking-[0.4em] uppercase mb-8 flex items-center font-bold">
                  OUR MISSION
               </span>
               <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-[1.0] tracking-tighter">
                  TO <span className="text-brand-yellow italic pr-2">ELEVATE</span><br/>
                  THE STANDARD<br/>
                  OF PROPERTY<br/>
                  <span className="text-brand-yellow">CARE.</span>
               </h2>
               <div className="mt-6 lg:mt-12 max-w-md">
                  <p className="text-lg text-gray-500 font-light leading-relaxed">
                     Redefining how premium assets are managed, maintained, and grown through uncompromising dedication and absolute transparency.
                  </p>
               </div>
            </div>
         </div>

         {/* RIGHT: VISION (40%) */}
         <div className="w-full lg:w-[40%] h-full flex flex-col justify-start lg:justify-center relative pb-6 lg:pb-0">
            <div className="mv-line-v absolute top-1/4 left-0 w-[1px] h-64 bg-gray-200 hidden lg:block" />
            
            <div className="mv-vision-block lg:pl-16 mt-14 lg:mt-64 relative z-20">
               <span className="text-black/30 text-sm font-mono tracking-[0.4em] uppercase mb-6 flex items-center font-bold">
                  OUR VISION
               </span>
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-[1.1] tracking-tight mb-8">
                  WHERE EVERY PROPERTY FEELS LIKE IT IS IN <span className="text-brand-yellow border-b-4 border-brand-yellow pb-2">SAFE HANDS.</span>
               </h2>
               <p className="text-base text-gray-500 font-light leading-relaxed">
                  To be the unequivocal benchmark in property stewardship. A name synonymous with trust, precision, and longevity in the real estate sector.
               </p>
            </div>
         </div>

      </div>

    </section>
  );
};

export default MissionVision;
