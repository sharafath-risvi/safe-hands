import React from 'react';
import HeroSection from '../components/home/HeroSection';
import OurStorySection from '../components/home/OurStorySection';
import ExpertiseSection from '../components/home/ExpertiseSection';
import PropertyJourneySection from '../components/home/PropertyJourneySection';
import WhySafeHandsSection from '../components/home/WhySafeHandsSection';
import ProjectsSection from '../components/home/ProjectsSection';
import FinalCTASection from '../components/home/FinalCTASection';

const Home = () => {
  return (
    <div className="w-full bg-[#050505] overflow-hidden -mt-[88px] lg:-mt-[104px]">
      {/* SCENE 01: HERO */}
      <HeroSection />

      {/* SCENE 02: OUR STORY */}
      <OurStorySection />

      {/* SCENE 03: OUR EXPERTISE / SERVICES */}
      <ExpertiseSection />

      {/* SCENE 04: PROPERTY JOURNEY */}
      <PropertyJourneySection />

      {/* SCENE 05: WHY SAFE HANDS */}
      <WhySafeHandsSection />

      {/* SCENE 06: PROJECTS */}
      <ProjectsSection />

      {/* SCENE 07: FINAL CTA */}
      <FinalCTASection />
    </div>
  );
};

export default Home;
