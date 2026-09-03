import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: "01", name: "PROPERTY MANAGEMENT", desc: "Comprehensive management covering tenant relations, maintenance, and asset optimization.", visual: "pm" },
  { id: "02", name: "ELECTRICAL SOLUTIONS", desc: "Fault detection, complete wiring, switchboard upgrades, and preventive maintenance.", visual: "electrical" },
  { id: "03", name: "PLUMBING & SANITARY", desc: "Advanced leak detection, pipe network installation, and sanitation engineering.", visual: "plumbing" },
  { id: "04", name: "ARCHITECTURAL PLANNING", desc: "Stilt plans, 3D modeling, technical layouts, and municipal approval drawings.", visual: "planning" },
  { id: "05", name: "PROPERTY DEVELOPMENT", desc: "Full-scale construction and site development from foundational work to handover.", visual: "development" }
];

const ServiceChapters = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".service-chapter");
      items.forEach((item, i) => {
        // Reverse direction for even indices (1, 3, etc.)
        const isReversed = i % 2 !== 0;

        gsap.from(item.querySelector(".service-content"), {
          x: isReversed ? 100 : -100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          }
        });
        
        gsap.fromTo(item.querySelector(".service-visual"), 
          { scale: 0.8, opacity: 0 },
          { 
            scale: 1, opacity: 1, duration: 1.5, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-brand-white text-brand-dark-900 pb-32">
      {SERVICES.map((service, i) => {
        const isReversed = i % 2 !== 0;
        
        return (
          <section key={service.id} className={`service-chapter w-full min-h-screen flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center border-t border-brand-dark-900/10 relative`}>
            
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen p-6 md:p-24 flex flex-col justify-center service-content z-10 bg-brand-white">
              <span className="text-brand-yellow font-bold text-xl tracking-widest mb-4">{service.id}</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                {service.name}
              </h2>
              <p className="text-brand-dark-900/70 text-lg md:text-2xl leading-relaxed mb-12 max-w-lg">
                {service.desc}
              </p>
              <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-brand-yellow transition-colors group w-max">
                Request Service
                <div className="w-10 h-10 rounded-full border border-brand-dark-900/20 flex items-center justify-center group-hover:border-brand-yellow transition-colors">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            <div className={`w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden service-visual bg-brand-dark-900 flex items-center justify-center ${isReversed ? 'border-r' : 'border-l'} border-white/5`}>
              {/* Visual Abstraction for each service */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F8BD16 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              {service.visual === 'pm' && <div className="w-64 h-64 border border-brand-yellow/50 rounded-full flex items-center justify-center"><div className="w-32 h-32 border border-brand-yellow rotate-45" /></div>}
              {service.visual === 'electrical' && <div className="flex gap-4"><div className="w-2 h-32 bg-brand-yellow" /><div className="w-2 h-64 bg-brand-white/20" /><div className="w-2 h-48 bg-brand-yellow" /></div>}
              {service.visual === 'plumbing' && <div className="w-48 h-48 border-b-8 border-r-8 border-brand-yellow rounded-br-3xl" />}
              {service.visual === 'planning' && <div className="w-64 h-64 border border-white/20 grid grid-cols-2 grid-rows-2"><div className="border-r border-b border-white/20 bg-brand-yellow/20" /><div className="border-b border-white/20" /><div className="border-r border-white/20" /><div className="bg-brand-yellow" /></div>}
              {service.visual === 'development' && <div className="w-64 h-64 border-4 border-brand-yellow relative"><div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10" /><div className="absolute top-0 right-0 w-16 h-16 bg-brand-yellow" /></div>}
            </div>

          </section>
        );
      })}
    </div>
  );
};

export default ServiceChapters;
