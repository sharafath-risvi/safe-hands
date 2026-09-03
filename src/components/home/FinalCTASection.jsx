import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTASection = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 1
        }
      });

      // Subtle parallax/zoom on the background image
      tl.fromTo(".cta-bg", { scale: 1.1, yPercent: -5 }, { scale: 1, yPercent: 0, ease: "none" });

      // Cinematic entry of text elements
      gsap.from(".cta-anim", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%"
        }
      });

      // Draw the editorial lines
      gsap.fromTo(".cta-line", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 2, ease: "power3.inOut", scrollTrigger: { trigger: containerRef.current, start: "top 40%" } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden z-20">
      
      {/* BACKGROUND SCENE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop" 
           alt="Premium Office Space" 
           className="cta-bg w-full h-[110%] object-cover origin-center opacity-40 blur-[2px]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
         <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ASYMMETRICAL CONTENT GRID */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col h-full justify-center">
         
         {/* Top Meta */}
         <div className="cta-anim hidden md:flex justify-end w-full mb-12 md:mb-24">
            <span className="text-brand-yellow text-xs tracking-[0.4em] font-mono uppercase">
               READY WHEN YOU ARE.
            </span>
         </div>

         {/* Main Statement */}
         <div className="cta-anim w-full lg:w-[70%]">
            <h2 className="text-6xl md:text-[80px] lg:text-[100px] font-bold text-white leading-[1.05] tracking-tight">
               LET'S TAKE<br/>
               CARE OF<br/>
               <span className="text-brand-yellow">WHAT MATTERS.</span>
            </h2>
         </div>

         {/* Divider & Action Area */}
         <div className="mt-16 md:mt-24 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
            
            {/* Left: Editorial Line */}
            <div className="w-full md:w-[60%] flex items-center">
               <div className="cta-line w-full h-[1px] bg-white/20 origin-left" />
            </div>

            {/* Right: The Button */}
            <div className="cta-anim w-full md:w-[40%] flex justify-end">
               <Link to="/contact" className="group relative flex flex-row items-center justify-end gap-3 sm:gap-4 outline-none flex-nowrap w-full">
                  <span className="whitespace-nowrap text-sm sm:text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-white group-hover:text-brand-yellow transition-colors duration-500">
                     START A CONVERSATION
                  </span>
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all duration-500 overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center transform group-hover:translate-x-full transition-transform duration-500">
                         <ArrowRight size={20} />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                         <ArrowRight size={20} />
                      </div>
                  </div>
               </Link>
            </div>
         </div>
      </div>

      {/* FINAL BRAND CLOSURE */}
      <div className="absolute bottom-12 w-full text-center z-10 px-6">
         <p className="cta-anim text-[10px] md:text-xs text-brand-light-gray/40 font-mono tracking-[0.3em] uppercase flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <span className="text-white/60 font-semibold tracking-[0.5em]">SAFE HANDS</span>
            <span className="hidden md:inline">|</span>
            <span>PROPERTY CARE • FACILITY MANAGEMENT • TECHNICAL SUPPORT</span>
         </p>
      </div>

    </section>
  );
};

export default FinalCTASection;
