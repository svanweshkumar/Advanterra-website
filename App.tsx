
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 text-white pt-32 pb-16 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-transparent to-orange-600"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-black mb-6 tracking-tighter text-white">ADVENTERRA <br />CONSTRUCTION</h2>
              <p className="text-gray-400 font-medium leading-relaxed">Pioneering excellence in luxury construction and sustainable architectural design since 2019. We build beyond limits.</p>
              <div className="flex space-x-6">
                <a 
                  href="https://instagram.com/advanterra" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <Instagram size={20} />
               </a>
                <a 
                  href="https://www.facebook.com/share/188zUPvJ2d/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-orange-500 mb-10">Main Directory</h4>
              <ul className="space-y-5 text-gray-400 font-bold text-sm">
                <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors">Digital Home</button></li>
                <li><button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Portfolio</button></li>
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Company Story</button></li>
                <li><button onClick={() => document.getElementById('appointment')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Consultations</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] text-orange-500 mb-10">Head Office</h4>
              <ul className="space-y-6 text-gray-400 text-sm font-medium">
                <li className="flex items-start space-x-3"><MapPin size={16} className="text-orange-600 shrink-0 mt-1" /><span>672A, Hosakerehalli Layout, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085</span></li>
                <li className="flex items-center space-x-3"><Phone size={16} className="text-orange-600 shrink-0" /><span>+91 8970092228, 9964566801</span></li>
                <li className="flex items-center space-x-3"><Mail size={16} className="text-orange-600 shrink-0" /><span>advanterraconstruction@gmail.com</span></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-gray-800 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-black uppercase tracking-widest space-y-4 md:space-y-0">
            <div>© 2025 Adventerra Construction. All structural rights reserved.</div>
            <div className="flex space-x-10">
              <span className="hover:text-orange-500 transition-colors cursor-pointer">Privacy Protocol</span>
              <span className="hover:text-orange-500 transition-colors cursor-pointer">Terms of Service</span>
            </div>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:-translate-y-2 transition-transform active:scale-95"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/appointment" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
