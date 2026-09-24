import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Wifi, CheckCircle2, AlertTriangle, AlertOctagon, Flame } from 'lucide-react';

interface KpiCardsProps {
  onSelectFilter?: (filter: string) => void;
  activeFilter?: string;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ onSelectFilter, activeFilter }) => {
  const { workers, alerts } = useApp();

  const totalWorkers = workers.length;
  const connectedWorkers = workers.filter(w => w.status !== 'NO_DATA').length;
  const normalWorkers = workers.filter(w => w.status === 'NORMAL').length;
  const cautionWorkers = workers.filter(w => w.status === 'CAUTION').length;
  const highRiskWorkers = workers.filter(w => w.status === 'HIGH_RISK').length;
  const activeSosCount = alerts.filter(a => a.priority === 'SOS' && a.status === 'ACTIVE').length;

  const connectedPercent = ((connectedWorkers / totalWorkers) * 100).toFixed(1);

  const kpis = [
    {
      filterKey: 'all',
      label: 'TOTAL WORKERS',
      value: totalWorkers,
      subtext: 'Registered workforce',
      icon: Users,
      color: 'text-cyan-400',
      borderColor: activeFilter === 'all' ? 'border-cyan-500 ring-2 ring-cyan-500/40 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/60'
    },
    {
      filterKey: 'CONNECTED',
      label: 'CONNECTED',
      value: connectedWorkers,
      subtext: `${connectedPercent}% of active devices`,
      icon: Wifi,
      color: 'text-blue-400',
      borderColor: activeFilter === 'CONNECTED' ? 'border-blue-500 ring-2 ring-blue-500/40 bg-blue-500/15' : 'border-blue-500/30 bg-blue-500/5'
    },
    {
      filterKey: 'NORMAL',
      label: 'NORMAL STATE',
      value: normalWorkers,
      subtext: 'Monitoring stable',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      borderColor: activeFilter === 'NORMAL' ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-500/15' : 'border-emerald-500/30 bg-emerald-500/5'
    },
    {
      filterKey: 'CAUTION',
      label: 'CAUTION',
      value: cautionWorkers,
      subtext: 'Unusual strain / heat',
      icon: AlertTriangle,
      color: 'text-amber-400',
      borderColor: activeFilter === 'CAUTION' ? 'border-amber-500 ring-2 ring-amber-500/40 bg-amber-500/15' : 'border-amber-500/30 bg-amber-500/5'
    },
    {
      filterKey: 'HIGH_RISK',
      label: 'HIGH RISK',
      value: highRiskWorkers,
      subtext: 'Attention required',
      icon: AlertOctagon,
      color: 'text-orange-400',
      borderColor: activeFilter === 'HIGH_RISK' ? 'border-orange-500 ring-2 ring-orange-500/40 bg-orange-500/20' : 'border-orange-500/40 bg-orange-500/10 glow-high-risk'
    },
    {
      filterKey: 'SOS',
      label: 'ACTIVE SOS',
      value: activeSosCount,
      subtext: activeSosCount > 0 ? 'EMERGENCY EVENT!' : 'Zero emergency alerts',
      icon: Flame,
      color: activeSosCount > 0 ? 'text-red-400' : 'text-slate-400',
      borderColor: activeFilter === 'SOS' ? 'border-red-500 ring-2 ring-red-500/50 bg-red-500/30' : activeSosCount > 0 ? 'border-red-500/60 glow-emergency bg-red-500/20' : 'border-slate-800 bg-slate-900/40'
    }
  ];

  const handleCardClick = (filterKey: string) => {
    if (onSelectFilter) {
      onSelectFilter(filterKey);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
      {kpis.map((kpi) => {
        const IconComponent = kpi.icon;
        return (
          <button
            key={kpi.filterKey}
            onClick={() => handleCardClick(kpi.filterKey)}
            className={`rounded-2xl border p-4 backdrop-blur-md transition-all text-left hover:scale-[1.03] active:scale-[0.98] cursor-pointer group ${kpi.borderColor}`}
            title={`Click to filter roster by ${kpi.label}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wider group-hover:text-white transition-colors">
                {kpi.label}
              </span>
              <div className={`p-1.5 rounded-lg bg-slate-950/60 border border-white/5 ${kpi.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {kpi.value}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mt-1 font-medium truncate group-hover:text-slate-200">
              {kpi.subtext}
            </p>
          </button>
        );
      })}
    </div>
  );
};
