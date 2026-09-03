import React from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactIntroQuote from '../components/contact/ContactIntroQuote';
import ContactFormSection from '../components/contact/ContactFormSection';
import ContactMap from '../components/contact/ContactMap';
import FinalCTASection from '../components/home/FinalCTASection';

const Contact = () => {
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
