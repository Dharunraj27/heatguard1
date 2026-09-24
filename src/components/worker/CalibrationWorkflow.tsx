import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sliders, ShieldCheck, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export const CalibrationWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(3); // Default step 3 Rest Session
  const [secondsLeft, setSecondsLeft] = useState<number>(222); // 03:42
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning || isCompleted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          setCurrentStep(5);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const steps = [
    { num: 1, title: 'Device Check', desc: 'ESP32 LoRa pairing' },
    { num: 2, title: 'Sensor Check', desc: 'PPG & Skin Temp signal' },
    { num: 3, title: 'Rest Session', desc: '5 min resting baseline' },
    { num: 4, title: 'Validation', desc: 'Data noise filtering' },
    { num: 5, title: 'Baseline Ready', desc: 'Personal reference stored' }
  ];

  const handleRestart = () => {
    setSecondsLeft(300);
    setIsCompleted(false);
    setIsRunning(true);
    setCurrentStep(3);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white tracking-wider font-mono flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Personal Baseline Calibration Workflow</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Establishes your personal resting physiological reference range for Edge AI risk evaluation
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          STATUS: {isCompleted ? 'CALIBRATION COMPLETE' : 'CALIBRATING...'}
        </span>
      </div>

      {/* Stepper Header */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((st) => {
          const isDone = st.num < currentStep || (st.num === 5 && isCompleted);
          const isCurrent = st.num === currentStep && !isCompleted;

          return (
            <div
              key={st.num}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                isDone
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : isCurrent
                  ? 'border-cyan-500 bg-cyan-500/15 text-cyan-400 glow-cyan'
                  : 'border-slate-800 bg-slate-950/40 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-extrabold uppercase">
                  STEP 0{st.num}
                </span>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : null}
              </div>
              <span className="text-xs font-bold text-white block">{st.title}</span>
              <span className="text-[10px] text-slate-400 block font-mono">{st.desc}</span>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Screen */}
      {!isCompleted ? (
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/80 text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-slate-900 border border-cyan-500/30 glow-cyan">
            <span className="text-4xl font-extrabold font-mono text-cyan-400 tracking-wider">
              {formatTime(secondsLeft)}
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">Sit comfortably & remain at rest</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Ensure your wristband is fitted snugly. Keep your arm relaxed during baseline collection.
            </p>
          </div>

          {/* Live Calibration Telemetry Readouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">SENSOR QUALITY</span>
              <span className="font-bold text-emerald-400">GOOD (96%)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">HEART RATE</span>
              <span className="font-bold text-white">76 BPM</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">SKIN TEMP</span>
              <span className="font-bold text-white">33.7°C</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">AMBIENT / HUM</span>
              <span className="font-bold text-slate-300">29.4°C / 58%</span>
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Play className="w-4 h-4 text-cyan-400" />
              <span>{isRunning ? 'Pause Session' : 'Resume Session'}</span>
            </button>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-4">
          <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 inline-block">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-white">Baseline Profile Initialized Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
              Your personal resting heart rate range (72–82 BPM) & skin temperature range (33.2–34.1°C) have been saved to your local Edge AI profile.
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg"
          >
            <span>Recalibrate Baseline Profile</span>
          </button>
        </div>
      )}

      {/* Non-medical Disclaimer */}
      <p className="text-[11px] text-slate-500 italic text-center border-t border-white/5 pt-3">
        * HeatGuard baseline parameters establish relative statistical reference intervals for heat stress & strain indicators. They do not constitute medical diagnostics.
      </p>
    </div>
  );
};
