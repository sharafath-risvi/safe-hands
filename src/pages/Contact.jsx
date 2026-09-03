import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactHero from '../components/contact/ContactHero';
import ContactIntroQuote from '../components/contact/ContactIntroQuote';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactMap from '../components/contact/ContactMap';
import FinalCTASection from '../components/home/FinalCTASection';

const Contact = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact-form') {
      setTimeout(() => {
        const el = document.getElementById('contact-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Short delay to allow GSAP and layout to initialize
    }
  }, [location]);

  return (
    <div className="w-full bg-[#ffffff] overflow-hidden text-black">
      <ContactHero />
      <ContactIntroQuote />
      <ContactFormSection />
      <ContactMap />
      <FinalCTASection />
    </div>
  );
};

export default Contact;
