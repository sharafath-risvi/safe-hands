import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const textRef = useRef(null);
  const bgTextRef = useRef(null);
  const linesRef = useRef([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax for the huge SH background text
      gsap.to(bgTextRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smooth scrub
        },
      });

      // Staggered reveal for the main statement lines
      const splitText = textRef.current.querySelectorAll('.split-line');
      
      gsap.fromTo(splitText, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%",
          }
        }
      );

      // Architectural lines draw animation
      gsap.fromTo(linesRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );
      
      // General fade up for UI sections (Explore, Services, Contact, etc)
      gsap.fromTo(".fade-up-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 65%",
          }
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToLinesRef = (el) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  return (
    <footer ref={footerRef} className="w-full bg-white text-brand-dark-900 pt-16 lg:pt-20 pb-8 px-6 lg:px-12 xl:px-24 relative overflow-hidden flex flex-col justify-between z-10 min-h-screen border-t border-black/5">
      
      {/* Background Architectural Grid/Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Vertical lines */}
        <div className="absolute left-[5%] top-0 bottom-0 w-[1px] bg-black/[0.03]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-black/[0.015]" />
        <div className="absolute right-[5%] top-0 bottom-0 w-[1px] bg-black/[0.03]" />
        
        {/* Horizontal lines */}
        <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-black/[0.02]" />
        <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-black/[0.02]" />

        {/* Subtle coordinate marks */}
        <div className="absolute left-[5%] top-[10%] text-[8px] font-mono text-black/20 rotate-90 origin-left tracking-[0.2em] whitespace-nowrap hidden sm:block">LAT 13.0827° N</div>
        <div className="absolute right-[5%] bottom-[10%] text-[8px] font-mono text-black/20 -rotate-90 origin-right tracking-[0.2em] whitespace-nowrap hidden sm:block">LON 80.2707° E</div>
        
        {/* Plus marks at intersections */}
        <div className="absolute left-[5%] top-[25%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 text-black/10 text-[8px] flex items-center justify-center font-mono">+</div>
        <div className="absolute right-[5%] bottom-[25%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 text-black/10 text-[8px] flex items-center justify-center font-mono">+</div>
      </div>

      {/* Large Interactive Background Brand Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          ref={bgTextRef}
          className="absolute top-[10%] right-[-5%] text-[30vw] font-bold tracking-tighter leading-none select-none text-transparent transition-colors duration-1000 group hover:text-black/[0.01]"
          style={{ WebkitTextStroke: '1px rgba(0,0,0,0.03)' }}
        >
          SH
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto relative z-10 flex flex-col flex-1 h-full">
        
        {/* LOGO & TAGLINE LOCKUP */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16 xl:gap-24 mb-12 lg:mb-16 mt-0">
          
          {/* FOOTER LOGO */}
          <div className="fade-up-element flex-shrink-0">
            <img 
              src="/logo/logo.png" 
              alt="Safe Hands Logo" 
              className="h-28 md:h-48 lg:h-64 w-auto max-w-full object-contain transition-opacity hover:opacity-80" 
            />
          </div>

          {/* MAIN CINEMATIC STATEMENT */}
          <div ref={textRef} className="flex-1 lg:text-right lg:mt-16 xl:mt-20">
            <h2 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-bold leading-[1.1] tracking-tighter uppercase font-sans text-brand-dark-900">
              <div className="overflow-hidden"><div className="split-line">WE TAKE CARE</div></div>
              <div className="overflow-hidden"><div className="split-line">OF <span className="text-brand-yellow">WHAT MATTERS.</span></div></div>
            </h2>
          </div>
          
        </div>

        {/* HORIZONTAL ARCHITECTURAL LINE */}
        <div className="w-full h-[1px] bg-black/10 mb-10 lg:mb-12 relative" ref={addToLinesRef}>
          <div className="absolute left-0 -top-[3px] w-[1px] h-[7px] bg-brand-yellow/50" />
          <div className="absolute right-0 -top-[3px] w-[1px] h-[7px] bg-brand-yellow/50" />
        </div>

        {/* MIDDLE SECTION: Navigation, Services, Contact & Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* NAVIGATION */}
          <div className="lg:col-span-3 flex flex-col gap-8 fade-up-element">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark-900 font-mono mb-3 flex items-center gap-4">
              <span className="w-4 h-[1px] bg-brand-yellow/50" /> Explore
            </h4>
            <nav className="flex flex-col gap-4">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onClick={scrollToTop} 
                  className="group flex items-center gap-4 text-4xl font-medium text-brand-dark-900 hover:text-black transition-colors w-max"
                >
                  <span className="relative pb-1">
                    {item}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-brand-yellow group-hover:w-full transition-all duration-500 ease-out" />
                  </span>
                  <ArrowRight className="w-6 h-6 text-brand-yellow opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
                </Link>
              ))}
            </nav>
          </div>

          {/* SERVICES */}
          <div className="lg:col-span-4 lg:col-start-5 flex flex-col gap-8 fade-up-element">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark-900 font-mono mb-3 flex items-center gap-4">
              <span className="w-4 h-[1px] bg-brand-yellow/50" /> Services
            </h4>
            <div className="flex flex-col gap-6">
              {[
                { num: '01', name: 'Property Care' },
                { num: '02', name: 'Facility Management' },
                { num: '03', name: 'Technical Support' },
                { num: '04', name: 'Execution & Care' },
                { num: '05', name: 'Continuous Support' }
              ].map((service) => (
                <Link 
                  key={service.num} 
                  to="/services" 
                  onClick={scrollToTop} 
                  className="group flex items-baseline gap-6 w-full lg:w-max border-b border-black/10 pb-4 lg:pr-12 hover:border-brand-yellow/50 transition-colors duration-500"
                >
                  <span className="text-sm font-semibold font-mono text-black/50 group-hover:text-brand-yellow group-hover:-translate-y-1 transition-all duration-300">
                    {service.num}
                  </span>
                  <span className="text-2xl font-medium text-brand-dark-900 group-hover:text-black transition-colors">
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT & SOCIAL */}
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-16 fade-up-element">
            <div className="flex flex-col gap-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark-900 font-mono mb-3 flex items-center gap-4">
                <span className="w-4 h-[1px] bg-brand-yellow/50" /> Get In Touch
              </h4>
              <div className="flex flex-col gap-4">
                <a href="tel:+919080820005" className="text-xl font-medium text-brand-dark-900 hover:text-brand-yellow transition-colors w-max group flex items-center gap-2">
                  +91 90808 20005
                </a>
                <a href="mailto:mail.safehands@gmail.com" className="text-xl font-medium text-brand-dark-900 hover:text-brand-yellow transition-colors w-max group flex items-center gap-2">
                  mail.safehands@gmail.com
                </a>
                <div className="text-base font-medium text-black/70 leading-relaxed mt-2 relative pl-4 border-l border-black/20 group-hover:border-brand-yellow/80 transition-colors">
                  <span className="absolute left-[-1px] top-0 w-[1px] h-0 bg-brand-yellow transition-all duration-500 group-hover:h-full" />
                  68/2, Sembudoss Street<br/>
                  Mannady, Chennai – 600001<br/>
                  Tamil Nadu, India
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-dark-900 font-mono mb-3 flex items-center gap-4">
                <span className="w-4 h-[1px] bg-brand-yellow/50" /> Follow Safe Hands
              </h4>
              <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-brand-dark-900 hover:border-brand-yellow hover:text-brand-yellow hover:-translate-y-1 transition-all duration-300 bg-black/[0.02]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-brand-dark-900 hover:border-brand-yellow hover:text-brand-yellow hover:-translate-y-1 transition-all duration-300 bg-black/[0.02]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center text-brand-dark-900 hover:border-brand-yellow hover:text-brand-yellow hover:-translate-y-1 transition-all duration-300 bg-black/[0.02]">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* BOTTOM ARCHITECTURAL LINE */}
        <div className="w-full h-[1px] bg-black/10 mt-auto mb-8 relative" ref={addToLinesRef}>
           <div className="absolute left-0 -top-[3px] w-[1px] h-[7px] bg-brand-yellow" />
           <div className="absolute right-0 -top-[3px] w-[1px] h-[7px] bg-brand-yellow" />
        </div>

        {/* FINAL BOTTOM BAR */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 fade-up-element pb-4">
          <div className="flex-1 text-center md:text-left">
             <p className="text-[10px] text-black/40 tracking-[0.2em] uppercase font-mono">
               © {new Date().getFullYear()} SAFE HANDS.
             </p>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
             <a href="#" className="text-[10px] text-black/40 hover:text-brand-yellow tracking-[0.2em] uppercase transition-colors font-mono relative group">
               Privacy Policy
               <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-yellow group-hover:w-full transition-all duration-300" />
             </a>
             <a href="#" className="text-[10px] text-black/40 hover:text-brand-yellow tracking-[0.2em] uppercase transition-colors font-mono relative group">
               Terms & Conditions
               <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-yellow group-hover:w-full transition-all duration-300" />
             </a>
          </div>
          
          <div className="flex-1 text-center md:text-right mt-2 md:mt-0">
             <p className="text-[10px] text-black/40 tracking-[0.2em] uppercase font-mono">
               Developed by <a href="#" className="text-black hover:text-brand-yellow transition-colors font-bold ml-1">Thajira Techworks</a>
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
