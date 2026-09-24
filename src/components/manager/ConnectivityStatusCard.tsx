import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, Wifi, HardDrive, Database, Monitor, CheckCircle2 } from 'lucide-react';

export const ConnectivityStatusCard: React.FC = () => {
  const { workers, edgeNode } = useApp();

  const totalWorkers = workers.length;
  const connectedCount = workers.filter(w => w.status !== 'NO_DATA').length;

  const topology = [
    { label: 'WRISTBANDS', detail: 'ESP32 Sensors', icon: Radio, status: `${connectedCount}/${totalWorkers} Online` },
    { label: 'NETWORK', detail: 'LoRa / Wi-Fi Mesh', icon: Wifi, status: 'Healthy' },
    { label: 'EDGE NODE', detail: 'Arduino UNO Q', icon: HardDrive, status: 'Online' },
    { label: 'LOCAL DB', detail: 'Encrypted Cache', icon: Database, status: 'Synced' },
    { label: 'DASHBOARD', detail: 'Local Command UI', icon: Monitor, status: 'Active' }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
              Site Mesh Connectivity Status
            </h3>
            <p className="text-xs text-slate-400">
              LoRa gateway & Local Edge Network topology
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          <span>LORA GATEWAY HEALTHY</span>
        </span>
      </div>

      {/* Network Topology Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
        {topology.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col items-center text-center space-y-1 relative group hover:border-blue-500/40 transition-colors"
            >
              <IconComp className="w-5 h-5 text-cyan-400 mb-1" />
              <span className="text-xs font-extrabold font-mono text-white block leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-400 block">{item.detail}</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1">
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
