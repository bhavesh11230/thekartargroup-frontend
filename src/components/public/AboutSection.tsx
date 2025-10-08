 import React from "react";
import { Award, Users, Globe } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="pt-10 pb-20 bg-white w-full scroll-mt-24 md:scroll-mt-28"
    >
      <div className="mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 max-w-[1600px]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-kartar-gold mb-8 tracking-tight">
            About Kartar Group
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Established in the year 2012, we, Kartar Group, are one of the
            glorious exporters, suppliers, distributors, wholesalers, traders,
            and retailers of an unlimited compilation of Pharmaceutical and Lab
            Chemical. Our product range encompasses Industrial Chemicals,
            Pharmaceutical Chemicals and Pharma Chemicals, which are massively
            acclaimed for their longer shelf life, precise composition,
            effective results and purity. Backed by a gigantic product line and
            good financial position & TQM, we have gained an unmatched
            reputation in the business.
          </p>

          <p className="text-lg text-gray-700 mb-14 leading-relaxed">
            Under the capable leadership of our Founder, Mr. Rachit Wadhwa, a
            seasoned Internal Auditor with Chartered Accountancy degree from
            India, we have earned an unmatched position in the country and
            gained massive acceptance of our esteemed customers. Our company is
            based on the grounds of moral values, principles, and ethics.
          </p>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Excellence Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <Award className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Committed to deliver exceptional quality.
              </p>
            </div>

            {/* Partnership Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <Users className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Partnership
              </h3>
              <p className="text-gray-600">
                Building lasting relationships throughout the supply chain to
                add impactful value to all stakeholders' business.
              </p>
            </div>

            {/* Innovation Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <Globe className="h-12 w-12 text-kartar-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                Embracing new technologies and AI to stay ahead in the market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
