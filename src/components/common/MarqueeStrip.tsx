import React from 'react';
import { Sparkles } from 'lucide-react';

interface MarqueeStripProps {
  items?: string[];
  reverse?: boolean;
  speed?: 'normal' | 'slow' | 'fast';
  theme?: 'white' | 'offwhite' | 'dark' | 'navy' | 'charcoal' | 'minimal' | 'gold' | 'green' | 'orange' | 'steel';
}

const DEFAULT_ITEMS = [
  'STEP INTO TANUSH',
  'FITNESS SANCTUARY',
  'ELEVATE PERFORMANCE',
  'WORLD CLASS EQUIPMENT',
  'PRECISION STRUCTURAL STEEL',
  'PAN-INDIA GYM MANAGEMENT ASSEMBLY',
  'MASTER COACH RECRUITMENT',
  '100% COMMERCIAL GST INVOICING',
];

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({
  items = DEFAULT_ITEMS,
  reverse = false,
  speed = 'normal',
  theme = 'white',
}) => {
  const getThemeClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#0C1015] text-[#E8E8E8] py-3.5 sm:py-4 border-y border-[#2A2A2B]';
      case 'charcoal':
        return 'bg-[#2A2A2B] text-[#E8E8E8] py-3.5 sm:py-4 border-y border-[#2A2A2B]';
      case 'navy':
        return 'bg-[#0F1926] text-[#E8E8E8] py-3.5 sm:py-4 border-y border-[#2A2A2B]';
      case 'white':
      case 'offwhite':
      default:
        return 'bg-[#E8E8E8] text-[#0F1926] py-3.5 sm:py-4 border-y border-[#2A2A2B]/15 shadow-sm';
    }
  };

  const getAnimationClass = () => {
    if (reverse) return 'animate-marquee-reverse';
    if (speed === 'slow') return 'animate-marquee-slow';
    return 'animate-marquee';
  };

  return (
    <div className={`w-full overflow-hidden select-none pointer-events-none ${getThemeClass()}`}>
      <div className={`flex w-max ${getAnimationClass()}`}>
        {/* Track Set 1 */}
        <div className="flex items-center shrink-0">
          {items.map((text, idx) => (
            <div
              key={`t1-${idx}`}
              className="flex items-center gap-6 mx-6 font-satoshi text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap text-current"
            >
              <span>{text}</span>
              <span className="text-xs shrink-0 opacity-70">✦</span>
            </div>
          ))}
        </div>
        {/* Track Set 2 (Exact Duplicate for 100% Seamless Infinite Revolving Loop) */}
        <div className="flex items-center shrink-0">
          {items.map((text, idx) => (
            <div
              key={`t2-${idx}`}
              className="flex items-center gap-6 mx-6 font-satoshi text-xs sm:text-sm font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap text-current"
            >
              <span>{text}</span>
              <span className="text-xs shrink-0 opacity-70">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
