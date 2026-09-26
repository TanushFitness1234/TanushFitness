import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Dumbbell,
  Briefcase,
  Users,
  Zap,
  Phone,
  Layers,
  Award,
  Maximize2
} from 'lucide-react';
import { MarqueeStrip } from '../components/common/MarqueeStrip';
import { VaultContactFormSection } from '../components/home/VaultContactFormSection';
import { SEO } from '../components/common/SEO';
import { TanushLogo } from '../components/common/TanushLogo';

const USP_CARDS = [
  {
    id: 1,
    title: 'Commercial & Residential Equipment',
    description: 'Experience biomechanical perfection with Tanush meticulously curated heavy laser-cut strength lines, modular rigs, and cardio suites.',
    brands: ['Matrix', 'Torque USA', 'Concept 2', 'Precor'],
    icon: <Dumbbell className="w-6 h-6 text-[#0F1926]" />,
  },
  {
    id: 2,
    title: 'Gym Management',
    description: '360° architectural 3D CAD space modeling, acoustic rubber isolation, digital RFID access turnstiles, and launch funnels.',
    brands: ['3D CAD Layouts', 'Acoustics', 'RFID Access', 'AMC Care'],
    icon: <Briefcase className="w-6 h-6 text-[#0F1926]" />,
  },
  {
    id: 3,
    title: 'Manpower Services & Staffing',
    description: 'Specialized 7-division talent placement covering Club Management, HR/Admin, Sales & Front Desk, Fitness Teams, Group Classes, Nutrition & Recovery, and Facility Operations.',
    brands: ['Management', 'HR & Admin', 'Fitness Team', 'Sales & Front Desk', 'Group Classes', 'Nutrition & Recovery', 'Facility Ops'],
    icon: <Users className="w-6 h-6 text-[#0F1926]" />,
  },
  {
    id: 4,
    title: 'Recovery Room — Hyperice',
    description: 'Revitalize in exclusive biohacking recovery suites offering pneumatic compression boots, percussion therapy, and contrast plunge baths.',
    brands: ['Hyperice Partner', 'Normatec 3', 'Hydrotherapy'],
    icon: <Zap className="w-6 h-6 text-[#0F1926]" />,
  },
];

const CORE_VERTICALS = [
  {
    id: 'equipment',
    number: '01',
    category: 'CORE VERTICAL',
    title: 'Commercial & Residential Equipment',
    tagline: 'Complete professional gym equipment supply for commercial fitness facilities & residential luxury suites',
    description: 'Direct-from-factory heavy laser-cut power racks, selectorized pin-stack machinery, plate-loaded strength stations, and commercial & residential urethane free-weights.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    icon: Dumbbell,
    page: 'equipment' as const,
    btnText: 'Explore Equipment Catalog',
    points: [
      'Direct Factory Wholesale Pricing',
      '18% GST Input Tax Credit (ITC) Invoices',
      '10-Year Structural Frame Guarantee'
    ],
  },
  {
    id: 'services',
    number: '02',
    category: 'CORE VERTICAL',
    title: 'Gym Management',
    tagline: 'Comprehensive gym architecture, space modeling, acoustic rubber flooring, and automated operations',
    description: 'Complete commercial facility transformation from raw space to profitable launch: 3D CAD facility design, soundproof shock-absorption rubber flooring, and automated operations.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    icon: Briefcase,
    page: 'services' as const,
    btnText: 'Discover Management Solutions',
    points: [
      '3D Architectural Space Planning',
      'Heavy-Duty Acoustic & Vibration Isolation Flooring',
      'Annual Maintenance Contracts (AMC)'
    ],
  },
  {
    id: 'manpower',
    number: '03',
    category: 'CORE VERTICAL',
    title: 'Manpower Services',
    tagline: '7 specialized staffing verticals for Commercial & Residential Gym facilities',
    description: 'Verified recruitment and placement covering Club Managers, HR/Admin, Sales Executives, Receptionists, Head & Gym Trainers, Group Class Instructors, Nutritionists, Physiotherapists, and Facility Operations.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    icon: Users,
    page: 'manpower' as const,
    btnText: 'Open Recruitment Portal',
    points: [
      'Management, HR/Admin & Sales Desk Placement',
      'Certified Fitness Teams & Group Class Coaches',
      'Nutrition, Recovery & Facility Operations Staffing'
    ],
  },
];

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();
  const [visionTab, setVisionTab] = useState<'what' | 'why'>('what');

  return (
    <main className="min-h-screen bg-[#0F1926] text-[#E8E8E8] overflow-hidden pb-0">
      <SEO
        title="Tanush Fitness | Commercial & Residential Equipment · Gym Management · Manpower Services"
        description="Experience India's premier commercial & residential fitness sanctuary. World-class commercial equipment, 3D CAD gym management, and certified trainer staffing."
      />

      {/* ========================================================================= */}
      {/* SECTION 1: SERENE & ELEGANT MONOCHROMATIC HERO                            */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[calc(100vh-90px)] flex flex-col justify-center bg-gradient-to-b from-[#0F1926] via-[#0C1015] to-[#0F1926] text-[#E8E8E8] pt-8 sm:pt-12 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10 my-auto flex flex-col justify-center">
          {/* Centered Brand Logo Lockup (Original Authentic Font - Slightly Decreased Scale, Shifted Upwards) */}
          <div className="flex items-center justify-center pb-10 sm:pb-14 md:pb-16 -mt-4 sm:-mt-6 select-none">
            <TanushLogo
              variant="white"
              height={70}
              className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto drop-shadow-2xl hover:scale-105 transition-transform"
            />
          </div>

          {/* Clean Grand Headline */}
          <div className="space-y-4 my-2 sm:my-3">
            <h1 className="font-satoshi text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black uppercase tracking-[0.025em] text-[#E8E8E8] leading-[1.4] sm:leading-[1.3] max-w-5xl mx-auto">
              <span className="inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
                <span>GET READY</span>
                <span className="inline-block h-7 sm:h-9 md:h-10 w-16 sm:w-24 md:w-28 rounded-full overflow-hidden border border-white/20 shadow-md align-middle shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80"
                    alt="Tanush Athlete"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span>TO UNLEASH</span>
              </span>
              <br />
              <span className="inline-flex items-center justify-center flex-wrap gap-x-3 gap-y-2 mt-1 sm:mt-2">
                <span>YOUR</span>
                <span className="inline-block h-7 sm:h-9 md:h-10 w-16 sm:w-24 md:w-28 rounded-full overflow-hidden border border-white/20 shadow-md align-middle shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=80"
                    alt="Tanush Strength"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="text-[#D0CFCA]">INNER POTENTIAL</span>
                <span className="hidden sm:inline-block h-7 sm:h-9 md:h-10 w-16 sm:w-24 md:w-28 rounded-full overflow-hidden border border-white/20 shadow-md align-middle shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"
                    alt="Tanush Performance"
                    className="w-full h-full object-cover"
                  />
                </span>
              </span>
            </h1>
          </div>

          {/* Action CTAs (Shifted Downwards with Increased Spacing) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 sm:pt-8">
            <a
              href="#equipment"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('equipment');
              }}
              className="btn-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>Explore Equipment Sanctuary</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('services');
              }}
              className="btn-outline px-8 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#D0CFCA]" />
              <span>Book 3D CAD Blueprint</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: MONOCHROMATIC MARQUEE STRIP                                    */}
      {/* ========================================================================= */}
      <MarqueeStrip
        items={[
          'STRENGTH',
          'PERFORMANCE',
          'DISCIPLINE',
          'RESULTS',
          'COMMERCIAL & RESIDENTIAL EQUIPMENT',
          'GYM MANAGEMENT',
          'MANPOWER SERVICES',
          'PRECISION STRUCTURAL STEEL',
          'PAN-INDIA GYM OUTFITTING',
          '100% COMMERCIAL GST INVOICING',
        ]}
        theme="white"
        speed="normal"
      />

      {/* ========================================================================= */}
      {/* SECTION 3: TABBED VISION & PHILOSOPHY (#about)                            */}
      {/* ========================================================================= */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[#2A2A2B]">
        <div className="space-y-12">
          {/* Header & Tab Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-satoshi text-2xl sm:text-4xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.03em] leading-snug">
                {visionTab === 'what' ? 'What is Tanush?' : 'Why Tanush?'}
              </h2>
            </div>

            {/* Vision Tab Buttons (Montserrat 700) */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#0C1015] border border-[#2A2A2B] shadow-inner">
              <button
                type="button"
                onClick={() => setVisionTab('what')}
                className={`px-6 py-2.5 rounded-full font-montserrat text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  visionTab === 'what'
                    ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                    : 'text-[#D0CFCA] hover:text-[#E8E8E8]'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                What is Tanush?
              </button>
              <button
                type="button"
                onClick={() => setVisionTab('why')}
                className={`px-6 py-2.5 rounded-full font-montserrat text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  visionTab === 'why'
                    ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                    : 'text-[#D0CFCA] hover:text-[#E8E8E8]'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
              >
                Why Tanush?
              </button>
            </div>
          </div>

          {/* Vision Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              {visionTab === 'what' ? (
                <div className="space-y-5 text-[#D0CFCA] font-sans text-sm sm:text-base leading-relaxed">
                  <p>
                    Introducing India's premier commercial & residential fitness sanctuary & outfitting brand: <span className="text-[#E8E8E8] font-bold">Tanush Fitness</span>, where precision engineering reaches new heights and commercial strength takes center stage.
                  </p>
                  <p>
                    At Tanush, we redefine the fitness outfitting landscape with <span className="text-[#E8E8E8] font-semibold">state-of-the-art heavy laser-cut equipment</span>, curated to empower facility owners to launch world-class destinations. Our commitment goes beyond machinery; we deliver a holistic <span className="text-[#E8E8E8] font-semibold">360-degree comprehensive solution</span> encompassing Commercial & Residential Equipment, Gym Management, and Manpower Services.
                  </p>
                  <div className="pt-2">
                    <a
                      href="#about"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('about');
                      }}
                      className="btn-primary text-xs flex items-center gap-2 cursor-pointer shadow-lg inline-flex"
                    >
                      <span>Read Our Full Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 text-[#D0CFCA] font-sans text-sm sm:text-base leading-relaxed">
                  <p>
                    As a testament to unwavering commitment to biomechanical excellence, <span className="text-[#E8E8E8] font-bold">Tanush Fitness</span> aims to redefine commercial fitness spaces by offering direct factory procurement, 18% GST Input Tax Credit invoicing, zero middleman trading markups, and verified trainer placement pipelines.
                  </p>
                  <blockquote className="p-6 sm:p-8 rounded-3xl bg-[#0C1015] border-l-4 border-[#E8E8E8] text-[#E8E8E8] italic font-sans text-base sm:text-lg leading-relaxed shadow-2xl">
                    "Tanush Fitness is not merely an equipment vendor; it is an end-to-end commercial infrastructure partner built for gym owners who demand perfection in every square foot."
                  </blockquote>
                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo('contact');
                      }}
                      className="btn-primary text-xs flex items-center gap-2 cursor-pointer shadow-lg inline-flex"
                    >
                      <span>Connect With Factory Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#2A2A2B] shadow-2xl group bg-[#0C1015]">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80"
                  alt="Tanush Fitness Sanctuary Vision"
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1015]/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CORE VERTICALS (#E8E8E8 OFF-WHITE LUXURY CARDS)                 */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[#2A2A2B]">
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-satoshi text-2xl sm:text-4xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.03em] leading-snug">
                CORE PROCUREMENT VERTICALS
              </h2>
              <p className="text-sm text-[#D0CFCA] font-sans max-w-2xl mt-1 leading-relaxed">
                Complete commercial & residential equipment supply, 3D CAD gym management, and verified manpower recruitment.
              </p>
            </div>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('services');
              }}
              className="btn-primary text-xs flex items-center gap-2 shrink-0 cursor-pointer shadow-lg inline-flex"
            >
              <span>Explore All Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_VERTICALS.map((vertical) => {
              const IconComp = vertical.icon;
              return (
                <div
                  key={vertical.id}
                  className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#0F1926] transition-all duration-300 shadow-2xl hover:-translate-y-2"
                >
                  <div>
                    <a
                      href={`#${vertical.page}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(vertical.page);
                      }}
                      className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-[#0F1926] block"
                    >
                      <img
                        src={vertical.image}
                        alt={vertical.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1926]/60 via-transparent to-transparent" />

                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0F1926]/90 border border-white/20 flex items-center justify-center text-white shadow-lg">
                        <IconComp className="w-4 h-4 text-[#E8E8E8]" />
                      </div>
                    </a>

                    <div className="p-7 space-y-4">
                      <div>
                        <h3 className="font-satoshi text-lg sm:text-xl font-bold uppercase text-[#0F1926] tracking-[0.03em] mt-1 group-hover:text-[#2A2A2B] transition leading-snug">
                          <a
                            href={`#${vertical.page}`}
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(vertical.page);
                            }}
                            className="cursor-pointer hover:underline"
                          >
                            {vertical.title}
                          </a>
                        </h3>

                        <p className="text-xs sm:text-sm text-[#2A2A2B]/80 font-sans leading-relaxed mt-2 line-clamp-3">
                          {vertical.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-[#0F1926]/10 font-sans text-xs text-[#2A2A2B]">
                        <div className="text-xs font-sans text-[#0F1926] uppercase tracking-wider font-extrabold">
                          Core Focus:
                        </div>
                        <ul className="space-y-2">
                          {vertical.points.map((pt, ptIdx) => (
                            <li key={ptIdx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0F1926] shrink-0 mt-0.5" />
                              <span className="leading-snug text-xs text-[#2A2A2B] font-medium">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-7 pt-0 border-t border-[#0F1926]/10 mt-3">
                    <a
                      href={`#${vertical.page}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(vertical.page);
                      }}
                      className="btn-dark w-full py-3 text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer shadow-lg text-center"
                    >
                      <span>{vertical.btnText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: OUR USPs & VALUE PROPOSITIONS (#E8E8E8 LIGHT CARDS)            */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-[#2A2A2B]">
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-satoshi text-2xl sm:text-4xl font-extrabold uppercase text-[#E8E8E8] tracking-[0.03em] leading-snug">
                OUR USP
              </h2>
            </div>
            <a
              href="#equipment"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('equipment');
              }}
              className="btn-primary text-xs flex items-center gap-2 cursor-pointer shadow-lg inline-flex"
            >
              <span>Know More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {USP_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/10 rounded-3xl p-7 space-y-5 flex flex-col justify-between group shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-[#0F1926]"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F1926]/10 border border-[#0F1926]/15 flex items-center justify-center group-hover:border-[#0F1926] transition-colors shadow-sm">
                    {card.icon}
                  </div>

                  <h3 className="font-satoshi text-lg sm:text-xl font-bold text-[#0F1926] transition uppercase leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2A2A2B]/80 font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0F1926]/10 flex flex-wrap gap-1.5">
                  {card.brands.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 rounded-md bg-[#0F1926]/10 text-[10px] font-mono text-[#0F1926] font-bold"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: VAULT-STYLE SPLIT SCREEN INTAKE FORM                           */}
      {/* ========================================================================= */}
      <VaultContactFormSection />
    </main>
  );
};
