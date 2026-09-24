import React from 'react';
import { useApp } from '../context/AppContext';
import { WorkerMetricsGrid } from '../components/worker/WorkerMetricsGrid';
import { DataFreshness } from '../components/common/DataFreshness';
import { Activity, Radio, Cpu } from 'lucide-react';

export const WorkerMonitoringPage: React.FC = () => {
  const { workers, user } = useApp();
  const worker = workers.find(w => w.id === (user.workerId || 'W001')) || workers[0];

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Live Telemetry Stream</span>
          </h2>
          <p className="text-xs text-slate-400">
            High-frequency sensor stream acquired by ESP32 wristband & processed on Arduino UNO Q
          </p>
        </div>

        <DataFreshness lastUpdate={worker.lastUpdate} />
      </div>

      <WorkerMetricsGrid telemetry={worker.telemetry} />

      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 font-mono text-xs space-y-3">
        <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>Local Signal Quality & RF Diagnostics</span>
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">SIGNAL STRENGTH</span>
            <span className="font-bold text-cyan-400">{worker.telemetry.signalQuality}% (-76 dBm)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">TRANSMISSION LINK</span>
            <span className="font-bold text-blue-400">LoRa 868MHz Mesh</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">PACKET LOSS</span>
            <span className="font-bold text-emerald-400">0.02% (NOMINAL)</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">EDGE PROCESSING</span>
            <span className="font-bold text-emerald-400">0.14s LATENCY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
