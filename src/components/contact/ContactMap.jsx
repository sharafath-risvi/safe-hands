import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactMap = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".cm-fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#ffffff] text-black py-24 lg:py-32 overflow-hidden flex flex-col items-center">
      
      {/* Map Header */}
      <div className="w-full max-w-[1400px] px-6 lg:px-12 mb-12 text-center lg:text-left cm-fade-up">
        <span className="text-brand-yellow text-xs font-mono tracking-[0.3em] uppercase mb-4 block font-bold">
          WHERE WE ARE
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight mb-4 text-black">
          FIND US
        </h2>
        <p className="text-lg text-gray-500 font-light max-w-xl">
          Visit our headquarters in the heart of T Nagar. We're always open to discussing how we can elevate your property.
        </p>
      </div>

      {/* Google Map Embed */}
      <div className="w-full lg:w-[95%] max-w-[1600px] h-[60vh] lg:h-[80vh] bg-[#f9f9f9] rounded-xl overflow-hidden border border-black/5 shadow-2xl relative cm-fade-up">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852331828771!2d80.2319083!3d13.0444583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52665126830159%3A0xc3cf9c771ba4862!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Safe Hands HQ Map"
        ></iframe>
        
        {/* Decorative architectural overlay elements */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-brand-yellow/30 pointer-events-none rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-brand-yellow/30 pointer-events-none rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-brand-yellow/30 pointer-events-none rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-brand-yellow/30 pointer-events-none rounded-br-xl" />
      </div>

    </section>
  );
};

export default ContactMap;
