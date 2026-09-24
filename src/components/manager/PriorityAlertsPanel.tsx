import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertOctagon, Check, ArrowRight, ShieldAlert, Clock, Flame } from 'lucide-react';

export const PriorityAlertsPanel: React.FC = () => {
  const { alerts, acknowledgeAlert, setSelectedWorkerId, navigate } = useApp();

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'SOS':
        return {
          bg: 'bg-red-500/15 border-red-500/50 glow-emergency',
          text: 'text-red-400',
          badge: 'bg-red-500 text-white font-bold animate-pulse'
        };
      case 'HIGH':
        return {
          bg: 'bg-orange-500/10 border-orange-500/40 glow-high-risk',
          text: 'text-orange-400',
          badge: 'bg-orange-500 text-slate-950 font-bold'
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30',
          text: 'text-amber-400',
          badge: 'bg-amber-500 text-slate-950 font-semibold'
        };
      default:
        return {
          bg: 'bg-slate-900/60 border-slate-800',
          text: 'text-slate-400',
          badge: 'bg-slate-700 text-white font-normal'
        };
    }
  };

  const handleViewWorker = (workerId: string) => {
    setSelectedWorkerId(workerId);
    navigate(`/manager/workers/${workerId}`);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
              Attention Required
              {activeAlerts.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {activeAlerts.length} ACTIVE
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400">
              High risk events, manual distress signals, & heat stress indicators requiring response
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/manager/alerts')}
          className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
        >
          <span>View All Alerts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {activeAlerts.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-slate-800/80 bg-slate-950/40">
          <ShieldAlert className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-200">All Clear — No Active Alerts</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            All workers are currently within nominal thermal baseline ranges.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeAlerts.slice(0, 3).map((alert) => {
            const style = getPriorityStyle(alert.priority);
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${style.bg}`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`p-2 rounded-lg bg-slate-950/80 border border-white/5 ${style.text}`}>
                    {alert.priority === 'SOS' ? <Flame className="w-5 h-5 animate-pulse" /> : <AlertOctagon className="w-5 h-5" />}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${style.badge}`}>
                        {alert.priority} PRIORITY
                      </span>
                      <span className="text-xs font-bold text-white">
                        {alert.workerName} ({alert.workerCode})
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 font-medium leading-snug">
                      {alert.eventType}: {alert.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-950 text-slate-200 border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Acknowledge</span>
                  </button>

                  <button
                    onClick={() => handleViewWorker(alert.workerId)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                  >
                    <span>View Worker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
