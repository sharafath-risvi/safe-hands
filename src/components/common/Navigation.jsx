import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const isHomePage = location.pathname === "/";
    if (isHomePage) {
      // Hide completely on mount for homepage hero
      gsap.set(navRef.current, { yPercent: -100, opacity: 0 });
    } else {
      // Cinematic initial entry reveal for other pages
      gsap.set(navRef.current, { yPercent: 0, opacity: 1 });
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const isHomePage = location.pathname === "/";

      if (currentScrollY <= 20) {
         if (isHomePage) {
            // Homepage Hero top state: Navbar HIDDEN
            gsap.to(navRef.current, { yPercent: -100, opacity: 0, duration: 0.25, ease: "power2.out", overwrite: "auto" });
         } else {
            // Other pages top state: Always SHOW
            gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
         }
         lastScrollY.current = currentScrollY;
         return;
      }

      if (scrollDelta > 8) {
         // Scrolling DOWN: Quick slide hide
         gsap.to(navRef.current, { yPercent: -100, opacity: 0, duration: 0.25, ease: "power2.inOut", overwrite: "auto" });
         lastScrollY.current = currentScrollY;
      } else if (scrollDelta < -8) {
         // Scrolling UP: Quick slide return
         gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
         lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 w-full z-50",
          "bg-white border-b border-black/5 shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between py-4 lg:py-6 transition-all duration-500">
          <button onClick={() => handleNavClick("/")} className="relative z-50 group flex items-center gap-3 md:gap-5 cursor-pointer outline-none translate-y-[10px]">
            <img src="/logo/logosymbol.png" alt="Safe Hands Symbol" className="h-14 md:h-16 lg:h-20 w-auto object-contain" />
            <img src="/logo/logoname.png" alt="Safe Hands" className="h-10 md:h-12 lg:h-14 w-auto object-contain" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 lg:gap-12 h-full translate-y-[8px]">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={cn(
                    "text-xs lg:text-sm uppercase tracking-widest transition-colors relative group flex items-center h-full outline-none cursor-pointer",
                    isActive ? "text-brand-dark-900 font-bold" : "text-gray-600 hover:text-brand-dark-900 font-medium"
                  )}
                >
                  {link.name}
                  <span 
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-[2px] bg-brand-yellow transition-all duration-300 ease-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} 
                  />
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("/contact")}
              className="flex items-center gap-2 ml-2 lg:ml-6 text-xs lg:text-sm font-bold uppercase tracking-widest text-brand-dark-900 hover:text-brand-yellow transition-colors group h-full outline-none cursor-pointer"
            >
              Get Consultation
              <ArrowRight size={18} className="transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 text-brand-dark-900 hover:text-brand-yellow transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col justify-center px-6 transition-all duration-700 ease-in-out",
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_LINKS.map((link, i) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={cn(
                  "text-3xl font-bold tracking-widest uppercase transition-all duration-500 transform outline-none cursor-pointer",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  isActive ? "text-brand-yellow" : "text-brand-dark-900"
                )}
              >
                {link.name}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick("/contact")}
            className={cn(
              "mt-8 mx-auto flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-brand-dark-900 transition-all duration-500 transform group hover:text-brand-yellow outline-none cursor-pointer",
              isOpen ? "translate-y-0 opacity-100 delay-300" : "translate-y-8 opacity-0"
            )}
          >
            Get Consultation
            <ArrowRight size={20} className="text-brand-yellow transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
