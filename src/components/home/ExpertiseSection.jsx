import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    nameHTML: <>PROPERTY<br/><span className="text-brand-yellow">CARE.</span></>,
    previewName: "PROPERTY CARE",
    tagline: "CARE THAT PROTECTS THE VALUE OF EVERY SPACE.",
    desc: "Complete oversight of your physical assets. From structural integrity checks to daily upkeep, ensuring your property maintains its premium value and operational efficiency.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2500&auto=format&fit=crop",
    theme: "dark"
  },
  {
    id: "02",
    nameHTML: <>FACILITY<br/><span className="text-brand-yellow">MANAGEMENT.</span></>,
    previewName: "FACILITY MANAGEMENT",
    tagline: "SEAMLESS OPERATIONAL MANAGEMENT OF COMPLEXES.",
    desc: "We handle the complexities of daily operations, compliance, and vendor management so you can focus entirely on the experience of the occupants.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop",
    theme: "light"
  },
  {
    id: "03",
    nameHTML: <>TECHNICAL<br/><span className="text-brand-yellow">SUPPORT.</span></>,
    previewName: "TECHNICAL SUPPORT",
    tagline: "ADVANCED SYSTEMS MAINTENANCE BY SPECIALISTS.",
    desc: "Electrical, plumbing, HVAC, and smart systems—proactively managed by certified technical experts to prevent critical failures and ensure safety.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop",
    theme: "dark-grey"
  }
];

const ExpertiseSection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP: 3-Panel Cinematic Accordion with Responsive Typography
      mm.add("(min-width: 1024px)", () => {
        
        // --- INITIAL SETUP ---
        gsap.set(".intro-block", { opacity: 1, y: 0 });
        gsap.set(".intro-bg", { scale: 1.05, opacity: 0 }); // Hidden initially
        gsap.set(".intro-overlay", { opacity: 1 });
        
        // Panels initial directional entry positions
        gsap.set(".panel-0", { yPercent: -100 });
        gsap.set(".panel-1", { yPercent: 100 });
        gsap.set(".panel-2", { yPercent: -100 });

        // Base states (33.333% layout)
        gsap.set(".panel", { width: "33.333vw" });
        
        // The vertical rotated typography layer (Visible ONLY in initial 33% state)
        gsap.set(".vertical-layer", { opacity: 0 });
        
        // The persistent typography that scales for active (80%) and collapsed (10%)
        gsap.set(".typo-container", { opacity: 0 });
        gsap.set(".typo-num", { fontSize: "6vw" });
        gsap.set(".typo-title", { fontSize: "3vw" });
        gsap.set(".panel-padding-container", { paddingLeft: "3vw", paddingRight: "3vw" });

        // Active Extras (hidden initially)
        gsap.set(".active-extras", { opacity: 0, y: 30 });
        gsap.set(".active-img-wrapper", { clipPath: "inset(0 100% 0 0)", opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=4500", // Reduced from 7000 for shorter scroll requirement (~35% less)
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        const DUR_ENTER = 1.5;
        const DUR_WIDTH = 2;

        // --- STEP 1: TEXT TO IMAGE REVEAL ---
        // Hold on text
        tl.to({}, { duration: 1 });
        
        // Reveal the main image
        tl.to(".intro-bg", { opacity: 1, duration: 1.5, ease: "power2.inOut" });
        
        // Hold on image
        tl.to({}, { duration: 1 });

        // --- STEP 2: ACCORDION ENTRY ---
        tl.to(".intro-block", { opacity: 0, duration: DUR_ENTER, ease: "power2.inOut" }, "entry")
          .to(".intro-bg", { scale: 1.15, duration: DUR_ENTER, ease: "power2.inOut" }, "entry")
          .to(".panel-0", { yPercent: 0, duration: DUR_ENTER, ease: "power3.inOut" }, "entry")
          .to(".panel-1", { yPercent: 0, duration: DUR_ENTER, ease: "power3.inOut" }, "entry+=0.1")
          .to(".panel-2", { yPercent: 0, duration: DUR_ENTER, ease: "power3.inOut" }, "entry+=0.2")
          // Fade in the initial vertical typography once panels settle
          .to(".vertical-layer", { opacity: 1, duration: 0.5 }, "entry+=1.2");

        tl.to({}, { duration: 0.5 }); // Buffer pause at 33/33/33

        // --- STEP 2: PANEL 0 EXPANDS ---
        // Crossfade from vertical typography to the persistent scaling typography
        tl.to(".vertical-layer", { opacity: 0, duration: DUR_WIDTH * 0.3 }, "step2")
          .to(".typo-container", { opacity: 1, duration: DUR_WIDTH * 0.3 }, "step2+=0.3")
          
          // Widths
          .to(".panel-0", { width: "80vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to(".panel-1", { width: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to(".panel-2", { width: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          
          // Panel 0 Typography grows
          .to(".typo-num-0", { fontSize: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to(".typo-title-0", { fontSize: "6vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to(".panel-padding-container-0", { paddingLeft: "5vw", paddingRight: "5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          // Panel 0 Extras reveal
          .to(".active-extras-0", { opacity: 1, y: 0, duration: DUR_WIDTH, ease: "power2.out" }, "step2+=0.5")
          .to(".active-img-wrapper-0", { clipPath: "inset(0 0% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")

          // Panel 1 & 2 Typography shrinks
          .to([".typo-num-1", ".typo-num-2"], { fontSize: "1.5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to([".typo-title-1", ".typo-title-2"], { fontSize: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2")
          .to([".panel-padding-container-1", ".panel-padding-container-2"], { paddingLeft: "1vw", paddingRight: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step2");

        tl.to({}, { duration: 1.5 }); // Read pause

        // --- STEP 3: PANEL 0 SHRINKS, PANEL 1 EXPANDS ---
        tl.to(".panel-0", { width: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".panel-1", { width: "80vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          
          // Panel 0 Typography shrinks & hides extras
          .to(".typo-num-0", { fontSize: "1.5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".typo-title-0", { fontSize: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".panel-padding-container-0", { paddingLeft: "1vw", paddingRight: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".active-extras-0", { opacity: 0, y: 30, duration: DUR_WIDTH * 0.5, ease: "power2.inOut" }, "step3")
          .to(".active-img-wrapper-0", { clipPath: "inset(0 100% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")

          // Panel 1 Typography grows & reveals extras
          .to(".typo-num-1", { fontSize: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".typo-title-1", { fontSize: "6vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".panel-padding-container-1", { paddingLeft: "5vw", paddingRight: "5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3")
          .to(".active-extras-1", { opacity: 1, y: 0, duration: DUR_WIDTH, ease: "power2.out" }, "step3+=0.5")
          .to(".active-img-wrapper-1", { clipPath: "inset(0 0% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step3");

        tl.to({}, { duration: 1.5 });

        // --- STEP 4: PANEL 1 SHRINKS, PANEL 2 EXPANDS ---
        tl.to(".panel-1", { width: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".panel-2", { width: "80vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          
          // Panel 1 Typography shrinks & hides extras
          .to(".typo-num-1", { fontSize: "1.5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".typo-title-1", { fontSize: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".panel-padding-container-1", { paddingLeft: "1vw", paddingRight: "1vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".active-extras-1", { opacity: 0, y: 30, duration: DUR_WIDTH * 0.5, ease: "power2.inOut" }, "step4")
          .to(".active-img-wrapper-1", { clipPath: "inset(0 100% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")

          // Panel 2 Typography grows & reveals extras
          .to(".typo-num-2", { fontSize: "10vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".typo-title-2", { fontSize: "6vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".panel-padding-container-2", { paddingLeft: "5vw", paddingRight: "5vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4")
          .to(".active-extras-2", { opacity: 1, y: 0, duration: DUR_WIDTH, ease: "power2.out" }, "step4+=0.5")
          .to(".active-img-wrapper-2", { clipPath: "inset(0 0% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step4");

        tl.to({}, { duration: 1.5 });

        // --- STEP 5: RETURN TO 33/33/33 ---
        // Crossfade back to the vertical layer
        tl.to(".typo-container", { opacity: 0, duration: DUR_WIDTH * 0.3 }, "step5")
          .to(".vertical-layer", { opacity: 1, duration: DUR_WIDTH * 0.3 }, "step5+=0.3")

          .to(".panel-2", { width: "33.333vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to(".panel-0", { width: "33.333vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to(".panel-1", { width: "33.333vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          
          // Reset scaling typography values behind the scenes
          .to(".typo-num-2", { fontSize: "6vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to(".typo-title-2", { fontSize: "3vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to(".panel-padding-container-2", { paddingLeft: "3vw", paddingRight: "3vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to(".active-extras-2", { opacity: 0, y: 30, duration: DUR_WIDTH * 0.5, ease: "power2.inOut" }, "step5")
          .to(".active-img-wrapper-2", { clipPath: "inset(0 100% 0 0)", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")

          .to([".typo-num-0", ".typo-num-1"], { fontSize: "6vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to([".typo-title-0", ".typo-title-1"], { fontSize: "3vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5")
          .to([".panel-padding-container-0", ".panel-padding-container-1"], { paddingLeft: "3vw", paddingRight: "3vw", duration: DUR_WIDTH, ease: "power2.inOut" }, "step5");

        tl.to({}, { duration: 0.5 }); // Buffer at end
      });

      // MOBILE EXPERIENCE
      mm.add("(max-width: 1023px)", () => {
         gsap.utils.toArray('.mobile-panel').forEach(el => {
           gsap.fromTo(el, 
             { opacity: 0, y: 30 },
             { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 85%" } }
           );
         });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getThemeClasses = (theme) => {
    switch(theme) {
      case 'light': return 'bg-[#f7f7f7] text-black border-[#e5e5e5]';
      case 'dark-grey': return 'bg-[#151515] text-white border-white/5';
      default: return 'bg-[#0a0a0a] text-white border-white/5'; 
    }
  };

  const getTextVariantClasses = (theme) => {
    switch(theme) {
      case 'light': return { title: 'text-black', tagline: 'text-black', desc: 'text-gray-600' };
      default: return { title: 'text-white', tagline: 'text-white', desc: 'text-brand-light-gray' };
    }
  };

  return (
    <section ref={containerRef} className="w-full bg-[#050505] relative overflow-hidden z-10">
      
      {/* DESKTOP EXPERIENCE */}
      <div className="hidden lg:flex w-full h-screen relative bg-[#050505]">
        
        {/* =========================================
            CINEMATIC INTRODUCTION HERO
            ========================================= */}
        <div className="intro-block absolute inset-0 z-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden">
           <div 
             className="intro-bg absolute inset-0 bg-cover bg-center" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop)' }} 
           />
           <div className="absolute inset-0 bg-black/70" />
           <div className="relative z-10 max-w-[900px]">
              <span className="text-brand-yellow text-xs tracking-[0.4em] font-semibold uppercase mb-6 block">
                Our Expertise
              </span>
              <h2 className="text-6xl lg:text-[80px] font-bold text-white leading-[1.05] tracking-tight mb-8">
                SERVICES BUILT<br/>AROUND YOUR <span className="text-brand-yellow">PROPERTY.</span>
              </h2>
              <p className="text-xl lg:text-2xl text-brand-light-gray font-light max-w-2xl mx-auto leading-relaxed">
                From everyday care to long-term property protection, we bring every detail together under one trusted hand.
              </p>
           </div>
        </div>

        {/* =========================================
            3-PANEL EDITORIAL ACCORDION
            ========================================= */}
        <div className="absolute inset-0 z-10 flex">
          {SERVICES.map((service, i) => {
            const themeClasses = getThemeClasses(service.theme);
            const textClasses = getTextVariantClasses(service.theme);
            
            return (
              <div 
                key={service.id} 
                className={`panel panel-${i} relative h-full shrink-0 border-r ${themeClasses} will-change-transform`}
              >
                 
                 {/* 
                   INITIAL VERTICAL LAYER 
                   Visible only during the 33/33/33 state.
                   Provides the rotated architectural typography.
                 */}
                 <div className={`vertical-layer vertical-layer-${i} absolute inset-0 flex items-center justify-center pointer-events-none z-20`}>
                    <div className="transform -rotate-90 whitespace-nowrap flex items-center gap-12 origin-center">
                       <span className="text-[6vw] font-mono text-brand-yellow font-bold tracking-tighter">
                         {service.id}
                       </span>
                       <span className={`text-[3.9vw] font-bold tracking-tighter uppercase ${textClasses.title}`}>
                         {service.previewName}
                       </span>
                    </div>
                 </div>

                 {/* 
                   ACTIVE & COLLAPSED LAYER 
                   Fades in when scrolling begins. 
                   Handles the 80vw expansion and 10vw compression.
                 */}
                 <div className="absolute left-0 top-0 w-[80vw] h-full flex z-10">
                    
                    {/* LEFT COLUMN: Persistent Typography + Fading Content */}
                    <div className={`panel-padding-container panel-padding-container-${i} w-[45vw] h-full flex flex-col justify-center`}>
                       
                       {/* Persistent Responsive Typography */}
                       <div className={`typo-container typo-container-${i} will-change-transform`}>
                          <span className={`typo-num typo-num-${i} text-brand-yellow font-mono leading-none tracking-tighter font-bold block mb-4`}>
                            {service.id}
                          </span>
                          <h3 className={`typo-title typo-title-${i} font-bold leading-[1.05] tracking-tighter ${textClasses.title}`}>
                            {service.nameHTML}
                          </h3>
                       </div>

                       {/* Fading Active Content */}
                       <div className={`active-extras active-extras-${i} mt-8 max-w-[35vw] will-change-opacity`}>
                          <p className={`text-xl xl:text-2xl font-medium mb-6 leading-snug uppercase tracking-tight ${textClasses.tagline}`}>
                            {service.tagline}
                          </p>
                          <p className={`text-lg leading-relaxed font-light ${textClasses.desc}`}>
                            {service.desc}
                          </p>
                          <div onClick={() => navigate('/services')} className={`mt-10 flex items-center gap-4 cursor-pointer group ${textClasses.title} w-max`}>
                             <span className="text-sm font-semibold tracking-widest uppercase">Explore Service</span>
                             <div className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-300" />
                          </div>
                       </div>
                    </div>

                    {/* RIGHT COLUMN: Cinematic Image Wipe */}
                    <div className="w-[35vw] h-full flex items-center py-12 pr-12">
                       <div className={`active-img-wrapper active-img-wrapper-${i} w-full h-[80%] relative overflow-hidden rounded-sm shadow-2xl will-change-transform`}>
                          <img 
                            src={service.img} 
                            className="w-full h-full object-cover" 
                            alt={service.previewName} 
                          />
                       </div>
                    </div>

                 </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE EXPERIENCE (Standard stacked layout) */}
      <div className="lg:hidden w-full bg-[#050505] flex flex-col pt-32 pb-24 px-6">
         <div className="mb-16">
            <span className="text-brand-yellow text-xs tracking-[0.4em] font-semibold uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-6">
              SERVICES BUILT<br/>AROUND YOUR <span className="text-brand-yellow">PROPERTY.</span>
            </h2>
         </div>
         <div className="flex flex-col gap-8">
           {SERVICES.map((service) => {
              const themeClasses = getThemeClasses(service.theme);
              const textClasses = getTextVariantClasses(service.theme);
              return (
                <div key={service.id} className={`mobile-panel w-full p-8 rounded-lg ${themeClasses}`}>
                   <span className="text-brand-yellow text-4xl font-mono font-bold tracking-tighter block mb-2">{service.id}</span>
                   <h3 className={`text-4xl font-bold mb-4 tracking-tighter leading-[1] ${textClasses.title}`}>{service.nameHTML}</h3>
                   <p className={`text-base font-medium mb-4 uppercase tracking-tight ${textClasses.tagline}`}>{service.tagline}</p>
                   <p className={`text-sm leading-relaxed mb-6 ${textClasses.desc}`}>{service.desc}</p>
                   <div onClick={() => navigate('/services')} className={`mb-8 flex items-center gap-4 cursor-pointer group ${textClasses.title} w-max`}>
                      <span className="text-sm font-semibold tracking-widest uppercase">Explore Service</span>
                      <div className="w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-300" />
                   </div>
                   <div className="w-full aspect-[4/3] overflow-hidden rounded-sm">
                      <img src={service.img} className="w-full h-full object-cover" alt="Service" />
                   </div>
                </div>
              );
           })}
         </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
