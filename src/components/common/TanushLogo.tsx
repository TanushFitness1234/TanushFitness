import React from 'react';

interface TanushLogoProps {
  variant?: 'white' | 'dark' | 'symbol' | 'symbol-white' | 'full' | 'full-white';
  className?: string;
  height?: number | string;
  showText?: boolean;
  alt?: string;
}

export const TanushLogo: React.FC<TanushLogoProps> = ({
  variant = 'white',
  className = '',
  height = 50,
  showText = true,
  alt = 'Tanush Fitness LLP',
}) => {
  if (variant === 'symbol' || variant === 'symbol-white' || !showText) {
    const src = variant === 'symbol' ? '/tanush-symbol.png' : '/tanush-symbol-white.png';
    return (
      <img
        src={src}
        alt={alt}
        style={{ height }}
        className={`object-contain select-none inline-block ${className}`}
      />
    );
  }

  let src = '/tanush-logo-white.png';
  if (variant === 'full' || variant === 'full-white') {
    src = variant === 'full' ? '/tanush-logo-full-dark.png' : '/tanush-logo-full-white.png';
  } else if (variant === 'dark') {
    src = '/tanush-logo.png';
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ height }}
      className={`object-contain select-none inline-block ${className}`}
    />
  );
};
