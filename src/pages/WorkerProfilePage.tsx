import React from 'react';
import { useApp } from '../context/AppContext';
import { User } from 'lucide-react';

export const WorkerProfilePage: React.FC = () => {
  const { user, workers } = useApp();
  const worker = workers.find(w => w.id === (user.workerId || 'W001')) || workers[0];

  return (
    <div className="space-y-6 max-w-3xl pb-24">
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50 glow-cyan"
        />
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{worker.name}</h2>
          <span className="text-xs font-mono text-cyan-400 block mt-0.5">
            {worker.role} • {worker.code} • {worker.siteName}
          </span>
          <span className="text-[11px] text-slate-400 font-mono block mt-1">Shift: {worker.shift}</span>
        </div>
      </div>
    </div>
  );
};
