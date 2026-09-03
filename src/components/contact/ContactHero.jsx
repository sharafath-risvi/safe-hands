import { useEffect, useRef } from "react";
import gsap from "gsap";

const ContactHero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline();

      // Ensure initial states
      gsap.set(".ch-bg", { scale: 1.1, opacity: 0 });
      gsap.set(".ch-mask-text", { y: "100%" });
      gsap.set(".ch-fade", { opacity: 0, y: 20 });

      // The reveal
      tl.to(".ch-bg", { 
         opacity: 1, 
         scale: 1, 
         duration: 2, 
         ease: "power3.out" 
      })
      .to(".ch-fade-label", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1")
      .to(".ch-mask-text", { 
         y: "0%", 
         duration: 1.2, 
         stagger: 0.15, 
         ease: "power4.out" 
      }, "-=0.8")
      .to(".ch-fade-desc", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.6");

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[70vh] bg-[#050505] flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden -mt-[88px] lg:-mt-[104px] pt-[88px] lg:pt-[104px]">
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop" 
           alt="Safe Hands Architecture" 
           className="ch-bg w-full h-full object-cover object-bottom"
         />
         <div className="absolute inset-0 bg-black/50" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
         
         <div className="ch-fade-label ch-fade mb-6">
            <span className="text-brand-yellow text-xs lg:text-sm font-mono tracking-[0.3em] uppercase font-bold">
               GET IN TOUCH
            </span>
         </div>

         <div className="mb-8">
            <div className="overflow-hidden pb-4">
               <h1 className="ch-mask-text text-6xl sm:text-7xl lg:text-[110px] font-bold text-white leading-[1.05] tracking-tight">
                  LET'S <span className="text-brand-yellow">TALK.</span>
               </h1>
            </div>
         </div>

         <div className="ch-fade-desc ch-fade max-w-md">
            <p className="text-lg lg:text-xl text-white/80 font-light leading-relaxed">
               Have a property that deserves better care? Let's start the conversation.
            </p>
         </div>

      </div>

    </section>
  );
};

export default ContactHero;
