export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  gymName: string;
  location: string;
  image: string;
  rating: number;
  stats: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Tanush Fitness completely transformed our procurement lifecycle. Sourcing Matrix Ultra selectorized lines, Magnum plate-loaded racks, and Performance Plus treadmills on a single commercial purchase order saved our franchise network over 18% in equipment and freight costs.',
    author: 'Vikram Singhania',
    title: 'Co-Founder & VP of Operations',
    gymName: 'Apex Athletics Franchise (14 Clubs)',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    stats: '18% ITC Invoicing Savings'
  },
  {
    id: 't-2',
    quote: 'Finding certified commercial & residential equipment technicians used to take days of phone calls. Through Tanush Fitness Services, we booked an emergency cable repair on a Sunday afternoon and the technician arrived within 2 hours. Absolutely game changing for member retention.',
    author: 'Samantha Brooks',
    title: 'General Manager',
    gymName: 'Vanguard Athletic Club (45,000 sq ft)',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    stats: '< 2 Hour Dispatch'
  },
  {
    id: 't-3',
    quote: 'The bulk supplement tier pricing alone justifies our membership. Ordering 200kg of PrimeFit Creapure and protein RTDs directly through the platform gives our front desk 50%+ profit margins while guaranteeing fast 2-day delivery.',
    author: 'Marcus Vance',
    title: 'Owner & Head Director',
    gymName: 'OmniFit High-Performance Studio',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    stats: '52% Retail Margin'
  }
];
