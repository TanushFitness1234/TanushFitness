import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'outline' | 'green';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'sm',
  icon
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 font-bold tracking-wider uppercase rounded-full transition-all shadow-sm";
  
  const sizeStyles = size === 'sm' 
    ? "px-2.5 py-0.5 text-[10px]" 
    : "px-3.5 py-1 text-xs sm:text-sm";

  const variantStyles = {
    gold: "bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/20 font-bold",
    dark: "bg-[#0C1015] text-[#E8E8E8] border border-[#2A2A2B]",
    outline: "bg-transparent text-[#D0CFCA] border border-[#2A2A2B]",
    green: "bg-[#2A2A2B] text-[#E8E8E8] border border-[#2A2A2B]",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]}`}>
      {icon && <span className="w-3.5 h-3.5">{icon}</span>}
      {children}
    </span>
  );
};
