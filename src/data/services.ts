import { BusinessService } from '../types';

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: 'social-media-management',
    name: 'Gym Social Media Management',
    category: 'Digital Marketing',
    badge: 'High Impact',
    shortDesc: 'End-to-end content creation, daily posting, community management, and member showcase reels.',
    overview: 'Complete hands-free social media management engineered specifically for commercial fitness clubs. We produce high-octane workout reels, trainer spotlights, member transformation stories, and event promotions.',
    benefits: [
      'Increases organic Instagram & Facebook follower engagement by up to 300%',
      'Daily professional graphic posts & high-energy video reels',
      '24/7 comment response & direct message inquiry routing'
    ],
    portfolioItems: [
      { title: 'Reel Campaign for Apex Athletics', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
      { title: 'Member Transformation Showcase', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'Vanguard Athletic Club', result: '+450 Membership Signups in 90 Days', quote: 'Tanush Social Media Management turned our Instagram into our #1 sales lead source.' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'meta-google-ads-leadgen',
    name: 'Meta & Google Ads Lead Generation',
    category: 'Paid Advertising',
    badge: 'High ROI',
    shortDesc: 'Hyper-targeted Meta (Instagram/Facebook) and Google Search ads driving paid 7-day trial signups.',
    overview: 'Geofenced paid advertising funnels designed to capture local fitness seekers within a 5-mile radius of your gym door. Includes custom landing pages, instant lead notification SMS, and retargeting campaigns.',
    benefits: [
      'Average cost per lead (CPL) under ₹120',
      'High-converting 3-Day & 7-Day VIP trial landing page funnels',
      'Real-time lead delivery directly to your gym front desk team'
    ],
    portfolioItems: [
      { title: 'Local Search Campaign', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'OmniFit High Performance', result: '3.8x ROAS (Return on Ad Spend)', quote: 'We generated over 180 verified phone leads in our very first month.' }
    ],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'branding-logo-design',
    name: 'Gym Branding & Logo Design',
    category: 'Branding & Design',
    badge: 'Identity Suite',
    shortDesc: 'Ultra-premium brand identity, vector logos, typography guidelines, and apparel mockups.',
    overview: 'Position your gym as an elite fitness destination. We craft aggressive, modern brand marks, merchandise design, wall graphic vectors, and brand identity rulebooks.',
    benefits: [
      'Full vector logo package (SVG, PNG, EPS, AI)',
      'Custom color palette, typography guidelines & merchandise mockups',
      'Signage and wall graphic print-ready vector files'
    ],
    portfolioItems: [
      { title: 'Titan Gym Brand Refresh', image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'Pinnacle Performance Center', result: 'Complete Brand Relaunch', quote: 'The new logo and wall graphics gave our gym a $10M enterprise feel overnight.' }
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'website-app-development',
    name: 'Gym Website & Mobile App Development',
    category: 'Tech Solutions',
    badge: 'Custom Tech',
    shortDesc: 'Custom high-speed React/Next.js gym websites & iOS/Android member booking apps.',
    overview: 'Engineered web applications and native mobile apps featuring class schedule booking, membership purchasing, personal trainer booking, and digital RFID barcode check-ins.',
    benefits: [
      'Lightning-fast 100/100 Google Lighthouse page speed rating',
      'Integrated class booking, trainer scheduling & automated renewals',
      'Custom iOS & Android mobile apps with push notification alerts'
    ],
    portfolioItems: [
      { title: 'Custom Next.js Portal', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'IronEdge Health Club', result: '94% Member App Adoption', quote: 'Members love booking personal training and group classes straight from our custom app.' }
    ],
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'interior-design-setup-consultation',
    name: '3D Gym Interior Design & Setup Consultation',
    category: 'Facility Engineering',
    badge: '3D CAD Architectural',
    shortDesc: 'Architectural floor plan layout, 3D CAD renders, zone flow optimization, and lighting layout.',
    overview: 'Turn key facility space planning for new gym launches or expansions. Our architectural designers create 3D walk-through renders, biomechanical zone layouts, and equipment spacing blueprints.',
    benefits: [
      'Photorealistic 3D CAD walk-through renderings before buying equipment',
      'Maximized floor space capacity and safe athlete traffic flow',
      'Custom neon LED lighting and acoustic soundproofing schematics'
    ],
    portfolioItems: [
      { title: '3D Render for Vanguard Club', image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'Apex Athletics 30,000 sq ft Club', result: 'Zero Space Waste Layout', quote: 'The 3D CAD walk-through prevented several layout mistakes prior to equipment delivery.' }
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'ai-automation-crm-whatsapp',
    name: 'AI Automation, Gym CRM & WhatsApp Bot Integration',
    category: 'AI & Automation',
    badge: '24/7 AI Sales Bot',
    shortDesc: 'Automated WhatsApp lead follow-up bots, AI trial booking, and member retention triggers.',
    overview: 'Automate 80% of front desk lead follow-up. Our AI WhatsApp bot answers price inquiries 24/7, books gym tours instantly into your CRM, and sends automated birthday & renewal reminders.',
    benefits: [
      'Instant 5-second WhatsApp response to late night Facebook/Instagram ad leads',
      'Automated membership retention alerts for members absent > 7 days',
      'Seamless integration with Zenoti, Mindbody, and custom gym CRMs'
    ],
    portfolioItems: [
      { title: 'WhatsApp AI Bot Workflow', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'Aura Health & Fitness', result: '+42% Lead Conversion Rate', quote: 'The AI WhatsApp bot responds to ad leads instantly even at 2 AM, doubling our tour bookings.' }
    ],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'photography-videography-production',
    name: 'Commercial & Residential Gym Photography & Shoot Production',
    category: 'Media Production',
    badge: 'Cinematic HD',
    shortDesc: 'Professional 4K video promos, drone aerial facility tours, and athlete photography.',
    overview: 'Showcase your commercial & residential equipment and energy with cinema-grade photography and 4K video reels. Includes lighting crew, model sourcing, and professional color grading.',
    benefits: [
      'Ultra high-resolution photo library for website, ads, and brochures',
      '4K cinematic promo video with custom licensed music track',
      'Drone aerial shots of facility exterior and open functional floor'
    ],
    portfolioItems: [
      { title: '4K Commercial Facility Reel', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'Titan Performance Lab', result: 'High-Impact Promo Library', quote: 'The video production gave us high quality content for a full year of ad campaigns.' }
    ],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'local-seo-google-my-business',
    name: 'Gym Local SEO & Google Maps Dominance',
    category: 'SEO & Growth',
    badge: 'Rank #1 Local',
    shortDesc: 'Rank #1 on Google Maps for "Gym Near Me" and "Best Gym in [City]".',
    overview: 'Drive organic foot traffic from nearby residents. We optimize your Google Business Profile, build local citations, manage review collection campaigns, and outrank local competitors.',
    benefits: [
      'Top 3 Google Maps pack placement for high-intent search terms',
      'Automated Google review SMS request campaign for happy members',
      'Monthly search traffic & call tracking reporting dashboard'
    ],
    portfolioItems: [
      { title: 'Google Maps #1 Ranking', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' }
    ],
    caseStudies: [
      { clientGym: 'OmniFit High Performance', result: '+320 Monthly Map Calls', quote: 'We went from page 3 to #1 on Google Maps within 60 days.' }
    ],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&q=80'
  }
];
