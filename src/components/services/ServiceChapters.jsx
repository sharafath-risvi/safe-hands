import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: "01", name: "PROPERTY MANAGEMENT", desc: "Comprehensive management covering tenant relations, maintenance, and asset optimization.", img: "/images/services/pm.jpg", isStock: false },
  { id: "02", name: "ELECTRICAL SOLUTIONS", desc: "Fault detection, complete wiring, switchboard upgrades, and preventive maintenance.", img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2500&auto=format&fit=crop", isStock: true },
  { id: "03", name: "PLUMBING & SANITARY", desc: "Advanced leak detection, pipe network installation, and sanitation engineering.", img: "/images/services/plumbing.jpg", isStock: false },
  { id: "04", name: "ARCHITECTURAL PLANNING", desc: "Stilt plans, 3D modeling, technical layouts, and municipal approval drawings.", img: "/images/services/planning.jpg", isStock: false },
  { id: "05", name: "PROPERTY DEVELOPMENT", desc: "Full-scale construction and site development from foundational work to handover.", img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2500&auto=format&fit=crop", isStock: true }
];

const ServiceChapters = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  
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
              <button onClick={() => navigate('/contact#contact-form')} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-brand-yellow transition-colors group w-max">
                Request Service
                <div className="w-10 h-10 rounded-full border border-brand-dark-900/20 flex items-center justify-center group-hover:border-brand-yellow transition-colors">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            <div className={`w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden service-visual bg-brand-dark-900 group ${isReversed ? 'border-r' : 'border-l'} border-white/5`}>
              {/* Premium Image Illustration */}
              <img 
                src={service.img} 
                alt={service.name}
                className={`w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-out ${service.isStock ? 'grayscale brightness-75 contrast-125' : 'brightness-90 contrast-110'}`}
              />
              
              {/* Cinematic Overlays */}
              <div className="absolute inset-0 bg-brand-dark-900 mix-blend-multiply opacity-30 pointer-events-none" />
              {service.isStock && <div className="absolute inset-0 bg-brand-yellow mix-blend-multiply opacity-20 pointer-events-none" />}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-900 via-transparent to-brand-dark-900/50 pointer-events-none" />
              
              {/* Subtle Architectural Grid/Dots Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F8BD16 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              {/* Framing HUD Elements */}
              <div className="absolute top-8 left-8 w-16 h-[1px] bg-brand-yellow/50 pointer-events-none" />
              <div className="absolute top-8 left-8 w-[1px] h-16 bg-brand-yellow/50 pointer-events-none" />
              <div className="absolute bottom-8 right-8 w-16 h-[1px] bg-brand-yellow/50 pointer-events-none" />
              <div className="absolute bottom-8 right-8 w-[1px] h-16 bg-brand-yellow/50 pointer-events-none" />
            </div>

          </section>
        );
      })}
    </div>
  );
};

export default ServiceChapters;
