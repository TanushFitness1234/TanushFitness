import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SEO } from '../components/common/SEO';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  LogOut,
  ShieldAlert,
  Bell,
  X,
  UserCheck,
  Package,
  Printer,
  CheckSquare,
  FileSpreadsheet,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UserManagementTab } from '../components/admin/UserManagementTab';
import { CatalogManagerTab } from '../components/admin/CatalogManagerTab';
import { PdfQuoteDispatcherTab } from '../components/admin/PdfQuoteDispatcherTab';
import { JobModerationTab } from '../components/admin/JobModerationTab';
import { AnalyticsReportsTab } from '../components/admin/AnalyticsReportsTab';
import { PlatformSettingsTab } from '../components/admin/PlatformSettingsTab';

export const AdminPage: React.FC = () => {
  const {
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    equipmentEnquiries,
    jobApplications,
    serviceEnquiries,
    navigateTo,
  } = useApp();

  type AdminTab =
    | 'users'
    | 'catalog'
    | 'quotes'
    | 'jobs-mod'
    | 'reports'
    | 'settings';

  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasscode('');
    }
  };

  // RESTRICTED ACCESS SCREEN (If not authenticated)
  if (!isAdminAuthenticated) {
    return (
      <main className="pt-20 pb-24 bg-[#0F1926] min-h-screen text-[#E8E8E8] font-mono flex items-center justify-center p-4">
        <SEO title="Admin Security Authentication Gate | Tanush B2B" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/20 p-8 shadow-2xl space-y-6 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0F1926]/10 border border-[#0F1926]/15 text-[#0F1926] mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-[#0F1926]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#2A2A2B] uppercase tracking-widest block font-mono">
              RESTRICTED EXECUTIVE ACCESS
            </span>
            <h1 className="text-2xl font-black text-[#0F1926] font-satoshi uppercase">
              Tanush Admin Authentication
            </h1>
            <p className="text-xs text-[#2A2A2B]/80 leading-relaxed font-sans font-normal">
              This panel is restricted exclusively to authorized Tanush Fitness directors, account managers, and system administrators.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-bold text-[#2A2A2B] uppercase font-mono block mb-1">
                Enter Admin Security Passcode *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter admin security passcode"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  className={`w-full bg-white border rounded-xl py-3 px-4 pl-10 text-xs font-mono text-[#0F1926] placeholder-[#2A2A2B]/40 focus:outline-none ${
                    authError ? 'border-rose-500' : 'border-[#0F1926]/20 focus:border-[#0F1926]'
                  }`}
                />
                <KeyRound className="w-4 h-4 text-[#2A2A2B]/60 absolute left-3.5 top-3.5" />
              </div>

              {authError && (
                <div className="text-[10px] text-rose-600 font-bold mt-1 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Invalid security passcode. Access denied.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-dark w-full py-3.5 px-4 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#E8E8E8]" />
              <span>Authenticate & Access Console</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#0F1926]/10 flex items-center justify-between text-[10px] text-[#2A2A2B] font-mono">
            <span>256-Bit SSL Encrypted Audit Log</span>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="text-[#0F1926] hover:underline font-bold cursor-pointer"
            >
              Return Home →
            </a>
          </div>
        </motion.div>
      </main>
    );
  }

  const totalNotifications = equipmentEnquiries.length + jobApplications.length + serviceEnquiries.length;

  return (
    <main className="pt-8 pb-24 bg-[#0F1926] min-h-screen text-[#E8E8E8] font-mono">
      <SEO title="Executive Enterprise Admin Suite | Tanush Fitness B2B" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Header Bar */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#2A2A2B] pb-6 bg-[#0C1015] p-6 rounded-3xl shadow-xl">
          <div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-[#E8E8E8]" />
              <h1 className="text-2xl sm:text-3xl font-black text-[#E8E8E8] font-satoshi uppercase tracking-wide">
                Tanush Executive Console
              </h1>
            </div>
            <p className="text-xs text-[#D0CFCA] mt-1 font-sans">
              Centralized Enterprise Suite • User Verification, Equipment Catalog, PDF Quotes, Moderation & CSV Reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-xl bg-[#0F1926] border border-[#2A2A2B] text-[#E8E8E8] hover:text-white relative transition shadow-sm cursor-pointer"
              >
                <Bell className="w-4 h-4 text-[#E8E8E8]" />
                {totalNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8E8E8] text-[#0F1926] text-[9px] font-black flex items-center justify-center">
                    {totalNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#E8E8E8] text-[#0F1926] border border-[#2A2A2B]/15 shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#0F1926]/10 pb-2">
                    <span className="text-xs font-black uppercase text-[#0F1926]">Live Enterprise Alerts</span>
                    <button onClick={() => setIsNotificationsOpen(false)} className="cursor-pointer">
                      <X className="w-4 h-4 text-[#2A2A2B] hover:text-[#0F1926]" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs font-sans">
                    {equipmentEnquiries.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-[#0F1926]/10 border border-[#0F1926]/15 text-[#0F1926] font-bold">
                        ⚡ {equipmentEnquiries.length} Equipment RFQ Quotation Requests
                      </div>
                    )}
                    {jobApplications.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-[#0F1926]/10 border border-[#0F1926]/20 text-[#0F1926] font-bold">
                        ⚡ {jobApplications.length} Candidate Resume Applications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#0F1926] border border-[#2A2A2B] text-xs font-bold text-[#E8E8E8] flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E8E8] animate-ping" />
              <span>Admin Session Active</span>
            </div>

            <button
              onClick={logoutAdmin}
              className="px-4 py-2 rounded-xl bg-[#0F1926] hover:bg-[#2A2A2B] border border-[#2A2A2B] text-[#E8E8E8] text-xs font-bold uppercase flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#E8E8E8]" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Tab Bar */}
        <div className="flex items-center gap-3 overflow-x-auto p-2.5 bg-[#0C1015] rounded-3xl border border-[#2A2A2B] shadow-xl mb-8 scrollbar-thin">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'users'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>1️⃣ Users & GST Verification</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>2️⃣ Equipment Catalog Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>3️⃣ PDF Quotes & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs-mod')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'jobs-mod'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>4️⃣ Job Moderation Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>5️⃣ Analytics & CSV Export</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 font-mono shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#E8E8E8] text-[#0F1926] font-bold shadow-md'
                : 'bg-[#0F1926] text-[#D0CFCA] border border-[#2A2A2B] hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>6️⃣ System Settings</span>
          </button>
        </div>

        {/* Render Tab Contents */}
        <div className="bg-[#0C1015] p-6 rounded-3xl border border-[#2A2A2B] shadow-xl">
          {activeTab === 'users' && <UserManagementTab />}
          {activeTab === 'catalog' && <CatalogManagerTab />}
          {activeTab === 'quotes' && <PdfQuoteDispatcherTab />}
          {activeTab === 'jobs-mod' && <JobModerationTab />}
          {activeTab === 'reports' && <AnalyticsReportsTab />}
          {activeTab === 'settings' && <PlatformSettingsTab />}
        </div>
      </div>
    </main>
  );
};
