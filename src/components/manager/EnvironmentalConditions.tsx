import React from 'react';
import { useApp } from '../../context/AppContext';
import { SunMedium, Droplets, Thermometer, TrendingUp, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const EnvironmentalConditions: React.FC = () => {
  const { sites, selectedSiteId } = useApp();

  const site = sites.find(s => s.id === selectedSiteId) || sites[0];

  const envTrendData = [
    { time: '11:00', temp: 31.2, humidity: 60 },
    { time: '12:00', temp: 32.8, humidity: 63 },
    { time: '13:00', temp: 34.0, humidity: 66 },
    { time: '14:00', temp: 34.8, humidity: 68 },
    { time: '14:30', temp: 35.1, humidity: 70 }
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <SunMedium className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
              Site Thermal Environment
            </h3>
            <p className="text-xs text-slate-400">
              {site.name} — Real-time atmospheric micro-climate telemetry
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
          ENV STATUS: {site.envStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Temp Card */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Thermometer className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">AMBIENT TEMP</span>
              <span className="text-xl font-extrabold font-mono text-white">{site.ambientTemp}°C</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            +2.4° vs avg
          </span>
        </div>

        {/* Humidity Card */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Droplets className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[11px] font-mono text-slate-400 block uppercase">HUMIDITY</span>
              <span className="text-xl font-extrabold font-mono text-white">{site.humidity}% RH</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            HIGH MOISTURE
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-32 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={envTrendData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[25, 40]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d16',
                borderColor: '#1e293b',
                borderRadius: '8px',
                fontSize: '11px'
              }}
            />
            <Area type="monotone" dataKey="temp" stroke="#f59e0b" fillOpacity={1} fill="url(#tempGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[11px] text-slate-400 flex items-start gap-1.5 font-sans leading-relaxed">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          Environmental heat load is combined with worker individual baseline physiological signals by the Edge AI model for decision support.
        </span>
      </p>
    </div>
  );
};
