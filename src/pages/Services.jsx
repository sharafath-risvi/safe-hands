import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServiceChapters from '../components/services/ServiceChapters';

const Services = () => {
  return (
    <div className="w-full bg-brand-dark-900 overflow-hidden">
      <ServicesHero />
      <ServiceChapters />
    </div>
  );
};

export default Services;
