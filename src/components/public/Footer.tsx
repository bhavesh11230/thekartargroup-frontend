import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-kartar-secondary text-white py-12 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img 
              src="/logo-no-background copy.png" 
              alt="Kartar Group Logo" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold">Kartar Group</span>
          </div>
          
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