import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, CpuIcon, Activity, ArrowRight, Shield, Database } from 'lucide-react';

export const EdgeAiStatusCard: React.FC = () => {
  const { edgeNode } = useApp();

  const pipeline = [
    { name: 'ESP32 Wristband', label: 'Raw Sensor Data' },
    { name: 'Validation', label: 'Noise Filtering' },
    { name: 'Features', label: 'HRV & Thermal' },
    { name: 'Personal Baseline', label: 'Reference Dev' },
    { name: 'Risk Engine', label: 'Arduino UNO Q' },
    { name: 'Dashboard', label: 'Decision Support' }
  ];

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/20 p-5 backdrop-blur-md space-y-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 glow-cyan">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono flex items-center gap-2">
              EDGE AI RISK ENGINE
            </h3>
            <p className="text-xs text-slate-400">
              On-device privacy-preserving risk inference node
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>PROCESSING LOCALLY</span>
        </span>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">HARDWARE NODE</span>
          <span className="font-bold text-cyan-400">{edgeNode.hardware}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">AI MODEL</span>
          <span className="font-bold text-slate-200">{edgeNode.model}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">PERSONALIZATION</span>
          <span className="font-bold text-emerald-400">BASELINE INITIALIZED</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 block uppercase">DATA QUALITY</span>
          <span className="font-bold text-cyan-400">GOOD (94% VALID)</span>
        </div>
      </div>

      {/* Pipeline Diagram */}
      <div className="pt-2">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Edge Processing Pipeline Architecture:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {pipeline.map((step, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-center relative group hover:border-cyan-500/40 transition-colors"
            >
              <span className="text-[10px] font-mono font-bold text-cyan-400 block">
                0{idx + 1}. {step.name}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminology disclaimer */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-sans">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local processing ensures zero raw biometric data uploads to external cloud.</span>
        </span>
        <span className="font-mono text-cyan-400 text-[10px]">DECISION SUPPORT ONLY</span>
      </div>
    </div>
  );
};
