import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserManagementTab: React.FC = () => {
  const { userList, updateUserStatus, verifyUserGST, accessToken } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'GYM_OWNER' | 'JOB_SEEKER'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');

  const handleVerify = (userId: string, isVerified: boolean) => {
    verifyUserGST(userId, !isVerified);
    fetch(`http://localhost:5000/api/admin/users/${userId}/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ isVerified: !isVerified }),
    }).catch(err => console.log('Backend sync notice:', err.message));
  };

  const handleStatusChange = (userId: string, status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED') => {
    updateUserStatus(userId, status);
    fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    }).catch(err => console.log('Backend sync notice:', err.message));
  };

  const filteredUsers = userList.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (statusFilter !== 'ALL' && u.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.mobile.includes(q) ||
        (u.companyName && u.companyName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner - Modern Light */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" /> User Management & GST Verification Portal
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Verify Gym Owner GST business credentials and enforce account status controls (Activate, Suspend, Deactivate).
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar - Modern Light */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, email, mobile, GST..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          >
            <option value="ALL">All Roles</option>
            <option value="GYM_OWNER">Gym Owners</option>
            <option value="JOB_SEEKER">Job Seekers</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
          >
            <option value="ALL">All Account Statuses</option>
            <option value="ACTIVE">Active Users</option>
            <option value="SUSPENDED">Suspended / Spam</option>
          </select>
        </div>
      </div>

      {/* Users Table - Crisp Light Cool Blue */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-4 px-6">User / Business</th>
                <th className="py-4 px-6">Role & Status</th>
                <th className="py-4 px-6">GST Credentials</th>
                <th className="py-4 px-6 text-right">Verification & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.map(u => (
                <tr key={u.id} className="odd:bg-[#F4F9FF] even:bg-white hover:bg-[#E4F0FF] transition">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-xs text-slate-600 font-medium">{u.email} • {u.mobile}</div>
                    {u.companyName && <div className="text-xs text-blue-700 font-bold mt-0.5">{u.companyName}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${u.role === 'GYM_OWNER' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-blue-100 text-blue-900 border border-blue-300'}`}>
                        {u.role === 'GYM_OWNER' ? 'Gym Owner' : 'Job Seeker'}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'}`}>
                        {u.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-mono text-xs font-semibold text-slate-800">{u.gstNumber || 'No GST Registered'}</div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* GST Verify Button */}
                      <button
                        onClick={() => handleVerify(u.id, u.isVerified)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                          u.isVerified
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                        }`}
                      >
                        {u.isVerified ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5" /> Verify GST
                          </>
                        )}
                      </button>

                      {/* Status Toggle Buttons */}
                      {u.status === 'ACTIVE' ? (
                        <button
                          onClick={() => handleStatusChange(u.id, 'SUSPENDED')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-lg text-xs font-semibold transition"
                          title="Suspend Account"
                        >
                          <UserX className="w-3.5 h-3.5" /> Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(u.id, 'ACTIVE')}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-semibold transition"
                          title="Activate Account"
                        >
                          <UserCheck className="w-3.5 h-3.5" /> Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
