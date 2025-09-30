import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Landscape grocery shopping images
  const images = [
    'https://img.freepik.com/premium-photo/interior-men-s-clothing-store-style-fashion_120897-3074.jpg?w=2000',
    'https://www.thestatesman.com/wp-content/uploads/2019/03/e-comm.jpg',
    'https://images.pexels.com/photos/5624981/pexels-photo-5624981.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    'https://static.vecteezy.com/system/resources/previews/023/489/783/non_2x/vegetable-farmer-market-counter-colorful-various-fresh-organic-healthy-vegetables-at-grocery-store-healthy-natural-food-concept-generative-ai-photo.jpg'
    
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
          <p className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg">
            Excellence Across Industries
          </p>

          <p className="text-lg text-white mb-10 leading-relaxed drop-shadow-md">
            Your trusted partner for innovative solutions, quality products, and exceptional
            services across diverse business sectors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('services')}
              className="px-7 py-3 bg-kartar-gold text-black font-semibold rounded-md hover:bg-kartar-gold transform hover:scale-105 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              Explore Our Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 border-2 border-kartar-gold text-kartar-gold font-semibold rounded-md hover:bg-kartar-gold hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>
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