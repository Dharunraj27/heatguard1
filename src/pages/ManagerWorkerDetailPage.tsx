import React from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataFreshness } from '../components/common/DataFreshness';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { WorkerMetricsGrid } from '../components/worker/WorkerMetricsGrid';
import { RiskIndicator } from '../components/common/RiskIndicator';
import { TelemetryChart } from '../components/charts/TelemetryChart';
import { User, ShieldCheck, ArrowLeft, Sliders, HardDrive, AlertTriangle } from 'lucide-react';

export const ManagerWorkerDetailPage: React.FC = () => {
  const { workers, selectedWorkerId, navigate } = useApp();

  const worker = workers.find(w => w.id === selectedWorkerId || w.code === selectedWorkerId) || workers[0];
  const isOffline = worker.status === 'NO_DATA';

  return (
    <div className="space-y-6 pb-24">
      {/* Back Button */}
      <button
        onClick={() => navigate('/manager/workers')}
        className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workers Directory</span>
      </button>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xl glow-cyan">
            {worker.code}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-white tracking-tight">{worker.name}</h2>
              <StatusBadge status={worker.status} size="md" />
            </div>
            <span className="text-xs text-slate-400 font-mono block mt-1">
              {worker.role} • {worker.siteName} • {worker.shift}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <DataFreshness lastUpdate={worker.lastUpdate} isStale={isOffline} />
          <BatteryIndicator level={worker.telemetry.battery} />
        </div>
      </div>

      {/* Profile & Hardware Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase block">WORKER ID</span>
          <span className="font-bold text-white text-sm">{worker.code}</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase block">WEARABLE DEVICE</span>
          <span className="font-bold text-cyan-400 text-sm">{worker.deviceId}</span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase block">CALIBRATION STATUS</span>
          <span className="font-bold text-emerald-400 text-sm">
            {worker.baseline.calibrationStatus}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50">
          <span className="text-[10px] text-slate-400 uppercase block">COMMUNICATION LINK</span>
          <span className="font-bold text-blue-400 text-sm">LoRa 868MHz Mesh</span>
        </div>
      </div>

      {/* 6 Live Telemetry Metrics */}
      <div>
        <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono mb-3">
          Live Sensor Telemetry
        </h3>
        <WorkerMetricsGrid telemetry={worker.telemetry} isStale={isOffline} />
      </div>

      {/* Personal Baseline Panel & Risk Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Personal Baseline Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
                Personal Baseline Reference
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              QUALITY: {worker.baseline.dataQuality}
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Reference Heart Rate:</span>
              <span className="font-bold text-cyan-400">
                {worker.baseline.referenceHrMin} – {worker.baseline.referenceHrMax} BPM
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Reference Skin Temp:</span>
              <span className="font-bold text-amber-400">
                {worker.baseline.referenceSkinTempMin} – {worker.baseline.referenceSkinTempMax}°C
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Calibration Climate:</span>
              <span className="text-slate-300">
                {worker.baseline.calibrationEnvironmentTemp}°C / {worker.baseline.calibrationEnvironmentHumidity}% RH
              </span>
            </div>
          </div>

          {/* Current vs Reference Comparison Meter */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase block">
              CURRENT vs PERSONAL REFERENCE RANGE:
            </span>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Current HR: {worker.telemetry.heartRate} BPM</span>
              <span className={worker.telemetry.heartRate > worker.baseline.referenceHrMax ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                {worker.telemetry.heartRate > worker.baseline.referenceHrMax
                  ? `+${worker.telemetry.heartRate - worker.baseline.referenceHrMax} BPM deviation`
                  : 'Within reference interval'}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Assessment Panel */}
        <div className="lg:col-span-6 space-y-4">
          <RiskIndicator
            status={worker.status}
            factors={worker.riskAssessment.factors}
            recommendation={worker.riskAssessment.recommendation}
          />

          <p className="text-[11px] text-slate-500 italic p-3 rounded-xl bg-slate-950 border border-slate-800">
            * HEATGUARD provides sensor-derived safety and risk indicators for worker monitoring. It is not a medical diagnostic system.
          </p>
        </div>
      </div>

      {/* Telemetry Chart */}
      <TelemetryChart workerCode={worker.code} />
    </div>
  );
};
