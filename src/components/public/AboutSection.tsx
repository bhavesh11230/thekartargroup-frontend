import React from 'react';
import { Award, Users, Globe } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-6">
            About Kartar Group
          </h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Established with a vision to excel in diverse business ventures, Kartar Group has grown 
            into a trusted name across multiple industries. Our commitment to quality, innovation, 
            and customer satisfaction drives everything we do.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Award className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering exceptional quality in all our business endeavors.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Users className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Partnership</h3>
              <p className="text-gray-600">
                Building lasting relationships with our clients, partners, and communities.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Globe className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Embracing new technologies and methodologies to stay ahead in the market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;