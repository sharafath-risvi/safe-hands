import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "../../utils/cn";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Check if device is touch based
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsHidden(true);
      return;
    }

    // Set initial GSAP props
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out"
      });
    };

    const handleMouseOver = (e) => {
      // Hide cursor over navbar to prevent the "yellow circle" from appearing
      if (e.target.closest('header')) {
        setIsHidden(true);
        return;
      }
      setIsHidden(false);

      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "a" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    document.addEventListener("mouseleave", () => setIsHidden(true));
    document.addEventListener("mouseenter", () => setIsHidden(false));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-4 h-4 rounded-full bg-brand-yellow pointer-events-none z-[9999] transition-transform duration-300 ease-out flex items-center justify-center",
        isHovering ? "scale-[3]" : "scale-100"
      )}
    >
      <div className={cn("w-full h-[1px] bg-brand-dark-900 absolute transition-opacity duration-300", isHovering ? "opacity-50" : "opacity-0")} />
      <div className={cn("w-[1px] h-full bg-brand-dark-900 absolute transition-opacity duration-300", isHovering ? "opacity-50" : "opacity-0")} />
    </div>
  );
};

export default CustomCursor;
