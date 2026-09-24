import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LiveWorkerTable } from '../components/manager/LiveWorkerTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { Users, LayoutGrid, List } from 'lucide-react';

export const ManagerWorkersPage: React.FC = () => {
  const { workers, setSelectedWorkerId, navigate } = useApp();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const handleSelectWorker = (id: string) => {
    setSelectedWorkerId(id);
    navigate(`/manager/workers/${id}`);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Worker Roster & Health Directory</span>
          </h2>
          <p className="text-xs text-slate-400">
            Comprehensive list of active shift personnel, assigned wearables, and risk state
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <LiveWorkerTable />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {workers.map((w) => (
            <div
              key={w.id}
              onClick={() => handleSelectWorker(w.id)}
              className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md hover:border-cyan-500/40 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {w.name}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400">{w.code}</span>
                </div>
                <StatusBadge status={w.status} size="sm" />
              </div>

              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>ROLE: <span className="text-slate-200">{w.role}</span></div>
                <div>SITE: <span className="text-slate-200">{w.siteName}</span></div>
                <div>DEVICE: <span className="text-slate-200">{w.deviceId}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-bold">
                  {w.status === 'NO_DATA' ? '—' : `${w.telemetry.heartRate} BPM`}
                </span>
                <BatteryIndicator level={w.telemetry.battery} size="sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
