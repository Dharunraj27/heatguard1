import React from 'react';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';

interface BatteryIndicatorProps {
  level: number; // 0 - 100
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  level,
  showLabel = true,
  size = 'md'
}) => {
  const getBatteryColor = (lvl: number) => {
    if (lvl <= 20) return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (lvl <= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  const IconComponent = level <= 15 ? BatteryWarning : Battery;
  const colorClass = getBatteryColor(level);

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-mono font-medium ${colorClass}`}>
      <IconComponent className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      {showLabel && <span>{level}%</span>}
    </div>
  );
};
