
import { ProjectCategory, Project, Testimonial } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Exterior Design Proposal',
    category: ProjectCategory.HOME,
    description: 'A modern pavilion-style home with open spaces, large windows, and seamless indoor-outdoor living.',
    media: [
      { url: '/uploads/projects/Elevation-1.jpeg', type: 'image' },
      { url: '/uploads/projects/Elevation-2.jpeg', type: 'image' }
    ],
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Residential Interior Designs',
    category: ProjectCategory.INTERIOR,
    description: 'Thoughtfully crafted interior solutions that balance functionality, comfort, and modern aesthetics. Each space is designed with careful attention to layout, materials, lighting, and finishes to create refined, livable environments tailored to everyday living.',
    media: [
      { url: '/uploads/projects/Interior-1.jpeg', type: 'image' },
      { url: '/uploads/projects/Interior-2.jpeg', type: 'image' },
      { url: '/uploads/projects/Interior-3.jpeg', type: 'image' },
      { url: '/uploads/projects/Interior-4.jpeg', type: 'image' },
      { url: '/uploads/projects/Interior-5.jpeg', type: 'image' }
    ],
    createdAt: Date.now() - 86400000
  },
  {
    id: '3',
    name: 'Residential Projects',
    category: ProjectCategory.BUNGALOW,
    description: 'End-to-end residential construction projects focused on structural integrity, efficient planning, and timeless design. From independent homes to custom bungalows, each project is executed with precision, quality materials, and long-term durability in mind.',
    media: [
      { url: '/uploads/projects/Building-1.jpeg', type: 'image' },
      { url: '/uploads/projects/Building-2.jpeg', type: 'image' },
      { url: '/uploads/projects/Building-3.jpeg', type: 'image' },
      { url: '/uploads/projects/Building-4.jpeg', type: 'image' },
      { url: '/uploads/projects/Building-5.jpeg', type: 'image' }
    ],
    createdAt: Date.now() - 172800000
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'K G Vijendra',
    text: 'Advanterra Construction transformed our vision into reality with exceptional craftsmanship and attention to detail. Our new home is not just a structure; it\'s a masterpiece that reflects our lifestyle and values. Highly recommended!',
    rating: 5
  },
  {
    id: '2',
    name: 'Anup Desai',
    text: 'From the initial design consultation to the final walk-through, Advanterra exceeded our expectations in every way. Their team was professional, knowledgeable, and a pleasure to work with.',
    rating: 5
  },
  {
    id: '3',
    name: 'Vijeth',
    text: 'The team at Advanterra Construction delivered our project on time and within budget, without compromising on quality. Their expertise in modern architectural design truly stands out.',
    rating: 5
  },
  {
    id: '4',
    name: 'Praveen',
    text: 'Advanterra Construction provided innovative solutions to challenges we faced during our home build. Their commitment to excellence and customer satisfaction is unparalleled.',
    rating: 5
  }
];

export const SERVICES = [
  {
    title: 'Custom Home Design',
    description: 'We turn your dreams into blueprints with our expert architectural team.',
    icon: 'Layout'
  },
  {
    title: 'General Contracting',
    description: 'End-to-end management of residential and commercial construction projects.',
    icon: 'HardHat'
  },
  {
    title: 'Interior Renovation',
    description: 'Transforming existing spaces into modern, functional works of art.',
    icon: 'Palette'
  },
  {
    title: 'Project Management',
    description: 'Rigorous oversight to ensure timelines, budgets, and quality standards are met.',
    icon: 'ClipboardCheck'
  }
];
