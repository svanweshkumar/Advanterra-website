
export enum ProjectCategory {
  INTERIOR = 'Interior Design',
  HOME = 'Elevations',
  BUNGALOW = 'High-Rise Residential'
}

export interface ProjectMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  description: string;
  media: ProjectMedia[]; 
  createdAt: number;
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string; // ISO string
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  photo?: string;
  rating: number;
}


