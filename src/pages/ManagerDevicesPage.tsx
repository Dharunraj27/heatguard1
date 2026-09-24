import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { HardDrive, Wifi, Radio, Cpu, RefreshCw } from 'lucide-react';

export const ManagerDevicesPage: React.FC = () => {
  const { devices, edgeNode } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const filteredDevices = devices.filter(d => {
    if (filter === 'CONNECTED') return d.connectionState === 'CONNECTED';
    if (filter === 'DISCONNECTED') return d.connectionState === 'DISCONNECTED';
    if (filter === 'LOW_BATTERY') return d.batteryLevel < 30;
    return true;
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <span>Edge Hardware & Wearables Fleet Manager</span>
          </h2>
          <p className="text-xs text-slate-400">
            ESP32 wristbands, LoRa RF link health, battery levels, & Arduino UNO Q edge node
          </p>
        </div>

        {/* Filter options */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono">
          {['all', 'CONNECTED', 'DISCONNECTED', 'LOW_BATTERY'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg transition-all font-semibold uppercase ${
                filter === f
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Edge Node Hardware Box */}
      <div className="p-5 rounded-2xl border border-cyan-500/30 bg-slate-900/80 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 glow-cyan">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono">{edgeNode.name}</h3>
            <span className="text-xs text-slate-400 font-mono">
              Hardware: {edgeNode.hardware} • Firmware: {edgeNode.firmware}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            STATUS: {edgeNode.status}
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 font-bold">
            LORA GATEWAY: {edgeNode.loraGatewayStatus}
          </span>
        </div>
      </div>

      {/* Device Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Device ID</th>
              <th className="py-3 px-4">Assigned Worker</th>
              <th className="py-3 px-4">Comm Method</th>
              <th className="py-3 px-4">Signal RSSI</th>
              <th className="py-3 px-4">Battery</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4">Last Telemetry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredDevices.map((d) => (
              <tr key={d.id} className="hover:bg-slate-900/80 transition-colors">
                <td className="py-3 px-4 font-bold text-cyan-400">{d.id}</td>
                <td className="py-3 px-4 text-white font-bold">{d.workerName} ({d.workerId})</td>
                <td className="py-3 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    {d.commMethod === 'LoRa' ? <Radio className="w-3.5 h-3.5 text-blue-400" /> : <Wifi className="w-3.5 h-3.5 text-cyan-400" />}
                    {d.commMethod}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">{d.signalQuality}% (-78 dBm)</td>
                <td className="py-3 px-4">
                  <BatteryIndicator level={d.batteryLevel} size="sm" />
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    d.connectionState === 'CONNECTED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {d.connectionState}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{d.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
