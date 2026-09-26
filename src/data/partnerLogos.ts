export interface PartnerLogo {
  id: string;
  name: string;
  subtitle: string;
  symbolSvg: string; // inline clean metallic SVG path/markup
}

export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: 'apex-fitness',
    name: 'APEX ATHLETICS',
    subtitle: '120+ Locations Nationwide',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><polygon points="20,4 36,12 36,28 20,36 4,28 4,12" stroke="currentColor" stroke-width="2.5" fill="none"/><circle cx="20" cy="20" r="6" fill="currentColor"/></svg>`
  },
  {
    id: 'vanguard-labs',
    name: 'VANGUARD CLUBS',
    subtitle: 'Premium High-Performance Gyms',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><path d="M8 10L20 30L32 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 10L20 20L26 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 'omnifit-labs',
    name: 'OMNIFIT COMMERCIAL',
    subtitle: 'Boutique Studio Network',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><circle cx="20" cy="20" r="14" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="20" r="7" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/><circle cx="20" cy="20" r="3" fill="currentColor"/></svg>`
  },
  {
    id: 'kinetix-performance',
    name: 'KINETIX GROUP',
    subtitle: 'Sports Training Centers',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><path d="M6 32L18 8L26 24L34 16" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="16" r="3" fill="currentColor"/></svg>`
  },
  {
    id: 'aura-health',
    name: 'AURA HEALTH CLUBS',
    subtitle: 'Luxury Wellness Facilities',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><ellipse cx="20" cy="20" rx="14" ry="8" stroke="currentColor" stroke-width="2.5"/><ellipse cx="20" cy="20" rx="8" ry="14" stroke="currentColor" stroke-width="2.5"/></svg>`
  },
  {
    id: 'pinnacle-gyms',
    name: 'PINNACLE PERFORMANCE',
    subtitle: 'Commercial Fitness Franchise',
    symbolSvg: `<svg viewBox="0 0 40 40" fill="none" class="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors"><path d="M20 4L6 32H34L20 4Z" stroke="currentColor" stroke-width="2.5" fill="none"/><path d="M20 12L12 28H28L20 12Z" fill="currentColor" opacity="0.3"/></svg>`
  }
];
