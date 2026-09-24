import React from 'react';
import { Cpu } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Processing Edge AI Telemetry...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <Cpu className="w-5 h-5 text-cyan-400 absolute" />
      </div>
      <p className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase animate-pulse">
        {message}
      </p>
    </div>
  );
};
