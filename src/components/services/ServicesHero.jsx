import { useEffect, useRef } from "react";
import gsap from "gsap";

const ServicesHero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });
      gsap.from(".services-desc", {
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="w-full min-h-[80vh] bg-brand-dark-900 flex flex-col justify-center px-6 md:px-12 relative overflow-hidden -mt-[88px] lg:-mt-[104px] pt-[88px] lg:pt-[104px]">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at right, #F8BD16 0%, transparent 60%)' }} />
      <div className="absolute top-0 right-0 w-[50vw] h-full overflow-hidden mix-blend-overlay pointer-events-none">
        <div className="w-full h-full border border-white/5 bg-brand-dark-800 rounded-l-full translate-x-1/2 scale-150" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <h1 className="services-title text-fluid-h1 font-bold tracking-tighter leading-[0.9] text-brand-white mb-6">
          HOW WE <span className="text-brand-yellow">HELP.</span>
        </h1>
        <p className="services-desc text-brand-gray text-xl md:text-2xl font-light max-w-2xl">
          From precise architectural planning to uncompromising property maintenance. We deliver excellence at every stage of the property lifecycle.
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
