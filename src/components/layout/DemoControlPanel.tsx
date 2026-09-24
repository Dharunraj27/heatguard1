import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  AlertTriangle,
  AlertOctagon,
  Flame,
  WifiOff,
  RotateCcw,
  Play,
  Pause,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const DemoControlPanel: React.FC = () => {
  const {
    demoMode,
    triggerDemoScenario,
    simulating,
    setSimulating,
    workers,
    selectedWorkerId,
    setSelectedWorkerId
  } = useApp();

  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!demoMode) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto">
      <div className="bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden transition-all glow-cyan">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              SIH DEMO SCENARIO CONTROL
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
              SIMULATED DATA
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Target Worker Select */}
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <span className="text-slate-400 text-[11px]">TARGET:</span>
              <select
                value={selectedWorkerId}
                onChange={(e) => setSelectedWorkerId(e.target.value)}
                className="bg-slate-900 text-cyan-400 border border-slate-700 rounded px-2 py-0.5 text-xs font-mono focus:outline-none"
              >
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} ({w.name.split(' ')[0]}) — {w.status}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimize Toggle */}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Controls */}
        {!isMinimized && (
          <div className="p-3 flex flex-wrap items-center justify-center gap-2 bg-slate-900/90">
            {/* Pause/Resume Telemetry Stream */}
            <button
              onClick={() => setSimulating(!simulating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                simulating
                  ? 'bg-slate-800 text-emerald-400 border-emerald-500/40 hover:bg-slate-700'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              {simulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{simulating ? 'STREAM ACTIVE' : 'STREAM PAUSED'}</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

            {/* Scenario Buttons */}
            <button
              onClick={() => triggerDemoScenario('CAUTION', selectedWorkerId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all shadow-md"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simulate Caution</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('HIGH_RISK', selectedWorkerId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30 hover:bg-orange-500/25 transition-all shadow-md"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Simulate High Risk</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('SOS', selectedWorkerId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-all shadow-lg glow-emergency"
            >
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>Simulate SOS</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('OFFLINE', selectedWorkerId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span>Simulate Offline</span>
            </button>

            <button
              onClick={() => triggerDemoScenario('RESET')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Scenario</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
