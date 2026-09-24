import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, CheckCircle2, ShieldAlert, AlertTriangle, PhoneCall } from 'lucide-react';

export const SosButton: React.FC = () => {
  const { triggerSOS, user } = useApp();
  const [holding, setHolding] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (holding && !sosTriggered) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setSosTriggered(true);
            triggerSOS(user.workerId || 'W001');
            setHolding(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } else {
      if (!sosTriggered) setProgress(0);
    }
    return () => clearInterval(timer);
  }, [holding, sosTriggered, triggerSOS, user.workerId]);

  const handleMouseDown = () => setHolding(true);
  const handleMouseUp = () => {
    if (!sosTriggered) setHolding(false);
  };

  const handleResetSos = () => {
    setSosTriggered(false);
    setProgress(0);
  };

  return (
    <div className="rounded-2xl border border-red-500/40 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 p-8 backdrop-blur-md text-center space-y-6 shadow-2xl glow-emergency">
      <div className="max-w-md mx-auto space-y-2">
        <h3 className="text-xl font-extrabold text-white font-mono tracking-tight flex items-center justify-center gap-2">
          <Flame className="w-6 h-6 text-red-400 animate-pulse" />
          <span>WORKER EMERGENCY SOS PANIC</span>
        </h3>
        <p className="text-xs text-slate-300">
          Press and hold for 3 seconds to immediately broadcast your distress position to the Site Manager command center.
        </p>
      </div>

      {!sosTriggered ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            className="relative w-44 h-44 rounded-full bg-gradient-to-b from-red-500 to-red-700 text-white font-extrabold font-mono text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-2 border-4 border-red-400/50 glow-emergency select-none group"
          >
            <Flame className="w-12 h-12 group-hover:animate-bounce" />
            <span className="tracking-wider">PRESS & HOLD</span>
            <span className="text-[10px] font-sans font-bold bg-slate-950/60 px-2 py-0.5 rounded text-red-200">
              3 SECONDS
            </span>

            {/* Circular Hold Progress Overlay */}
            {holding && (
              <div
                className="absolute inset-0 rounded-full bg-red-400/30 border-4 border-white transition-all pointer-events-none"
                style={{ opacity: progress / 100 }}
              />
            )}
          </button>

          <p className="text-xs font-mono text-slate-400">
            {holding ? `HOLDING: ${progress}%...` : 'Touch and hold red button above'}
          </p>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-red-500/60 bg-red-500/15 space-y-4 max-w-lg mx-auto">
          <div className="p-3 rounded-full bg-red-500 text-white inline-block animate-bounce">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-lg font-extrabold text-white">EMERGENCY EVENT CREATED!</h4>
            <p className="text-xs text-red-200 mt-1">
              Your distress signal has been dispatched over LoRa/Wi-Fi mesh to Site Manager command.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono text-left max-w-sm mx-auto p-4 rounded-xl bg-slate-950/80 border border-red-500/30">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Alert Sent to Edge Node:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> SENT ✓
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Manager Dashboard Notified:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> NOTIFIED ✓
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Site Marshal Response:</span>
              <span className="text-amber-400 font-bold">ACK PENDING...</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 pt-1.5">
              <span className="text-slate-400">Comms Method:</span>
              <span className="text-cyan-400 font-bold">LoRa Mesh 868MHz</span>
            </div>
          </div>

          <button
            onClick={handleResetSos}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700 hover:text-white transition-colors"
          >
            Cancel / Clear Emergency Status
          </button>
        </div>
      )}

      <p className="text-[10px] text-slate-500 max-w-md mx-auto">
        * SOS triggers emergency notifications on the Site Manager command dashboard and local LoRa edge receivers. Emergency services integration subject to site supervisor dispatch.
      </p>
    </div>
  );
};
