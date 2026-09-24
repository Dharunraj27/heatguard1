import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Wifi, CheckCircle2 } from 'lucide-react';

export const WorkerDevicePage: React.FC = () => {
  const { workers, user, edgeNode } = useApp();
  const worker = workers.find(w => w.id === (user.workerId || 'W001')) || workers[0];

  return (
    <div className="space-y-6 max-w-3xl pb-24">
      <div className="p-6 rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight font-mono flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Assigned Wearable Hardware Info</span>
          </h2>
          <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            CONNECTED
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">DEVICE ID</span>
            <span className="font-bold text-cyan-400">{worker.deviceId}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">FIRMWARE VERSION</span>
            <span className="font-bold text-slate-200">v0.9.4-lora</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">BATTERY</span>
            <span className="font-bold text-emerald-400">{worker.telemetry.battery}%</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">COMM LINK</span>
            <span className="font-bold text-blue-400">LoRa 868MHz Mesh</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">EDGE NODE</span>
            <span className="font-bold text-emerald-400">{edgeNode.hardware}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">SIGNAL STRENGTH</span>
            <span className="font-bold text-cyan-400">GOOD (94%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
