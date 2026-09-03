import React from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import FounderSection from '../components/about/FounderSection';
import MissionVision from '../components/about/MissionVision';
import TimelineSection from '../components/about/TimelineSection';
import FinalCTASection from '../components/home/FinalCTASection';

const About = () => {
  return (
    <div className="w-full bg-[#050505] overflow-hidden text-brand-white">
      <AboutHero />
      <OurStory />
      <FounderSection />
      <MissionVision />
      <TimelineSection />
      <FinalCTASection />
    </div>
  );
};

export default About;
