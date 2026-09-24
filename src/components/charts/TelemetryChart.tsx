import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

interface TelemetryChartProps {
  title?: string;
  workerCode?: string;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({
  title = 'Heart Rate & Thermal Baseline Trend',
  workerCode = 'W001'
}) => {
  const [timeFilter, setTimeFilter] = useState<string>('shift');

  // Generate dynamic time series data based on selected range
  const getDynamicData = (range: string) => {
    switch (range) {
      case '1h':
        return [
          { time: '14:00', hr: 82, skinTemp: 33.6, ambientTemp: 32.1, refMin: 70, refMax: 85 },
          { time: '14:05', hr: 84, skinTemp: 33.7, ambientTemp: 32.3, refMin: 70, refMax: 85 },
          { time: '14:10', hr: 89, skinTemp: 33.9, ambientTemp: 32.5, refMin: 70, refMax: 85 },
          { time: '14:15', hr: 95, skinTemp: 34.1, ambientTemp: 33.0, refMin: 70, refMax: 85 },
          { time: '14:20', hr: 102, skinTemp: 34.4, ambientTemp: 33.4, refMin: 70, refMax: 85 },
          { time: '14:25', hr: 108, skinTemp: 34.7, ambientTemp: 34.1, refMin: 70, refMax: 85 },
          { time: '14:30', hr: 112, skinTemp: 35.0, ambientTemp: 34.6, refMin: 70, refMax: 85 },
          { time: '14:35', hr: 106, skinTemp: 34.8, ambientTemp: 34.5, refMin: 70, refMax: 85 },
          { time: '14:40', hr: 98, skinTemp: 34.5, ambientTemp: 34.2, refMin: 70, refMax: 85 },
          { time: '14:45', hr: 91, skinTemp: 34.2, ambientTemp: 33.8, refMin: 70, refMax: 85 },
          { time: '14:50', hr: 85, skinTemp: 33.9, ambientTemp: 33.4, refMin: 70, refMax: 85 },
          { time: '14:55', hr: 81, skinTemp: 33.7, ambientTemp: 33.1, refMin: 70, refMax: 85 }
        ];

      case '6h':
        return [
          { time: '09:00', hr: 74, skinTemp: 33.1, ambientTemp: 29.5, refMin: 70, refMax: 85 },
          { time: '09:30', hr: 76, skinTemp: 33.2, ambientTemp: 30.1, refMin: 70, refMax: 85 },
          { time: '10:00', hr: 82, skinTemp: 33.5, ambientTemp: 31.0, refMin: 70, refMax: 85 },
          { time: '10:30', hr: 86, skinTemp: 33.8, ambientTemp: 32.2, refMin: 70, refMax: 85 },
          { time: '11:00', hr: 91, skinTemp: 34.0, ambientTemp: 33.5, refMin: 70, refMax: 85 },
          { time: '11:30', hr: 97, skinTemp: 34.3, ambientTemp: 34.2, refMin: 70, refMax: 85 },
          { time: '12:00', hr: 103, skinTemp: 34.6, ambientTemp: 35.0, refMin: 70, refMax: 85 },
          { time: '12:30', hr: 110, skinTemp: 34.9, ambientTemp: 35.8, refMin: 70, refMax: 85 },
          { time: '13:00', hr: 118, skinTemp: 35.2, ambientTemp: 36.4, refMin: 70, refMax: 85 },
          { time: '13:30', hr: 114, skinTemp: 35.0, ambientTemp: 36.1, refMin: 70, refMax: 85 },
          { time: '14:00', hr: 105, skinTemp: 34.7, ambientTemp: 35.5, refMin: 70, refMax: 85 },
          { time: '14:30', hr: 92, skinTemp: 34.1, ambientTemp: 34.5, refMin: 70, refMax: 85 }
        ];

      case '24h':
        return [
          { time: '00:00', hr: 62, skinTemp: 32.4, ambientTemp: 24.1, refMin: 70, refMax: 85 },
          { time: '02:00', hr: 58, skinTemp: 32.2, ambientTemp: 23.5, refMin: 70, refMax: 85 },
          { time: '04:00', hr: 60, skinTemp: 32.3, ambientTemp: 23.8, refMin: 70, refMax: 85 },
          { time: '06:00', hr: 68, skinTemp: 32.8, ambientTemp: 25.4, refMin: 70, refMax: 85 },
          { time: '08:00', hr: 75, skinTemp: 33.3, ambientTemp: 28.5, refMin: 70, refMax: 85 },
          { time: '10:00', hr: 85, skinTemp: 33.8, ambientTemp: 31.4, refMin: 70, refMax: 85 },
          { time: '12:00', hr: 98, skinTemp: 34.4, ambientTemp: 34.8, refMin: 70, refMax: 85 },
          { time: '14:00', hr: 114, skinTemp: 35.1, ambientTemp: 36.5, refMin: 70, refMax: 85 },
          { time: '16:00', hr: 102, skinTemp: 34.6, ambientTemp: 34.2, refMin: 70, refMax: 85 },
          { time: '18:00', hr: 81, skinTemp: 33.8, ambientTemp: 31.0, refMin: 70, refMax: 85 },
          { time: '20:00', hr: 72, skinTemp: 33.1, ambientTemp: 28.2, refMin: 70, refMax: 85 },
          { time: '22:00', hr: 65, skinTemp: 32.6, ambientTemp: 25.8, refMin: 70, refMax: 85 }
        ];

      case '7d':
        return [
          { time: 'Mon', hr: 82, skinTemp: 33.7, ambientTemp: 31.2, refMin: 70, refMax: 85 },
          { time: 'Tue', hr: 85, skinTemp: 33.9, ambientTemp: 32.4, refMin: 70, refMax: 85 },
          { time: 'Wed', hr: 94, skinTemp: 34.4, ambientTemp: 34.8, refMin: 70, refMax: 85 },
          { time: 'Thu', hr: 110, skinTemp: 35.2, ambientTemp: 36.9, refMin: 70, refMax: 85 },
          { time: 'Fri', hr: 88, skinTemp: 34.0, ambientTemp: 33.1, refMin: 70, refMax: 85 },
          { time: 'Sat', hr: 76, skinTemp: 33.2, ambientTemp: 29.8, refMin: 70, refMax: 85 },
          { time: 'Sun', hr: 71, skinTemp: 32.9, ambientTemp: 28.5, refMin: 70, refMax: 85 }
        ];

      case 'shift':
      default:
        return [
          { time: '08:00', hr: 72, skinTemp: 33.3, ambientTemp: 28.5, refMin: 70, refMax: 85 },
          { time: '09:00', hr: 75, skinTemp: 33.4, ambientTemp: 29.8, refMin: 70, refMax: 85 },
          { time: '10:00', hr: 81, skinTemp: 33.7, ambientTemp: 31.4, refMin: 70, refMax: 85 },
          { time: '11:00', hr: 88, skinTemp: 34.0, ambientTemp: 33.0, refMin: 70, refMax: 85 },
          { time: '12:00', hr: 94, skinTemp: 34.3, ambientTemp: 34.5, refMin: 70, refMax: 85 },
          { time: '13:00', hr: 106, skinTemp: 34.8, ambientTemp: 36.2, refMin: 70, refMax: 85 },
          { time: '14:00', hr: 104, skinTemp: 34.7, ambientTemp: 36.0, refMin: 70, refMax: 85 },
          { time: '14:30', hr: 78, skinTemp: 33.8, ambientTemp: 34.8, refMin: 70, refMax: 85 }
        ];
    }
  };

  const chartData = getDynamicData(timeFilter);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
            {title} ({workerCode})
          </h3>
          <p className="text-xs text-slate-400">
            Comparing live telemetry readings against personalized reference interval
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
          {[
            { id: '1h', label: '1 HOUR' },
            { id: '6h', label: '6 HOURS' },
            { id: 'shift', label: 'CURRENT SHIFT' },
            { id: '24h', label: '24 HOURS' },
            { id: '7d', label: '7 DAYS' }
          ].map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeFilter(tf.id)}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold uppercase ${
                timeFilter === tf.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis yAxisId="hr" stroke="#38bdf8" fontSize={11} tickLine={false} domain={[50, 140]} />
            <YAxis yAxisId="temp" orientation="right" stroke="#f59e0b" fontSize={11} tickLine={false} domain={[30, 40]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#090d16',
                borderColor: '#1e293b',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            
            {/* Heart Rate Line */}
            <Line
              yAxisId="hr"
              type="monotone"
              dataKey="hr"
              name="Heart Rate (BPM)"
              stroke="#06b6d4"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#06b6d4' }}
              activeDot={{ r: 6 }}
            />

            {/* Skin Temp Line */}
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="skinTemp"
              name="Skin Temp (°C)"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3, fill: '#f59e0b' }}
            />

            {/* Reference Max Line */}
            <Line
              yAxisId="hr"
              type="stepAfter"
              dataKey="refMax"
              name="Personal HR Ref Max (85 BPM)"
              stroke="#10b981"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> Valid Telemetry Signal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Personal Baseline Interval
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Thermal Index
        </span>
      </div>
    </div>
  );
};
