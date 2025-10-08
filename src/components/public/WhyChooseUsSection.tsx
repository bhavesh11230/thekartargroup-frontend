 import React from "react";
import { Handshake, Clock, Award } from "lucide-react";

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="why-choose-us" className="pt-32 pb-24 bg-white w-full">
      <div className="mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1600px]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-8 tracking-tight">
            Why Choose Us
          </h2>

          <p className="text-lg text-gray-700 mb-14 leading-relaxed">
            Kartar Group is your trusted partner for global trade — delivering excellence, reliability, 
            and professionalism in every transaction.
          </p>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Point 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <Handshake className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Reliable Partner for Global Trade
              </h3>
              <p className="text-gray-600">
                Kartar Group stands for integrity, professionalism, and consistency. 
                We bridge the gap between Indian manufacturers and international buyers 
                with smooth, transparent, and result-driven trade operations.
              </p>
            </div>

            {/* Point 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <Award className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Commitment to Excellence & Timely Delivery 
              </h3>
              <p className="text-gray-600">
                Our strong network of Indian manufacturers and efficient logistics ensure every order is fulfilled with precision, 
                quality assurance, and on-time dispatch — every single time. 
                From industrial chemicals and leather goods to traditional Indian items, garments, and agricultural products, 
                we deliver authentic, high-quality goods that meet global standards.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
