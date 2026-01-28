import React from 'react';
import { GraduationCap, Instagram, Facebook } from 'lucide-react';

const founders = [
  {
    name: 'Ashwin Kumar S V',
    role: 'Co-Founder',
    education: 'B.E, Mtech civil structural engineering',
    image: '/uploads/founders/Ashwin.PNG',
    socials: {
      instagram: 'https://www.instagram.com/ashwin_sv',
      facebook: 'https://www.facebook.com/ashwin.sv.1'
    }
  },
  {
    name: 'Himanth H S',
    role: 'Co-Founder',
    education: 'B.E, Mtech civil structural engineering',
    image: '/uploads/founders/Himanth.PNG',
    socials: {
      instagram: 'https://www.instagram.com/hshimanth',
      facebook: 'https://www.facebook.com/himanth.hs'
    }
  }
];

const Founders: React.FC = () => {
  return (
    <section id="founders" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-slate-50 skew-x-12 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h6 className="text-[#F26522] text-[10px] font-black uppercase tracking-[0.5em] mb-4">Leadership</h6>
          <h2 className="text-6xl md:text-7xl font-serif uppercase tracking-tight text-slate-900">The Founders</h2>
          <div className="w-16 h-1 bg-[#F26522] mx-auto mt-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {founders.map((founder, idx) => (
            <div key={idx} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:shadow-orange-200/50 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 scale-110 group-hover:scale-100"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-10 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent">
                  <div className="flex gap-4">
                    <a href={founder.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F26522] hover:border-[#F26522] transition-all">
                       <Instagram size={18} />
                    </a>
                    <a href={founder.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F26522] hover:border-[#F26522] transition-all">
                       <Facebook size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-slate-100 pb-6 mb-6">
                  <h3 className="text-4xl font-serif text-slate-900 group-hover:text-[#F26522] transition-colors duration-300">
                    {founder.name}
                  </h3>
                  <span className="text-[#F26522] text-[10px] font-black uppercase tracking-[0.4em]">
                    {founder.role}
                  </span>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                    <GraduationCap size={16} className="text-slate-400" />
                  </div>
                  <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">{founder.education}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
