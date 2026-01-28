
import React from 'react';
import Founders from '../components/Founders';

const About: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20 md:mb-24">
          <div className="flex-1">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs sm:text-sm">Our Story</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-6 sm:mb-8">Building Legacies for Over a Decade.</h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed">
              Founded in 2012, Adventerra Construction started as a small team of passionate architects and builders with a single vision: to redefine quality in the construction industry. Today, we stand as one of the most trusted names in the region.
            </p>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Our philosophy is simple—transparency, integrity, and uncompromising quality. We believe every project is a partnership, and we treat your home as if it were our own.
            </p>
          </div>
          <div className="flex-1 w-full">
            <img src="https://picsum.photos/seed/about/600/500" className="rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] shadow-2xl w-full" alt="Team" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: 'Our Mission', text: 'To provide innovative, sustainable, and affordable construction solutions that exceed client expectations.' },
            { title: 'Our Vision', text: 'To be the global benchmark for excellence in architectural design and residential engineering.' },
            { title: 'Our Values', text: 'Professionalism, craftsmanship, sustainability, and customer-centricity are at the core of everything we do.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Founders />
    </div>
  );
};

export default About;
