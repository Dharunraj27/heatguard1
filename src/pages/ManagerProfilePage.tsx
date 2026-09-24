import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Shield, Key, Bell, HardDrive, CheckCircle2 } from 'lucide-react';

export const ManagerProfilePage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="space-y-6 max-w-3xl pb-24">
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50 glow-cyan"
        />
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
          <span className="text-xs font-mono text-cyan-400 block mt-0.5">{user.role} • Site Manager Alpha</span>
          <span className="text-[11px] text-slate-400 font-mono block mt-1">{user.email}</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 font-mono text-xs">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Manager Preferences</h3>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span>Automatic Critical Alert Sound:</span>
          <span className="text-emerald-400 font-bold">ENABLED</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span>Edge Node Local Sync Frequency:</span>
          <span className="text-cyan-400 font-bold">3 SECONDS</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
          <span>Local Data Retention Policy:</span>
          <span className="text-slate-300">30 DAYS ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};
