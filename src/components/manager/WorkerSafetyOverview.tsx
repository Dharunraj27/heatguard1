import React from 'react';
import { useApp } from '../../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, AlertTriangle, AlertOctagon, Flame, WifiOff } from 'lucide-react';

interface WorkerSafetyOverviewProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const WorkerSafetyOverview: React.FC<WorkerSafetyOverviewProps> = ({
  activeFilter,
  onFilterChange
}) => {
  const { workers } = useApp();

  const normalCount = workers.filter(w => w.status === 'NORMAL').length;
  const cautionCount = workers.filter(w => w.status === 'CAUTION').length;
  const highRiskCount = workers.filter(w => w.status === 'HIGH_RISK').length;
  const emergencyCount = workers.filter(w => w.status === 'EMERGENCY').length;
  const noDataCount = workers.filter(w => w.status === 'NO_DATA').length;
  const total = workers.length || 1;

  const chartData = [
    { name: 'NORMAL', value: normalCount, color: '#10b981' },
    { name: 'CAUTION', value: cautionCount, color: '#f59e0b' },
    { name: 'HIGH RISK', value: highRiskCount, color: '#f97316' },
    { name: 'EMERGENCY', value: emergencyCount, color: '#ef4444' },
    { name: 'NO DATA', value: noDataCount, color: '#6b7280' }
  ].filter(d => d.value > 0);

  const categories: Array<{
    id: string;
    label: string;
    count: number;
    percent: number;
    color: string;
    bgColor: string;
    icon: any;
  }> = [
    {
      id: 'NORMAL',
      label: 'NORMAL',
      count: normalCount,
      percent: Math.round((normalCount / total) * 100),
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500',
      icon: ShieldCheck
    },
    {
      id: 'CAUTION',
      label: 'CAUTION',
      count: cautionCount,
      percent: Math.round((cautionCount / total) * 100),
      color: 'text-amber-400',
      bgColor: 'bg-amber-500',
      icon: AlertTriangle
    },
    {
      id: 'HIGH_RISK',
      label: 'HIGH RISK',
      count: highRiskCount,
      percent: Math.round((highRiskCount / total) * 100),
      color: 'text-orange-400',
      bgColor: 'bg-orange-500',
      icon: AlertOctagon
    },
    {
      id: 'EMERGENCY',
      label: 'EMERGENCY',
      count: emergencyCount,
      percent: Math.round((emergencyCount / total) * 100),
      color: 'text-red-400',
      bgColor: 'bg-red-500',
      icon: Flame
    },
    {
      id: 'NO_DATA',
      label: 'NO DATA',
      count: noDataCount,
      percent: Math.round((noDataCount / total) * 100),
      color: 'text-slate-400',
      bgColor: 'bg-slate-500',
      icon: WifiOff
    }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
            Worker Safety Status Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Real-time Edge AI physiological risk assessment across site workers
          </p>
        </div>
        {activeFilter !== 'all' && (
          <button
            onClick={() => onFilterChange('all')}
            className="text-xs text-cyan-400 hover:underline font-mono"
          >
            Clear Filter ({activeFilter})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Donut Chart */}
        <div className="lg:col-span-4 h-48 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: '#1e293b',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold font-mono text-white leading-none">
              {total}
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">WORKERS</span>
          </div>
        </div>

        {/* Horizontal Status Progress Bars */}
        <div className="lg:col-span-8 space-y-3">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = activeFilter === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onFilterChange(isSelected ? 'all' : cat.id)}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-4 h-4 ${cat.color}`} />
                    <span className={`text-xs font-bold font-mono tracking-wider ${cat.color}`}>
                      {cat.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-extrabold text-white">{cat.count}</span>
                    <span className="text-slate-500">({cat.percent}%)</span>
                  </div>
                </div>

                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/5">
                  <div
                    className={`h-full transition-all duration-500 ${cat.bgColor}`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
