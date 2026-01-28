
import React from 'react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Our Services</h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">Comprehensive construction solutions tailored to your unique vision.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;
            return (
              <div key={idx} className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <IconComponent size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-500 mb-8">{service.description}</p>
                <div className="w-8 h-1 bg-orange-600 rounded-full"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
