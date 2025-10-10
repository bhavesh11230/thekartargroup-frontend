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
            Founded in 2012, Kartar Group is a diversified exporter, supplier,
            and trading company delivering a wide range of quality products
            across multiple industries. Our core portfolio includes
            pharmaceutical and laboratory chemicals, known for their purity,
            precise formulation, and reliable performance. Alongside chemicals,
            we also cater to global markets with agriculture products, leather
            goods, garments, handicrafts, and more, ensuring quality and
            consistency in every segment we serve.
          </p>

          <p className="text-lg text-gray-700 mb-14 leading-relaxed">
            Guided by the vision of our Founder, Mr. Rachit Wadhwa — a Chartered
            Accountant and experienced Internal Auditor — Kartar Group has built
            a strong reputation for trust, transparency, and ethical business
            practices. With a commitment to excellence and customer
            satisfaction, we continue to grow as a reliable name in
            international trade.
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
