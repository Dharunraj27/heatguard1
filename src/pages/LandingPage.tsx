import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ArrowRight,
  Cpu,
  Radio,
  Sliders,
  ShieldCheck,
  WifiOff,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, setRole } = useApp();

  const handleEnterDashboard = (role: 'SITE_MANAGER' | 'WORKER') => {
    setRole(role);
    if (role === 'SITE_MANAGER') {
      navigate('/manager/dashboard');
    } else {
      navigate('/worker/dashboard');
    }
  };

  const features = [
    {
      title: 'LOCAL EDGE AI',
      desc: 'On-device inferencing on Arduino UNO Q nodes. Zero reliance on continuous cloud connectivity.',
      icon: Cpu,
      color: 'text-cyan-400'
    },
    {
      title: 'PERSONAL BASELINES',
      desc: 'Learns each worker’s unique resting physiological pattern to eliminate false alarm thresholds.',
      icon: Sliders,
      color: 'text-emerald-400'
    },
    {
      title: 'REAL-TIME SAFETY',
      desc: 'Sub-second thermal load & cardiovascular strain indicators transmitted via LoRa mesh network.',
      icon: Activity,
      color: 'text-amber-400'
    },
    {
      title: 'PRIVACY FIRST',
      desc: 'Raw health biometric data remains local on the wristband & edge node. Privacy by design.',
      icon: ShieldCheck,
      color: 'text-blue-400'
    },
    {
      title: 'OFFLINE CAPABLE',
      desc: 'Full operational safety monitoring even in subterranean, remote, or zero-cellular construction sites.',
      icon: WifiOff,
      color: 'text-purple-400'
    }
  ];

  const archSteps = [
    { name: 'WRISTBAND', desc: 'ESP32 + PPG + Temp', icon: Zap },
    { name: 'LORA LINK', desc: '868MHz Mesh Radio', icon: Radio },
    { name: 'EDGE NODE', desc: 'Arduino UNO Q AI', icon: Cpu },
    { name: 'COMMAND UI', desc: 'HEATGUARD Dashboard', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden bg-grid-pattern">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800/60 max-w-7xl mx-auto w-full relative z-10">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="HEATGUARD Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-lg glow-cyan border border-cyan-500/40"
          />
          <div>
            <h1 className="text-lg font-extrabold tracking-wider font-mono">HEATGUARD</h1>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-widest block -mt-1">
              EDGE AI WORKER SAFETY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => handleEnterDashboard('SITE_MANAGER')}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg glow-cyan flex items-center gap-1.5"
          >
            <span>LAUNCH DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Hero Body */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center relative z-10 space-y-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SMART INDIA HACKATHON (SIH) PROTOTYPE DEMO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Protect Every Shift.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Privacy-first worker safety monitoring powered by wearable sensors and local Edge AI. Designed for heavy construction, roadworks, and high-heat environments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleEnterDashboard('SITE_MANAGER')}
              className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:scale-105 transition-all shadow-xl glow-cyan flex items-center gap-2 font-mono"
            >
              <span>ENTER SITE COMMAND CENTER</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleEnterDashboard('WORKER')}
              className="px-6 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2 font-mono"
            >
              <span>WORKER PERSONAL VIEW</span>
            </button>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center">
            SYSTEM DATAFLOW ARCHITECTURE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {archSteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col items-center text-center space-y-2 relative group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold font-mono text-white block">
                    0{idx + 1}. {step.name}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono block">{step.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md space-y-2 hover:border-slate-700 transition-colors"
              >
                <IconComp className={`w-6 h-6 ${f.color}`} />
                <h4 className="text-xs font-extrabold font-mono text-white tracking-wider">{f.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="h-16 border-t border-slate-800/80 px-8 flex items-center justify-between text-xs text-slate-500 max-w-7xl mx-auto w-full font-mono">
        <span>HEATGUARD Smart Safety System v1.0</span>
        <span>Local Edge Node: Arduino UNO Q</span>
        <span>SIH Prototype Demonstration</span>
      </footer>
    </div>
  );
};
