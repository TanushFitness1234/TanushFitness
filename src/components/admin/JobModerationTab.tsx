import React from 'react';
import { Briefcase, CheckCircle2, XCircle, Building2, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JobModerationTab: React.FC = () => {
  const { jobListings, moderateJob, accessToken } = useApp();

  const handleAction = (jobId: string, action: 'APPROVE' | 'REJECT') => {
    moderateJob(jobId, action);
    fetch(`http://localhost:5000/api/admin/jobs/${jobId}/moderate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ action }),
    }).catch(err => console.log('Backend sync notice:', err.message));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Modern Light */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" /> Job Moderation & Spam Protection
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Review and moderate job postings submitted by Gym Owners before they appear on the live Manpower Services portal.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobListings.map(job => (
          <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${job.isActive ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-red-100 text-red-900 border border-red-300'}`}>
                  {job.isActive ? 'Active & Live' : 'Moderated / Suspended'}
                </span>
                <span className="text-xs text-slate-500 font-mono">Posted: {job.createdAt}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mb-3 font-semibold">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-blue-600" /> {job.companyName || job.gymName || 'Gym Center'}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {job.location}</span>
                <span className="text-blue-700 font-bold">{job.salaryRange}</span>
              </div>

              <p className="text-xs text-slate-800 leading-relaxed line-clamp-3 bg-[#F4F9FF] p-3.5 rounded-xl border border-blue-100 font-sans">
                {job.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              {job.isActive ? (
                <button
                  onClick={() => handleAction(job.id, 'REJECT')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  <XCircle className="w-4 h-4" /> Reject & Flag Spammer
                </button>
              ) : (
                <button
                  onClick={() => handleAction(job.id, 'APPROVE')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve & Publish Live
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
