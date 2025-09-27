import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-kartar-cream via-kartar-light to-kartar-100 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="/logo-no-background copy.png" 
              alt="Kartar Group Logo" 
              className="h-24 w-24 mx-auto mb-6 drop-shadow-lg"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-kartar-gold mb-6 leading-tight">
            Kartar Group
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-kartar-secondary mb-8 font-medium">
            Excellence Across Industries
          </p>
          
          {/* Description */}
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for innovative solutions, quality products, and exceptional services 
            across diverse business sectors.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-kartar-gold text-white font-semibold rounded-lg hover:bg-kartar-dark transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Our Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-kartar-gold text-kartar-gold font-semibold rounded-lg hover:bg-kartar-gold hover:text-white transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-kartar-gold hover:text-kartar-dark transition-colors duration-300"
          >
            <ArrowDown className="h-8 w-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;