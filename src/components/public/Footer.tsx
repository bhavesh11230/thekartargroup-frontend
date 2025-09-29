import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B1B12] text-white py-16 w-full"> 
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="/logo-no-background copy.png" 
              alt="Kartar Group Logo" 
              className="h-16 w-16 md:h-20 md:w-20" 
            />
            <span className="text-2xl font-bold">Kartar Group</span>
          </div>

          {/* Address and Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-200">123 Business Street, Mumbai, India</p>
            <p className="text-gray-200">Email: <a href="mailto:info@kartargroup.com" className="underline">info@kartargroup.com</a></p>
            <p className="text-gray-200">Phone: +91 98765 43210</p>
          </div>

          {/* Rights and Tagline */}
          <div className="text-center md:text-right">
            <p className="text-gray-300">
              © 2025 Kartar Group. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Built with excellence and dedication
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
