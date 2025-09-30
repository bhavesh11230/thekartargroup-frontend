import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileMenuOpen(false); // close mobile menu after clicking
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
      isScrolled ? 'shadow-lg bg-white' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-6 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/logo-no-background copy.png" 
            alt="Kartar Group Logo" 
            className="h-12 w-12"
          />
          <span className="text-2xl font-bold text-kartar-gold">Kartar Group</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-kartar-gold transition-colors duration-300 font-bold">
            About
          </button>
          <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-kartar-gold transition-colors duration-300 font-bold">
            Services & Products
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-kartar-gold transition-colors duration-300 font-bold">
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-kartar-gold focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // X icon
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // Hamburger
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-6">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-kartar-gold font-bold">
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-kartar-gold font-bold">
              Services & Products
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-kartar-gold font-bold">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;