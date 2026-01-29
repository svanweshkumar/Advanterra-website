
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Added missing Clock icon to lucide-react imports
import { ArrowRight, CheckCircle, ShieldCheck, Mail, Phone, MapPin, Layout, HardHat, Palette, ClipboardCheck, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Star, Award, Building2, Trophy, Target, Clock } from 'lucide-react';
import { Project, ProjectCategory, Testimonial } from '../types';
import { INITIAL_PROJECTS, INITIAL_TESTIMONIALS, SERVICES } from '../constants';
import Founders from '../components/Founders';

const API_URL = '';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const { hash } = useLocation();
  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const serviceIcons: Record<string, any> = {
    Layout,
    HardHat,
    Palette,
    ClipboardCheck
  };

  useEffect(() => {
    setProjects(INITIAL_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 150);
      }
    }
  }, [hash]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    
    if (now - lastSubmitTime < 60000) {
      alert("Please wait a moment before submitting again.");
      return;
    }

    // Strict 10-digit validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid Phone: Please enter exactly 10 digits.");
      return;
    }

    // Valid email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid Email: Please provide a valid email address.");
      return;
    }

    if (!formData.date) {
      alert("Please select a date.");
      return;
    }

    const sanitizeInput = (str: string): string => {
      if (!str) return '';
      return str
        .replace(/<[^>]*>?/gm, '')
        .replace(/on\w+\s*=/gi, 'blocked_attr=')
        .replace(/javascript:/gi, 'blocked_proto:')
        .trim();
    };

    const sanitizedData = {
      ...formData,
      fullName: sanitizeInput(formData.fullName),
      message: sanitizeInput(formData.message)
    };

    setLastSubmitTime(now);

    try {
      const response = await fetch(`${API_URL}/api/book-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment. Please try again.');
    }
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const isPast = date < today;
      days.push({ date, dateStr, isPast });
    }
    return days;
  }, [currentMonth]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    const diff = (newDate.getFullYear() - today.getFullYear()) * 12 + (newDate.getMonth() - today.getMonth());
    if (diff >= 0 && diff <= 1) setCurrentMonth(newDate);
  };

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="flex flex-col scroll-smooth">
      {/* Hero */}
      <section id="home" className="relative min-h-screen sm:h-screen flex items-center pt-16 sm:pt-20 pb-12 sm:pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/uploads/logo/Home.jpg" alt="Construction" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
            <span className="inline-flex items-center bg-orange-600/20 backdrop-blur-md border border-orange-600/30 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 text-orange-500">
              <span className="w-2 h-2 bg-orange-600 rounded-full mr-2 animate-pulse"></span>
              Defining the Modern Skyline
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-6 sm:mb-8 tracking-tighter uppercase leading-[0.9]">
              Adventerra <br /> <span className="text-orange-600">Construction</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-12 max-w-xl text-gray-300 font-medium leading-relaxed border-l-4 border-orange-600 pl-4 sm:pl-6">
              Bespoke architectural solutions for high-end residential, premium interiors, and iconic bungalows. Crafting legacies in concrete and glass.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="group bg-orange-600 px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-orange-600/40 hover:bg-orange-700 transition-all flex items-center justify-center text-base sm:text-lg">
                Explore Portfolio
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
              </button>
              <button onClick={() => document.getElementById('appointment')?.scrollIntoView({behavior: 'smooth'})} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-gray-900 transition-all text-base sm:text-lg">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 sm:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5]">
               <img src="/uploads/logo/About-us.jpg" className="w-full h-full object-cover" alt="Modern Architecture" />
            </div>
          </div>
          <div>
            <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-4 block text-sm">Our Pedigree</span>
            <h2 className="text-6xl font-black mb-10 leading-[1.1] tracking-tighter uppercase italic">Precision is our <br /><span className="text-orange-600">signature.</span></h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
              We aren't just builders; we are stewards of your vision. For over a decade, Adventerra Construction has curated spaces that define modern living. We merge structural integrity with aesthetic brilliance to create properties that stand the test of time.
            </p>
            <div className="space-y-6">
              <div className="flex items-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 mr-6"><CheckCircle size={24} /></div>
                <div><h4 className="font-black text-gray-900 uppercase text-sm mb-1 tracking-tight">Rigorous Quality Protocol</h4><p className="text-xs text-gray-400 font-bold uppercase tracking-widest">ISO 9001 Certified Engineering</p></div>
              </div>
              <div className="flex items-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-600 mr-6"><ShieldCheck size={24} /></div>
                <div><h4 className="font-black text-gray-900 uppercase text-sm mb-1 tracking-tight">Zero-Accident Philosophy</h4><p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Advanced Site Safety Standards</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-32 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-3 sm:mb-4 block text-xs sm:text-sm">What we do</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-tighter uppercase italic">Core Competencies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-medium text-sm sm:text-base">Comprehensive construction management for the discerning property owner.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {SERVICES.map((s) => {
              const Icon = serviceIcons[s.icon] || CheckCircle;
              return (
                <div key={s.title} className="bg-white p-12 rounded-[4rem] shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all text-left border border-gray-100 group hover:-translate-y-4">
                  <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                    <Icon size={40}/>
                  </div>
                  <h3 className="text-3xl font-black mb-6 tracking-tighter uppercase leading-none">{s.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed mb-8">{s.description}</p>
                  <div className="w-12 h-1 bg-gray-100 group-hover:bg-orange-600 group-hover:w-full transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Portfolio */}
      <section id="projects" className="py-20 sm:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20">
            <div className="mb-8 sm:mb-10 md:mb-0">
              <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-2 sm:mb-4 block text-xs sm:text-sm">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Signature Works</h2>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['All', ...Object.values(ProjectCategory)].map(c => (
                <button key={c} onClick={() => setFilter(c as any)} className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-black uppercase text-[8px] sm:text-[10px] tracking-widest transition-all ${filter === c ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {filteredProjects.map(p => (
              <div key={p.id} className="group bg-white rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
                <div className="h-96 overflow-hidden relative">
                   <img src={p.media[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                      <span className="text-white font-black uppercase text-[10px] tracking-widest border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">{p.category}</span>
                   </div>
                </div>
                <div className="p-12">
                  <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none">{p.name}</h3>
                  <Link to={`/project/${p.id}`} className="group/btn inline-flex items-center text-orange-600 font-black uppercase tracking-widest text-[10px]">
                    View Details 
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-all" size={16}/>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Achievement Section */}
      <section className="bg-gray-900 py-32 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div className="flex flex-col items-center">
               <Trophy className="text-orange-600 mb-6" size={48} />
               <div className="text-5xl font-black text-white mb-2 italic">12</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Years Industry Experience</div>
            </div>
            <div className="flex flex-col items-center">
               <Building2 className="text-orange-600 mb-6" size={48} />
               <div className="text-5xl font-black text-white mb-2 italic">500</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Projects Completed</div>
            </div>
            <div className="flex flex-col items-center">
               <Target className="text-orange-600 mb-6" size={48} />
               <div className="text-5xl font-black text-white mb-2 italic">80+</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Master Craftsmen</div>
            </div>
            <div className="flex flex-col items-center">
               <Award className="text-orange-600 mb-6" size={48} />
               <div className="text-5xl font-black text-white mb-2 italic">25</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Industrial Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Consultation */}
      <section id="appointment" className="py-32 bg-gray-50 scroll-mt-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-4 block text-sm">Consultation</span>
              <h2 className="text-6xl font-black mb-10 uppercase tracking-tighter italic">Secure your <br /><span className="text-orange-600">Timeline.</span></h2>
              <p className="text-gray-500 text-lg mb-12 font-medium leading-relaxed">Schedule a session with our design principals. Our calendar syncs with on-site availability to ensure focused deliberation on your specific architectural needs.</p>
              <div className="space-y-6">
                 <div className="flex items-center space-x-6 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                   <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Clock size={28}/></div>
                   <div><h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">Priority Response</h4><p className="text-[10px] text-gray-400 font-bold uppercase">Average response time: 4-6 hours</p></div>
                 </div>
              </div>
            </div>
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl relative border border-gray-50">
              {submitted ? (
                <div className="text-center py-16 animate-in zoom-in-95 duration-500">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">Request Logged</h3>
                  <p className="text-gray-400 font-medium mb-10">Our concierge team has been notified. We will reach out within the day to confirm your slot for <span className="text-orange-600 font-black">{formData.date}</span>.</p>
                  <button onClick={() => setSubmitted(false)} className="bg-gray-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs">New Consultation</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      required 
                      placeholder="Full Name" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-8 py-5 outline-none focus:border-orange-500 font-bold" 
                      value={formData.fullName} 
                      onChange={e => setFormData({...formData, fullName: e.target.value})} 
                    />
                    <input 
                      type="email" 
                      required 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-8 py-5 outline-none focus:border-orange-500 font-bold" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="tel" 
                      required 
                      placeholder="Phone Number (10 digits)" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-8 py-5 outline-none focus:border-orange-500 font-bold" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10)})} 
                    />
                  </div>
                  
                  <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-200">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-[12px] font-black uppercase tracking-widest text-gray-400">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
                      <div className="flex space-x-3">
                        <button type="button" onClick={() => changeMonth(-1)} className="w-10 h-10 bg-white shadow-sm hover:bg-orange-50 rounded-xl text-gray-400 flex items-center justify-center transition-colors"><ChevronLeft size={20}/></button>
                        <button type="button" onClick={() => changeMonth(1)} className="w-10 h-10 bg-white shadow-sm hover:bg-orange-50 rounded-xl text-gray-400 flex items-center justify-center transition-colors"><ChevronRight size={20}/></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {['S','M','T','W','Th','F','Sa'].map((d, i) => <div key={`header-${i}`} className="text-center text-[10px] font-black text-gray-300 py-2">{d}</div>)}
                      {calendarDays.map((day, i) => {
                        if (!day) return <div key={`empty-${i}`} className="h-12"></div>;
                        const isSelected = formData.date === day.dateStr;
                        const disabled = day.isPast;
                        return (
                          <button
                            key={day.dateStr}
                            type="button"
                            disabled={disabled}
                            onClick={() => setFormData({...formData, date: day.dateStr})}
                            className={`h-12 rounded-2xl text-xs font-black transition-all relative overflow-hidden flex items-center justify-center ${isSelected ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/40' : 'bg-white text-gray-700 hover:border-orange-500 border border-transparent'} ${disabled ? 'opacity-20 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'}`}
                          >
                            {day.date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button type="submit" disabled={!formData.date} className="w-full bg-orange-600 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-600/40 hover:bg-orange-700 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all">Request Formal Slot</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-4 block text-sm">Client Verbatim</span>
            <h2 className="text-5xl font-black mb-10 uppercase tracking-tighter italic leading-none">Voices of Excellence</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map(t => (
              <div key={t.id} className="bg-gray-50 p-16 rounded-[4rem] text-left border border-gray-100 flex flex-col relative group">
                <div className="absolute top-10 right-16 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Building2 size={80} className="text-orange-600" />
                </div>
                <div className="flex space-x-1 mb-10 text-orange-500">
                  {[...Array(t.rating)].map((_, i) => <Star key={`star-${t.id}-${i}`} size={20} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 text-2xl font-black italic mb-12 leading-relaxed tracking-tight">"{t.text}"</p>
                <div className="mt-auto flex items-center space-x-6">
                  {t.photo && (
                    <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border-2 border-white shadow-xl">
                      <img src={t.photo} className="w-full h-full object-cover" alt={t.name} />
                    </div>
                  )}
                  <div>
                    <span className="font-black text-gray-900 uppercase tracking-widest text-xs block mb-1">{t.name}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Homeowner</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Founders />

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-gray-900 text-white scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
           <img src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 relative z-10">
          <div>
            <h2 className="text-6xl font-black mb-16 uppercase tracking-tighter leading-[0.9] italic">Craft your <br /><span className="text-orange-600">legacy.</span></h2>
            <div className="space-y-12">
              <div className="flex items-center space-x-8 group">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-orange-600 transition-colors duration-500">
                  <MapPin className="text-orange-600 group-hover:text-white" size={32} />
                </div>
                <div><h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-2 text-gray-500">Visit us</h4><p className="text-xl font-black tracking-tight text-white uppercase">672A, Hosakerehalli Layout, Banashankari 3rd Stage, Banashankari, Bengaluru, Karnataka 560085</p></div>
              </div>
              <div className="flex items-center space-x-8 group">
                <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-orange-600 transition-colors duration-500">
                  <Phone className="text-orange-600 group-hover:text-white" size={32} />
                </div>
                <div><h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-2 text-gray-500">Direct Line</h4><p className="text-xl font-black tracking-tight text-white uppercase">+91 8970092228, 9964566801</p></div>
              </div>
            </div>
          </div>
          <div className="h-[600px] rounded-[5rem] overflow-hidden border-[16px] border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5923124678698!2d77.53790537495523!3d12.933904087378057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f004da9553d%3A0x5c9817286f2b6925!2sADVANTERRA%20CONSTRUCTION!5e0!3m2!1sen!2sin!4v1769445188684!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
