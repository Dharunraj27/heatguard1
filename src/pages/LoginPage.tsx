import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Role } from '../types/heatguard';
import { Lock, User, Cpu, CheckCircle2, ArrowRight, Shield, Key } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setRole, navigate, addToast, setSelectedWorkerId, workers } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>('SITE_MANAGER');
  const [identifier, setIdentifier] = useState<string>('manager@heatguard.io');
  const [password, setPassword] = useState<string>('heatguard2026');
  const [selectedWorkerCode, setSelectedWorkerCode] = useState<string>('W001');

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    if (role === 'SITE_MANAGER') {
      setIdentifier('manager@heatguard.io');
      setPassword('heatguard2026');
    } else if (role === 'WORKER') {
      setIdentifier('w001@heatguard.io');
      setPassword('heatguard2026');
      setSelectedWorkerCode('W001');
    } else {
      setIdentifier('admin@heatguard.io');
      setPassword('heatguard2026');
    }
  };

  const handleWorkerSelect = (code: string) => {
    setSelectedWorkerCode(code);
    setIdentifier(`${code.toLowerCase()}@heatguard.io`);
    setPassword('heatguard2026');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);

    if (selectedRole === 'WORKER') {
      const targetWorker = workers.find(w => w.code === selectedWorkerCode || w.id === selectedWorkerCode) || workers[0];
      setSelectedWorkerId(targetWorker.id);
      addToast('success', `Logged in as Worker ${targetWorker.name} (${targetWorker.code})`);
      navigate('/worker/dashboard');
    } else if (selectedRole === 'SITE_MANAGER') {
      addToast('success', `Logged in as Site Manager (Dharunraj)`);
      navigate('/manager/dashboard');
    } else {
      addToast('success', `Logged in as System Administrator (Dr. Anita Desai)`);
      navigate('/admin/users');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden bg-grid-pattern">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side Branding */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-bold">HEATGUARD CORE ONLINE</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="HEATGUARD Logo"
              className="w-12 h-12 rounded-2xl object-cover shadow-xl glow-cyan border border-cyan-500/50"
            />
            <div>
              <h1 className="text-2xl font-extrabold tracking-wider font-mono">HEATGUARD</h1>
              <span className="text-xs font-mono text-cyan-400 font-semibold tracking-widest block -mt-1">
                EDGE AI WORKER SAFETY
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Protect Every Shift.
            </h2>
            <p className="text-sm text-slate-300 font-medium leading-relaxed">
              Edge AI powered worker health & heat safety monitoring for connected construction sites. Privacy-preserving wearable telemetry with zero external cloud dependencies.
            </p>
          </div>

          {/* User Credentials Helper */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Key className="w-4 h-4" />
              <span>DEFAULT SYSTEM CREDENTIALS:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              • <strong className="text-white">Site Manager (Dharunraj):</strong> manager@heatguard.io | Pass: heatguard2026<br />
              • <strong className="text-white">System Admin:</strong> admin@heatguard.io | Pass: heatguard2026<br />
              • <strong className="text-white">Workers (24 Accounts):</strong> w001@heatguard.io to w024@heatguard.io | Pass: heatguard2026
            </p>
          </div>
        </div>

        {/* Right Side Login Card */}
        <div className="lg:col-span-6">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl space-y-5 shadow-2xl"
          >
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">System Sign In</h3>
              <p className="text-xs text-slate-400 mt-1">
                Select authorization role & user account to enter the dashboard.
              </p>
            </div>

            {/* Role Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 font-semibold uppercase block">
                SELECT ROLE:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'SITE_MANAGER', label: 'MANAGER' },
                  { id: 'WORKER', label: 'WORKER' },
                  { id: 'ADMIN', label: 'ADMIN' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleChange(r.id as Role)}
                    className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      selectedRole === r.id
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 glow-cyan'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Worker Account Select Dropdown (If Worker Role) */}
            {selectedRole === 'WORKER' && (
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-cyan-400 font-semibold uppercase block">
                  SELECT WORKER ACCOUNT (W001 - W024):
                </label>
                <select
                  value={selectedWorkerCode}
                  onChange={(e) => handleWorkerSelect(e.target.value)}
                  className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-cyan-400 font-mono font-bold focus:outline-none focus:border-cyan-400"
                >
                  {workers.map((w) => (
                    <option key={w.id} value={w.code}>
                      {w.code} — {w.name} ({w.role})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Identifier input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 font-semibold uppercase block">
                EMAIL OR USER ID:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400 font-semibold uppercase block">
                PASSWORD:
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:scale-[1.01] transition-all shadow-lg glow-cyan flex items-center justify-center gap-2"
            >
              <span>SIGN IN TO HEATGUARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Local / Offline Badges */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Local / Offline Capable
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Cpu className="w-3.5 h-3.5" /> Privacy-First AI
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
