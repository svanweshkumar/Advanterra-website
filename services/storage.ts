import { Project } from '../types';
import { INITIAL_PROJECTS } from '../constants';

export const getProjects = (): Project[] => {
  return INITIAL_PROJECTS;
};

export const getProjectById = (id: string): Project | undefined => {
  return INITIAL_PROJECTS.find(p => p.id === id);
};
