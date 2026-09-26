import { JobListing } from '../types';

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job-1',
    title: 'Executive Club General Manager',
    category: 'Management',
    gymName: 'Empire Athletic Club',
    location: 'Bengaluru, Karnataka',
    salaryRange: '₹65,000 - ₹95,000 / month + Profit Share',
    type: 'Full-time',
    experience: '4+ Years',
    description: 'Lead complete 40,000 sq ft commercial facility operations, club P&L performance, departmental team leadership, and luxury member experience benchmarks.',
    requirements: [
      'Degree in Sports Management / MBA',
      '3+ years managing premier health clubs',
      'P&L and team management expertise'
    ],
    createdAt: '1 day ago',
    applicationsCount: 8
  },
  {
    id: 'job-2',
    title: 'Facility HR & Administrative Operations Lead',
    category: 'HR & Administration',
    gymName: 'Apex High-Performance Hub',
    location: 'Mumbai, Maharashtra',
    salaryRange: '₹35,000 - ₹52,000 / month',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Manage trainer hiring funnels, staff payroll, compliance, attendance tracking, vendor billing, and corporate administration for the fitness facility.',
    requirements: [
      'Bachelor’s in Human Resources or Business Administration',
      'Proven experience in fitness or hospitality staffing',
      'Proficiency in payroll software & vendor management'
    ],
    createdAt: '2 days ago',
    applicationsCount: 14
  },
  {
    id: 'job-3',
    title: 'Senior Membership Sales Executive & Receptionist',
    category: 'Sales & Front Desk',
    gymName: 'Vanguard Fitness Sanctuary',
    location: 'Delhi NCR',
    salaryRange: '₹28,000 - ₹48,000 / month + Uncapped Incentives',
    type: 'Full-time',
    experience: '1-3 Years',
    description: 'Drive high-conversion club tours, corporate wellness packages, member check-in greeting, telephone inquiry handling, and POS retail desk operations.',
    requirements: [
      'Proven sales and customer service background',
      'Strong verbal communication and CRM management',
      'Passionate fitness advocate'
    ],
    createdAt: '3 days ago',
    applicationsCount: 21
  },
  {
    id: 'job-4',
    title: 'Head Trainer, Gym Trainers & Personal Trainers (PTs)',
    category: 'Fitness Team',
    gymName: 'IronEdge Performance Center',
    location: 'Hyderabad, Telangana',
    salaryRange: '₹45,000 - ₹85,000 / month + PT Commission',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'Supervise gym floor trainers, guide member lifting form, conduct body composition assessments, and deliver periodized 1-on-1 personal training packages.',
    requirements: [
      'NASM-CPT / CSCS / ACE / K11 Certification',
      'Strong knowledge of functional hypertrophy & rehab',
      'CPR / AED Certified'
    ],
    createdAt: '1 day ago',
    applicationsCount: 19
  },
  {
    id: 'job-5',
    title: 'Group Class Coach (Yoga, Zumba, CrossFit/HIIT & Sound Healing)',
    category: 'Group Classes',
    gymName: 'Aura Movement Studio',
    location: 'Pune, Maharashtra',
    salaryRange: '₹35,000 - ₹60,000 / month',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Lead dynamic group studio classes across Yoga, Zumba dance fitness, high-intensity CrossFit/HIIT conditioning, and restorative sound healing workshops.',
    requirements: [
      'Certified Yoga Instructor (RYT 200) / Licensed Zumba / CrossFit L1',
      'Energetic stage presence and group leadership',
      'Sound bath / breathwork experience is a plus'
    ],
    createdAt: '4 days ago',
    applicationsCount: 12
  },
  {
    id: 'job-6',
    title: 'Sports Dietitian, Nutritionist & Physiotherapist',
    category: 'Nutrition & Recovery',
    gymName: 'Hyperion Athletic Sanctuary',
    location: 'Chennai, Tamil Nadu',
    salaryRange: '₹40,000 - ₹65,000 / month',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Design tailored macronutrient plans, metabolic body composition strategies, athletic injury rehabilitation, and manual physiotherapy recovery sessions.',
    requirements: [
      'B.Sc/M.Sc in Nutrition / Dietetics or BPT in Physiotherapy',
      'Experience with InBody body composition analysis',
      'Athletic rehabilitation & musculoskeletal expertise'
    ],
    createdAt: '5 days ago',
    applicationsCount: 9
  },
  {
    id: 'job-7',
    title: 'Facility Operations Lead (Housekeeping, Maintenance & Security)',
    category: 'Facility Operations',
    gymName: 'Titan Commercial Health Club',
    location: 'Ahmedabad, Gujarat',
    salaryRange: '₹22,000 - ₹35,000 / month',
    type: 'Full-time',
    experience: '2+ Years',
    description: 'Lead round-the-clock housekeeping hygiene, locker room steam sanitation, equipment preventive maintenance, cable inspection, and front gate security management.',
    requirements: [
      'Prior experience in commercial gym facility operations or hospitality',
      'Knowledge of gym equipment hardware maintenance',
      'High standards for facility hygiene and visitor safety'
    ],
    createdAt: '6 days ago',
    applicationsCount: 16
  }
];
