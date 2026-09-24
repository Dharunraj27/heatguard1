import React from 'react';
import type { RiskStatus } from '../../types/heatguard';
import { ShieldCheck, ShieldAlert, AlertOctagon, Flame } from 'lucide-react';

interface RiskIndicatorProps {
  status: RiskStatus;
  factors?: string[];
  recommendation?: string;
  className?: string;
}

export const RiskIndicator: React.FC<RiskIndicatorProps> = ({
  status,
  factors = [],
  recommendation,
  className = ''
}) => {
  const getRiskDetails = (st: RiskStatus) => {
    switch (st) {
      case 'NORMAL':
        return {
          title: 'NORMAL MONITORING',
          levelText: 'Low Risk — Nominal Baseline',
          color: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
          bgColor: 'bg-emerald-500/5',
          progressColor: 'bg-emerald-500',
          percent: 15,
          icon: ShieldCheck
        };
      case 'CAUTION':
        return {
          title: 'CAUTION DETECTED',
          levelText: 'Elevated Strain — Rest Advised',
          color: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          bgColor: 'bg-amber-500/5',
          progressColor: 'bg-amber-500',
          percent: 55,
          icon: ShieldAlert
        };
      case 'HIGH_RISK':
        return {
          title: 'HIGH RISK STATE',
          levelText: 'Action Required — Take Immediate Rest',
          color: 'text-orange-400',
          borderColor: 'border-orange-500/30',
          bgColor: 'bg-orange-500/10 glow-high-risk',
          progressColor: 'bg-orange-500',
          percent: 85,
          icon: AlertOctagon
        };
      case 'EMERGENCY':
        return {
          title: 'EMERGENCY SOS',
          levelText: 'Active SOS — Immediate Assistance Dispatched',
          color: 'text-red-400',
          borderColor: 'border-red-500/50 glow-emergency',
          bgColor: 'bg-red-500/15',
          progressColor: 'bg-red-500',
          percent: 100,
          icon: Flame
        };
      case 'NO_DATA':
      default:
        return {
          title: 'NO TELEMETRY DATA',
          levelText: 'Device Signal Disconnected',
          color: 'text-slate-400',
          borderColor: 'border-slate-500/30',
          bgColor: 'bg-slate-500/5',
          progressColor: 'bg-slate-600',
          percent: 0,
          icon: ShieldAlert
        };
    }
  };

  const details = getRiskDetails(status);
  const IconComp = details.icon;

  return (
    <div className={`rounded-xl border p-4 backdrop-blur-md ${details.bgColor} ${details.borderColor} ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg bg-slate-950/60 border border-white/5 ${details.color}`}>
            <IconComp className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`text-sm font-bold tracking-wide uppercase ${details.color}`}>
              {details.title}
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              {details.levelText}
            </p>
          </div>
        </div>

        <span className="font-mono text-xs text-slate-400 font-semibold bg-slate-900/80 px-2.5 py-1 rounded border border-white/5">
          {details.percent}% RISK INDEX
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-white/5 mb-3">
        <div
          className={`h-full transition-all duration-700 ease-out ${details.progressColor}`}
          style={{ width: `${details.percent}%` }}
        />
      </div>

      {/* Detected Factors */}
      {factors.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Detected Factors:
          </span>
          <ul className="space-y-1">
            {factors.map((factor, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Recommendation */}
      {recommendation && (
        <div className="mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
          <span className="font-bold text-cyan-400 block mb-0.5">Safety Recommendation:</span>
          {recommendation}
        </div>
      )}
    </div>
  );
};
