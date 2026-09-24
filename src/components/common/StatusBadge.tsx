import React from 'react';
import type { RiskStatus } from '../../types/heatguard';
import { CheckCircle2, AlertTriangle, AlertOctagon, Flame, WifiOff } from 'lucide-react';

interface StatusBadgeProps {
  status: RiskStatus;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showDescription = false,
  size = 'md',
  className = ''
}) => {
  const getDetails = (st: RiskStatus) => {
    switch (st) {
      case 'NORMAL':
        return {
          label: 'NORMAL',
          description: 'Monitoring stable',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          dotBg: 'bg-emerald-500',
          icon: CheckCircle2
        };
      case 'CAUTION':
        return {
          label: 'CAUTION',
          description: 'Unusual change detected',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          dotBg: 'bg-amber-500',
          icon: AlertTriangle
        };
      case 'HIGH_RISK':
        return {
          label: 'HIGH RISK',
          description: 'Immediate attention recommended',
          bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
          dotBg: 'bg-orange-500 animate-pulse',
          icon: AlertOctagon
        };
      case 'EMERGENCY':
        return {
          label: 'EMERGENCY',
          description: 'Emergency event active',
          bg: 'bg-red-500/20 text-red-400 border-red-500/50 glow-emergency',
          dotBg: 'bg-red-500 animate-ping',
          icon: Flame
        };
      case 'NO_DATA':
      default:
        return {
          label: 'NO DATA',
          description: 'Device has not reported recently',
          bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          dotBg: 'bg-slate-500',
          icon: WifiOff
        };
    }
  };

  const config = getDetails(status);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-2.5 py-1 text-xs font-semibold gap-2',
    lg: 'px-3 py-1.5 text-sm font-bold gap-2.5'
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size];

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`inline-flex items-center rounded-md border backdrop-blur-md transition-all ${config.bg} ${sizeClasses}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.dotBg}`} />
        <IconComponent className={iconSizes} />
        <span>{config.label}</span>
      </span>
      {showDescription && (
        <span className="text-[11px] text-slate-400 mt-1 font-normal">
          {config.description}
        </span>
      )}
    </div>
  );
};
