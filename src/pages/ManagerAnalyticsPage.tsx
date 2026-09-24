import React from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LineChart as LineChartIcon, ShieldAlert, Cpu } from 'lucide-react';

export const ManagerAnalyticsPage: React.FC = () => {
  const { workers } = useApp();

  const hourlyAlertData = [
    { hour: '08:00', normal: 20, caution: 1, highRisk: 0 },
    { hour: '10:00', normal: 19, caution: 2, highRisk: 0 },
    { hour: '12:00', normal: 18, caution: 3, highRisk: 1 },
    { hour: '14:00', normal: 17, caution: 3, highRisk: 1 },
    { hour: '16:00', normal: 19, caution: 2, highRisk: 0 }
  ];

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <LineChartIcon className="w-5 h-5 text-cyan-400" />
            <span>Site Health & Thermal Safety Analytics</span>
          </h2>
          <p className="text-xs text-slate-400">
            Shift-level aggregated trends, heat load correlations, & edge risk statistics
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
          DESCRIPTIVE STATISTICAL ANALYTICS
        </span>
      </div>

      {/* Analytics Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Risk Distribution Bar Chart */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
            Risk-State Hourly Distribution
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyAlertData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="normal" stackId="a" fill="#10b981" name="Normal" />
                <Bar dataKey="caution" stackId="a" fill="#f59e0b" name="Caution" />
                <Bar dataKey="highRisk" stackId="a" fill="#f97316" name="High Risk" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Environmental Heat Index vs Average Heart Rate */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-3">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
            Ambient Heat vs Workforce Cardiovascular Load
          </h3>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyAlertData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="caution" stroke="#f59e0b" strokeWidth={2} name="Caution Incidents" />
                <Line type="monotone" dataKey="highRisk" stroke="#f97316" strokeWidth={2.5} name="High Risk Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
