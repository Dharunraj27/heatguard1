import React from 'react';
import { useApp } from '../context/AppContext';
import { WorkerHero } from '../components/worker/WorkerHero';
import { WorkerMetricsGrid } from '../components/worker/WorkerMetricsGrid';
import { RiskIndicator } from '../components/common/RiskIndicator';
import { TelemetryChart } from '../components/charts/TelemetryChart';
import { Sliders, ShieldCheck } from 'lucide-react';

export const WorkerDashboardPage: React.FC = () => {
  const { workers, user, navigate } = useApp();

  const worker = workers.find(w => w.id === (user.workerId || 'W001')) || workers[0];
  const isOffline = worker.status === 'NO_DATA';

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Status Card */}
      <WorkerHero
        worker={worker}
        onOpenSos={() => navigate('/worker/sos')}
      />

      {/* 6 Large Readable Metric Cards */}
      <div>
        <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono mb-3">
          Your Live Telemetry Readings
        </h3>
        <WorkerMetricsGrid telemetry={worker.telemetry} isStale={isOffline} />
      </div>

      {/* Risk Indicator & Safety Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RiskIndicator
            status={worker.status}
            factors={worker.riskAssessment.factors}
            recommendation={worker.riskAssessment.recommendation}
          />
        </div>

        {/* Quick Personal Baseline Card */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold text-white uppercase font-mono">Personal Baseline</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              INITIALIZED
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Ref HR Interval:</span>
              <span className="font-bold text-cyan-400">
                {worker.baseline.referenceHrMin} - {worker.baseline.referenceHrMax} BPM
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Ref Skin Temp:</span>
              <span className="font-bold text-amber-400">
                {worker.baseline.referenceSkinTempMin} - {worker.baseline.referenceSkinTempMax}°C
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/worker/calibration')}
            className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700 transition-colors"
          >
            Manage Calibration Workflow
          </button>
        </div>
      </div>

      {/* Telemetry Trend Chart */}
      <TelemetryChart title="Your Shift Physiological Trend" workerCode={worker.code} />
    </div>
  );
};
