export interface ServiceCaseStudy {
  clientGym: string;
  result: string;
  quote: string;
}

export interface BusinessService {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  overview: string;
  whatsIncluded?: string[];
  deliverables?: string[];
  benefits: string[];
  portfolioItems: { title: string; image: string }[];
  caseStudies: ServiceCaseStudy[];
  image: string;
  badge?: string;
}

export interface ServiceEnquiry {
  id: string;
  name: string;
  gymName: string;
  serviceRequired: string;
  mobile: string;
  email: string;
  additionalRequirements: string;
  createdAt: string;
  status: 'New' | 'In Touch' | 'Completed';
}
