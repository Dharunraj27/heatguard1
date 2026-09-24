import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

export const WorkerAlertsPage: React.FC = () => {
  const { alerts, user } = useApp();

  const myAlerts = alerts.filter(a => a.workerId === (user.workerId || 'W001') || a.workerCode === (user.workerId || 'W001'));

  return (
    <div className="space-y-6 pb-24 max-w-4xl">
      <div>
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
          <AlertOctagon className="w-5 h-5 text-cyan-400" />
          <span>Your Safety Notifications & Recommendations</span>
        </h2>
        <p className="text-xs text-slate-400">
          Personal safety recommendations derived from your baseline and site climate
        </p>
      </div>

      <div className="space-y-3">
        {myAlerts.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">No Active Personal Alerts</h4>
            <p className="text-xs text-slate-400 mt-1">Your readings are nominal.</p>
          </div>
        ) : (
          myAlerts.map(alert => (
            <div key={alert.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-400">{alert.eventType}</span>
                <span className="text-slate-400">{alert.timestamp}</span>
              </div>
              <p className="text-xs text-slate-200">{alert.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
