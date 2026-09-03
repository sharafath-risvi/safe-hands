import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", // Start animation when section is in the middle of screen
          end: "bottom top",
          toggleActions: "play none none reverse"
        }
      });

      // Initial States
      gsap.set(imageRef.current, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.05 });
      gsap.set(".fs-left-content", { opacity: 0, x: -30 });
      gsap.set(".fs-right-content", { opacity: 0, x: 30 });

      // PHASE 1: Image rises from bottom cinematically
      tl.to(imageRef.current, { 
         clipPath: "inset(0% 0% 0% 0%)",
         scale: 1,
         duration: 1.5, 
         ease: "power3.inOut" 
      })
      
      // PHASE 2: Left & Right Content Reveal
      .to(".fs-left-content", { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.5")
      .to(".fs-right-content", { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.8");

      // Subtle parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden py-24 flex items-center">
      
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Heading (20%) */}
        <div className="fs-left-content w-full lg:w-[20%] flex flex-col justify-center order-2 lg:order-1">
           <span className="text-brand-yellow text-xs font-mono tracking-[0.3em] uppercase mb-6 block">
              OUR FOUNDER
           </span>
           <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold uppercase leading-[1.05] tracking-tight">
              THE PERSON<br/>
              BEHIND THE<br/>
              <span className="text-brand-yellow">VISION.</span>
           </h2>
        </div>

        {/* Center: Large Portrait (50%) */}
        <div className="w-full lg:w-[50%] h-[60vh] lg:h-[85vh] relative z-10 order-1 lg:order-2 flex justify-center px-4 lg:px-8">
           <div 
             ref={imageRef} 
             className="w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0a0a0a] relative"
           >
              <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2500&auto=format&fit=crop" 
                 className="w-full h-full object-cover object-top opacity-90" 
                 alt="Founder Portrait"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
           </div>
        </div>

        {/* Right Side: Content (30%) */}
        <div className="fs-right-content w-full lg:w-[30%] flex flex-col justify-center order-3 text-left pl-0 lg:pl-12">
           <h3 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-2">
              JOHN DOE
           </h3>
           <span className="text-brand-yellow text-sm lg:text-base font-mono tracking-[0.2em] uppercase mb-10 block">
              CEO & Visionary
           </span>
           
           <h4 className="text-2xl lg:text-3xl font-bold leading-snug mb-6 text-white/90 max-w-lg">
              "Our foundation isn't concrete. It's the trust our clients place in us."
           </h4>
           <p className="text-lg lg:text-xl text-brand-light-gray font-light leading-relaxed max-w-lg">
              With over 15 years in premium property management, John established Safe Hands to redefine the standard of care. Believing that every property requires architectural understanding and dedicated stewardship.
           </p>
        </div>

      </div>

    </section>
  );
};

export default FounderSection;
