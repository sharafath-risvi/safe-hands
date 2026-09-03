import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactIntroQuote = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.fromTo(".ciq-fade", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-24 flex justify-center items-center px-6 border-b border-white/5">
      <div className="ciq-fade text-center max-w-3xl flex flex-col items-center">
        <div className="w-12 h-[1px] bg-brand-yellow mb-8" />
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light italic text-white/90 leading-relaxed tracking-wide">
          "Every well-managed property<br className="hidden sm:block" /> starts with a conversation."
        </h3>
        <div className="w-12 h-[1px] bg-brand-yellow mt-8" />
      </div>
    </section>
  );
};

export default ContactIntroQuote;
