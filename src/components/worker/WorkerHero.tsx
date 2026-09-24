import React from 'react';
import type { Worker } from '../../types/heatguard';
import { StatusBadge } from '../common/StatusBadge';
import { DataFreshness } from '../common/DataFreshness';
import { ShieldCheck, ShieldAlert, Flame, Sparkles } from 'lucide-react';

interface WorkerHeroProps {
  worker: Worker;
  onOpenSos?: () => void;
}

export const WorkerHero: React.FC<WorkerHeroProps> = ({ worker, onOpenSos }) => {
  const isOffline = worker.status === 'NO_DATA';

  const getHeroDetails = () => {
    switch (worker.status) {
      case 'NORMAL':
        return {
          title: 'NORMAL MONITORING',
          message: 'Your current sensor telemetry is aligned within your personalized reference pattern.',
          submessage: 'Hydration recommended for current shift temperature.',
          bg: 'bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30',
          icon: ShieldCheck,
          accent: 'text-emerald-400'
        };
      case 'CAUTION':
        return {
          title: 'CAUTION: THERMAL LOAD INCREASE',
          message: 'Your heart rate and skin temperature indicate rising heat strain.',
          submessage: 'Safety recommendation: Consider taking a 10-minute rest break in a shaded cool zone.',
          bg: 'bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/40',
          icon: ShieldAlert,
          accent: 'text-amber-400'
        };
      case 'HIGH_RISK':
        return {
          title: 'HIGH RISK: IMMEDIATE REST REQUIRED',
          message: 'Significant deviation from your personal thermal reference range detected!',
          submessage: 'Instruction: Stop heavy strain, move to shaded area immediately, and notify site safety marshal.',
          bg: 'bg-gradient-to-r from-orange-500/20 via-slate-900 to-slate-900 border-orange-500/50 glow-high-risk',
          icon: ShieldAlert,
          accent: 'text-orange-400'
        };
      case 'EMERGENCY':
        return {
          title: 'EMERGENCY SOS DISTRESS ACTIVE',
          message: 'Emergency distress signal has been sent to site command center!',
          submessage: 'Site safety response team has been notified with your GPS/mesh location.',
          bg: 'bg-gradient-to-r from-red-500/25 via-slate-900 to-slate-900 border-red-500/60 glow-emergency',
          icon: Flame,
          accent: 'text-red-400'
        };
      case 'NO_DATA':
      default:
        return {
          title: 'DEVICE TELEMETRY PAUSED',
          message: 'Wristband device has not transmitted data in the last 15 minutes.',
          submessage: 'Check wristband placement, battery level, or LoRa link connection.',
          bg: 'bg-slate-900/60 border-slate-800',
          icon: ShieldAlert,
          accent: 'text-slate-400'
        };
    }
  };

  const details = getHeroDetails();
  const IconComp = details.icon;

  return (
    <div className={`rounded-2xl border p-6 backdrop-blur-md transition-all ${details.bg}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Good afternoon, {worker.name}
            </h1>
            <DataFreshness lastUpdate={worker.lastUpdate} isStale={isOffline} />
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={worker.status} size="lg" />
            <span className="text-xs text-slate-400 font-mono">
              ROLE: {worker.role} • {worker.siteName}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-200 leading-relaxed max-w-2xl">
            {details.message}
          </p>

          <p className={`text-xs font-semibold ${details.accent} bg-slate-950/60 p-3 rounded-xl border border-white/5 inline-block`}>
            💡 {details.submessage}
          </p>
        </div>

        {/* SOS Quick Button */}
        {onOpenSos && (
          <div className="flex flex-col items-center justify-center shrink-0">
            <button
              onClick={onOpenSos}
              className="p-5 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white font-extrabold font-mono shadow-2xl hover:scale-105 transition-all glow-emergency border border-red-400/50 flex flex-col items-center gap-2 group"
            >
              <Flame className="w-8 h-8 group-hover:animate-bounce" />
              <span className="text-sm tracking-wider">PANIC / SOS</span>
            </button>
            <span className="text-[10px] text-slate-400 font-mono mt-2">
              Press to summon site marshal
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
