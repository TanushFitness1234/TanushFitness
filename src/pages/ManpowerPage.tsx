import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobListing, JobRoleCategory } from '../types';
import { SEO } from '../components/common/SEO';
import {
  Users,
  Briefcase,
  Plus,
  MapPin,
  CheckCircle2,
  UserCheck,
  X,
  Phone,
  Send,
  Sparkles,
  Award,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarqueeStrip } from '../components/common/MarqueeStrip';

export const ManpowerPage: React.FC = () => {
  const {
    jobListings,
    addJobListing,
    submitJobApplication,
    showToast
  } = useApp();

  const [activeUserRole, setActiveUserRole] = useState<'candidate' | 'employer'>('candidate');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Candidate Form
  const [candidateForm, setCandidateForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    experience: '3-5 Years',
    preferredCity: '',
    preferredSalary: '₹40,000 - ₹60,000 / month',
    skills: 'Personal Training, Club Management, Biomechanics, Sales, Group Fitness',
    certifications: 'NASM-CPT / CSCS / ACE / K11 / RYT-200 Certified',
    resumeFileName: 'Resume_Executive.pdf',
  });

  // Employer Post Job Form
  const [jobForm, setJobForm] = useState({
    title: '',
    category: 'Fitness Team' as JobRoleCategory,
    gymName: '',
    location: '',
    salaryRange: '₹45,000 - ₹75,000 / month',
    type: 'Full-time' as 'Full-time' | 'Part-time' | 'Contract',
    experience: '2-4 Years',
    description: '',
    requirements: 'Certified in designated discipline, 2+ Years Commercial Experience',
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !candidateForm.fullName || !candidateForm.mobile) {
      showToast('Please provide your Full Name and Mobile Number.', 'error');
      return;
    }

    submitJobApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      gymName: selectedJob.gymName,
      fullName: candidateForm.fullName,
      mobile: candidateForm.mobile,
      email: candidateForm.email,
      resumeFileName: candidateForm.resumeFileName,
      experience: candidateForm.experience,
      preferredLocation: candidateForm.preferredCity || selectedJob.location,
      preferredCity: candidateForm.preferredCity,
      preferredSalary: candidateForm.preferredSalary,
      skills: candidateForm.skills.split(',').map(s => s.trim()),
      certifications: candidateForm.certifications,
    });

    showToast('Application sent directly to Gym Director!', 'success');
    setIsApplyModalOpen(false);
    setSelectedJob(null);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.gymName || !jobForm.location) {
      showToast('Please provide Job Title, Gym/Club Name, and Location.', 'error');
      return;
    }

    addJobListing({
      title: jobForm.title,
      category: jobForm.category,
      gymName: jobForm.gymName,
      location: jobForm.location,
      salaryRange: jobForm.salaryRange,
      type: jobForm.type,
      experience: jobForm.experience,
      description: jobForm.description,
      requirements: jobForm.requirements.split(',').map(r => r.trim()),
    });

    showToast('Role published to Master Coaches board!', 'success');
    setIsPostJobModalOpen(false);
    setJobForm({
      title: '',
      category: 'Fitness Team',
      gymName: '',
      location: '',
      salaryRange: '₹45,000 - ₹75,000 / month',
      type: 'Full-time',
      experience: '2-4 Years',
      description: '',
      requirements: '',
    });
  };

  const MANPOWER_SERVICES: {
    id: string;
    category: JobRoleCategory;
    title: string;
    rolesIncluded: string;
    image: string;
    badge: string;
    tagline: string;
    description: string;
    rolesList: string[];
    deliverables: string[];
    experienceLevel: string;
    deploymentTime: string;
  }[] = [
    {
      id: 'management',
      category: 'Management',
      title: 'Executive Club Management',
      rolesIncluded: 'Club Manager',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      badge: 'Executive Leadership',
      tagline: 'Strategic Club General Managers & Operations Directors',
      description: 'Senior club general managers and operations directors equipped to oversee commercial facility P&L, membership retention protocols, departmental staffing KPIs, and high-standard hospitality governance.',
      rolesList: ['Club General Manager', 'Operations Director', 'Branch Head / Facility Lead'],
      deliverables: [
        'Comprehensive club P&L & financial revenue management',
        'Cross-departmental staff scheduling & team KPI governance',
        'VIP member satisfaction, retention & escalation handling',
        'Facility hygiene, safety compliance & SOP governance'
      ],
      experienceLevel: '4+ to 8+ Years Experience',
      deploymentTime: '7-14 Days Pan-India'
    },
    {
      id: 'hr-admin',
      category: 'HR & Administration',
      title: 'HR & Administrative Operations',
      rolesIncluded: 'HR/Admin',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      badge: 'Facility Governance',
      tagline: 'Dedicated Facility HR, Payroll & Administrative Officers',
      description: 'Specialized fitness human resource and administrative coordinators to run structured trainer recruitment pipelines, biometric attendance, staff payroll, vendor contracts, and facility documentation.',
      rolesList: ['Facility HR Specialist', 'Administrative Officer', 'Payroll & Compliance Manager'],
      deliverables: [
        'Trainer onboarding, background checks & credentials verification',
        'Monthly staff payroll calculation, commissions & tax compliance',
        'Vendor contracts, utility management & purchase invoice tracking',
        'Daily facility administration and staff attendance governance'
      ],
      experienceLevel: '2+ to 5+ Years Experience',
      deploymentTime: '5-10 Days Pan-India'
    },
    {
      id: 'sales-front-desk',
      category: 'Sales & Front Desk',
      title: 'Sales & Front Desk Concierge',
      rolesIncluded: 'Sales Executive + Receptionist',
      image: 'https://images.unsplash.com/photo-1570872626485-d8ffea69f463?auto=format&fit=crop&w=800&q=80',
      badge: 'Frontline Revenue',
      tagline: 'High-Converting Sales Executives & Front Desk Receptionists',
      description: 'Results-driven membership sales executives and welcoming front desk receptionists skilled in luxury club tour presentations, corporate wellness sales, walk-in conversions, and gym CRM POS management.',
      rolesList: ['Membership Sales Executive', 'Front Desk Receptionist', 'Client Relations Specialist'],
      deliverables: [
        'High-converting floor tours & membership package sales',
        'Front desk greeting, RFID member check-in & call handling',
        'CRM lead pipeline management, tele-calling & renewals',
        'POS retail smoothie bar and merchandise billing'
      ],
      experienceLevel: '1+ to 4+ Years Experience',
      deploymentTime: '3-7 Days Pan-India'
    },
    {
      id: 'fitness-team',
      category: 'Fitness Team',
      title: 'Elite Athletic Fitness Team',
      rolesIncluded: 'Head Trainer + Gym Trainers + Personal Trainers (PTs)',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      badge: 'Core Athletic Team',
      tagline: 'CSCS / NASM / ACE Certified Strength & Biomechanics Coaches',
      description: 'Certified master personal trainers, dedicated floor instructors, and head coaches specialized in functional hypertrophy, biomechanics, lifting form safety, and high-ticket 1-on-1 personal training packages.',
      rolesList: ['Head Trainer / Fitness Director', 'Gym Floor Instructor', 'Personal Trainer (PT)'],
      deliverables: [
        'Periodized strength, hypertrophy & body recomposition plans',
        'Lifting technique correction & equipment safety monitoring',
        '1-on-1 VIP personal training sessions & client retention',
        'Initial member fitness assessments & mobility screenings'
      ],
      experienceLevel: '2+ to 6+ Years (NASM/CSCS/ACE/K11)',
      deploymentTime: '5-10 Days Pan-India'
    },
    {
      id: 'group-classes',
      category: 'Group Classes',
      title: 'Group Studio Class Coaches',
      rolesIncluded: 'Yoga, Zumba, CrossFit/HIIT + Sound Healing',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      badge: 'Studio Atmosphere',
      tagline: 'Master Coaches for Yoga, Zumba, CrossFit & Sound Healing',
      description: 'Dynamic group fitness coaches delivering electrifying studio classes across Vinyasa Yoga, licensed Zumba dance fitness, high-octane CrossFit/HIIT conditioning, and restorative sound healing meditation.',
      rolesList: ['Yoga Instructor (RYT 200/500)', 'Zumba Licensed Instructor', 'CrossFit / HIIT Circuit Coach', 'Sound Healing Practitioner'],
      deliverables: [
        'High-energy studio atmosphere, music curation & group pacing',
        'Functional interval circuits (CrossFit, Tabata, HIIT, Bootcamp)',
        'Mind-body sound bath meditation, breathwork & deep recovery',
        'Multi-level movement scaling for beginners to advanced athletes'
      ],
      experienceLevel: '2+ to 5+ Years Group Coaching',
      deploymentTime: '5-10 Days Pan-India'
    },
    {
      id: 'nutrition-recovery',
      category: 'Nutrition & Recovery',
      title: 'Clinical Nutrition & Physiotherapy',
      rolesIncluded: 'Dietitian/Nutritionist + Physiotherapist',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      badge: 'Clinical & Wellness',
      tagline: 'Registered Sports Dietitians & Sports Physiotherapists',
      description: 'Qualified clinical sports nutritionists providing personalized metabolic meal plans and licensed physiotherapists delivering sports injury rehabilitation, dry needling, postural alignment, and recovery therapy.',
      rolesList: ['Registered Sports Dietitian', 'Certified Clinical Nutritionist', 'Sports Physiotherapist (BPT/MPT)'],
      deliverables: [
        'Body composition (InBody / DEXA) scanning & metabolic profiling',
        'Customized macronutrient, hydration & supplement protocols',
        'Sports injury rehabilitation, dry needling & kinesio-taping',
        'Manual therapy, mobility restoration & post-injury reconditioning'
      ],
      experienceLevel: '3+ to 7+ Years (B.Sc / M.Sc / BPT / MPT)',
      deploymentTime: '7-14 Days Pan-India'
    },
    {
      id: 'facility-operations',
      category: 'Facility Operations',
      title: 'Facility Hygiene, Maintenance & Security',
      rolesIncluded: 'Housekeeping + Maintenance + Security',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
      badge: 'Sanitation & Safety',
      tagline: 'Round-the-Clock Hygiene Crew, Machine Technicians & Security',
      description: 'Dedicated housekeeping crew, equipment preventive maintenance technicians, and security personnel ensuring spotless hygiene, sanitized steam rooms, smooth cable machinery, and visitor safety.',
      rolesList: ['Housekeeping & Sanitation Crew', 'Equipment Maintenance Technician', 'Facility Security Officer'],
      deliverables: [
        'Continuous locker room, shower & steam suite sanitation',
        'Heavy commercial machinery cable inspection & preventive lubrication',
        'Disinfectant wiping across all free-weight & selectorized zones',
        'RFID turnstile access monitoring & front-gate security vigilance'
      ],
      experienceLevel: '1+ to 4+ Years Experience',
      deploymentTime: '3-7 Days Pan-India'
    }
  ];

  const CATEGORY_TABS = [
    'all',
    'Management',
    'HR & Administration',
    'Sales & Front Desk',
    'Fitness Team',
    'Group Classes',
    'Nutrition & Recovery',
    'Facility Operations'
  ];

  const filteredServices = MANPOWER_SERVICES.filter(serv => {
    if (selectedCategory !== 'all' && serv.category !== selectedCategory) return false;
    return true;
  });

  return (
    <main className="pt-24 pb-20 bg-[#0F1926] min-h-screen text-[#E8E8E8]">
      <SEO
        title="Master Coaches & Staffing Sanctuary | Tanush Fitness B2B"
        description="Recruit Club Managers, HR/Admin, Sales Executives, Fitness Trainers, Group Class Coaches, Nutritionists & Physiotherapists nationwide."
      />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2A2B] pb-8">
          <div className="space-y-3">
            <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.04em] leading-snug">
              MASTER STAFFING
            </h1>

            <p className="text-sm sm:text-base text-[#D0CFCA] max-w-2xl font-sans leading-relaxed">
              Complete 7-division talent placement and staffing infrastructure for commercial health clubs, high-performance gyms, and luxury wellness destinations nationwide.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsPostJobModalOpen(true)}
              className="btn-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4 text-[#0F1926]" />
              <span>Hire Facility Staff</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedJob({
                  id: 'general-talent',
                  title: 'Certified Fitness Talent Roster',
                  category: 'Fitness Team',
                  gymName: 'Tanush Fitness Commercial Network',
                  location: 'Pan-India',
                  salaryRange: 'Market Competitive',
                  type: 'Full-time',
                  experience: '1+ Years',
                  description: 'Apply to join our vetted talent network for placements across top fitness brands.',
                  requirements: ['Certified in your designated domain'],
                  createdAt: 'Today',
                  applicationsCount: 0,
                });
                setIsApplyModalOpen(true);
              }}
              className="px-5 py-3 rounded-full border border-[#2A2A2B] hover:border-[#D0CFCA] text-[#E8E8E8] text-xs font-mono uppercase tracking-wider transition hover:bg-[#0C1015] flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-[#E8E8E8]" />
              <span>Join Talent Network</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeStrip theme="white" speed="slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Clean Category Filter Strip */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 border-b border-[#2A2A2B] scrollbar-none">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                  : 'bg-[#0C1015] text-[#D0CFCA] border border-[#2A2A2B] hover:border-[#D0CFCA] hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>

        {/* 7 MANPOWER VISUAL SERVICES GRID (#E8E8E8 LIGHT CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F1926]">
                  <img
                    src={service.image}
                    alt={service.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1926]/60 via-transparent to-transparent" />

                  {/* Deployment Speed Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#0F1926] px-2.5 py-1 rounded-md text-[9px] font-mono text-[#E8E8E8] font-bold border border-white/15">
                    ⚡ {service.deploymentTime}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-[#2A2A2B] uppercase tracking-wider font-bold">
                      {service.rolesIncluded}
                    </div>
                    <h3 className="font-satoshi text-base sm:text-lg font-bold uppercase text-[#0F1926] tracking-[0.03em] mt-1 group-hover:text-[#2A2A2B] transition leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#2A2A2B]/80 font-sans leading-relaxed mt-2 line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Roles Breakdown */}
                  <div className="space-y-1.5 pt-3 border-t border-[#0F1926]/10">
                    <div className="text-[11px] font-sans text-[#0F1926] uppercase tracking-wider font-extrabold">
                      Roles Included:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.rolesList.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-[#0F1926]/10 text-[#0F1926] text-[10px] font-sans font-semibold"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables / Scope */}
                  <div className="space-y-1.5 pt-3 border-t border-[#0F1926]/10">
                    <div className="text-[11px] font-sans text-[#0F1926] uppercase tracking-wider font-extrabold">
                      Key Scope:
                    </div>
                    <ul className="space-y-1.5 text-xs font-sans text-[#2A2A2B]/80">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F1926] shrink-0 mt-0.5" />
                          <span className="leading-snug text-[11px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-2.5 border-t border-[#0F1926]/10 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setJobForm({
                      title: service.title,
                      category: service.category,
                      gymName: '',
                      location: '',
                      salaryRange: 'Market Competitive',
                      type: 'Full-time',
                      experience: service.experienceLevel,
                      description: `Requesting staffing for ${service.rolesIncluded}`,
                      requirements: service.deliverables.join(', '),
                    });
                    setIsPostJobModalOpen(true);
                  }}
                  className="btn-dark flex-1 w-full py-2.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Hire Staff</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob({
                      id: service.id,
                      title: service.title,
                      category: service.category,
                      gymName: 'Tanush Fitness Commercial Network',
                      location: 'Pan-India Deployment',
                      salaryRange: service.experienceLevel,
                      type: 'Full-time',
                      experience: service.experienceLevel,
                      description: service.description,
                      requirements: service.deliverables,
                      createdAt: 'Live Roster',
                      applicationsCount: 0,
                    });
                    setIsApplyModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#0F1926]/20 hover:border-[#0F1926] text-[#0F1926] text-xs font-mono uppercase tracking-wider transition bg-white/50 flex items-center justify-center gap-1.5 cursor-pointer font-bold"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#0F1926]" />
                  <span>Apply</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Candidate Apply Modal */}
      <AnimatePresence>
        {isApplyModalOpen && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0C1015]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#0F1926]/15 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#2A2A2B] uppercase tracking-widest block mb-1 font-bold">
                    EXECUTIVE CANDIDATE APPLICATION
                  </span>
                  <h3 className="font-satoshi text-xl font-bold text-[#0F1926] uppercase">
                    {selectedJob.title} // {selectedJob.gymName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-2 rounded-full bg-[#0F1926]/10 hover:bg-[#0F1926]/20 text-[#0F1926] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={candidateForm.fullName}
                    onChange={e => setCandidateForm({ ...candidateForm, fullName: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Mobile Hotline</label>
                    <input
                      type="tel"
                      required
                      value={candidateForm.mobile}
                      onChange={e => setCandidateForm({ ...candidateForm, mobile: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Current City</label>
                    <input
                      type="text"
                      placeholder="Delhi NCR"
                      value={candidateForm.preferredCity}
                      onChange={e => setCandidateForm({ ...candidateForm, preferredCity: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Certifications & Accreditations</label>
                  <input
                    type="text"
                    value={candidateForm.certifications}
                    onChange={e => setCandidateForm({ ...candidateForm, certifications: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-dark w-full py-3 text-xs uppercase tracking-wider mt-2 cursor-pointer shadow-lg"
                >
                  Submit Application to Gym Director
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Employer Post Job Modal */}
      <AnimatePresence>
        {isPostJobModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0C1015]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-[#0F1926]/15 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-[#2A2A2B] uppercase tracking-widest block mb-1 font-bold">
                    PUBLISH CLUB VACANCY
                  </span>
                  <h3 className="font-satoshi text-xl font-bold text-[#0F1926] uppercase">
                    New Staffing Requirement
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPostJobModalOpen(false)}
                  className="p-2 rounded-full bg-[#0F1926]/10 hover:bg-[#0F1926]/20 text-[#0F1926] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePostJobSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Head Biomechanics Coach"
                    value={jobForm.title}
                    onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Gym / Club Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Empire Fitness"
                      value={jobForm.gymName}
                      onChange={e => setJobForm({ ...jobForm, gymName: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="Indiranagar, Bengaluru"
                      value={jobForm.location}
                      onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Category</label>
                    <select
                      value={jobForm.category}
                      onChange={e => setJobForm({ ...jobForm, category: e.target.value as any })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] focus:outline-none focus:border-[#0F1926] uppercase font-mono cursor-pointer"
                    >
                      <option value="Management">Management (Club Manager)</option>
                      <option value="HR & Administration">HR & Administration (HR/Admin)</option>
                      <option value="Sales & Front Desk">Sales & Front Desk (Sales Executive + Receptionist)</option>
                      <option value="Fitness Team">Fitness Team (Head Trainer, Gym Trainers, PTs)</option>
                      <option value="Group Classes">Group Classes (Yoga, Zumba, CrossFit/HIIT, Sound Healing)</option>
                      <option value="Nutrition & Recovery">Nutrition & Recovery (Dietitian/Nutritionist, Physiotherapist)</option>
                      <option value="Facility Operations">Facility Operations (Housekeeping, Maintenance, Security)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Salary Range</label>
                    <input
                      type="text"
                      placeholder="₹45,000 - ₹75,000 / month"
                      value={jobForm.salaryRange}
                      onChange={e => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                      className="w-full bg-white border border-[#0F1926]/20 rounded-xl px-4 py-2.5 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#2A2A2B] uppercase mb-1 font-bold">Job Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe role responsibilities, required certifications..."
                    value={jobForm.description}
                    onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full bg-white border border-[#0F1926]/20 rounded-xl p-3 text-sm text-[#0F1926] placeholder-[#D0CFCA] focus:outline-none focus:border-[#0F1926]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-dark w-full py-3 text-xs uppercase tracking-wider mt-2 cursor-pointer shadow-lg"
                >
                  Publish Opening to Roster
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
