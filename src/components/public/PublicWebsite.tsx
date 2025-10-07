import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import HeroSection from './HeroSection';
import WhyChooseUsSection from './WhyChooseUsSection';

const PublicWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-kartar-cream w-full">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default PublicWebsite;