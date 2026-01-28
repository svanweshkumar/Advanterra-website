
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { getProjects } from '../services/storage';
import { ChevronLeft, PlayCircle } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const projects = getProjects();
    const found = projects.find(p => p.id === id);
    if (found) {
      setProject(found);
      setActiveIndex(0);
    }
  }, [id]);

  if (!project) return <div className="pt-32 text-center">Project not found.</div>;

  const activeMedia = project.media[activeIndex];

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-12 transition-all font-black uppercase tracking-widest text-sm">
          <ChevronLeft size={20} className="mr-1" /> Back to Website
        </Link>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl bg-gray-900 aspect-video relative border-8 border-white group">
              {activeMedia.type === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
                  <PlayCircle size={80} className="text-orange-600 mb-4 opacity-80" />
                  <span className="text-white/50 font-bold uppercase tracking-widest text-xs">Video Stream: {activeMedia.url}</span>
                </div>
              ) : (
                <img src={activeMedia.url} alt={project.name} className="w-full h-full object-cover" />
              )}
              <div className="absolute bottom-10 left-10 bg-black/50 backdrop-blur-xl px-6 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest">
                {activeMedia.type === 'image' ? 'Photograph' : 'Video Footage'}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {project.media.map((m, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-3xl overflow-hidden border-4 transition-all relative ${activeIndex === i ? 'border-orange-500 scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  {m.type === 'video' ? (
                    <div className="w-full aspect-square bg-black flex items-center justify-center text-white"><PlayCircle size={20} /></div>
                  ) : (
                    <img src={m.url} className="w-full aspect-square object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">{project.category}</span>
            <h1 className="text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">{project.name}</h1>
            <p className="text-gray-500 text-xl leading-relaxed mb-12 font-medium">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
