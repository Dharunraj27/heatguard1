import React, { useState } from 'react';
import { INITIAL_USERS } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Shield, Search, Building2, HardHat, CheckCircle2, Key } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { workers } = useApp();
  const [activeRoleFilter, setActiveRoleFilter] = useState<'ALL' | 'SITE_MANAGER' | 'WORKER' | 'ADMIN'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const siteManagersCount = INITIAL_USERS.filter(u => u.role === 'SITE_MANAGER').length;
  const adminsCount = INITIAL_USERS.filter(u => u.role === 'ADMIN').length;
  const totalWorkersCount = workers.length;

  // Combine initial users and all generated workers for complete directory
  const allAccounts = [
    ...INITIAL_USERS,
    ...workers
      .filter(w => !INITIAL_USERS.some(u => u.workerId === w.id))
      .map(w => ({
        id: `usr-${w.code.toLowerCase()}`,
        name: w.name,
        email: `${w.code.toLowerCase()}@heatguard.io`,
        role: 'WORKER' as const,
        workerId: w.id,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
      }))
  ];

  const filteredUsers = allAccounts.filter(u => {
    const matchesRole = activeRoleFilter === 'ALL' || u.role === activeRoleFilter;
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.workerId && u.workerId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Admin System & User Access Directory</span>
          </h2>
          <p className="text-xs text-slate-400">
            Role-based access control, user credentials, and active system permissions
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 font-mono text-xs">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Admins:</span>
            <span className="font-bold text-white">{adminsCount}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 font-mono text-xs">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Site Managers:</span>
            <span className="font-bold text-cyan-400">{siteManagersCount}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 font-mono text-xs">
            <HardHat className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Field Workers:</span>
            <span className="font-bold text-emerald-400">{totalWorkersCount}</span>
          </div>
        </div>
      </div>

      {/* Default Passwords Info Card */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white uppercase">HEATGUARD Authentication Credentials</h3>
            <p className="text-[11px] text-slate-400">
              Default password for all accounts (Admins, Site Managers, and Workers W001-W024) is: <strong className="text-cyan-400 font-bold">heatguard2026</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search & Role Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
          {(['ALL', 'SITE_MANAGER', 'WORKER', 'ADMIN'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeRoleFilter === r
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {r === 'ALL' ? `ALL USERS (${allAccounts.length})` : `${r.replace('_', ' ')} (${allAccounts.filter(u => u.role === r).length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search manager or worker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md font-mono text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] text-slate-400 uppercase">
              <th className="py-3 px-4">User Account</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Default Password</th>
              <th className="py-3 px-4">Status & Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredUsers.map((u) => {
              const getRoleBadge = () => {
                if (u.role === 'ADMIN') {
                  return <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/30">SYSTEM ADMIN</span>;
                }
                if (u.role === 'SITE_MANAGER') {
                  return <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">SITE MANAGER</span>;
                }
                return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">FIELD WORKER ({u.workerId || 'W001'})</span>;
              };

              return (
                <tr key={u.id} className="hover:bg-slate-900/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-[10px] text-slate-500 block">ID: {u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{u.email}</td>
                  <td className="py-3 px-4">{getRoleBadge()}</td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">heatguard2026</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>AUTHORIZED</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
