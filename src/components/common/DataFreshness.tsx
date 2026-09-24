import React from 'react';
import { Wifi, WifiOff, Clock } from 'lucide-react';

interface DataFreshnessProps {
  lastUpdate: string;
  isStale?: boolean;
  className?: string;
}

export const DataFreshness: React.FC<DataFreshnessProps> = ({
  lastUpdate,
  isStale = false,
  className = ''
}) => {
  if (isStale || lastUpdate.includes('min') || lastUpdate.includes('ago')) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${className}`}>
        <Clock className="w-3 h-3 animate-pulse" />
        <span>STALE DATA ({lastUpdate})</span>
      </span>
    );
  }

  if (lastUpdate === 'OFFLINE' || lastUpdate === '0') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20 ${className}`}>
        <WifiOff className="w-3 h-3" />
        <span>OFFLINE</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
      </span>
      <Wifi className="w-3 h-3" />
      <span>LIVE ({lastUpdate})</span>
    </span>
  );
};
