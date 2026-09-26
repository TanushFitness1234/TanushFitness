import React from 'react';
import { ShieldCheck, ArrowLeft, LogOut, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminHeader: React.FC = () => {
  const { navigateTo, isAdminAuthenticated, logoutAdmin } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-wider text-slate-900 uppercase font-heading">
                  ADMIN PANEL
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-widest">
                  Secure Console
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                Tanush Fitness B2B • Central Operations & Database Portal
              </p>
            </div>
          </div>

          {/* Center Info Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-700 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="font-semibold text-slate-800">Live Sync Active</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 font-sans">PostgreSQL / Supabase</span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Authenticated</span>
                </div>
              </div>
            )}

            {/* Return to Public Website */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold transition shadow-sm cursor-pointer"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Exit to Main Site</span>
              <span className="sm:hidden">Exit</span>
            </a>

            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition shadow-sm"
                title="Logout Admin Session"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
