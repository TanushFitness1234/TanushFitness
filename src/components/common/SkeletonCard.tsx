import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[#0D1118] border border-white/10 rounded-none overflow-hidden animate-pulse p-4 flex flex-col justify-between h-[420px]">
      <div className="w-full h-48 bg-white/5 rounded-none mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-white/5 rounded-none w-1/3" />
        <div className="h-6 bg-white/10 rounded-none w-4/5" />
        <div className="h-4 bg-white/5 rounded-none w-2/3" />
      </div>
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
        <div className="h-7 bg-white/5 rounded-none w-1/4" />
        <div className="h-10 bg-white/10 rounded-none w-1/3" />
      </div>
    </div>
  );
};
