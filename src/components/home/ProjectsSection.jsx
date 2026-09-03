import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    name: "The Lumina",
    location: "Luxury residential development",
    desc: "A beacon of modern residential living designed with precision, featuring panoramic views and zero-carbon infrastructure.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "02",
    name: "Apex Towers",
    location: "Commercial development",
    desc: "Premium commercial spaces built for global businesses, integrating smart technology and extensive green terraces.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "03",
    name: "Zenith Hub",
    location: "Mixed-use district",
    desc: "An integrated urban development seamlessly blending high-end retail, office spaces, and boutique residences.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "04",
    name: "Eco Park",
    location: "Sustainable community",
    desc: "Our award-winning zero-carbon residential community, setting a new benchmark for sustainable luxury.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
  }
];

const ProjectsSection = () => {
  const masterContainerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        
        // ==========================================
        // INITIAL STATES
        // ==========================================
        
        // Intro Entry States
        gsap.set(".intro-content", { opacity: 0, y: 30 });
        gsap.set(".intro-right", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".intro-img", { scale: 1.1 });

        // Hide all right-side project content EXCEPT the first one (index 0)
        gsap.set(".slide-right-wrap:not(.slide-right-0)", { opacity: 0 });
        gsap.set(".slide-small-img:not(.slide-small-img-0)", { opacity: 0, y: 50, scale: 0.95 });
        gsap.set(".slide-txt-content:not(.slide-txt-content-0)", { opacity: 0, y: 50 });

        // ==========================================
        // INDEPENDENT TRIGGER: INTRO REVEAL
        // ==========================================
        ScrollTrigger.create({
          trigger: masterContainerRef.current,
          start: "top 75%",
          onEnter: () => {
             gsap.to(".intro-content", { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" });
             gsap.to(".intro-right", { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power3.inOut" }, "-=0.8");
             gsap.to(".intro-img", { scale: 1, duration: 2, ease: "power2.out" }, "-=1.5");
          },
          once: true
        });

        // ==========================================
        // THE MASTER STORYTELLING TIMELINE
        // ==========================================
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: masterContainerRef.current,
            start: "top top",
            end: `+=${1000 + (PROJECTS.length * 1000)}`, 
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // --- PHASE 1: THE INTRO BRIDGE ---
        
        // Small breathing delay before transition starts
        tl.to({}, { duration: 0.5 });

        tl.to(".intro-left", { opacity: 0, x: -50, duration: 1 }, 0.5)
          .to(".intro-right", { left: "0%", width: "60%", duration: 1.5, ease: "power2.inOut" }, 0.5)
          .to(".intro-layer", { backgroundColor: "rgba(248, 248, 248, 0)", duration: 1 }, 1.0)
          .to(".intro-right", { opacity: 0, duration: 0.5 }, 2.0)
          .set(".intro-layer", { pointerEvents: "none" }, 2.0);

        // Read time buffer for Project 01 before transitions begin
        tl.to({}, { duration: 0.5 }); 

        // --- PHASE 2: PINNED CINEMATIC SLIDESHOW ---
        
        let currentTime = 3.0; // shifted by 0.5s 

        for (let i = 0; i < PROJECTS.length - 1; i++) {
           
           // 1. Wipe out current LARGE image (and its embedded text) upwards
           tl.to(`.slide-img-${i}`, { 
              clipPath: "inset(0% 0% 100% 0%)", 
              yPercent: -10, 
              ease: "power2.inOut", 
              duration: 1.5 
           }, currentTime);
           
           // 2. Fade & slide out current SMALL image
           tl.to(`.slide-small-img-${i}`, { 
              opacity: 0, 
              y: -50, 
              scale: 0.95,
              ease: "power2.inOut", 
              duration: 1.2 
           }, currentTime);

           // 3. Fade & slide out current TEXT
           tl.to(`.slide-txt-content-${i}`, { 
              opacity: 0, 
              y: -50, 
              ease: "power2.inOut", 
              duration: 1.2 
           }, currentTime + 0.1);
           
           // Make the NEXT right-side wrapper visible
           tl.set(`.slide-right-${i+1}`, { opacity: 1 }, currentTime);

           // 4. Fade & slide in NEXT SMALL image
           tl.fromTo(`.slide-small-img-${i+1}`, 
              { opacity: 0, y: 50, scale: 0.95 }, 
              { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1.2 }, 
           currentTime + 0.3);

           // 5. Fade & slide in NEXT TEXT
           tl.fromTo(`.slide-txt-content-${i+1}`, 
              { opacity: 0, y: 50 }, 
              { opacity: 1, y: 0, ease: "power2.out", duration: 1.2 }, 
           currentTime + 0.4); 

           // 6. Subtle zoom out on NEXT LARGE image as it's revealed beneath the wipe
           tl.fromTo(`.slide-img-${i+1} img`, 
              { scale: 1.15 }, 
              { scale: 1, ease: "power2.out", duration: 2 }, 
           currentTime);

           // Advance timeline for the next read buffer
           currentTime += 2.5; 
        }

        // Buffer at the very end of the final project to allow the user to read it
        tl.to({}, { duration: 1 });

      });

      // ==========================================
      // MOBILE LOGIC
      // ==========================================
      mm.add("(max-width: 1023px)", () => {
         gsap.from(".mobile-intro-content", {
            opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: ".mobile-intro", start: "top 80%" }
         });

         gsap.utils.toArray('.mobile-proj-fade').forEach(el => {
           gsap.fromTo(el, 
             { opacity: 0, y: 30 },
             { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } }
           );
         });
      });

    }, masterContainerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={masterContainerRef} className="relative w-full bg-[#050505] text-white">
      
      {/* ==========================================
          DESKTOP EXPERIENCE (Pinned Cinematic Slideshow)
          ========================================== */}
      <div className="hidden lg:block w-full h-screen relative overflow-hidden">
         
         {/* -------------------------------------------
             PHASE 1: INTRO LAYER (Z-50)
             ------------------------------------------- */}
         <div className="intro-layer absolute top-0 left-0 w-full h-screen z-50 bg-[#f8f8f8] flex overflow-hidden">
            
            <div className="intro-left w-[55%] h-full flex flex-col justify-center px-16 lg:px-[8vw] z-20 relative text-black">
               <span className="intro-content font-bold uppercase tracking-[0.3em] text-xs mb-8">
                  Our Projects
               </span>
               <h2 className="intro-content text-6xl xl:text-[72px] font-bold leading-[1.05] tracking-tighter mb-8">
                  PROJECTS<br/>THAT SPEAK<br/>FOR <span className="text-brand-yellow">THEMSELVES.</span>
               </h2>
               <p className="intro-content text-xl text-gray-600 max-w-md leading-relaxed font-light">
                  A selection of spaces, properties and work delivered with care and absolute precision.
               </p>
            </div>
            
            <div className="intro-right absolute top-0 left-[55%] w-[45%] h-full z-10 overflow-hidden shadow-2xl">
               <img src={PROJECTS[0].img} className="intro-img w-full h-full object-cover origin-center" alt="Projects Cinematic Intro" />
            </div>
         </div>

         {/* -------------------------------------------
             PHASE 2: PROJECT SLIDESHOW (Z-10)
             ------------------------------------------- */}
         <div className="slideshow-gallery absolute inset-0 w-full h-full flex z-10">
             
             {/* LEFT 60% : DOMINANT LARGE IMAGE COMPOSITION */}
             <div className="w-[60%] h-full relative overflow-hidden bg-black">
                
                {/* Global indicator tag in top corner */}
                <div className="absolute top-12 left-12 z-50">
                   <span className="text-brand-yellow text-xs tracking-[0.3em] font-semibold uppercase drop-shadow-md">
                     05 / Selected Projects
                   </span>
                </div>

                {/* Absolutely stacked large images for GSAP transitions */}
                {PROJECTS.map((project, i) => (
                  <div 
                    key={`img-${project.id}`}
                    className={`slide-img-wrap slide-img-${i} absolute inset-0 overflow-hidden`}
                    style={{ zIndex: 10 - i }} 
                  >
                     {/* The natural project image without heavy black overlay */}
                     <img src={project.img} className="w-full h-full object-cover origin-center" alt={project.name} />
                     
                     {/* Very subtle gradient ONLY at the bottom to ensure white text remains readable */}
                     <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                     {/* Project Information perfectly positioned over the image */}
                     <div className="absolute bottom-12 left-12 z-20 flex flex-col">
                        <span className="text-brand-yellow font-mono text-3xl xl:text-4xl mb-2 drop-shadow-md">{project.id}</span>
                        <h3 className="text-5xl xl:text-6xl font-bold mb-2 text-white drop-shadow-lg">{project.name}</h3>
                        <span className="text-sm font-mono text-brand-light-gray uppercase tracking-widest drop-shadow-md">{project.location}</span>
                     </div>
                  </div>
                ))}
             </div>

             {/* RIGHT 40% : SMALL IMAGE & CONTENT COMPOSITION */}
             <div className="w-[40%] h-full relative bg-[#0a0a0a] border-l border-white/5">
                
                {/* Absolutely stacked text panels for GSAP transitions */}
                {PROJECTS.map((project, i) => (
                  <div 
                    key={`txt-${project.id}`} 
                    className={`slide-right-wrap slide-right-${i} absolute inset-0 flex flex-col justify-center px-16 xl:px-24`}
                    style={{ zIndex: 10 - i }}
                  >
                     
                     {/* SMALL PROJECT IMAGE */}
                     <div className={`slide-small-img slide-small-img-${i} w-full aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9] overflow-hidden rounded-xl mb-10 shadow-2xl relative`}>
                        <img src={project.img} className="w-full h-full object-cover" alt={`${project.name} preview`} />
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
                     </div>

                     {/* PROJECT CONTENT */}
                     <div className={`slide-txt-content slide-txt-content-${i}`}>
                        <span className="text-brand-yellow font-mono text-3xl mb-4 block">
                           {project.id}
                        </span>
                        
                        <h3 className="text-4xl xl:text-5xl font-bold mb-3">{project.name}</h3>
                        
                        <span className="text-sm font-mono text-brand-light-gray uppercase tracking-widest block mb-6">
                           {project.location}
                        </span>
                        
                        <p className="text-lg text-brand-gray max-w-md leading-relaxed">
                           {project.desc}
                        </p>
                        
                        <div onClick={() => navigate('/projects')} className="mt-8 flex items-center gap-4 cursor-pointer group w-fit">
                           <span className="text-xs font-bold tracking-widest uppercase text-white">View Details</span>
                           <div className="w-8 h-[1px] bg-brand-yellow group-hover:w-16 transition-all duration-300" />
                        </div>
                     </div>

                  </div>
                ))}
             </div>
             
         </div>

      </div>

      {/* ==========================================
          MOBILE EXPERIENCE
          ========================================== */}
      <div className="lg:hidden w-full bg-[#0a0a0a]">
         
         <div className="mobile-intro w-full bg-[#f8f8f8] text-black pt-24 pb-16 px-6">
            <span className="mobile-intro-content block font-bold uppercase tracking-[0.3em] text-xs mb-6">
               Our Projects
            </span>
            <h2 className="mobile-intro-content text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-6">
               PROJECTS<br/>THAT SPEAK<br/>FOR <span className="text-brand-yellow">THEMSELVES.</span>
            </h2>
            <p className="mobile-intro-content text-gray-600 text-base leading-relaxed">
               A selection of spaces, properties and work delivered with care and absolute precision.
            </p>
         </div>

         <div className="w-full pb-24 pt-8 px-6">

            <div className="flex flex-col gap-16">
               {PROJECTS.map((project) => (
                 <div key={project.id} className="mobile-proj-fade relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10">
                    <img src={project.img} className="w-full h-full object-cover" alt={project.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-6">
                       <div>
                         <span className="text-brand-yellow text-xs font-mono mb-2 block">{project.id} // {project.location}</span>
                         <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                         <p className="text-sm text-brand-light-gray mb-6">{project.desc}</p>
                         <div onClick={() => navigate('/projects')} className="flex items-center gap-4 cursor-pointer group w-fit">
                            <span className="text-xs font-bold tracking-widest uppercase text-white">View Details</span>
                            <div className="w-8 h-[1px] bg-brand-yellow group-hover:w-16 transition-all duration-300" />
                         </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

      </div>

    </section>
  );
};

export default ProjectsSection;
