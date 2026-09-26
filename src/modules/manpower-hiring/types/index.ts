export type JobRoleCategory =
  | 'Management'
  | 'HR & Administration'
  | 'Sales & Front Desk'
  | 'Fitness Team'
  | 'Group Classes'
  | 'Nutrition & Recovery'
  | 'Facility Operations';

export interface JobListing {
  id: string;
  title: string;
  category: JobRoleCategory;
  gymName: string;
  companyName?: string;
  location: string;
  salaryRange: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  experience: string;
  description: string;
  requirements: string[];
  createdAt: string;
  applicationsCount: number;
  isActive?: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  gymName: string;
  fullName: string;
  mobile: string;
  email: string;
  resumeFileName: string;
  experience: string;
  preferredLocation: string;
  preferredCity?: string;
  preferredSalary?: string;
  skills?: string[];
  certifications: string;
  submittedAt: string;
  status: 'Pending Review' | 'Shortlisted' | 'Contacted' | 'Rejected';
}
