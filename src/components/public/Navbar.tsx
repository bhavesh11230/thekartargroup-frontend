import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? "shadow-lg bg-white" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl flex items-center justify-between relative">
        {/* Left: Kartar Group Name */}
        <div className="text-2xl font-semibold text-kartar-gold">
          Kartar Group
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src="/logo-no-background copy.png"
            alt="Kartar Group Logo"
            className="h-12 w-12"
          />
        </div>

        {/* Right: Desktop Navigation Links */}
        <div className="hidden md:flex items-center">
          {["about", "services", "why-choose-us", "contact"].map(
            (section, index, arr) => (
              <React.Fragment key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-kartar-gold px-4 py-1 transition-colors duration-300"
                >
                  {section === "about"
                    ? "About"
                    : section === "services"
                    ? "Product Portfolio"
                    : section === "why-choose-us"
                    ? "Why Choose Us"
                    : "Contact"}
                </button>
                {index < arr.length - 1 && (
                  <div className="w-px h-6 bg-gray-300 mx-2 shadow-sm" />
                )}
              </React.Fragment>
            )
          )}
        </div>

        {/* Mobile Menu Button (Right Side) */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-kartar-gold focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-kartar-gold"
            >
              About
            </button>
            <div className="w-24 h-px bg-gray-300 shadow-sm" />
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-kartar-gold"
            >
              Product Portfolio
            </button>
            <div className="w-24 h-px bg-gray-300 shadow-sm" />
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className="text-gray-700 hover:text-kartar-gold"
            >
              Why Choose Us
            </button>
            <div className="w-24 h-px bg-gray-300 shadow-sm" />
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-kartar-gold"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
