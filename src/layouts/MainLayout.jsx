import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navigation from "../components/common/Navigation";
import Footer from "../components/common/Footer";
import PageTransition from "../components/common/PageTransition";
import WhatsAppFloatingButton from "../components/common/WhatsAppFloatingButton";

const MainLayout = () => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Force scroll to top on initial load (refresh) AND on any route change
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="bg-brand-dark-900 min-h-screen text-brand-white selection:bg-brand-yellow selection:text-brand-dark-900 flex flex-col relative overflow-hidden font-sans">
      <Navigation />
      <main className="flex-grow w-full h-full relative z-10 pt-[88px] lg:pt-[104px]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default MainLayout;
