import React from 'react';

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  align = 'left'
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'flex flex-col md:flex-row md:items-end justify-between gap-6'}`}>
      <div>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[3px] bg-white/40 rounded-full" />
          <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white/80 font-mono">
            {subtitle}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-[0.04em] leading-snug font-satoshi uppercase">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base sm:text-lg text-[#A8A090] font-normal leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {actionText && (onActionClick || actionHref) && align === 'left' && (
        <a
          href={actionHref || '#'}
          onClick={(e) => {
            if (onActionClick) {
              e.preventDefault();
              onActionClick();
            }
          }}
          className="inline-flex items-center gap-2.5 text-xs font-black text-white hover:text-white/80 transition-colors group shrink-0 uppercase tracking-widest font-mono cursor-pointer"
        >
          <span>{actionText}</span>
          <span className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white group-hover:text-[#090C10] flex items-center justify-center transition-all duration-300 border border-white/20 shadow-sm">
            →
          </span>
        </a>
      )}
    </div>
  );
};
