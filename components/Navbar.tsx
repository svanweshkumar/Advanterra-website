
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, HardHat, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'projects' },
    { name: 'Reviews', id: 'testimonials' },
    { name: 'Book', id: 'appointment' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `/#${id}`);
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm py-4 border-b border-gray-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <button onClick={() => scrollToSection('home')} className="flex items-center space-x-3 focus:outline-none group">
            <img
              src="/uploads/logo/logo.png"
              alt="Adventerra Logo"
              className="h-16 w-auto group-hover:scale-110 transition-transform duration-500"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => scrollToSection(link.id)} 
                className={`transition-all font-black text-[10px] uppercase tracking-[0.2em] relative group/link ${isScrolled ? 'text-gray-700 hover:text-orange-600' : 'text-gray-100 hover:text-orange-400'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover/link:w-full"></span>
              </button>
            ))}
            {/* Admin login removed */}
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-gray-900' : 'text-white'} focus:outline-none p-2 bg-gray-900/5 backdrop-blur-md rounded-xl`}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-2xl absolute top-full left-0 w-full p-8 flex flex-col space-y-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500 rounded-b-[3rem]">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollToSection(link.id)} 
              className="text-2xl px-6 py-4 rounded-3xl text-left text-gray-900 hover:bg-gray-50 font-black uppercase tracking-tighter transition-all"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
