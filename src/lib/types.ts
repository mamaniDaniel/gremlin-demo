export interface GraphNode {
  id: string;
  label: string;
  name: string;
  properties: Record<string, string>;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
  properties: Record<string, string>;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface DeveloperSummary {
  id: string;
  name: string;
  role: string;
  seniority: string;
  skills: string[];
}

export interface DeveloperProfile {
  id: string;
  name: string;
  role: string;
  seniority: string;
  company: string | null;
  skills: { name: string; level: string }[];
  projects: string[];
  collaborators: { id: string; name: string; role: string }[];
}

export interface DeveloperNetwork {
  developer: string;
  collaborators: {
    id: string;
    name: string;
    role: string;
    skills: string[];
  }[];
  networkSkills: string[];
}

export interface SkillRanking {
  name: string;
  category: string;
  projectCount: number;
}

export interface SkillRecommendation {
  developer: string;
  ownSkills: string[];
  recommendations: {
    fromNetwork: { skill: string; knownBy: string; level: string }[];
    fromProjects: string[];
  };
}
