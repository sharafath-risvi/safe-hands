import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameUrls = [
  ...Array.from({ length: 250 }, (_, i) => `/videos/heroframes1/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`),
  ...Array.from({ length: 150 }, (_, i) => `/videos/heroframes2/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`),
  ...Array.from({ length: 150 }, (_, i) => `/videos/heroframes3/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`)
];
const frameCount = frameUrls.length;

const storyStages = [
  { num: "01", title: "PROPERTY CARE", desc: "A professional approach to protecting and maintaining every property." },
  { num: "02", title: "FACILITY MANAGEMENT", desc: "Uncompromising attention to structural and systemic integrity." },
  { num: "03", title: "EXECUTION & CARE", desc: "Precise execution down to the absolute finest margin." },
  { num: "04", title: "CONTINUOUS SUPPORT", desc: "24/7 dedicated stewardship for your premium assets." }
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);
  const introRef = useRef(null);

  const [showIntro] = useState(() => {
    if (typeof window !== 'undefined' && window.__safeHandsIntroPlayed) {
      return false;
    }
    return true;
  });

  // Preload first few frames immediately, then lazy load the rest smartly
  useLayoutEffect(() => {
    // Initial preload of first 20 frames for fast startup
    for (let i = 0; i < 20; i++) {
      if (!imagesRef.current[i]) {
        const img = new Image();
        img.src = frameUrls[i];
        imagesRef.current[i] = img;
      }
    }

    // A background sequential loader
    let seqIndex = 20;
    const loadNext = () => {
       while (seqIndex < frameCount && imagesRef.current[seqIndex]) {
          seqIndex++;
       }
       if (seqIndex >= frameCount) return;
       
       const img = new Image();
       img.src = frameUrls[seqIndex];
       imagesRef.current[seqIndex] = img;
       img.onload = img.onerror = () => {
          seqIndex++;
          loadNext();
       };
    };
    
    // Start background loading shortly after initial load
    setTimeout(loadNext, 500);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let proxy = { frame: 0 };
    
    // Draw image with object-fit: contain logic (preserves full original composition)
    function drawImageContain(ctx, img, x, y, w, h) {
      if (arguments.length === 2) {
          x = y = 0;
          w = ctx.canvas.width;
          h = ctx.canvas.height;
      }

      const iw = img.width;
      const ih = img.height;
      
      // Calculate fit ratio
      // Desktop remains exactly object-fit: contain (original behavior)
      // Mobile becomes object-fit: cover (full screen, immersive)
      let r = Math.min(w / iw, h / ih); 
      
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        r = Math.max(w / iw, h / ih);
      }

      const nw = iw * r;
      const nh = ih * r;
      
      // Center the frame
      const cx = (w - nw) / 2 + x;
      const cy = (h - nh) / 2 + y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, iw, ih, cx, cy, nw, nh);
    }

    const renderFrame = (index) => {
      const idx = Math.max(0, Math.min(frameCount - 1, Math.round(index)));
      
      // Lookahead preload (preload next 15 frames from current position)
      for (let i = idx; i < Math.min(frameCount, idx + 15); i++) {
         if (!imagesRef.current[i]) {
            const preImg = new Image();
            preImg.src = frameUrls[i];
            imagesRef.current[i] = preImg;
         }
      }

      let img = imagesRef.current[idx];
      
      if (img && img.complete) {
        drawImageContain(ctx, img, 0, 0, canvas.width, canvas.height);
      } else if (img) {
        const existingOnload = img.onload;
        img.onload = (e) => {
          if (existingOnload) existingOnload(e);
          if (Math.round(proxy.frame) === idx) {
            drawImageContain(ctx, img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
    };

    // Ensure canvas sizing is responsive
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(proxy.frame);
    };

    window.addEventListener("resize", resize);
    
    // Initial draw once first frame loads
    if (imagesRef.current[0]) {
      if (imagesRef.current[0].complete) {
        resize();
      } else {
        imagesRef.current[0].onload = resize;
      }
    } else {
        resize();
    }

    let gsapCtx = gsap.context(() => {
      
      let revealTween = null;
      
      // 1. INITIAL REVEAL LOGIC
      gsap.set([canvas, ".hero-text-anim"], { opacity: 0 });
      gsap.set(canvas, { scale: 1.05 });
      gsap.set(".hero-text-anim", { y: 30 });
      
      // Initialize final doors offscreen
      gsap.set(".final-door-top", { yPercent: -100 });
      gsap.set(".final-door-bottom", { yPercent: 100 });
      
      // Initialize final text container and title text
      gsap.set(".final-title-container", { opacity: 0 });
      gsap.set(".final-title-safe", { x: "-8vw", opacity: 0 });
      gsap.set(".final-title-hands", { x: "8vw", opacity: 0 });

      const playHeroReveal = () => {
        gsap.to(canvas, { scale: 1, opacity: 1, duration: 2, ease: "power3.out" });
        revealTween = gsap.to(".hero-text-anim", { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power2.out" });
      };

      if (!showIntro) {
         playHeroReveal();
      } else {
         document.body.style.overflow = 'hidden';
         
         const introTl = gsap.timeline({
            onComplete: () => {
               window.__safeHandsIntroPlayed = true;
               document.body.style.overflow = '';
               gsap.set(introRef.current, { display: 'none' });
               playHeroReveal();
            }
         });

         introTl.to(".intro-line-h", { width: "100vw", duration: 1.2, ease: "power3.inOut" }, 0.3);
         introTl.to(".intro-line-v", { height: "100vh", duration: 1.2, ease: "power3.inOut" }, 0.8);
         
         introTl.to(".intro-brand", { y: "0%", duration: 1, ease: "power4.out" }, 1.2);
         introTl.to(".intro-tagline", { y: "0%", duration: 1, ease: "power4.out" }, 1.3);

         introTl.to([".intro-line-h", ".intro-line-v", ".intro-content"], { opacity: 0, duration: 0.3 }, 2.0);
         
         introTl.fromTo(".intro-frame", 
           { width: "0vw", height: "0vh", opacity: 1 },
           { width: "100vw", height: "100vh", duration: 1, ease: "power3.inOut" }, 
           2.0
         );

         introTl.to(".intro-bg", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 2.2);
         introTl.to(".intro-frame", { opacity: 0, duration: 0.4 }, 2.6);
      }

      // 2. SCROLL SEQUENCE
      // Dynamically calculate scroll distance based on actual frame count
      // so the scroll speed remains consistent even as the video length changes
      const scrollDistance = (frameCount / 35) * window.innerHeight; // Drastically reduced scroll distance (by ~35-40%) to make entire Hero sequence respond faster to scrolling
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1, // Smooth interpolation between frames
          anticipatePin: 1,
          onUpdate: (self) => {
             // Explicitly kill the initial reveal tween if scrolling starts,
             // guaranteeing it cannot fight the scroll timeline for opacity/transform control.
             if (self.progress > 0 && revealTween) {
                revealTween.kill();
                revealTween = null;
             }
          }
        }
      });

      // 2a. Small Text Exit
      tl.fromTo([".hero-text-anim:not(.hero-line-1):not(.hero-line-2)"], 
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          duration: frameCount * 0.07,
          ease: "power2.inOut",
          immediateRender: false,
          overwrite: "auto"
        }, 0);

      // 2b. Cinematic Split-Direction Typography Exit
      tl.fromTo(".hero-line-1", 
        { x: "0vw", opacity: 1, scale: 1, filter: "blur(0px)" },
        {
          x: "-8vw",
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          duration: frameCount * 0.07,
          ease: "power2.inOut",
          immediateRender: false,
          overwrite: "auto"
        }, 0);

      tl.fromTo(".hero-line-2", 
        { x: "0vw", opacity: 1, scale: 1, filter: "blur(0px)" },
        {
          x: "8vw",
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          duration: frameCount * 0.07,
          ease: "power2.inOut",
          immediateRender: false,
          overwrite: "auto"
        }, 0);

      // STATE 1: VIDEO PLAYING (takes 'frameCount' arbitrary units of timeline duration)
      tl.to(proxy, {
        frame: frameCount - 1,
        duration: frameCount,
        ease: "none",
        onUpdate: () => renderFrame(proxy.frame)
      }, 0);

      // 3. BOTTOM STORY STAGES (Mapped exactly to the video duration)
      const stages = storyStages.length;
      const videoDuration = frameCount;
      const stageDuration = videoDuration / stages; 

      for(let i = 0; i < stages; i++) {
        const sTime = i * stageDuration; 
        const eTime = sTime + stageDuration; 
        
        // Stage 01 fades in AFTER initial hero text fades out
        // Subsequent stages fade in immediately
        const enterTime = i === 0 ? frameCount * 0.09 : sTime;
        const enterDuration = frameCount * 0.05;

        // Stage Title & Desc Fade In
        tl.fromTo(`.story-stage-${i}`, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: enterDuration, ease: "power2.out" }, 
          enterTime
        );
        
        // Stage yellow line smoothly grows matching the scroll progress
        tl.fromTo(`.story-line-${i}`,
          { scaleX: 0 },
          { scaleX: 1, duration: eTime - enterTime, ease: "none" },
          enterTime
        );

        // Fade out (if not the last stage)
        if (i < stages - 1) {
          tl.to(`.story-stage-${i}`, 
            { opacity: 0, y: -20, duration: frameCount * 0.05, ease: "power2.in" }, 
            eTime - (frameCount * 0.05)
          );
        }
      }

      // STATE 2 & 3: VIDEO AT FINAL FRAME & SHORT FINAL-FRAME HOLD
      tl.to({}, { duration: frameCount * 0.03 }); // Restored original proportion for cinematic pacing

      // STATE 4: DOORS CLOSING (DOORS FIRST)
      const doorCloseDuration = frameCount * 0.06; // Restored to 0.06 to maintain smooth, heavy, cinematic feel
      tl.to(".final-door-top", { yPercent: 0, duration: doorCloseDuration, ease: "power2.inOut" }, "doorsClose");
      tl.to(".final-door-bottom", { yPercent: 0, duration: doorCloseDuration, ease: "power2.inOut" }, "doorsClose");
      
      // STATE 5: DOORS FULLY CLOSED & SHORT CINEMATIC PAUSE
      tl.to({}, { duration: frameCount * 0.03 }); // Restored original proportion

      // STATE 6: SAFE + HANDS TEXT REVEAL (TEXT SECOND)
      tl.to(".final-title-container", { opacity: 1, duration: 1 }); // Just enable container
      
      const textRevealDuration = frameCount * 0.05; // Restored original proportion
      tl.to([".final-title-safe", ".final-title-hands"], { opacity: 1, duration: textRevealDuration, ease: "power2.out" }, "textReveal");
      tl.to(".final-title-safe", { x: "0vw", duration: textRevealDuration, ease: "power2.out" }, "textReveal");
      tl.to(".final-title-hands", { x: "0vw", duration: textRevealDuration, ease: "power2.out" }, "textReveal");

      // Final hold to ensure user can appreciate the screen before section unpins
      tl.to({}, { duration: frameCount * 0.04 }); // Optimized final hold before Our Story

    }, containerRef);
    
    return () => {
      window.removeEventListener("resize", resize);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      
      {/* CINEMATIC INTRO */}
      {showIntro && (
        <div ref={introRef} className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
           <div className="intro-bg absolute inset-0 bg-[#050505]" />
           
           <div className="intro-content relative z-10 flex flex-col items-center justify-center text-center">
              <div className="overflow-hidden pb-2">
                <h1 className="intro-brand text-4xl md:text-6xl font-bold text-white tracking-[0.2em] uppercase translate-y-[100%]">
                  Safe Hands
                </h1>
              </div>
              <div className="overflow-hidden mt-4">
                <p className="intro-tagline text-xs md:text-sm text-brand-yellow tracking-[0.4em] uppercase translate-y-[100%]">
                  Property Management & Developers
                </p>
              </div>
           </div>

           <div className="intro-line-h absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0%] h-[1px] bg-brand-yellow/40" />
           <div className="intro-line-v absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[0%] bg-brand-yellow/40" />
           
           <div className="intro-frame absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-[1px] border-brand-yellow/40 z-20 pointer-events-none opacity-0" />
        </div>
      )}
      
      {/* CINEMATIC FRAME SEQUENCE (CANVAS) */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Mobile Watermark Soft Blur Cover */}
        <div 
          className="absolute bottom-0 right-0 w-[70%] h-[30%] md:hidden backdrop-blur-[12px] pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse at bottom right, black 15%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse at bottom right, black 15%, transparent 75%)'
          }}
        />

        {/* Cinematic Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* CONTENT LAYER */}
      <div ref={textRef} className="relative z-10 w-full h-full max-w-[1600px] mx-auto flex flex-col justify-center px-6 sm:px-8 md:px-16 text-center md:text-left">
        
        {/* Top Static Label */}
        <div className="mb-4 sm:mb-6 md:mb-8 md:translate-y-0">
           <span className="hero-text-anim inline-block text-brand-yellow text-[10px] sm:text-xs tracking-[0.25em] md:tracking-[0.4em] font-semibold uppercase drop-shadow-md">
             SAFE HANDS PROPERTY MANAGEMENT
           </span>
        </div>

        {/* Main Title - Left Aligned Composition on Desktop, Centered on Mobile */}
        <div className="w-full flex flex-col md:flex-col mb-6 sm:mb-8 md:mb-8 pointer-events-none select-none justify-center md:justify-start items-center md:items-start gap-1 md:gap-0 md:translate-y-0">
           <h1 className="hero-text-anim hero-line-1 whitespace-nowrap text-[clamp(2rem,9vw,3.5rem)] md:text-[clamp(2.5rem,7vw,110px)] font-bold text-white leading-[1.1] md:leading-[1.0] tracking-tight drop-shadow-2xl text-center md:text-left">
             PROPERTY CARE
           </h1>
           <h1 className="hero-text-anim hero-line-2 whitespace-nowrap text-[clamp(2rem,9vw,3.5rem)] md:text-[clamp(2.5rem,7vw,110px)] font-bold text-brand-yellow leading-[1.1] md:leading-[1.0] tracking-tight drop-shadow-2xl text-center md:text-left">
             REDEFINED
           </h1>
        </div>
        
        {/* Subtitle / Philosophy */}
        <div className="flex justify-center md:justify-start md:translate-y-0">
          <p className="hero-text-anim text-xs sm:text-sm md:text-xl text-white/80 font-light leading-relaxed max-w-[90%] sm:max-w-md md:max-w-xl border-l-0 md:border-l-2 md:border-brand-yellow pl-0 md:pl-4 text-center md:text-left">
             A modern standard of stewardship designed for premium assets. We monitor, maintain, and protect your property down to the absolute finest margin.
          </p>
        </div>

      </div>

      {/* BOTTOM STORY BAND (GSAP Controlled) */}
      <div className="absolute bottom-[10vh] md:bottom-0 left-0 w-full h-[25vh] md:h-[30vh] z-20 flex items-center px-8 md:px-16 pointer-events-none">
         <div className="relative w-full max-w-[1600px] mx-auto h-full">
           {storyStages.map((stage, i) => (
             <div key={i} className={`story-stage-${i} absolute inset-0 flex flex-col justify-center opacity-0`}>
                <div className="flex items-center gap-4 mb-3">
                   <span className="text-brand-yellow font-mono text-xs tracking-widest">{stage.num}</span>
                   <div className="h-[1px] w-12 bg-white/10 relative overflow-hidden">
                      <div className={`story-line-${i} absolute top-0 left-0 h-full w-full bg-brand-yellow origin-left scale-x-0`} />
                   </div>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-2 uppercase drop-shadow-md">
                   {stage.title}
                </h2>
                <p className="text-sm md:text-base text-white/60 max-w-md font-light leading-relaxed">
                   {stage.desc}
                </p>
             </div>
           ))}
         </div>
      </div>

      {/* FINAL DOORS (GSAP Controlled) */}
      <div className="final-door-top absolute top-0 left-0 w-full h-[51%] bg-[#050505] z-50 pointer-events-none" />
      <div className="final-door-bottom absolute bottom-0 left-0 w-full h-[51%] bg-[#050505] z-50 pointer-events-none" />

      {/* FINAL TITLE REVEAL (GSAP Controlled) */}
      <div className="final-title-container absolute inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden">
         <div className="w-full max-w-[1600px] mx-auto flex items-center justify-center gap-[20px] md:gap-[40px]">
            <h1 className="final-title-safe text-[clamp(3.5rem,11vw,220px)] font-bold text-white leading-none tracking-tighter uppercase">
              SAFE
            </h1>
            <h1 className="final-title-hands text-[clamp(3.5rem,11vw,220px)] font-bold text-brand-yellow leading-none tracking-tighter uppercase">
              HANDS
            </h1>
         </div>
      </div>

    </section>
  );
};

export default HeroSection;
