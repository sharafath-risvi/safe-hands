import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial states
      gsap.set(".ah-image-wrapper", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".ah-image", { scale: 1.2 });
      gsap.set(".ah-title span", { y: "120%", rotateZ: 3 });
      gsap.set(".ah-fade", { opacity: 0, y: 30 });
      gsap.set(".ah-line", { scaleX: 0 });

      // Animations
      tl.to(".ah-image-wrapper", { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power4.inOut" })
        .to(".ah-image", { scale: 1, duration: 1.8, ease: "power4.inOut" }, "<")
        .to(".ah-title span", { y: "0%", rotateZ: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=1.0")
        .to(".ah-line", { scaleX: 1, duration: 1.2, ease: "power3.inOut" }, "-=0.8")
        .to(".ah-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, "-=0.8");

      // Parallax
      gsap.to(".ah-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.to(".ah-title-group", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen lg:h-screen bg-[#050505] overflow-hidden flex items-center pt-24 lg:pt-0">
      
      {/* Background Depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full h-full max-w-[1600px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
         
         {/* Left Side: Typography */}
         <div className="w-full lg:w-[55%] flex flex-col justify-center pt-12 lg:pt-0 ah-title-group relative z-20">
            <div className="mb-6 ah-fade">
               <span className="text-brand-yellow text-xs font-mono tracking-[0.4em] uppercase font-bold">
                 Safe Hands
               </span>
            </div>

            <h1 className="text-[80px] sm:text-[120px] lg:text-[150px] xl:text-[180px] font-bold text-white leading-[0.85] tracking-tighter mb-8 uppercase">
               <div className="overflow-hidden ah-title"><span className="inline-block origin-bottom-left">ABOUT</span></div>
               <div className="overflow-hidden ah-title"><span className="inline-block text-white/20 italic">US.</span></div>
            </h1>

            <div className="ah-line w-24 h-[2px] bg-brand-yellow mb-8 origin-left" />

            <div className="max-w-md ah-fade">
               <p className="text-xl sm:text-2xl font-light text-white/70 leading-relaxed">
                 Uncompromising standards. Premium property management born from an architectural understanding.
               </p>
            </div>
         </div>

         {/* Right Side: Asymmetric Image */}
         <div className="w-full lg:w-[40%] h-[50vh] lg:h-[75vh] relative mt-16 lg:mt-0 right-0 lg:-translate-y-8">
            <div className="ah-image-wrapper absolute inset-0 overflow-hidden z-10 border border-white/5 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" 
                 alt="Premium Architecture" 
                 className="ah-image w-full h-[120%] object-cover object-center grayscale contrast-125"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Layered Depth Decor */}
            <div className="absolute top-1/4 -left-6 w-[1px] h-24 bg-brand-yellow ah-fade z-20" />
            <div className="absolute bottom-8 -left-12 ah-fade z-20 hidden lg:block">
               <p className="text-[10px] text-white/40 font-mono tracking-[0.2em] uppercase rotate-[-90deg] origin-bottom-left">
                  Est. 2024
               </p>
            </div>
         </div>
         
      </div>

    </section>
  );
};

export default AboutHero;
