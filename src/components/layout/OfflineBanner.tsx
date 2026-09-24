import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

interface OfflineBannerProps {
  message?: string;
  isStale?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = 'Telemetry stream interrupted. Showing last cached personal baseline & edge indicators.',
  isStale = false
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 border-y border-amber-500/30 px-4 py-2.5 flex items-center justify-between text-amber-300 text-xs font-medium">
      <div className="flex items-center gap-2.5 mx-auto">
        <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
        <span className="font-semibold">{isStale ? 'STALE DATA WARNING:' : 'OFFLINE MODE:'}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};
