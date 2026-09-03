import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Configuration constant for Contact Number
const CONTACT_NUMBER = "+919080820005"; // Replace with actual number if different

const WhatsAppFloatingButton = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial subtle reveal animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.8, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[54px] right-[24px] md:bottom-[60px] md:right-[96px] z-[99] flex flex-col items-center justify-center gap-[8px] md:gap-[10px]"
    >
      {/* CIRCULAR BACKGROUND */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[130px] md:w-[84px] md:h-[150px] bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl -z-10 pointer-events-none"></div>

      {/* PHONE BUTTON */}
      <a
        href={`tel:${CONTACT_NUMBER}`}
        className="flex items-center justify-center w-[48px] h-[48px] md:w-[56px] md:h-[56px] bg-[#0A84FF] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
        aria-label="Call us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      </a>

      {/* WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${CONTACT_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-[48px] h-[48px] md:w-[56px] md:h-[56px] bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 md:w-8 md:h-8"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloatingButton;
