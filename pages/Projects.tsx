
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project, ProjectCategory } from '../types';
import { INITIAL_PROJECTS } from '../constants';
import { Search, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  useEffect(() => {
    setProjects(INITIAL_PROJECTS);
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 sm:mb-20 md:mb-24">
          <span className="text-orange-600 font-black tracking-[0.4em] uppercase mb-3 sm:mb-4 md:mb-6 block text-xs sm:text-sm">Our Legacy</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter uppercase italic leading-[0.9]">Architectural <br /><span className="text-orange-600">Portfolio</span></h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed">
            From minimalist loft interiors to expansive glass pavilions, discover the structures that define the Apex ethos.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-14 md:mb-16 border-b border-gray-100 pb-6 sm:pb-8 md:pb-10">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mr-2 sm:mr-4">Classification:</span>
          {['All', ...Object.values(ProjectCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full font-black uppercase text-[8px] sm:text-[9px] md:text-[10px] tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-orange-600 text-white shadow-xl shadow-orange-600/20' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group flex flex-col">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] bg-gray-100 mb-6 sm:mb-8 md:mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={project.media[0]?.url || 'https://picsum.photos/seed/project/800/600'} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8">
                  <span className="bg-white/90 backdrop-blur-md text-gray-900 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/50 shadow-xl">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="px-4">
                <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase leading-none group-hover:text-orange-600 transition-colors duration-500">{project.name}</h3>
                <p className="text-gray-400 font-medium leading-relaxed line-clamp-2 mb-10">
                  {project.description}
                </p>
                <Link 
                  to={`/project/${project.id}`}
                  className="inline-flex items-center text-orange-600 font-black uppercase tracking-widest text-[10px] hover:translate-x-2 transition-transform"
                >
                  View Details <ArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-40 bg-gray-50 rounded-[5rem] border-4 border-dashed border-gray-100">
            <Search className="mx-auto text-gray-200 mb-8" size={64} />
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No portfolio matches for this classification.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
