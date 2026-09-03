import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const el = transitionRef.current;
    const line = lineRef.current;
    
    const tl = gsap.timeline();
    
    // Line expands, then curtain reveals
    tl.to(line, {
      scaleY: 0,
      duration: 0.6,
      ease: "power3.inOut"
    })
    .to(el, {
      scaleY: 0, 
      duration: 1, 
      ease: "power4.inOut", 
      transformOrigin: "top" 
    }, "-=0.2");
    
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={transitionRef}
        className="fixed inset-0 z-[100] bg-brand-dark-900 pointer-events-none origin-top flex items-center justify-center"
      >
        <div ref={lineRef} className="w-[2px] h-full bg-brand-yellow origin-center" />
      </div>
      {children}
    </>
  );
};

export default PageTransition;
