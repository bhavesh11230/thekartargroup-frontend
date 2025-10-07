 import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Landscape grocery shopping images
  const images = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg',
    '/image6.jpg'
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full">
      {/* Hero Section with Images */}
      <section className="h-[70vh] flex items-center justify-center relative top-24 overflow-hidden">
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Grocery shopping ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Centered Content - Fixed while images slide */}
        <div className="relative z-10 w-full px-6">
          <div className="max-w-screen-md mx-auto text-center">
            <p className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              India's Trusted Export and Import House
            </p>

            <p className="text-lg text-white mb-10 leading-relaxed drop-shadow-md">
              Your trusted partner for international trade making sure your operation and business work smoothly!
            </p>

            {/* Buttons removed as requested */}
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-kartar-gold scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Arrow Section on White Background */}
      <div className="bg-white py-8 flex justify-center my-24">
        <button
          onClick={() => scrollToSection('about')}
          className="animate-bounce text-kartar-gold hover:text-kartar-gold transition-colors duration-300"
        >
          <ArrowDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
