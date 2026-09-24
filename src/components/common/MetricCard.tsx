import React from 'react';
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  status?: 'NORMAL' | 'CAUTION' | 'HIGH_RISK' | 'STALE' | 'OFFLINE';
  trend?: 'up' | 'down' | 'stable';
  trendText?: string;
  signalQuality?: number;
  timestamp?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  icon: IconComponent,
  status = 'NORMAL',
  trend = 'stable',
  trendText,
  signalQuality,
  timestamp,
  className = ''
}) => {
  const getStatusBorder = () => {
    switch (status) {
      case 'CAUTION':
        return 'border-amber-500/40 bg-amber-500/5';
      case 'HIGH_RISK':
        return 'border-orange-500/50 bg-orange-500/10 glow-high-risk';
      case 'OFFLINE':
      case 'STALE':
        return 'border-slate-800 bg-slate-900/40 opacity-70';
      case 'NORMAL':
      default:
        return 'border-slate-800/80 bg-slate-900/60 hover:border-cyan-500/30';
    }
  };

  const renderTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-amber-400" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />;
    return <Minus className="w-3.5 h-3.5 text-slate-500" />;
  };

  return (
    <div className={`rounded-xl border p-4 backdrop-blur-md transition-all ${getStatusBorder()} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-white/5 text-cyan-400">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
            {label}
          </span>
        </div>

        {signalQuality !== undefined && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-white/5">
            SIG {signalQuality}%
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
            {status === 'OFFLINE' || value === 0 ? '—' : value}
          </span>
          {unit && status !== 'OFFLINE' && value !== 0 && (
            <span className="text-xs font-semibold text-slate-400">{unit}</span>
          )}
        </div>

        {trendText && (
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-950/50 px-2 py-0.5 rounded border border-white/5">
            {renderTrendIcon()}
            <span>{trendText}</span>
          </div>
        )}
      </div>

      {timestamp && (
        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>UPDATED</span>
          <span>{timestamp}</span>
        </div>
      )}
    </div>
  );
};
